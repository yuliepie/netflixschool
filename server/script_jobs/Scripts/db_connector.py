import pymysql
import os
import sys
from dotenv import load_dotenv


def connect_to_db():
    load_dotenv()

    env_variables = {
        "DB_NAME": os.getenv("DATABASE_NAME"),
        "DB_HOST": os.getenv("DATABASE_HOST"),
        "DB_USER": os.getenv("DATABASE_USER"),
        "DB_PASSWORD": os.getenv("DATABASE_PASSWORD"),
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
