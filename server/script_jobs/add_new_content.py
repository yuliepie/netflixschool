import pandas as pd
import boto3
import pymysql
import os
import sys
from dotenv import load_dotenv

from Scripts import (
    crawling_vtt_download,
    crawling_content_detail,
    file_unzip_and_vtt_to_csv,
    upload_scipt_csv_file,
    upload_poster_file
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
# s3 = boto3.client("s3")
# script_bucket = "netflixschool-script-csv"
# words_bucket = "netflixschool"


add_list = pd.read_csv('./csv_files/netflix_contents_add_list.csv')
try:
    for i in range(len(add_list)):
        # vtt 다운로드 이용하여 vtt 다운
        title, input_year = add_list.loc[i]
        content = crawling_vtt_download(title, str(input_year))

        # vtt to csv 파일로 변환
        file = file_unzip_and_vtt_to_csv(content['release_year'])
        if file == False:
            continue
        # s3에 script.csv 파일 업로드
        upload_scipt_csv_file(file['file_name'])

        # 콘텐츠 상세 페이지 내용 크롤링하기 및 포스터 이미지 다운로드
        detail_content = crawling_content_detail(content['justwatch_url'], file['file_name'], content['episode'], content['netflix_id'], file['file_title'])

        # s3에 poster.jpg 파일 업로드
        upload_poster_file(file['file_name'])

        print(detail_content)

        netflix_id = detail_content[1]
        title = detail_content[0]
        title_kr = detail_content[3]
        title_en = detail_content[4]
        genre = detail_content[5]
        age_rating = detail_content[6]
        director = detail_content[7]
        release_year = str(detail_content[8])
        running_time = detail_content[9]
        story = detail_content[10]
        subs_path = f'https://netflixschool-script-csv.s3.amazonaws.com//{file["file_name"]}.csv'
        img_path = detail_content[11]
        type = detail_content[2]

        sql = """insert into netflix_contents (
            netflix_id, title, title_kr, title_en, genre, age_rating, director, release_year,
            running_time, story, subs_path, img_path, type)
            values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""

        cursor.execute(
            sql,
            [
                netflix_id,
                title,
                title_kr,
                title_en,
                genre,
                age_rating,
                director,
                release_year,
                running_time,
                story,
                subs_path,
                img_path,
                type,
            ],
        )
        # db 저장
        conn.commit()
        print(f'{title} DB commit')
except Exception as e:
    print(e)
# db 접속 해제
conn.close()

print("Added netflix_contetns data.")
