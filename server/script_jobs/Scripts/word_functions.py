import boto3
import os
import pandas as pd

s3 = boto3.resource("s3")
bucket = "netflixschool"


def upload_word_file():
    words_path = os.path.abspath("script_jobs/csv_files/word_levels.csv")
    word_csv = open(words_path, "rb")
    try:
        s3.Bucket("netflixschool").put_object(
            Key="word_levels.csv", Body=word_csv, ContentType="text/csv"
        )
    except Exception as e:
        print(e)
    finally:
        word_csv.close()

    s3_client = boto3.client("s3")
    obj = s3_client.get_object(Bucket=bucket, Key="word_levels.csv")
    words_df = pd.read_csv(obj["Body"], index_col="Word")
    print(words_df)

    print(words_path)


def upload_lemmas_file():
    lemmas_path = os.path.abspath("script_jobs/csv_files/ex_lemmas.csv")
    lemmas_csv = open(lemmas_path, "rb")
    try:
        s3.Bucket("netflixschool").put_object(
            Key="ex_lemmas.csv", Body=lemmas_csv, ContentType="text/csv"
        )
    except Exception as e:
        print(e)
    finally:
        lemmas_csv.close()

    s3_client = boto3.client("s3")
    obj = s3_client.get_object(Bucket=bucket, Key="ex_lemmas.csv")
    lemmas_df = pd.read_csv(obj["Body"], index_col="Word")
    print(lemmas_df)


def upload_compound_lemmas_file():
    compound_lemmas = os.path.abspath("script_jobs/csv_files/compound_lemmas.csv")
    compound_lemmas_csv = open(compound_lemmas, "rb")
    try:
        s3.Bucket("netflixschool").put_object(
            Key="compound_lemmas.csv", Body=compound_lemmas_csv, ContentType="text/csv"
        )
    except Exception as e:
        print(e)
    finally:
        compound_lemmas_csv.close()

    s3_client = boto3.client("s3")
    obj = s3_client.get_object(Bucket=bucket, Key="compound_lemmas.csv")
    compound_lemmas_df = pd.read_csv(obj["Body"], index_col="Word")
    print(compound_lemmas_df)


if __name__ == "__main__":  # 프로그램의 시작점일 때만 아래 코드 실행
    upload_lemmas_file()
