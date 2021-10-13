"""
- 컨텐츠의 content_word_levels에 1~6 레벨별 단어 카운트들이 추가돼있지 않을 경우 추가해줌.
- 또한 그 컨텐츠의 sentences 테이블과 content_unique_words 테이블에 레벨/해시태그를 매겨줌.
- 전제조건은 add_unique_words_and_sentences.py 스크립트를 통해
해당 컨텐츠의 content_unique_words, sentences, content_word_levels (WPS) 값들을 채워놨어야 한다. 만약 없다면 추가되지 않는다.

이 스크립트는 터미널에서 매개변수를 넣어 실행할 수 있다.
- python3 get_content_word_levels.py all
- 이처럼 끝에 all 매개변수를 넣어서 실행할 경우 모든 컨텐츠의 레벨별 단어 카운트를 다시 매겨주고, 그에 따라 content_unique_words, sentences 테이블을 업데이트해준다.
- all 매개변수 없이 실행될 경우 아직 단어별 레벨카운트가 매겨지지않은 컨텐츠에 한해서만 이 작업을 한다.

*** 과정 요약 ***
1. 새 컨텐츠들을 netflix_contents 테이블에 추가한다
2. add_unique_words_and_sentences.py 를 실행해 새 컨텐츠들의 문장과 유니크 단어들을 추출해 저장한다.
3. 이 스크립트를 통해 단어들과 문장들에 레벨을 매겨주고 레벨별 단어들의 카운트를 매겨준다.
4. 만약 단어리스트가 업데이트되었을경우 (단어추가, 레벨변경 등) all 매개변수를 통해 모든 컨텐츠의 레벨별 단어카운트를 업데이트해준다.
5. recalculate level 스크립트를 통해 정규화작업을 거쳐 컨텐츠 종합 난이도를 (다시) 계산한다.
"""
import sys
import pandas as pd

from Scripts import (
    get_word_level_counts_for_content,
    get_sentence_max_level_and_word,
    connect_to_db,
    initalize_resources,
)

resources = initalize_resources()
words_list_df = resources["words_df"]
lemmas_dict = resources["lemmas_dict"]
nlp = resources["nlp"]
compound_dict = resources["compound_dict"]

conn = connect_to_db()
cursor = conn.cursor()

# ================
# miss or all
# ================
update_all = False
if len(sys.argv) == 2 and sys.argv[1] == "all":
    update_all = True

select_netflix = "SELECT nc.id, nc.title, nc.release_year FROM netflix_contents nc"
where_no_word_levels = """ INNER JOIN content_word_levels cwl ON nc.id = cwl.content_id WHERE cwl.level_1 = -1
"""

select_query = select_netflix
if not update_all:
    select_query = select_query + where_no_word_levels

cursor.execute(select_query)
contents_to_update = list(cursor.fetchall())

for (id, title, year) in contents_to_update:
    print(id, title)

    unique_words_sql = f"SELECT id, word, frequency FROM content_unique_words cuw WHERE cuw.content_id = {id}"

    sentences_sql = f"SELECT id, start, sentence FROM sentences where content_id = {id}"

    word_levels_sql = (
        "SELECT id, wps_weight FROM content_word_levels where content_id = " + str(id)
    )

    # 컨텐츠의 unique words & sentences 테이블 => dataframe
    try:
        pd_unique_words_sql = pd.read_sql_query(
            unique_words_sql,
            conn,
        )
        unique_words_df = pd.DataFrame(
            pd_unique_words_sql, columns=["id", "word", "frequency"]
        )
        unique_words_df.rename(
            columns={"id": "row_id", "word": "Word", "frequency": "counts"},
            inplace=True,
        )
        unique_words_df.set_index("Word", inplace=True)

        pd_sentences_sql = pd.read_sql_query(sentences_sql, conn)
        sentences_df = pd.DataFrame(
            pd_sentences_sql, columns=["id", "start", "sentence"]
        )
        sentences_df.rename(
            columns={"id": "row_id", "sentence": "script"}, inplace=True
        )

        pd_word_levels_sql = pd.read_sql_query(word_levels_sql, conn)
        word_levels_df = pd.DataFrame(pd_word_levels_sql, columns=["id", "wps_weight"])
        word_levels_df.rename(columns={"id": "row_id"}, inplace=True)

    except Exception as e:
        print(
            "이 컨텐츠의 단어들이 content_unique_words, sentences, content_word_level(wps) 테이블에 있는지 확인 요망."
        )
        print(e)
        continue

    if unique_words_df.empty or sentences_df.empty or word_levels_df.empty:
        print(
            "이 컨텐츠의 단어들이 content_unique_words, sentences, content_word_level(wps) 테이블에 있는지 확인 요망."
        )
        continue

    (
        unique_words_all_levelled_df,
        content_level_counts_df,
    ) = get_word_level_counts_for_content(id, unique_words_df, words_list_df)

    # 러닝타임 weight 적용
    for i in range(1, 7):
        level = "level_" + str(i)
        content_level_counts_df[level] = (
            content_level_counts_df[level] * word_levels_df.iloc[0]["wps_weight"]
        )

    # ===============================
    # content_word_levels 채우기
    # ===============================
    # Todo: 1-1 테이블에 unique foreign key 적용할 것.
    print("CONTENT_WORD_LEVEL", id)
    word_levels_update_sql = """
        UPDATE content_word_levels SET level_1 = %s, level_2 = %s, level_3 = %s, level_4 = %s, level_5 = %s, level_6 = %s WHERE content_id = %s
    """
    try:
        cursor.execute(
            word_levels_update_sql,
            [
                int(content_level_counts_df["level_1"]),
                int(content_level_counts_df["level_2"]),
                int(content_level_counts_df["level_3"]),
                int(content_level_counts_df["level_4"]),
                int(content_level_counts_df["level_5"]),
                int(content_level_counts_df["level_6"]),
                id,
            ],
        )
    except Exception as e:
        print("content_word_levels 에러!")
        print(e)
        conn.rollback()
        cursor.close()
        sys.exit(2)

    # ========================================
    # content_unique_words 의 level 컬럼 채우기
    # ========================================
    # Todo: hashtag 컬럼도 채우기
    print("CONTENT_UNIQUE_WORDS", id)

    unique_words_update_sql = """
        UPDATE content_unique_words SET level = (%s) WHERE id = (%s)
    """
    for index, row in unique_words_all_levelled_df.iterrows():
        try:
            cursor.execute(unique_words_update_sql, [row.word_level, row.row_id])
        except Exception as e:
            print("content_unique_words 에러!")
            print(e)
            conn.rollback()
            cursor.close()
            sys.exit(2)

    # ==================================
    # sentences 의 word, level 채우기
    # ==================================
    print("SENTENCES", id)

    sentence_update_sql = """
        UPDATE sentences SET word = (%s), level = (%s) WHERE id = (%s)
    """
    for index, row in sentences_df.iterrows():
        level, word = get_sentence_max_level_and_word(
            row["script"],
            nlp,
            compound_dict,
            unique_words_all_levelled_df,
            lemmas_dict,
            words_list_df,
        )
        try:
            # print(word, level)
            cursor.execute(sentence_update_sql, [word, int(level), row.row_id])
        except Exception as e:
            print("sentences 에러!")
            print(e)
            conn.rollback()
            cursor.close()
            sys.exit(2)
    conn.commit()
print("Levelling finished successfully.")
