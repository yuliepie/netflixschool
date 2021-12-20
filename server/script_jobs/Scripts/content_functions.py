import pandas as pd
import re
from nltk.corpus import wordnet
import requests
import sys


# ====================
# HELPERS
# ====================


def removeStopWordsSpacy(sentence, nlp):
    # Tokenize each sentence and add pos tag
    # If proper noun, pronoun, stopword delete from sentence.
    doc = nlp(sentence)
    valid_pos = ["ADJ", "ADV", "NOUN", "VERB"]
    valid_tokens = [str(token) for token in doc if token.pos_ in valid_pos]

    # remove words that contain special characters
    r = re.compile("[a-zA-Z]")
    valid_tokens_filtered = list(filter(r.match, valid_tokens))

    filtered = " ".join(valid_tokens_filtered)
    filtered = filtered.strip()
    return filtered


def hyphenateCompounds(sentence, compound_dict):
    sentence_hyphen = sentence
    for key, val in compound_dict.items():
        if key in sentence:
            sentence_hyphen = sentence_hyphen.replace(key, val)
    return sentence_hyphen


def convertToHeadForm(word, lemmas_dict, df_word_level):
    word = str(word)
    head = lemmas_dict.get(word)
    # If a lemma word, change to head word in word list
    if head:
        return head
    if word in df_word_level.index:
        return word
    else:
        # Check if adverb
        if word.endswith("ly"):
            if word[:-2] in df_word_level.index:
                return word[:-2]
            if word.endswith("ily"):
                if (word[:-3] + "y") in df_word_level.index:
                    return word[:-3] + "y"
            if word.endswith("ally"):
                if (word[:-4]) in df_word_level.index:
                    return word[:-4]
            if (word[:-2] + "e") in df_word_level.index:
                return word[:-2] + "e"
        return word


def check_word_type_api(word):
    headers = {"User-Agent": "Chrome/66.0.3359.181"}

    keyword = str(word)
    url = "https://wordtype.org/api/senses?term=" + keyword
    res = requests.get(url, headers=headers)
    if res.status_code != 200:
        print("API Status code not 200.")
        sys.exit(2)
    results = res.json()
    try:
        if len(results) == 0:
            return False
        # check if any word with correct pos & definition
        for item in results:
            if item["pos"] in ["interjection", "abbreviation"]:
                return False
        for item in results:
            if item["pos"] in ["noun", "verb", "adjective", "adverb"]:
                for sense in item["senses"]:
                    if (
                        sense["definition"] != ""
                        and sense["definition"] != "<missing sense definition>"
                    ):
                        return True
        if word.endswith("s"):
            return check_word_type_api(word[:-1])
        else:
            return False
    except Exception as e:
        print("Wordtype API Error")
        print(e)
        sys.exit(2)


def classify_unlevelled_words(unique_word_counts_df):
    levelled_df = unique_word_counts_df.copy()
    levelled_df = levelled_df[
        ~((levelled_df.index.str.len() < 4) & (levelled_df["word_level"].isnull()))
    ]
    nn_level = levelled_df[levelled_df["word_level"].isnull()]

    # First check with nltk synsets
    for index in nn_level.index:
        if len(wordnet.synsets(str(index))) > 0:
            levelled_df.loc[index, "word_level"] = 13
            # TODO: 필요하다면 최고 레벨 수정
    nn_level = levelled_df[levelled_df["word_level"].isnull()]

    # Then check with API
    for index in nn_level.index:
        if check_word_type_api(str(index)) == True:
            levelled_df.loc[index, "word_level"] = 6
    nn_level = levelled_df[levelled_df["word_level"].isnull()]

    # Remove remaining NaN words
    levelled_df = levelled_df.drop(nn_level.index)

    return levelled_df


# ===============================
# Exported content functions
# ===============================


