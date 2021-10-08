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
load_dotenv()
env_variables = {
    "DB_NAME": os.getenv("DATABASE_NAME"),
    "DB_HOST": os.getenv("DATABASE_HOST"),
    "DB_USER": os.getenv("DATABASE_USER"),
    "DB_PORT": os.getenv("DATABASE_PORT"),
    "DB_PWD": os.getenv("DATABASE_PASSWORD"),
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

    db.init_app(app)  # SQLAlchemy 객체를 app 객체와 이어줍니다.
    db_migration.init_app(app, db)

    print("migration added")

    rest_api.init_app(app)

    from netflixcool_server.models import NetflixContent

    from .api.content import content_ns

    # from .api.intro import api as IntroApi
    # from .api.test import api as TestApi

    rest_api.add_namespace(content_ns)

    return app
