from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restx import Api

# from flask_cors import CORS
import os
import sys
from dotenv import load_dotenv

# =======================================
# Load & Check environment variables
# =======================================
db_ver = 0
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
db_port = os.getenv("DATABASE_PORT")

if db_ver == 2:
    db_name = os.getenv("MASTER_DATABASE_NAME")
    db_host = os.getenv("MASTER_DATABASE_HOST")
    db_user = os.getenv("MASTER_DATABASE_USER")
    db_password = os.getenv("MASTER_DATABASE_PASSWORD")
    db_port = os.getenv("MASTER_DATABASE_PORT")
elif db_ver == 3:
    db_name = os.getenv("TEST_DATABASE_NAME")
    db_host = os.getenv("TEST_DATABASE_HOST")
    db_user = os.getenv("TEST_DATABASE_USER")
    db_password = os.getenv("TEST_DATABASE_PASSWORD")
    db_port = os.getenv("TEST_DATABASE_PORT")

env_variables = {
    "DB_NAME": db_name,
    "DB_HOST": db_host,
    "DB_USER": db_user,
    "DB_PWD": db_password,
    "DB_PORT": db_port,
}

# Check all required env variables are set.
for key, val in env_variables.items():
    if env_variables[key] is None or env_variables[key] == "None":
        print("Not all required variables are set. Please double check.")
        sys.exit()
    else:
        print(f"{key} variable loaded.")

# =======================================
# To be initialized with Flask App.
# =======================================
db = SQLAlchemy()
db_migration = Migrate()

rest_api = Api(
    version="1.0",
    title="Netflix School's API Server",
    description="Netflix School's API Server",
    terms_url="/",
    contact="elice",
)


# ========================
# Initialize Flask App
# ========================
def create_app():

    app = Flask(__name__)
    # CORS(app)
    print(env_variables["DB_PORT"])
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{env_variables['DB_USER']}:{env_variables['DB_PWD']}@{env_variables['DB_HOST']}:{env_variables['DB_PORT']}/{env_variables['DB_NAME']}"

    # Configure Database
    app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    # app.config["APPLICATION_ROOT"] = "/api"

    db.init_app(app)  # SQLAlchemy 객체를 app 객체와 이어줍니다.
    db_migration.init_app(app, db)

    print("migration added")

    rest_api.init_app(app)

    from netflixcool_server.models import NetflixContent

    from .api.content import content_ns
    from .api.test import test_ns
    from .api.learning import learning_ns

    # from .api.intro import api as IntroApi

    rest_api.add_namespace(content_ns, "/api/content")
    rest_api.add_namespace(test_ns, "/api/test")
    rest_api.add_namespace(learning_ns, "/api/learning")

    return app
