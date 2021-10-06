import csv
import pymysql

# db 접속
conn = pymysql.connect(host='127.0.0.1', user='root', password='root', db='netflixcool_db', charset='utf8')
curs = conn.cursor()

# 파일 불러오기
file_path = 'C:/Users/NSK/Downloads/archive/netflix_titles.csv'
f = open(file_path,'r', encoding='UTF-8')
csv_data = csv.reader(f)
header = next(csv_data)

# csv to mysql
line_count = 0
for row in csv_data:
    type = 2
    title = row[2]
    genre = row[10]
    director = row[3]
    release_year = row[7]
    running_time = row[9]
    story = row[11]
    # print(title, '\n', genre, '\n', director, '\n', release_year, '\n', running_time, '\n', story)
    # break
    sql = """insert into netflix_contents (
        type, title, genre, director, release_year, 
        running_time, story, word_difficulty_level, words_per_second, content_level) 
        values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
    curs.execute(sql, (type, title, genre, director, release_year, running_time, story, 1, 1, 1))
    line_count += 1

    # 테스트 후에는 주석 처리
    if line_count == 10:
        break

# db 저장
conn.commit()
# 파일 닫기
f.close()
# db 접속 해제
conn.close()

print('Done')