from flask import Blueprint, request, jsonify
from netflixcool_server import db
from netflixcool_server.models import *

bp = Blueprint('main_view', __name__)

@bp.route("/")
def index():
    return "Hello World!"
