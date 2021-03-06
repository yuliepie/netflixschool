import pandas as pd
import boto3
import spacy

from Scripts import (
    get_word_level_counts_for_content,
    get_wps_running_time_for_content,
    get_unique_word_counts_from_script,
    connect_to_db,
    get_sentences_df,
)

"""
- 모든 컨텐츠의 각 레벨별 단어 카운트와 평균 WPS를 content_word_levels에 저장 (러닝타임 고려)
- 모든 컨텐츠의 해시태그별 단어 카운트를 content_hashtag_counts 에 저장
- 모든 컨텐츠의 유니크 단어를 content_unique_words 테이블에 추가
- 모든 컨텐츠의 모든 문장을 sentences 테이블에 추가
"""
conn = connect_to_db()
cursor = conn.cursor()

# S3
s3 = boto3.client("s3")
script_bucket = "netflixschool-script-csv"
words_bucket = "netflixschool"

nlp = spacy.load("en_core_web_sm")

# =========================
# 재료들 셋업
# =========================
# word list
words_obj = s3.get_object(Bucket=words_bucket, Key="word_levels.csv")
word_list_csv = pd.read_csv(words_obj["Body"], index_col="Word")
# lemmas
lemmas_obj = s3.get_object(Bucket=words_bucket, Key="ex_lemmas.csv")
lemmas_df = pd.read_csv(lemmas_obj["Body"], index_col="Word")
lemmas_dict = {}
for index, row in lemmas_df.iterrows():
    lemmas = row["Lemmas"].split(";")
    for lemma in lemmas:
        lemmas_dict[lemma] = str(index)
# compound lemmas
compound_lemmas_obj = s3.get_object(Bucket=words_bucket, Key="compound_lemmas.csv")
compound_lemmas_df = pd.read_csv(compound_lemmas_obj["Body"], index_col="Word")
compound_dict = {}
for index, row in compound_lemmas_df.iterrows():
    lemmas = row["Lemmas"].split(";")
    for lemma in lemmas:
        compound_dict[lemma] = str(index)

# drop all rows from content_word_levels table
cursor.execute("TRUNCATE TABLE content_word_levels;")
cursor.execute("TRUNCATE TABLE content_unique_words")
cursor.execute("TRUNCATE TABLE sentences")
conn.commit()

select_netflix = "select id, title, release_year from netflix_contents"
where = ' where title in ("About.Time", "Baby.Driver")'

cursor.execute(select_netflix + where)
contents = list(cursor.fetchall())

# ------------- for all rows in netflix_contents table:
for (id, title, year) in contents:
    print(id, title)
    csv_name = f"{title}_{year}.csv"

    csv_obj = s3.get_object(Bucket=script_bucket, Key=csv_name)
    script_csv = pd.read_csv(csv_obj["Body"])

    unique_words_df = get_unique_word_counts_from_script(script_csv, compound_dict, nlp)
    unique_word_counts_df, word_level_df = get_word_level_counts_for_content(
        id, unique_words_df, word_list_csv, lemmas_dict
    )

    # ===============================
    # content_unique_words 채우기
    # ===============================
    # Todo: hashtag 컬럼도 채우기

    unique_words_insert_sql = """
        insert into content_unique_words (content_id, word, level, frequency) values (%s, %s, %s, %s)
    """
    for index, row in unique_word_counts_df.iterrows():
        cursor.execute(
            unique_words_insert_sql, [id, str(index), row.word_level, row.counts]
        )

    wps_df = get_wps_running_time_for_content(id, script_csv)
    levels_and_wps = pd.merge(word_level_df, wps_df, left_index=True, right_index=True)

    # Todo: 러닝타임 weight 로직 고칠것
    # 러닝타임 weight 적용
    for i in range(1, 7):
        level = "level_" + str(i)
        levels_and_wps[level] = levels_and_wps[level] * levels_and_wps["weight"]

    # ===============================
    # content_word_levels 채우기
    # ===============================
    insert_sql = """
        insert into content_word_levels (content_id, level_1, level_2, level_3, level_4, level_5, level_6, wps) values (%s, %s, %s, %s, %s, %s, %s, %s,)
    """
    cursor.execute(
        insert_sql,
        [
            id,
            levels_and_wps["level_1"],
            levels_and_wps["level_2"],
            levels_and_wps["level_3"],
            levels_and_wps["level_4"],
            levels_and_wps["level_5"],
            levels_and_wps["level_6"],
            levels_and_wps["WPS_mean"],
        ],
    )

    # ===============================
    # sentences 채우기
    # ===============================
    sentences_df = get_sentences_df(script_csv, compound_dict, nlp)
    insert_sql = """
        insert into sentences (content_id, start, sentence, word, level) values (%s, %s, %s, %s, %s,)
    """
    cursor.execute(
        insert_sql,
        [
            id,
            sentences_df["start"],
            sentences_df["script"],
            sentences_df["word"],
            sentences_df["level"],
        ],
    )

    conn.commit()
    conn.close()
