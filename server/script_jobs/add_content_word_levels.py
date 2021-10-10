import pandas as pd
import boto3
from dotenv import load_dotenv

from Scripts import (
    get_word_level_counts_for_content,
    get_wps_running_time_for_content,
    normalize_and_calculate_level,
    get_unique_word_counts_from_script,
    connect_to_db,
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

# word list
words_obj = s3.get_object(Bucket=words_bucket, Key="word_levels.csv")
word_list_csv = pd.read_csv(words_obj["Body"], index_col="Word")
# lemmas
lemmas_obj = s3.get_object(Bucket=words_bucket, Key="ex_lemmas.csv")
lemmas_csv = pd.read_csv(lemmas_obj["Body"], index_col="Word")
# compound lemmas
compound_lemmas_obj = s3.get_object(Bucket=words_bucket, Key="compound_lemmas.csv")
compound_lemmas_csv = pd.read_csv(compound_lemmas_obj["Body"], index_col="Word")

# drop rows from content_word_levels table
cursor.execute("TRUNCATE TABLE content_word_levels;")
conn.commit()

select_netflix = "select id, title, release_year from netflix_contents"
where = ' where title in ("About.Time", "Baby.Driver")'

cursor.execute(select_netflix + where)
contents = list(cursor.fetchall())

# for all rows in netflix_contents table:
for (id, title, year) in contents:
    print(id, title)
    csv_name = f"{title}_{year}.csv"

    csv_obj = s3.get_object(Bucket=script_bucket, Key=csv_name)
    script_csv = pd.read_csv(csv_obj["Body"])

    unique_words_df = get_unique_word_counts_from_script(
        script_csv, compound_lemmas_csv
    )
    unique_word_counts_df, word_level_df = get_word_level_counts_for_content(
        id, unique_words_df, word_list_csv, lemmas_csv
    )

    # Todo: fill content_unique_words table

    wps_df = get_wps_running_time_for_content(id, script_csv)
    levels_and_wps = pd.merge(word_level_df, wps_df, left_index=True, right_index=True)

    # 러닝타임 weight 적용
    for i in range(1, 7):
        level = "level_" + str(i)
        levels_and_wps[level] = levels_and_wps[level] * levels_and_wps["weight"]

    # fill content_word_levels table
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
