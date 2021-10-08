import pandas as pd
import boto3
import pymysql
import os
import sys
from dotenv import load_dotenv

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
bucket = "netflixschool-script-csv"

select_netflix = "select id, title, release_year from netflix_contents"
where = ' where title in ("About.Time", "Baby.Driver")'

cursor.execute(select_netflix + where)
contents = list(cursor.fetchall())

# DF to contain word level and WPS stats for all netflix contents
all_scripts_df = pd.DataFrame()

# for each row in netflix_contents, get word_levels and wps
for (id, title, year) in contents:
    csv_name = f"{title}_{year}.csv"
    print(id)

    csv_obj = s3.get_object(Bucket=bucket, Key=csv_name)
    script_csv = pd.read_csv(csv_obj["Body"])

    # df1 = get_word_level_counts_for_content(script_csv, lemmas, word_list, primary_key)
    # df2 = get_wps_running_time_for_content(script_csv, primary_key)

    # all_scripts_df.append(df1 + df2)

# 가중치 리스트
df_final = normalize_and_calculate_level(all_scripts_df, 가중치 리스트)

# add level to netflix_contents
netflix_update_sql = """
    UPDATE netflix_contents
    SET word_difficulty_level = %s, words_per_second = %s, content_level = %s
    WHERE id = %s
"""
for index, row in df_final.iterrows():
    cursor.execute(
        netflix_update_sql,
        (
            row["word_difficulty_level"],
            row["wps"],
            row["content_difficulty_level"],
            index,
        ),
    )

# db 저장
conn.commit()
# db 접속 해제
conn.close()