def get_unique_word_counts_from_script(
    script, nlp, compound_dict, lemmas_dict, df_word_level
):
    spacey_df = script.copy()
    spacey_df["script"] = spacey_df["script"].apply(
        lambda x: removeStopWordsSpacy(x, nlp)
    )

    # Delete words with special characters
    spacey_df["script"] = spacey_df["script"].replace(
        to_replace="[^a-zA-Z ]", value="", regex=True
    )
    # to lowercase
    spacey_df["script"] = spacey_df["script"].str.lower()
    # drop empty rows
    spacey_df = spacey_df[spacey_df.script.str.len() > 0]

    spacey_df["script"] = spacey_df["script"].apply(
        lambda x: hyphenateCompounds(x, compound_dict)
    )

    content_word_list = spacey_df["script"].to_list()
    content_word_list = " ".join(content_word_list)
    content_word_list = content_word_list.split()

    df_script_words = pd.DataFrame(content_word_list)
    df_script_words.rename(columns={0: "word"}, inplace=True)

    df_script_words["word"] = df_script_words["word"].apply(
        lambda x: convertToHeadForm(x, lemmas_dict, df_word_level)
    )

    df_script_words_counts = (
        df_script_words.groupby(df_script_words["word"])
        .size()
        .reset_index(name="counts")
    )
    # df_script_words_counts.sort_values("counts", ascending=False, inplace=True)
    df_script_words_counts.set_index("word", inplace=True)

    return df_script_words_counts


def get_word_level_counts_for_content(content_id, df_unique_words, df_word_level):
    """
    unique_words_df를 받아 각 레벨별 단어들의 빈도수 df 반환
    """

    # word_level 컬럼 추가
    counts_df_headed_joined = df_unique_words.join(df_word_level[["word_level"]])

    # Todo: 해시태그 컬럼들 추가 할것

    # Level NaN인 단어들 유효성 검사 후 처리 (-1)
    df_unique_words_all_levelled = classify_unlevelled_words(counts_df_headed_joined)
    # print(df_unique_words_all_levelled)
    # word_level 별 counts의 합계 구하기
    result = (
        df_unique_words_all_levelled.drop("row_id", axis=1)
        .groupby("word_level")
        .sum("counts")
        .transpose()
    )

    result["content_id"] = content_id
    result = result.set_index("content_id")

    for i in range(1, 16):
        if i not in result.columns:
            result[i] = 0

    result = result.rename(
        columns={
            1: "level_1",
            2: "level_2",
            3: "level_3",
            4: "level_4",
            5: "level_5",
            6: "level_6",
            7: "level_7",
            8: "level_8",
            9: "level_9",
            10: "level_10",
            11: "level_11",
            12: "level_12",
            13: "level_13",
            14: "level_14",  # temp
            15: "level_15",
        }
    )

    return (df_unique_words_all_levelled, result)


def get_wps_running_time_for_content(content_id, script_csv):
    """
    작품 대본을 분석해서 대본의 러닝타임 가중치와 WPS 반환
    """
    # 자막이 재생되는 시간 계산
    script_csv["start"] = pd.to_datetime(script_csv["start"])
    script_csv["end"] = pd.to_datetime(script_csv["end"])

    script_csv["duration"] = script_csv["end"] - script_csv["start"]
    script_csv["duration"] = script_csv["duration"].astype("str")
    script_csv["duration"] = script_csv["duration"].str.split(" ").str[2]
    script_csv["duration"] = (
        script_csv["duration"].str.split(":").str[2].astype("float")
    )

    # 러닝 타임 (sec) 시간 계산
    start = 0
    full_running_time = 0
    for i in range(len(script_csv)):
        if i == len(script_csv) - 1:
            full_running_time += (
                script_csv["end"].loc[i] - script_csv["start"].loc[start]
            ).total_seconds()
            break
        if script_csv["end"].loc[i] > script_csv["end"].loc[i + 1]:
            full_running_time += (
                script_csv["end"].loc[i] - script_csv["start"].loc[start]
            ).total_seconds()
            start = i + 1
    running_time = full_running_time

    # 필요없는 컬럼 제거
    script_csv = script_csv.drop(columns=["start", "end"])

    # 단어의 개수 계산 (띄어쓰기 기준)
    script_csv["words_num"] = script_csv["script"].apply(lambda x: len(x.split(" ")))

    # 1초에 몇 개의 단어가 보여지는지 계산
    script_csv["wordsPerSec"] = script_csv["words_num"] / script_csv["duration"]
    script_csv["secPerWord"] = script_csv["duration"] / script_csv["words_num"]

    # 이상치 제거
    # 1. 1개의 단어로 된 문장 제거
    # 2. WPS 값이 0.5 이하인 문장 제거
    script_csv = script_csv[script_csv["words_num"] != 1]
    script_csv = script_csv[script_csv["wordsPerSec"] >= 0.5].sort_values("words_num")

    # result DF 만들기
    df_result = (
        script_csv["wordsPerSec"]
        .describe()
        .to_frame()
        .transpose()[["mean", "std", "min", "max"]]
    )
    df_result["content_id"] = content_id
    df_result["running_time(sec)"] = running_time
    df_result["weight"] = 3600 / running_time
    df_result = df_result.set_index("content_id")
    df_result = df_result.rename(
        columns={
            "mean": "WPS_mean",
            "std": "WPS_std",
            "min": "WPS_min",
            "max": "WPS_max",
        }
    )

    return df_result


