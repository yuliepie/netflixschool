import pymysql
import os
import sys
from dotenv import load_dotenv


def connect_to_db(db_ver=0):
    if db_ver == 0:
        db_ver = input("Select database: 1: LOCAL, 2: MASTER, 3: TEST")
        db_ver = int(db_ver)

    if db_ver not in [1, 2, 3]:
        print("Wrong DB number.")
        sys.quit(2)

    load_dotenv()

    db_name = os.getenv("DATABASE_NAME")
    db_host = os.getenv("DATABASE_HOST")
    db_user = os.getenv("DATABASE_USER")
    db_password = os.getenv("DATABASE_PASSWORD")

    if db_ver == 2:
        db_name = os.getenv("MASTER_DATABASE_NAME")
        db_host = os.getenv("MASTER_DATABASE_HOST")
        db_user = os.getenv("MASTER_DATABASE_USER")
        db_password = os.getenv("MASTER_DATABASE_PASSWORD")
    elif db_ver == 3:
        db_name = os.getenv("TEST_DATABASE_NAME")
        db_host = os.getenv("TEST_DATABASE_HOST")
        db_user = os.getenv("TEST_DATABASE_USER")
        db_password = os.getenv("TEST_DATABASE_PASSWORD")

    env_variables = {
        "DB_NAME": db_name,
        "DB_HOST": db_host,
        "DB_USER": db_user,
        "DB_PASSWORD": db_password,
    }

    # Check all required env variables are set.
    for key, val in env_variables.items():
        if env_variables[key] is None or env_variables[key] == "None":
            print("Not all required variables are set. Please double check.")
            sys.exit()
        else:
            print(f"{key} variable loaded.")

    # db 접속
    conn = pymysql.connect(
        host=env_variables["DB_HOST"],
        user=env_variables["DB_USER"],
        password=env_variables["DB_PASSWORD"],
        db=env_variables["DB_NAME"],
        charset="utf8",
    )

    return conn
