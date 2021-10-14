"""
- 모든 컨텐츠 중 content_unique_words, sentences에 컨텐츠가 추가돼있지 않을 경우 추가해줌
- 또한 content_word_levels의 wps값들만 미리 채워줌.
- 이때 레벨 컬럼들은 비워둠.
- 새컨텐츠 추가 후 실행.
- 스크립트 이름 뒤에 id <:id> 로 아이디를 지정해서 넣어줄수있음. 중복되지않게 조심할것!
"""
import sys
import pandas as pd

from Scripts import (
    get_wps_running_time_for_content,
    get_unique_word_counts_from_script,
    get_content_sentences_df,
    connect_to_db,
    initalize_resources,
)

conn = connect_to_db()
cursor = conn.cursor()

resources = initalize_resources()
s3 = resources["s3"]
script_bucket = resources["script_bucket"]
word_list_df = resources["words_df"]
nlp = resources["nlp"]
compound_dict = resources["compound_dict"]
lemmas_dict = resources["lemmas_dict"]

# Check if id passed
id_passed = False
arg_id = -1
num = -1
if len(sys.argv) == 3 and sys.argv[1] == "id":
    id_passed = True
    arg_id = int(sys.argv[2])
elif len(sys.argv) == 2:
    num = int(sys.argv[1])


# select netflix_contents
select_netflix = "SELECT id, title, release_year FROM netflix_contents nc"
where_unique_words = " WHERE NOT EXISTS (SELECT * FROM content_unique_words cuw WHERE nc.id = cuw.content_id)"
where_sentences = (
    " WHERE NOT EXISTS (SELECT * FROM sentences s WHERE nc.id = s.content_id)"
)
where_wps = " WHERE NOT EXISTS (SELECT * FROM content_word_levels cwl WHERE nc.id = cwl.content_id)"
id_where = f" WHERE id = {arg_id}"

# ==============================
# content_unique_words 확인
# ==============================
query = select_netflix
if id_passed:
    query = query + id_where
else:
    query = query + where_unique_words

cursor.execute(query)
contents_no_unique_words = list(cursor.fetchall())

if num > 0:
    contents_no_unique_words = contents_no_unique_words[:num]

unique_words_insert_sql = """
    insert into content_unique_words (content_id, word, frequency, level) values (%s, %s, %s, %s)
"""

print("UNIQUE WORDS")
for (id, title, year) in contents_no_unique_words:
    print(id, title)

    csv_name = f"{title}_{year}.csv"
    csv_obj = s3.get_object(Bucket=script_bucket, Key=csv_name)
    script_df = pd.read_csv(csv_obj["Body"])

    unique_word_counts_df = get_unique_word_counts_from_script(
        script_df, nlp, compound_dict, lemmas_dict, word_list_df
    )

    # for each word in unique_word_counts insert into table
    for index, row in unique_word_counts_df.iterrows():
        try:
            cursor.execute(unique_words_insert_sql, [id, str(index), row.counts, -1])
        except Exception as e:
            print(e)
            conn.rollback()
            cursor.close()
            sys.exit(2)

    conn.commit()


# ==============================
# sentences 확인
# ==============================
query = select_netflix
if id_passed:
    query = query + id_where
else:
    query = query + where_sentences

cursor.execute(query)
contents_no_sentences = list(cursor.fetchall())

if num > 0:
    contents_no_sentences = contents_no_sentences[:num]

sentences_insert_sql = """
    insert into sentences (content_id, start, sentence, word, level) values (%s, %s, %s, %s, %s)
"""

print("SENTENCES")
for (id, title, year) in contents_no_sentences:
    print(id, title)

    csv_name = f"{title}_{year}.csv"
    csv_obj = s3.get_object(Bucket=script_bucket, Key=csv_name)
    script_df = pd.read_csv(csv_obj["Body"])

    sentences_df = get_content_sentences_df(script_df, nlp)

    # for each sentence in sentences insert into table
    for index, row in sentences_df.iterrows():
        try:
            cursor.execute(
                sentences_insert_sql,
                [id, row["start"], row["script"], "", str(-1)],
            )
        except Exception as e:
            print(e)
            print(len(row["script"]))
            conn.rollback()
            cursor.close()
            sys.exit(2)

    conn.commit()

# ====================================
# content_word_levels 확인
# ====================================
query = select_netflix
if id_passed:
    query = query + id_where
else:
    query = query + where_wps

cursor.execute(query)
contents_no_wps = list(cursor.fetchall())

if num > 0:
    contents_no_wps = contents_no_wps[:num]

wps_insert_sql = """
    INSERT INTO content_word_levels (content_id, level_1, level_2, level_3, level_4, level_5, level_6, wps, wps_weight) values (%s, %s, %s, %s, %s, %s, %s, %s, %s)
"""

print("WPS")
for (id, title, year) in contents_no_wps:
    print(id, title)

    csv_name = f"{title}_{year}.csv"
    csv_obj = s3.get_object(Bucket=script_bucket, Key=csv_name)
    script_df = pd.read_csv(csv_obj["Body"])

    # Todo: 러닝타임 weight 로직 고칠것
    wps_df = get_wps_running_time_for_content(id, script_df)

    try:
        cursor.execute(
            wps_insert_sql,
            [
                id,
                -1,
                -1,
                -1,
                -1,
                -1,
                -1,
                wps_df.iloc[0]["WPS_mean"],
                wps_df.iloc[0]["weight"],
            ],
        )
    except Exception as e:
        print("Error while inserting WPS!")
        print(e)
        conn.rollback()
        cursor.close()
        conn.close()
        sys.exit(2)

    conn.commit()

print("Finished successfully.")
cursor.close()
conn.close()
