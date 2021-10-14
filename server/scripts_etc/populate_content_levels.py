import pandas as pd
import boto3
import pymysql
import os
import sys
from dotenv import load_dotenv

from Scripts import (
    get_word_level_counts_for_content,
    get_wps_running_time_for_content,
    normalize_and_calculate_level,
    get_unique_word_counts_from_script,
)

load_dotenv()

env_variables = {
    "DB_NAME": os.getenv("DATABASE_NAME"),
    "DB_HOST": os.getenv("DATABASE_HOST"),
    "DB_USER": os.getenv("DATABASE_USER"),
    "DB_PASSWORD": os.getenv("DATABASE_PASSWORD"),
}

# Check all required env variables are set.
for key, val in env_variables.items():
    if env_variables[key] is None or env_variables[key] == "None":
        print("Not all required variables are set. Please double check.")
        sys.exit()
    else:
        print(f"{key} variable loaded.")

# db 접속
conn = pymysql.connect(
    host=env_variables["DB_HOST"],
    user=env_variables["DB_USER"],
    password=env_variables["DB_PASSWORD"],
    db=env_variables["DB_NAME"],
    charset="utf8",
)
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

select_netflix = "select id, title, release_year from netflix_contents"
where = ' where title in ("About.Time", "Baby.Driver")'

cursor.execute(select_netflix)
contents = list(cursor.fetchall())

# DF to contain word level and WPS stats for all netflix contents
all_scripts_df = pd.DataFrame()

# for each row in netflix_contents, get word_levels and wps
for (id, title, year) in contents:
    print(id, title)
    csv_name = f"{title}_{year}.csv"

    csv_obj = s3.get_object(Bucket=script_bucket, Key=csv_name)
    script_csv = pd.read_csv(csv_obj["Body"])

    unique_words_df = get_unique_word_counts_from_script(
        script_csv, compound_lemmas_csv
    )
    word_level_df = get_word_level_counts_for_content(
        id, unique_words_df, word_list_csv, lemmas_csv
    )
    wps_df = get_wps_running_time_for_content(id, script_csv)

    merged = pd.merge(word_level_df, wps_df, left_index=True, right_index=True)

    all_scripts_df = all_scripts_df.append(merged)

# 가중치 리스트
level_weights = [1, 2, 3, 4, 5, 6, 5.25]
df_final = normalize_and_calculate_level(all_scripts_df, level_weights)

df_final.to_csv("test.csv")

# add level to netflix_contents
netflix_update_sql = """
    UPDATE netflix_contents
    SET content_level = %s
    WHERE id = %s
"""
for index, row in df_final.iterrows():
    cursor.execute(
        netflix_update_sql,
        (
            row["content_level"],
            index,
        ),
    )

# db 저장
conn.commit()
# db 접속 해제
conn.close()
