import pandas as pd
from dotenv import load_dotenv
import sys

from Scripts import connect_to_db

"""
- content_word_levels 테이블에서 각 레벨별 count 값을 가져온 뒤 정규화 시키고 return
- return : 정규화된 DataFrame
"""


def recalculate_normalization(conn):

    # content_word_levels 테이블 전체 select
    select_cwl_query = "select id, content_id, level_1, level_2, level_3, level_4, level_5, level_6, level_7, level_8, level_9, level_10, level_11, level_12, level_13, level_14, level_15, wps from content_word_levels"
    cursor.execute(select_cwl_query)

    all_scripts_df = pd.DataFrame(cursor.fetchall())

    all_scripts_df = all_scripts_df.rename(
        columns={
            0: "id",
            1: "content_id",
            2: "level_1",
            3: "level_2",
            4: "level_3",
            5: "level_4",
            6: "level_5",
            7: "level_6",
            8: "level_7",
            9: "level_8",
            10: "level_9",
            11: "level_10",
            12: "level_11",
            13: "level_12",
            14: "level_13",
            15: "level_14",
            16: "level_15",
            17: "wps",
        }
    )

    # all_scripts_df = all_scripts_df.astype({"content_id": int})
    all_scripts_df.set_index("content_id", inplace=True)

    """
        각 level들과 wps 정규화
    """
    # 정규화할 DataFrame 생성
    normalization_level_df = all_scripts_df.copy()

    print(normalization_level_df)

    # all_scripts_df 에서 min, max 값을 가져오고, 각 레벨들 정규화
    normalization_level_df = (all_scripts_df - all_scripts_df.min()) / (
        all_scripts_df.max() - all_scripts_df.min()
    )

    normalization_level_df.fillna(0, inplace=True)

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
    level_7 = normalization_level_df["level_7"]
    level_8 = normalization_level_df["level_8"]
    level_9 = normalization_level_df["level_9"]
    level_10 = normalization_level_df["level_10"]
    level_11 = normalization_level_df["level_11"]
    level_12 = normalization_level_df["level_12"]
    level_13 = normalization_level_df["level_13"]
    level_14 = normalization_level_df["level_14"]
    level_15 = normalization_level_df["level_15"]
    normalization_level_df["level_score"] = (
        level_1
        + level_2
        + level_3
        + level_4
        + level_5
        + level_6
        + level_7
        + level_8
        + level_9
        + level_10
        + level_11
        + level_12
        + level_13
        + level_14
        + level_15
    )

    print(normalization_level_df)

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
                x["level_7"],
                x["level_8"],
                x["level_9"],
                x["level_10"],
                x["level_11"],
                x["level_12"],
                x["level_13"],
                x["level_14"],
                x["level_15"],
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
            "level_7",
            "level_8",
            "level_9",
            "level_10",
            "level_11",
            "level_12",
            "level_13",
            "level_14",
            "level_15",
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

    """
        word_difficulty_level, wps_level에 식 적용
        (10 * (word_difficulty_level + wps_level) + word_difficulty_level) * weight(0.10417)
        컬럼명 : content_level
    """

    def calculate_content_level(word_level, wps_level, weight):
        return ((10 * (word_level + wps_level)) + word_level) * weight

    normalization_level_df["content_level"] = normalization_level_df.apply(
        lambda x: calculate_content_level(x["word_level"], x["wps_level"], 0.05128),
        axis=1,
    )

    """
        netflix_contents 테이블 update
    """

    update_nc_query = """
        update 
            netflix_contents 
        set 
            word_difficulty_level = %s, 
            words_per_second = %s,
            content_level = %s
        where
            id = %s
    """
    for index, row in normalization_level_df.iterrows():
        id = int(index)
        word_level = row["word_level"]
        wps_level = row["wps_level"]
        content_level = row["content_level"]
        try:
            cursor.execute(update_nc_query, [word_level, wps_level, content_level, id])
        except Exception as e:
            print(row["content_id"])
            print(int(row["content_id"]))
            print(e)
            conn.rollback()
            cursor.close()
            conn.close()
            sys.exit(2)

    conn.commit()
    conn.close()

    print("Finished recalculating!")

    # return normalization_level_df


if __name__ == "__main__":
    conn = connect_to_db()
    cursor = conn.cursor()
    recalculate_normalization(conn)
