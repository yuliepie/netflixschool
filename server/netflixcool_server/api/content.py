from flask_restx import Resource, Namespace, fields, reqparse
from netflixcool_server import db
from netflixcool_server.models import *

content_ns = Namespace(
    name="content",
    description="하나의 Netflix Contents 정보를 가져오는 netflixContent. ",
)

sentences_fields = content_ns.model(
    "sentences",
    {
        "id": fields.Integer,
        "sentence": fields.String,
        "word": fields.String,
        "level": fields.Integer,
    },
)

netflix_contents_fields = content_ns.model(
    "netflix_contents",
    {
        "netflix_id": fields.String,
        "type": fields.Integer,
        "title": fields.String,
        "title_kr": fields.String,
        "title_en": fields.String,
        "genre": fields.String,
        "age_rating": fields.String,
        "director": fields.String,
        "release_year": fields.Integer,
        "running_time": fields.String,
        "story": fields.String,
        "subs_path": fields.String,
        "img_path": fields.String,
        "words_difficulty_level": fields.Integer,
        "words_per_second": fields.Float,
        "content_level": fields.Integer,
        "examples": fields.List(fields.Nested(sentences_fields)),
    },
)


@content_ns.route("/<int:content_id>")
@content_ns.param("content_id", "The content idenifier")
@content_ns.response(200, "success")
@content_ns.response(404, "Content not found")
class Content(Resource):
    """Netflix Contents 정보를 가져옵니다."""

    @content_ns.doc("GET Netflix Content")
    @content_ns.marshal_with(netflix_contents_fields)
    def get(self, content_id):

        netflix_content = NetflixContent.query.filter(
            NetflixContent.id == content_id
        ).one()
        sentences = Sentence.query.filter(Sentence.content_id == content_id).all()
        examples = []
        for row in sentences:
            examples.append(
                {
                    "id": row.id,
                    "sentence": row.sentence,
                    "word": row.word,
                    "level": row.level,
                }
            )

        netflix_content_dict = {
            "netflix_id": netflix_content.netflix_id,
            "type": netflix_content.type,
            "title": netflix_content.title,
            "title_kr": netflix_content.title_kr,
            "title_en": netflix_content.title_en,
            "genre": netflix_content.genre,
            "age_rating": netflix_content.age_rating,
            "director": netflix_content.director,
            "release_year": netflix_content.release_year,
            "running_time": netflix_content.running_time,
            "story": netflix_content.story,
            "subs_path": netflix_content.subs_path,
            "img_path": netflix_content.img_path,
            "word_difficulty_level": netflix_content.word_difficulty_level,
            "words_per_second": netflix_content.words_per_second,
            "content_level": netflix_content.content_level,
            "examples": examples,
        }

        return netflix_content_dict
