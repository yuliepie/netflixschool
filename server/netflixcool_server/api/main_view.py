from flask import Blueprint, request, jsonify
from netflixcool_server import db
from netflixcool_server.models import netflixContents

bp = Blueprint('main_view', __name__)

@bp.route("/")
def index():
    sample = netflixContents()
    return "Hello World!"
