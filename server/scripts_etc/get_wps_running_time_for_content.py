import pandas as pd

def get_wps_running_time_for_content(title, script_csv):
    # 자막이 재생되는 시간 계산
    script_csv['start'] = pd.to_datetime(script_csv['start'])
    script_csv['end'] = pd.to_datetime(script_csv['end'])

    script_csv['duration'] = script_csv['end'] - script_csv['start']
    script_csv['duration'] = script_csv['duration'].astype('str')
    script_csv['duration'] = script_csv['duration'].str.split(' ').str[2]
    script_csv['duration'] = script_csv['duration'].str.split(':').str[2].astype('float')

    # 러닝 타임 (sec) 시간 계산
    running_time = script_csv['end'][len(script_csv)-1] - script_csv['start'][0]
    running_time = running_time.total_seconds()

    # 필요없는 컬럼 제거
    script_csv = script_csv.drop(columns=['start', 'end'])

    #단어의 개수 계산 (띄어쓰기 기준)
    script_csv['words_num'] = script_csv['script'].apply(lambda x: len(x.split(' ')))

    # 1초에 몇 개의 단어가 보여지는지 계산
    script_csv['wordsPerSec'] = script_csv['words_num'] / script_csv['duration']
    script_csv['secPerWord'] = script_csv['duration'] / script_csv['words_num']

    # 이상치 제거
    # 1. 1개의 단어로 된 문장 제거
    # 2. WPS 값이 0.5 이하인 문장 제거
    script_csv = script_csv[script_csv['words_num']!=1]
    script_csv = script_csv[script_csv['wordsPerSec']>=0.5].sort_values('words_num')

    # result DF 만들기
    result = script_csv['wordsPerSec'].describe().to_frame().transpose()[['mean', 'std', 'min', 'max']]
    result['title'] = title
    result['running_time(sec)'] = running_time
    result['weight'] = 3600/running_time
    result = result.set_index('title')
    result = result.rename(columns={'mean':'WPS_mean', 'std':'WPS_std', 'min':'WPS_min', 'max':'WPS_max'})

    return result

if __name__ == '__main__':    # 프로그램의 시작점일 때만 아래 코드 실행

    df = pd.read_csv('../../data_preprocessing/script/movie/About.Time/About.Time.WEBRip.Netflix.en[cc].csv')

    result = get_wps_running_time_for_content('About.Time_2013', df)

    print(result)