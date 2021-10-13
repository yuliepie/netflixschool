import boto3
import spacy
import pandas as pd


def initalize_resources():
    # S3
    s3 = boto3.client("s3")
    script_bucket = "netflixschool-script-csv"
    words_bucket = "netflixschool"

    nlp = spacy.load("en_core_web_sm")

    # =========================
    # 재료들 셋업
    # =========================

    # word list
    words_obj = s3.get_object(Bucket=words_bucket, Key="word_levels.csv")
    word_list_df = pd.read_csv(words_obj["Body"], index_col="Word")

    # lemmas
    lemmas_obj = s3.get_object(Bucket=words_bucket, Key="ex_lemmas.csv")
    lemmas_df = pd.read_csv(lemmas_obj["Body"], index_col="Word")

    lemmas_dict = {}
    for index, row in lemmas_df.iterrows():
        lemmas = row["Lemmas"].split(";")
        for lemma in lemmas:
            lemmas_dict[lemma] = str(index)

    # compound lemmas
    compound_lemmas_obj = s3.get_object(Bucket=words_bucket, Key="compound_lemmas.csv")
    compound_lemmas_df = pd.read_csv(compound_lemmas_obj["Body"], index_col="Word")

    compound_dict = {}
    for index, row in compound_lemmas_df.iterrows():
        lemmas = row["Lemmas"].split(";")
        for lemma in lemmas:
            compound_dict[lemma] = str(index)

    return {
        "s3": s3,
        "script_bucket": script_bucket,
        "nlp": nlp,
        "words_df": word_list_df,
        "lemmas_dict": lemmas_dict,
        "compound_dict": compound_dict,
    }
