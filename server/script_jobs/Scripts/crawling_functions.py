import os
import urllib.request
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from time import sleep




def crawling_vtt_download(search_title, release_year):
    # selenium option
    options = webdriver.ChromeOptions()
    options.add_experimental_option("excludeSwitches", ["enable-logging"])
    options.add_argument('--user-data-dir=user_data')
    options.add_extension('./crawling/extension/dhdgffkkebhmkfjojejmpbldmpobfkfo.zip')
    options.add_experimental_option('prefs', {'download.default_directory': r'/Users/hanbyul/Desktop/Elice AI Track/1차 팀 프로젝트/Netflixcool/server/script_jobs/crawling/temp_download'})
    
    # TODO 창 숨기는 옵션 추가
    # options.add_argument("headless")


    # 크롬창 띄우고 확장프로그램 설치 동작
    driver = webdriver.Chrome('./crawling/chromedriver', options=options)
    driver.implicitly_wait(2)
    driver.get('https://greasyfork.org/en/scripts/26654-netflix-subtitle-downloader')
    sleep(2)

    # 새로 생긴 탭 활성화
    driver.switch_to.window(driver.window_handles[-1])
    # 경고창을 지우기
    driver.close()
    # 이전의 탭 활성화
    driver.switch_to.window(driver.window_handles[0])
    driver.implicitly_wait(2)
    
    # 스크립트 설치 페이지로 이동
    driver.find_element_by_css_selector('#install-area > a.install-link').send_keys(Keys.ENTER)
    driver.implicitly_wait(2)
    sleep(2)
    # 새로 생긴 탭 활성화
    driver.switch_to.window(driver.window_handles[-1])
    driver.implicitly_wait(2)
    # 스크립트 설치 버튼 누르기
    driver.find_element_by_id('input_JFhfdW5kZWZpbmVk_bu').send_keys(Keys.ENTER)
    driver.implicitly_wait(2)
    # 이전의 탭 활성화
    driver.switch_to.window(driver.window_handles[0])
    driver.implicitly_wait(2)

    # justwatch에서 제목과 년도로 검색해서 넷플 id 받기

    print(f'Crawling vtt download - {search_title} Search Netflix_id')
    # justWatch 메인 페이지로 이동
    driver.get(f'https://www.justwatch.com/')
    # 검색창에 title year 적기
    driver.find_element_by_css_selector('#app > div.navbar.container-fluid.container-max-width.landing-page > div > div.navbar__wrapper > div.navbar__search > div > ion-searchbar > div > input').send_keys(f'{search_title} {release_year}')
    driver.implicitly_wait(0.5)
    driver.find_element_by_css_selector('#app > div.navbar.container-fluid.container-max-width.landing-page > div > div.navbar__wrapper > div.navbar__search > div > ion-searchbar > div > input').click()
    driver.implicitly_wait(0.5)
    sleep(1)
    # 검색 버튼 클릭
    driver.find_element_by_css_selector('#app > div.navbar.container-fluid.container-max-width.landing-page > div > div.navbar__wrapper > div.navbar__search.navbar__search--expanded > div.search-suggester.search-suggester--web > div.search-suggester__results > div > div:nth-child(2) > div > span').click()
    driver.implicitly_wait(2)

    # 검색 필터 클릭
    driver.find_element_by_css_selector('#content-header > div > button').send_keys(Keys.ENTER)
    # 넷플릭스 클릭
    driver.find_element_by_css_selector('#base > div.search-header > div.filter-bar > div > div > div.hidden-horizontal-scrollbar.filter-bar__provider-row > div > div:nth-child(1) > a > picture > img').click()
    driver.implicitly_wait(2)

    for i in range(1, 11):
        year = driver.find_element_by_css_selector(f'#base > div.title-list.search-content > div > div.title-list-row > ion-grid > div > ion-row:nth-child({i}) > ion-col:nth-child(2) > a > span.title-list-row__row--muted').text
        if release_year in year:
            # 넷플릭스 id
            netflix_id = driver.find_element_by_css_selector(f'#base > div.title-list.search-content > div > div.title-list-row > ion-grid > div > ion-row:nth-child({i}) > ion-col:nth-child(2) > div:nth-child(2) > div.price-comparison--inline > div > div.price-comparison__grid__row.price-comparison__grid__row--stream > div.price-comparison__grid__row__holder > div:nth-child(1) > div > a').get_attribute('href').split('title%2F')[1].split('&')[0]

            # 해당작품 justwatch_url (DB 수집 때 이용)
            justwatch_url = driver.find_element_by_css_selector(f'#base > div.title-list.search-content > div > div.title-list-row > ion-grid > div > ion-row:nth-child({i}) > ion-col:nth-child(2) > a').get_attribute('href')

            break


    # 넷플릭스 시청 페이지
    driver.get(f'https://www.netflix.com/watch/{netflix_id}')
    driver.implicitly_wait(2)
    actions = ActionChains(driver)
    print(f'Crawling vtt download - Netflix Watch Page')
    sleep(1)
    
    # 전환된 url을 이용하여 video_id를 알아내기
    video_id = driver.current_url.split('watch/')[1].split('?')[0]

    # netflix_id == video_id이면 에피소드가 따로 없는 한 작품 (영화, 다큐)
    if netflix_id == video_id:
        episode = False
    # netflix_id != video_id이면 에피소드가 따로 있는 작품 (드라마)
    else:
        episode = True

    # 화면으로 옮겨서 메뉴 띄우기
    mouse_target = driver.find_element_by_css_selector('#appMountPoint > div > div > div.watch-video')
    actions.move_to_element(mouse_target).perform()

    # 메뉴ㄹ 마우스오버해서 창 메뉴 띄우기
    mouse_target = driver.find_element_by_id('subtitle-downloader-menu')
    actions.move_to_element(mouse_target).perform()

    # language 설정을 en으로 바꾸기
    driver.find_element_by_css_selector('#subtitle-downloader-menu > ol > li.lang-setting').click()
    driver.implicitly_wait(1)
    try:
        alert = driver.switch_to_alert()
        alert.send_keys("en")
        alert.accept()
        sleep(1)
    except:
        sleep(0.5)

    # 화면으로 옮겨서 메뉴 띄우기
    driver.find_element_by_css_selector('#appMountPoint > div > div > div.watch-video').click()
    driver.implicitly_wait(2)
    # 메뉴에 마우스오버해서 창 메뉴 띄우기
    mouse_target = driver.find_element_by_id('subtitle-downloader-menu')
    actions.move_to_element(mouse_target).perform()
    driver.implicitly_wait(0.5)

    # 만약 에피소드가 있는 작품이라면
    if episode:
        # 다운르도 버튼 누르기
        driver.find_element_by_css_selector('#subtitle-downloader-menu > ol > li.download-season.series').click()
        # driver.find_element_by_css_selector('#subtitle-downloader-menu > ol > li.download-season.series').send_keys(Keys.ENTER)        
    # 만약 에피소드가 없는 작품이라면
    else:
        # 다운르도 버튼 누르기
        driver.find_element_by_css_selector('#subtitle-downloader-menu > ol > li.download > span.not-series').click()
        
    folder_path = './crawling/temp_download/'

    # zip 파일이 있는지 확인할 변수
    zip_file = True

    # 임시 다운로드 폴더에 zip파일이 생기면 while문 탈출
    while zip_file:
        for file in os.listdir(folder_path):
            if '.zip' in file:
                zip_file = False
            
    sleep(0.5)

    # 크롬창 종료
    driver.quit()
    print(f'Crawling vtt download - {search_title} download vtt file success')


    return {'episode' : episode, 'justwatch_url' : justwatch_url, 'netflix_id' : netflix_id}