# ========================
# 여기서부터 필요없음
# ========================
def normalize_and_calculate_level(all_scripts_df, level_weights):
    """
    작품의 레벨별 단어빈도수, WPS, 러닝타임 가중치, 단어난이도 가중치를 이용해
    레벨별 단어빈도수와 WPS의 표준화 진행 후 작품의 종합 난이도 도출.
    """
    normalized_df = normalize_level_WPS(all_scripts_df)
    level_calculated_df = calculate_level(normalized_df, level_weights)
    return level_calculated_df


def normalize_level_WPS(all_scripts_df):

    # level_1 ~ level_6까지 weight 적용
    df_calculated = all_scripts_df.copy()
    for i in range(1, 7):
        level = "level_" + str(i)
        df_calculated[level] = df_calculated[level] * df_calculated["weight"]

    # 정규화 Level
    df_calculated_level = df_calculated[
        ["level_1", "level_2", "level_3", "level_4", "level_5", "level_6"]
    ]
    df_normalization_level = (df_calculated_level - df_calculated_level.min()) / (
        df_calculated_level.max() - df_calculated_level.min()
    )

    # 정규화 WPS
    df_calculated_WPS = df_calculated[["WPS_mean"]]
    df_normalization_WPS = (df_calculated_WPS - df_calculated_WPS.min()) / (
        df_calculated_WPS.max() - df_calculated_WPS.min()
    )
    df_normalization_WPS = df_normalization_WPS.rename(
        columns={"WPS_mean": "WPS_mean_nlln"}
    )

    # DF 합치기
    df_result = df_normalization_level.join(
        all_scripts_df[["WPS_mean", "WPS_std", "WPS_min", "WPS_max"]]
    )
    df_result = df_result.join(df_normalization_WPS)

    return df_result


def calculate_level(df_normalize, _list):

    # level 별 가중치 계산
    df_result = df_normalize.copy()
    level_1 = df_result["level_1"] * _list[0]
    level_2 = df_result["level_2"] * _list[1]
    level_3 = df_result["level_3"] * _list[2]
    level_4 = df_result["level_4"] * _list[3]
    level_5 = df_result["level_5"] * _list[4]
    level_6 = df_result["level_6"] * _list[5]

    df_result["level_score"] = level_1 + level_2 + level_3 + level_4 + level_5 + level_6

    # WPS Score 계산
    df_result["wps_score"] = df_result["WPS_mean_nlln"] * _list[6]

    # Final Score 계산
    df_result["final_score"] = df_result["level_score"] + df_result["wps_score"]

    df_result["content_level"] = None

    level_1 = df_result.describe(percentiles=[0.2, 0.4, 0.6, 0.8])["final_score"]["20%"]
    level_2 = df_result.describe(percentiles=[0.2, 0.4, 0.6, 0.8])["final_score"]["40%"]
    level_3 = df_result.describe(percentiles=[0.2, 0.4, 0.6, 0.8])["final_score"]["60%"]
    level_4 = df_result.describe(percentiles=[0.2, 0.4, 0.6, 0.8])["final_score"]["80%"]

    df_result.loc[df_result["final_score"] < level_1, "content_level"] = 1
    df_result.loc[
        (level_1 <= df_result["final_score"]) & (df_result["final_score"] < level_2),
        "content_level",
    ] = 2
    df_result.loc[
        (level_2 <= df_result["final_score"]) & (df_result["final_score"] < level_3),
        "content_level",
    ] = 3
    df_result.loc[
        (level_3 <= df_result["final_score"]) & (df_result["final_score"] < level_4),
        "content_level",
    ] = 4
    df_result.loc[df_result["final_score"] >= level_4, "content_level"] = 5

    return df_result
