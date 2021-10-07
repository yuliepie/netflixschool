import pandas as pd

def calculate_level(df_normalize, _list):

    df_normalize = df_normalize.set_index('title')

    # level 별 가중치 계산
    df_result = df_normalize.copy()
    level_1 = df_result['level_1'] * _list[0]
    level_2 = df_result['level_2'] * _list[1]
    level_3 = df_result['level_3'] * _list[2]
    level_4 = df_result['level_4'] * _list[3]
    level_5 = df_result['level_5'] * _list[4]
    level_6 = df_result['level_6'] * _list[5]

    df_result['level_score'] = level_1 + level_2 + level_3 + level_4 + level_5 + level_6

    # WPS Score 계산
    df_result['wps_score'] = df_result['WPS_mean_nlln'] * _list[6]

    # Final Score 계산
    df_result['final_score'] = df_result['level_score'] + df_result['wps_score']

    return df_result
    
if __name__ == '__main__':    # 프로그램의 시작점일 때만 아래 코드 실행

    df = pd.read_csv('../../data_preprocessing/script/csv_files/all_scripts_normalization.csv')
    result = calculate_level(df, [1, 2, 3, 4, 5, 6, 4])

    print(result)