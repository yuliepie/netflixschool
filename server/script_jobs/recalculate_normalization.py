import pandas as pd
from dotenv import load_dotenv

from Scripts import (
    connect_to_db,
)

"""
- content_word_levels 테이블에서 각 레벨별 count 값을 가져온 뒤 정규화 시키고 return
- return : 정규화된 DataFrame
"""
conn = connect_to_db()
cursor = conn.cursor()


def recalculate_normalization(conn):

    # content_word_levels 테이블 전체 select
    select_cwl_query = "select * from content_word_levels"
    cursor.execute(select_cwl_query)

    all_scripts_df = pd.DataFrame(cursor.fetchall())
    all_scripts_df.set_index("title", inplace=True)
    """
        각 level들과 wps 정규화
    """
    # 정규화할 DataFrame 생성
    normalization_level_df = all_scripts_df.copy()

    # all_scripts_df 에서 min, max 값을 가져오고, 각 레벨들 정규화
    normalization_level_df = (all_scripts_df - all_scripts_df.min()) / (
        all_scripts_df.max() - all_scripts_df.min()
    )

    # """
    #     각 level들 정규화
    # """
    # # content_word_levels 테이블에서 각 레벨의 min, max 값을 가져옴
    # level_list = []
    # for i in range(1, 7):
    #     level_minmax_query = f'select min(level_{i}), max(level_{i}) from content_word_levels'
    #     cursor.execute(level_minmax_query)
    #     level_list.append(list(cursor.fetchone()))

    # # 각 레벨들 정규화
    # # (x - x_min) / (x_max - x_min)
    # normalization_level_df['level_1'] = (all_scripts_df['level_1'] - level_list[0][0]) / (level_list[0][1] - level_list[0][0])
    # normalization_level_df['level_2'] = (all_scripts_df['level_2'] - level_list[1][0]) / (level_list[1][1] - level_list[1][0])
    # normalization_level_df['level_3'] = (all_scripts_df['level_3'] - level_list[2][0]) / (level_list[2][1] - level_list[2][0])
    # normalization_level_df['level_4'] = (all_scripts_df['level_4'] - level_list[3][0]) / (level_list[3][1] - level_list[3][0])
    # normalization_level_df['level_5'] = (all_scripts_df['level_5'] - level_list[4][0]) / (level_list[4][1] - level_list[4][0])
    # normalization_level_df['level_6'] = (all_scripts_df['level_6'] - level_list[5][0]) / (level_list[5][1] - level_list[5][0])

    # """
    #     WPS 정규화
    # """
    # # content_word_levels 테이블에서 WPS의 min, max 값을 가져옴
    # wps_minmax_query = f'select min(wps), max(wps) from content_word_levels'
    # cursor.execute(wps_minmax_query)

    # wps_minmax = list(cursor.fetchone())

    # # print(wps_minmax) # min, max 확인용 print 코드

    # # WPS 정규화
    # normalization_level_df['wps'] = (all_scripts_df['wps'] - wps_minmax[0]) / (wps_minmax[1] - wps_minmax[0])

    """
        모든 레벨 합의 80% 값 계산 및 레벨 분류
        컬럼명 : word_level
    """
    level_1 = normalization_level_df["level_1"]
    level_2 = normalization_level_df["level_2"]
    level_3 = normalization_level_df["level_3"]
    level_4 = normalization_level_df["level_4"]
    level_5 = normalization_level_df["level_5"]
    level_6 = normalization_level_df["level_6"]
    normalization_level_df["level_score"] = (
        level_1 + level_2 + level_3 + level_4 + level_5 + level_6
    )

    normalization_level_df["80%"] = normalization_level_df["level_score"] * 0.8

    def level_result(_list, percentile):
        sum_after = 0
        level = 1
        for current_level in _list:
            sum_before = sum_after  # 다음 레벨을 더하기 전의 누적 합계
            sum_after += current_level
            if sum_after > percentile:
                break
            level += 1

        # 80% 값 위치를 반올림 처리해서 레벨 계산
        if percentile - sum_before < sum_after - percentile:
            level -= 1
        return level

    normalization_level_df["word_level"] = normalization_level_df.apply(
        lambda x: level_result(
            [
                x["level_1"],
                x["level_2"],
                x["level_3"],
                x["level_4"],
                x["level_5"],
                x["level_6"],
            ],
            x["80%"],
        ),
        axis=1,
    )

    # 계산에 사용된 컬럼들 삭제
    normalization_level_df.drop(
        columns=[
            "level_1",
            "level_2",
            "level_3",
            "level_4",
            "level_5",
            "level_6",
            "level_score",
            "80%",
        ],
        inplace=True,
    )

    """
        WPS 레벨 분류
        컬럼명 : wps_level
    """
    # WPS 값을 3레벨로 분류
    def wps_result(wps):
        if wps <= 0.33:
            level = 1
        elif wps <= 0.66:
            level = 2
        else:
            level = 3

        return level

    normalization_level_df["wps_level"] = normalization_level_df.apply(
        lambda x: wps_result(x["wps"]), axis=1
    )

    # 계산에 사용된 컬럼들 삭제
    normalization_level_df.drop(columns=["wps"], inplace=True)

    """
        netflix_contents 테이블 update
    """

    update_nc_query = """
        update 
            netflix_content 
        set 
            word_diffiiculty_level = %s, 
            words_per_second = %s 
        where
            id = %s
    """
    for row in normalization_level_df:
        id = row["content_id"]
        word_level = row["word_level"]
        wps_level = row["wps_level"]
        cursor.execute(update_nc_query, [word_level, wps_level, id])

    conn.commit()
    conn.close()

    return normalization_level_df


if __name__ == "__main__":  # 프로그램의 시작점일 때만 아래 코드 실행

    df = pd.read_csv("../../data_preprocessing/script/csv_files/all_scripts.csv")
    result = recalculate_normalization(conn)

    print(result)
