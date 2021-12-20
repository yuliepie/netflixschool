import os
import sys
import pymysql
import pandas as pd
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

# content_word_levels 테이블에서 각 레벨의 min, max 값을 가져옴
level_list = []
for i in range(1, 7):
    minmax_query = f'select min(level_{i}), max(level_{i}) from content_word_levels'
    cursor.execute(minmax_query)
    level_list.append(list(cursor.fetchone()))

# print(level_list)

def merge_and_normalize(all_scripts_df):

    all_scripts_df = all_scripts_df.set_index('title')

    # level_1 ~ level_6까지 weight 적용
    df_calculated = all_scripts_df.copy()
    for i in range(1, 7):
        level = 'level_' + str(i)
        df_calculated[level] = df_calculated[level] * df_calculated['weight']

    # 정규화 Level
    df_calculated_level = df_calculated[['level_1', 'level_2', 'level_3', 'level_4', 'level_5', 'level_6']]
    
    # db에서 가져온 각 level들의 min, max값으로 level 정규화
    # df_normalization_level = (df_calculated_level - df_calculated_level.min()) / (df_calculated_level.max() - df_calculated_level.min())
    df_normalization_level = pd.DataFrame()
    # def nomalization(x, i):
    #     return (x - level_list[i][0]) / (level_list[i][1] - level_list[i][0])
    
    # df_normalization_level['level_1'] = df_calculated_level['level_1'].apply(lambda x: nomalization(x, 0))

    df_normalization_level['level_1'] = (df_calculated_level['level_1'] - level_list[0][0]) / (level_list[0][1] - level_list[0][0])
    df_normalization_level['level_2'] = (df_calculated_level['level_2'] - level_list[1][0]) / (level_list[1][1] - level_list[1][0])
    df_normalization_level['level_3'] = (df_calculated_level['level_3'] - level_list[2][0]) / (level_list[2][1] - level_list[2][0])
    df_normalization_level['level_4'] = (df_calculated_level['level_4'] - level_list[3][0]) / (level_list[3][1] - level_list[3][0])
    df_normalization_level['level_5'] = (df_calculated_level['level_5'] - level_list[4][0]) / (level_list[4][1] - level_list[4][0])
    df_normalization_level['level_6'] = (df_calculated_level['level_6'] - level_list[5][0]) / (level_list[5][1] - level_list[5][0])
    

    # 정규화 WPS
    df_calculated_WPS = df_calculated[['WPS_mean']]
    df_normalization_WPS = (df_calculated_WPS - df_calculated_WPS.min()) / (df_calculated_WPS.max() - df_calculated_WPS.min())
    df_normalization_WPS = df_normalization_WPS.rename(columns={'WPS_mean':'WPS_mean_nlln'})

    # DF 합치기
    df_result = df_normalization_level.join(all_scripts_df[['WPS_mean','WPS_std', 'WPS_min', 'WPS_max']])
    df_result = df_result.join(df_normalization_WPS)

    return df_result



if __name__ == '__main__':    # 프로그램의 시작점일 때만 아래 코드 실행

    # df = pd.read_csv('../../data_preprocessing/script/csv_files/all_scripts.csv')
    df = pd.read_csv(r'E:\\workspace\\elice_web_project2\\data_preprocessing\\script\\csv_files\\all_scripts.csv')
    result = merge_and_normalize(df)

    print(len(result), result)