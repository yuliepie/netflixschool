import csv
import pymysql

# db 접속
conn = pymysql.connect(host='127.0.0.1', user='root', password='root', db='netflixcool_db', charset='utf8')
curs = conn.cursor()

# contentTypes 
sql = """insert into contentTypes (name) values (%s)"""
types = ['drama', 'movie']
for i in range(2):
    curs.execute(sql, (types[i]))


# db 저장
conn.commit()
# db 접속 해제
conn.close()

print('Done')