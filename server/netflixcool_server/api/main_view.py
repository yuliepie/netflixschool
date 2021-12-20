from flask import Blueprint, request, jsonify
from flask_restx import Resource, Namespace
from netflixcool_server import db
from netflixcool_server.models import *

# bp = Blueprint('main_view', __name__)

# @bp.route("/")
# def index(Resource):
#     return "Hello World!"
Home = Namespace('Home')
@Home.route('/')
class HelloWorld(Resource):
    def get(self):
        return {'hello':'world'}