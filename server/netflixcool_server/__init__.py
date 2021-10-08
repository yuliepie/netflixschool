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

    api = Api(
        app,
        version='1.0',
        title="Netflix School's API Server",
        description="Netflix School's API Server",
        terms_url="/",
        contact="elice"
    )

    from .api.main_view import Home
    from .api.content import api as NetflixContentApi
    # from .api.intro import api as IntroApi
    # from .api.test import api as TestApi
    from netflixcool_server.models import NetflixContent

    # app.register_blueprint(main_view.bp)
    api.add_namespace(Home, "/home")
    api.add_namespace(NetflixContentApi, "/content/<int:content_id>")
    api.add_namespace()
    return app
