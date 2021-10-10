import pandas as pd

def calculate_level(df_normalize, _list):

    df_normalize = df_normalize.set_index('title')

    # level 별 가중치 계산
    df_result = df_normalize.copy()
    level_1 = df_result['level_1']# * _list[0]
    level_2 = df_result['level_2']# * _list[1]
    level_3 = df_result['level_3']# * _list[2]
    level_4 = df_result['level_4']# * _list[3]
    level_5 = df_result['level_5']# * _list[4]
    level_6 = df_result['level_6']# * _list[5]

    df_result['level_score'] = level_1 + level_2 + level_3 + level_4 + level_5 + level_6

    # 80% 에 해당하는 값을 담는 컬럼 추가
    df_result['80%'] = df_result['level_score'] * 0.8

    # 80% 값에 해당하는 레벨을 담는 컬럼 추가
    def level_result(_list, percentile):
        # level_1부터 6까지 누적 합계값이 80%를 넘으면 해당 레벨을 return
        sum = 0
        count = 1
        for level in _list:
            sum += level
            if sum > percentile:
                break
            count += 1
        return count
        
    df_result['word_level'] = df_result.apply(lambda x: level_result(
        [
            x['level_1'],
            x['level_2'], 
            x['level_3'], 
            x['level_4'], 
            x['level_5'], 
            x['level_6']
        ], x['80%']), axis=1)

    '''
    word_level을 계산했으므로 80% 컬럼은 지워도 될 것 같음
    실제 데이터 확인 후 삭제 처리
    df_result.drop(columns=['80%'])
    '''

    # WPS Score 계산
    df_result['wps_score'] = df_result['WPS_mean_nlln'] * _list[6]

    # Final Score 계산
    df_result['final_score'] = df_result['level_score'] + df_result['wps_score']

    return df_result
    
if __name__ == '__main__':    # 프로그램의 시작점일 때만 아래 코드 실행

    df = pd.read_csv('../../data_preprocessing/script/csv_files/all_scripts_normalization.csv')
    result = calculate_level(df, [1, 2, 3, 4, 5, 6, 4])

    print(result)