def crawling_content_detail(justwatch_url, file_name, episode, netflix_id, file_title):
    # selenium option
    options = webdriver.ChromeOptions()
    options.add_experimental_option("excludeSwitches", ["enable-logging"])
    options.add_argument('--user-data-dir=user_data')

    # TODO 창 숨기는 옵션 추가
    # options.add_argument("headless")

    driver = webdriver.Chrome('./crawling/chromedriver', options=options)
    driver.implicitly_wait(2)
    driver.get(justwatch_url)
    driver.implicitly_wait(2)

    print(f'Crawling content detail - {file_title} JustWatch Detail Page')
    # 한글 제목
    kr_title = driver.find_element_by_css_selector('#base > div.jw-info-box > div > div.col-sm-8 > div:nth-child(2) > div:nth-child(1) > div > div.title-block > div > h1').text.strip()
    # 영어 제목
    en_title = driver.find_element_by_css_selector('#base > div.jw-info-box > div > div.col-sm-8 > div:nth-child(2) > div:nth-child(1) > div > div.title-block > h3').text.replace('원제: ', '').strip()
    # 개봉연도
    release_year = driver.find_element_by_css_selector('#base > div.jw-info-box > div > div.col-sm-8 > div:nth-child(2) > div:nth-child(1) > div > div.title-block > div > span').text.replace('(', '').replace(')', '').strip()
    # 재생시간
    running_time = driver.find_element_by_css_selector('#base > div.jw-info-box > div > div.col-sm-4.hidden-xs > div > aside > div.hidden-sm.visible-md.visible-lg.title-sidebar__desktop > div.detail-infos > div > div:nth-child(3) > div.detail-infos__detail--values').text.strip()
    # 장르
    genre = driver.find_element_by_css_selector('#base > div.jw-info-box > div > div.col-sm-4.hidden-xs > div > aside > div.hidden-sm.visible-md.visible-lg.title-sidebar__desktop > div.detail-infos > div > div:nth-child(2) > div.detail-infos__detail--values').text.strip()
    # 스토리
    story = driver.find_element_by_css_selector('#base > div.jw-info-box > div > div.col-sm-8 > div:nth-child(2)').text.split('시놉시스')[1].split(f'{kr_title} 보기 -')[0]

    # 포스터 이미지 url
    origin_img_url = driver.find_element_by_css_selector('#base > div.jw-info-box > div > div.col-sm-4.hidden-xs > div > aside > div.hidden-sm.visible-md.visible-lg.title-sidebar__desktop > div.title-poster.title-poster--no-radius-bottom > picture > img').get_attribute('data-src')

    # 포스터 이미지 저장
    urllib.request.urlretrieve(origin_img_url, f'./crawling/img/{file_name}_Poster.jpg')

    # Netflix title에서 연령, 감독 가져오기

    driver.get(f'https://www.netflix.com/title/{netflix_id}')
    driver.implicitly_wait(2)
    sleep(1)
    
    print(f'Crawling content detail - {file_title} Netflix Title Page')

    # 감독 정보 받아오기
    try:
        for i in range(3,6):
            # director or creater 확인
            col = driver.find_element_by_css_selector(f'#appMountPoint > div > div > div:nth-child(1) > div.focus-trap-wrapper.previewModal--wrapper.detail-modal.has-smaller-buttons > div > div.previewModal--info > div > div:nth-child({i}) > div > div > div.about-container > div:nth-child(1) > span.previewModal--tags-label').text

            if 'Director' in col or 'Creators' in col:
                director = driver.find_element_by_css_selector(f'#appMountPoint > div > div > div:nth-child(1) > div.focus-trap-wrapper.previewModal--wrapper.detail-modal.has-smaller-buttons > div > div.previewModal--info > div > div:nth-child({i}) > div > div > div.about-container > div:nth-child(1)').text.split(':')[1].strip()

                crawling_age_rating = driver.find_element_by_css_selector(f'#appMountPoint > div > div > div:nth-child(1) > div.focus-trap-wrapper.previewModal--wrapper.detail-modal.has-smaller-buttons > div > div.previewModal--info > div > div:nth-child({i}) > div > div > div.about-container > div.maturity-rating-wrapper > div > div.maturity-rating.inline-rating > span').text.strip()

                break
    except:
        director = 'Null'
        crawling_age_rating = 'Null'    

    if 'All' in crawling_age_rating:
        age_rating = 'All'
    elif '12' in crawling_age_rating:
        age_rating = '12'
    elif '15' in crawling_age_rating:
        age_rating = '15'
    elif '18' in crawling_age_rating:
        age_rating = '18'
    else:
        age_rating = 'Null'

    # TODO 돌려보고 필요없으면 삭제 예쩡
    
    #appMountPoint > div > div > div:nth-child(1) > div.focus-trap-wrapper.previewModal--wrapper.detail-modal.has-smaller-buttons > div > div.previewModal--info > div > div:nth-child(4) > div > div > div.about-container > div:nth-child(1)

    #appMountPoint > div > div > div:nth-child(1) > div.focus-trap-wrapper.previewModal--wrapper.detail-modal.has-smaller-buttons > div > div.previewModal--info > div > div:nth-child(4) > div > div > div.about-container > div:nth-child(1)

    #appMountPoint > div > div > div:nth-child(1) > div.focus-trap-wrapper.previewModal--wrapper.detail-modal.has-smaller-buttons > div > div.previewModal--info > div > div:nth-child(4) > div > div > div.about-container > div.maturity-rating-wrapper > div > div.maturity-rating.inline-rating > span


    # # imdb에서 검색
    # driver.get(f'https://www.imdb.com/find?q={en_title} {release_year}&s=tt&ref_=fn_tt')
    # driver.implicitly_wait(2)
    # print(f'Crawling content detail - {file_title} IMDb Search Page')


    # for i in range(1,10):
    #     title = driver.find_element_by_css_selector(f'#main > div > div.findSection > table > tbody > tr:nth-child({i}) > td.result_text > a').text
    #     year = driver.find_element_by_css_selector(f'#main > div > div.findSection > table > tbody > tr:nth-child({i}) > td.result_text').text.replace(title, '')
    #     if release_year in year:
    #         imdb_detail_url = driver.find_element_by_css_selector(f'#main > div > div.findSection > table > tbody > tr:nth-child({i}) > td.result_text > a').get_attribute('href')
    #         break

    # # imdb 상세페이지에서 받아오기
    # driver.get(imdb_detail_url)
    # print(f'Crawling content detail - {file_title} IMDb Detail Page')
    # driver.implicitly_wait(2)

    # # 감독 정보 받아오기
    # director = driver.find_element_by_css_selector('#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > div > section > div > div.TitleMainBelowTheFoldGroup__TitleMainPrimaryGroup-sc-1vpywau-1.btXiqv.ipc-page-grid__item.ipc-page-grid__item--span-2 > section.ipc-page-section.ipc-page-section--base.StyledComponents__CastSection-y9ygcu-0.fswvJC.celwidget > ul > li:nth-child(1) > div > ul > li > a').text.strip()

    # # age rating
    # try:
    #     if episode:
    #         age_rating = driver.find_element_by_css_selector('#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.TitleBlock__Container-sc-1nlhx7j-0.hglRHk > div.TitleBlock__TitleContainer-sc-1nlhx7j-1.jxsVNt > div.TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2.hWHMKr > ul > li:nth-child(3) > a').text.strip()
    #     else :
    #         age_rating = driver.find_element_by_css_selector('#__next > main > div > section.ipc-page-background.ipc-page-background--base.TitlePage__StyledPageBackground-wzlr49-0.dDUGgO > section > div:nth-child(4) > section > section > div.TitleBlock__Container-sc-1nlhx7j-0.hglRHk > div.TitleBlock__TitleContainer-sc-1nlhx7j-1.jxsVNt > div.TitleBlock__TitleMetaDataContainer-sc-1nlhx7j-2.hWHMKr > ul > li:nth-child(2) > a').text.strip()
    # except:
    #     age_rating = 'Null'
    
    sleep(1)
    driver.quit()

    if episode:
        content_type = 2
    else:
        content_type = 1

    # 이미지 url 다시 설정
    origin_img_url = f'https://netflixschool-posters.s3.amazonaws.com/{file_name}.jpg'

    print(f'Crawling content detail - {file_title} crawling')

    return [file_title, netflix_id, content_type, kr_title, en_title, genre, age_rating, director, release_year, running_time, story, origin_img_url]