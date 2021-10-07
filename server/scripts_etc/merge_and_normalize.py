import pandas as pd

def merge_and_normalize(all_scripts_df):

    all_scripts_df = all_scripts_df.set_index('title')

    # level_1 ~ level_6까지 weight 적용
    df_calculated = all_scripts_df.copy()
    for i in range(1, 7):
        level = 'level_' + str(i)
        df_calculated[level] = df_calculated[level] * df_calculated['weight']

    # 정규화 Level
    df_calculated_level = df_calculated[['level_1', 'level_2', 'level_3', 'level_4', 'level_5', 'level_6']]
    df_normalization_level = (df_calculated_level - df_calculated_level.min()) / (df_calculated_level.max() - df_calculated_level.min())

    # 정규화 WPS
    df_calculated_WPS = df_calculated[['WPS_mean']]
    df_normalization_WPS = (df_calculated_WPS - df_calculated_WPS.min()) / (df_calculated_WPS.max() - df_calculated_WPS.min())
    df_normalization_WPS = df_normalization_WPS.rename(columns={'WPS_mean':'WPS_mean_nlln'})

    # DF 합치기
    df_result = df_normalization_level.join(all_scripts_df[['WPS_mean','WPS_std', 'WPS_min', 'WPS_max']])
    df_result = df_result.join(df_normalization_WPS)

    return df_result



if __name__ == '__main__':    # 프로그램의 시작점일 때만 아래 코드 실행

    df = pd.read_csv('../../data_preprocessing/script/csv_files/all_scripts.csv')
    result = merge_and_normalize(df)

    print(result)