"""
넷플릭스 데이터셋을 netflix_contents 테이블에 밀어넣어주는 스크립트 입니다.
"""

import csv
import pymysql
import os
import sys
from dotenv import load_dotenv

a = os.path.abspath("csv_files/netflix_contents_with_types.csv")
print(a)

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
curs = conn.cursor()

# 파일 불러오기
file_path = a
f = open(file_path, "r", encoding="UTF-8")
csv_data = csv.reader(f)
header = next(csv_data)

# csv to mysql
for row in csv_data:
    netflix_id = row[0]
    title = row[1]
    title_kr = row[2]
    title_en = row[3]
    genre = row[4]
    age_rating = row[5]
    director = row[6]
    release_year = str(row[7])
    running_time = row[8]
    story = row[9]
    subs_path = row[10]
    img_path = row[11]
    type = int(row[12])
    sql = """insert into netflix_contents (
        netflix_id, title, title_kr, title_en, genre, age_rating, director, release_year,
        running_time, story, subs_path, img_path, type)
        values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
    curs.execute(
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
# 파일 닫기
f.close()
# db 접속 해제
conn.close()

print("Added netflix data.")
