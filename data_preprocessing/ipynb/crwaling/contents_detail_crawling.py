import urllib.request
import requests
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options


path = './script'

# 다큐멘터리(0), 드라마(1), 영화(2) 선택
category = 1
if category == 0:
    path = path + '/Documentary'
elif category == 1:
    path = path + '/Drama'
else:
    path = path + '/Movie'

_list = os.listdir(path)

file_list = []
for file in _list:
    if file.startswith('.'): continue
    file_list.append(file)

# 제목 찾기 쉽게 변형
for idx, title in enumerate(file_list):
    file_list[idx] = title

file_list = sorted(file_list)
print(f'작품개수: {len(file_list)}')
# print([{i:_list[i]} for i in range(len(file_list))])
for index, title in enumerate(file_list):
    print(f'{index}: {title}')


def contents_detail_crawling(title):

    original_title = title
    title = title.replace('_.', ':.').replace('_', "'").replace('.', ' ').replace('  ', '. ')

    driver = webdriver.Chrome('./chromedriver')
    driver.implicitly_wait(2)
    driver.get('https://www.justwatch.com/kr/검색?q=' + title)


    content_url = driver.find_element_by_css_selector('#base > div.title-list.search-content > div > div.title-list-row > ion-grid > div > ion-row:nth-child(1) > ion-col:nth-child(1) > a').get_attribute('href')

    # 넷플릭스 id
    netflix_id = driver.find_element_by_css_selector('#base > div.title-list.search-content > div > div.title-list-row > ion-grid > div > ion-row > ion-col:nth-child(2) > div:nth-child(2) > div.price-comparison--inline > div > div.price-comparison__grid__row.price-comparison__grid__row--stream > div.price-comparison__grid__row__holder > div:nth-child(1) > div > a').get_attribute('href').split('title%2F')[1].split('&')[0]

    driver.close()

    # justwatch 타이틀 검색을 통해서 검색한 title의 영화 상세페이지를 받아오기
    headers = {'User-Agent':'Chrome/66.0.3359.181'}
    url = content_url
    response = requests.get(url, headers=headers)
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')

    # 한글 제목
    kr_title = soup.select_one('#base > div.jw-info-box > div > div.col-sm-8 > div:nth-child(2) > div:nth-child(1) > div > div.title-block > div > h1').get_text().strip()
    # 영어 제목
    en_title = soup.select_one('#base > div.jw-info-box > div > div.col-sm-8 > div:nth-child(2) > div:nth-child(1) > div > div.title-block > h3').get_text().replace('원제: ', '').strip()
    # 개봉연도
    release_year = soup.select_one('#base > div.jw-info-box > div > div.col-sm-8 > div:nth-child(2) > div:nth-child(1) > div > div.title-block > div > span').get_text().replace('(', '').replace(')', '').strip()
    # 재생시간
    running_time = soup.select_one('#base > div.jw-info-box > div > div.col-sm-4.hidden-xs > div > aside > div.hidden-sm.visible-md.visible-lg.title-sidebar__desktop > div.detail-infos > div > div:nth-child(3) > div.detail-infos__detail--values').get_text().strip()
    # 장르
    genre = soup.select_one('#base > div.jw-info-box > div > div.col-sm-4.hidden-xs > div > aside > div.hidden-sm.visible-md.visible-lg.title-sidebar__desktop > div.detail-infos > div > div:nth-child(2) > div.detail-infos__detail--values').get_text().strip()
    # 스토리
    story = soup.select_one('#base > div.jw-info-box > div > div.col-sm-8 > div:nth-child(2)').get_text().split('시놉시스')[1].split(f'{kr_title} 보기 -')[0]

    # 포스터 이미지 url
    origin_img_url = soup.select_one('#base > div.jw-info-box > div > div.col-sm-4.hidden-xs > div > aside > div.hidden-sm.visible-md.visible-lg.title-sidebar__desktop > div.title-poster.title-poster--no-radius-bottom > picture').img['data-src']

    # 포스터 이미지 저장
    urllib.request.urlretrieve(origin_img_url, f'./img/{original_title}_Poster.jpg')

    # imdb에서 검색
    driver = webdriver.Chrome('./chromedriver')
    driver.implicitly_wait(2)
    driver.get('https://www.imdb.com/find?q=' + title + '&s=tt&ref_=fn_tt')


    imdb_detail_url = driver.find_element_by_css_selector('#main > div > div:nth-child(3) > table > tbody > tr:nth-child(1) > td.result_text > a').get_attribute('href')
    

    # imdb 상세페이지에서 받아오기
    driver.get(imdb_detail_url)
    director = driver.find_element_by_css_selector('#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > div > section > div > div.TitleMainBelowTheFoldGroup__TitleMainPrimaryGroup-sc-1vpywau-1.btXiqv.ipc-page-grid__item.ipc-page-grid__item--span-2 > section.ipc-page-section.ipc-page-section--base.StyledComponents__CastSection-y9ygcu-0.fswvJC.celwidget > ul > li:nth-child(1) > div > ul > li > a').text.strip()

    # # age rating
    try:
        if category == 1:
            age_rating = driver.find_element_by_css_selector('#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.TitleBlock__Container-sc-1nlhx7j-0.hglRHk > div.TitleBlock__TitleContainer-sc-1nlhx7j-1.jxsVNt > div.TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2.hWHMKr > ul > li:nth-child(3) > a').text.strip()
        else :
            age_rating = driver.find_element_by_css_selector('#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.TitleBlock__Container-sc-1nlhx7j-0.hglRHk > div.TitleBlock__TitleContainer-sc-1nlhx7j-1.jxsVNt > div.TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2.hWHMKr > ul > li:nth-child(2) > a').text.strip()
    except:
        age_rating = 'Null'

    driver.close()

    if category == 1:
        type = 'TV Show'
    else:
        type = 'Movie'

    print(f'{title}: crwaling success')

    return [original_title, netflix_id, type, kr_title, en_title, genre, age_rating, director, release_year, running_time, story, origin_img_url]




# contents_detail_crawling(file_list[9])


# 데이터프레임 만들기
# netflix_contents = pd.DataFrame(columns=['title', 'netflix_id', 'type', 'kr_title', 'en_title', 'genre', 'age_rating', 'director', 'release_year', 'running_time', 'story', 'origin_img_url'])

# netflix_contents.to_csv('./netflix_contents.csv', index=False)





netflix_contents = pd.read_csv('./netflix_contents.csv')

for title in file_list:
    netflix_contents.loc[title] = contents_detail_crawling(title)


# print(netflix_contents)

netflix_contents.to_csv('./netflix_contents.csv', index=False)