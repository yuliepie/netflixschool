import re
import csv
import os
import zipfile
import shutil
import pandas as pd
import boto3

s3 = boto3.resource("s3")

def vtt_to_script_csv_convert(title, release_year, file_path):
    import re
    import csv
    # 폴더 안의 파일명 확인
    file_list = os.listdir(file_path)

    #파일 리스트의 파일들 segments 합치기
    #segments 합칠 변수 초기화
    full_segments = ''
    for file_name in file_list:
        opened_file = open(f'{file_path}/{file_name}', encoding='utf8')
        content = opened_file.read()
        segments = content.split('NOTE /SegmentIndex')[1]    # 한줄씩 정리

        full_segments += segments

    segments = full_segments.split('\n\n')

    ## 불필요한 부분 제거
    m = re.compile(r"\<.*?\>")
    def clean(content):
        if '♪' in content: return None
        if '[' in content: return None
        if ']' in content: return None
        if '(' in content: return None
        if ')' in content: return None
        if '{' in content: return None
        if '}' in content: return None
        new_content = m.sub('',content)
        new_content = new_content.replace('-->','')
        remove_point_1 = new_content.find('position:')
        remove_point_2 = new_content.find('% \n')
        new_content = new_content[:remove_point_1] + new_content[remove_point_2+3:]
        return new_content

    new_segments = [clean(s) for s in segments if len(s)!=0][4:]

    ## 줄번호 / 속도 시작 / 속도 끝 / 자막 - 데이터 분리
    trimmed_segments = []
    for segment in new_segments:
        if segment != None and segment.strip() != '':
            split_segment = segment.split()
            times = split_segment[:3]
            script = ' ' .join(split_segment[3:])
            times.append(script)
            trimmed_segments.append(times)

    # script.csv 파일로 저장
    file_name = f'{title}_{release_year}.csv'

    with open(f'./crawling/temp_script/{file_name}', 'w', encoding='utf8', newline='') as f:
        for line in trimmed_segments:
            thewriter = csv.writer(f)
            thewriter.writerow(line)
    ## 최종 - 줄번호 / 시작 시간 / 끝 시간 / 대사 별로 컬럼 분리
    data = pd.read_csv(f'./crawling/temp_script/{file_name}', names=['num', 'start', 'end', 'script'])

    # 잘려진 문장 한 문장으로 만들기
    if data['script'].iloc[-1][-1] not in ['.', '!', '?']:
        data['script'].iloc[-1] = data['script'].iloc[-1] + '.'
    
    data['script'] = data['script'].str.replace('\"', '')

    # 쪼개진 문장 합치기
    for index, current_row in data.iterrows():
        if current_row['script'][-1] in ['.', '!', '?']:
            continue
        else:
            row_index = index + 1
        while True:
            next_row = data.loc[row_index]
            new_script = data.loc[index, 'script'] + ' ' + next_row['script']
            data.loc[index, 'script'] = new_script
            if next_row['script'][-1] in ['.', '!', '?']:
                data.loc[index, 'end'] = next_row['end']
                break
            else:
                row_index += 1

    # 필요없는 토막문장들 제거
    data = data.drop_duplicates(subset='end')

    # 다시 script.csv 파일 저장
    data.to_csv(f'./crawling/temp_script/{file_name}', columns=['start', 'end', 'script'], index=False)

    print(f'{file_name} file creation completed.')

    return file_name.split('.csv')[0]


def file_unzip_and_vtt_to_csv(input_year):
    
    '''
    압축 풀기
    '''
    # 최신 파일 확인
    folder_path = './crawling/temp_download/'

    # each_file_path_and_gen_time: 각 file의 경로와, 생성 시간을 저장함
    each_file_path_and_gen_time = []
    for each_file_name in os.listdir(folder_path):
        # getctime: 입력받은 경로에 대한 생성 시간을 리턴
        each_file_path = folder_path + each_file_name
        each_file_gen_time = os.path.getctime(each_file_path)
        each_file_path_and_gen_time.append(
            (each_file_path, each_file_gen_time)
        )

    # 가장 생성시각이 큰(가장 최근인) 파일을 리턴 
    most_recent_file = max(each_file_path_and_gen_time, key=lambda x: x[1])[0]
    most_recent_fille_path = most_recent_file.split('.zip')[0]
    
    # 압축 파일 제목 받기
    file_title = most_recent_fille_path.split('/')[-1]

    #  방금 다운로드한 파일을 압축 해제
    os.makedirs(most_recent_fille_path)
    fantasy_zip = zipfile.ZipFile(most_recent_file)
    fantasy_zip.extractall(most_recent_fille_path)

    fantasy_zip.close()


    '''
    필요없는 파일 지우기
    '''
    # 지울 파일 리스트 초기화
    remove_file_list = []
    # 폴더의 파일명 리스트 받기
    file_list = os.listdir(most_recent_fille_path)
    for file in file_list:
        # en.vtt가 포함 되어있는 파일들 제거 리스트에 넣기
        if 'en.vtt' in file:
            remove_file_list.append(file)
    
    # 파일 제거 리스트의 파일들 제거
    for file in remove_file_list:
        os.remove(f'{most_recent_fille_path}/{file}')

    '''
    vtt to csv
    '''
    file_name = vtt_to_script_csv_convert(file_title, input_year, most_recent_fille_path)

    
    # 남은 폴더랑 파일 삭제
    shutil.rmtree(most_recent_fille_path)
    os.remove(most_recent_file)

    print 

    return {'file_title' : file_title, 'file_name': file_name}


def upload_scipt_csv_file(file_name):
    script = os.path.abspath(f"crawling/temp_script/{file_name}.csv")
    script_csv = open(script, "rb")
    try:
        s3.Bucket("netflixschool-script-csv").put_object(
            Key=f"{file_name}.csv", Body=script_csv, ContentType="text/csv"
        )
    except Exception as e:
        print(e)
    finally:
        script_csv.close()

    print(f'Upload {file_name}.csv file to s3 success')


def upload_poster_file(file_name):
    imgpath = os.path.abspath(f"crawling/img/{file_name}_Poster.jpg")
    img = open(imgpath, "rb")
    try:
        s3.Bucket("netflixschool-posters").put_object(
            Key=f"{file_name}.jpg", Body=img, ContentType="image/jpeg"
        )
    except Exception as e:
        print(e)
    finally:
        img.close()
        
    print(f'Upload {file_name}.jpg file to s3 success')