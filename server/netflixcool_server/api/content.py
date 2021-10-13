from flask import request
from flask_restx import Resource, Namespace, fields, reqparse
from netflixcool_server.models import NetflixContent, Sentence, ContentUniqueWord
from sqlalchemy import and_
import random

content_ns = Namespace(
    name="content",
    description="Netflix Contents 정보를 가져오는 API.",
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

content_unique_words_fields = content_ns.model(
    "content_unique_words",
    {
        "id": fields.Integer,
        "word": fields.String,
        "frequency": fields.Integer
    }
)

netflix_contents_fields = content_ns.model(
    "netflix_contents",
    {
        "id": fields.Integer,
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
        "img_path": fields.String,
        "words_difficulty_level": fields.Integer,
        "words_per_second": fields.Float,
        "content_level": fields.Integer,
        "sentences": fields.List(fields.Nested(sentences_fields)),
        "content_unique_words": fields.List(fields.Nested(content_unique_words_fields))
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

        # netflix_contents 테이블 select
        netflix_content = NetflixContent.query.filter(
            NetflixContent.id == content_id
        ).one()

        content_level = netflix_content.content_level
        # sentences 테이블 select
        filtered_sentences = Sentence.query.filter(and_(Sentence.content_id == content_id, Sentence.level == content_level)).all()
        sentences = []
        for row in filtered_sentences:
            sentences.append(
                {
                    "id": row.id,
                    "sentence": row.sentence,
                    "word": row.word,
                    "level": row.level,
                }
            )
        # 문장이 3단어 이상으로 된 것만 추출
        new_sentences = [row for row in sentences if len(row['sentence'].split(' ')) >= 3]
        
        # 문장이 3단어 이상인 데이터가 5개가 안 되면 가져온 데이터 그대로 사용
        if len(new_sentences) >= 5:
            sentences = new_sentences

        # sentences 리스트 shuffle하고 상위 5개 출력
        random.shuffle(sentences)
        sentences = sentences[:5]

        # filtered_unique_words 테이블 select
        """
            TODO Word Cloud 그릴 때 level 몇 부터 필터링 할 지 결정 (1부터 하면 1레벨 단어들이 매우 큰 범위를 차지할 것 같음)
        """
        filtered_unique_words = ContentUniqueWord.query.filter(and_(ContentUniqueWord.content_id == content_id, ContentUniqueWord.level >= 2)).all()
        content_unique_words = []
        for row in filtered_unique_words:
            content_unique_words.append(
                {
                    "id": row.id,
                    "word": row.word,
                    "frequency": row.frequency
                }
            )

        netflix_content_dict = {
            "id": netflix_content.id,
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
            "img_path": netflix_content.img_path,
            "word_difficulty_level": netflix_content.word_difficulty_level,
            "words_per_second": netflix_content.words_per_second,
            "content_level": netflix_content.content_level,
            "sentences": sentences,
            "content_unique_words": content_unique_words
        }

        return netflix_content_dict



ranked_content_fields = content_ns.model(
    "ranked_content",
    {
        "id": fields.Integer,
        "title": fields.String,
        "title_en": fields.String,
        "title_kr": fields.String,
        "img_path": fields.String,
        "word_difficulty_level": fields.Integer,
        "words_per_second": fields.Float,
        "content_level": fields.Integer
    }
)

ranked_contents_fields = content_ns.model(
    "ranked_contents",
    {
        "contents_max_count": fields.Integer,
        "ranked_contents": fields.List(fields.Nested(ranked_content_fields))
    }
)

parser = reqparse.RequestParser()
parser.add_argument('offset', type=int)
parser.add_argument('limit', type=int)
parser.add_argument('sorting', type=int)
parser.add_argument('minlevel', type=int)
parser.add_argument('maxlevel', type=int)

# @content_ns.route("/<int:offset>/<int:limit>/<int:sorting>")
@content_ns.route("")
@content_ns.doc(params={
    'offset': 'start row',
    'limit': 'number of rows to return',
    'sorting': 'data sorting, 0: ascending, 1: decending',
    'minlevel': 'min level for filtering',
    'maxlevel': 'max level for filtering'
})
@content_ns.response(200, "success")
@content_ns.response(404, "Contents not found")
class Contents(Resource):
    """랭킹 피드에 보여줄 Netflix Contents 정보(List) 가져옵니다."""

    @content_ns.doc("GET Ranked Netflix Contents")
    @content_ns.marshal_with(ranked_contents_fields)
    @content_ns.expect(parser)
    def get(self):

        offset = int(request.args.get('offset'))
        limit = int(request.args.get('limit'))
        sorting = int(request.args.get('sorting'))
        minlevel = int(request.args.get('minlevel'))
        maxlevel = int(request.args.get('maxlevel'))

        # netflix_contents 테이블 select
        filtered_netflix_contents = NetflixContent.query.filter(NetflixContent.content_level.between(minlevel, maxlevel))
        if sorting == 0:
            ordered_netflix_contents = filtered_netflix_contents.order_by(NetflixContent.content_level.asc())
            print('asc')
        else:
            ordered_netflix_contents = filtered_netflix_contents.order_by(NetflixContent.content_level.desc())
            print('desc')
        limited_netflix_contents = ordered_netflix_contents.offset(offset).limit(limit)

        # netflix_contents 테이블에서 필터링된 row 개수 select
        contents_max_count = filtered_netflix_contents.count()
        
        netflix_contents = []
        for row in limited_netflix_contents:
            netflix_contents.append(
                {
                    "id": row.id,
                    "title": row.title,
                    "title_en": row.title_en,
                    "title_kr": row.title_kr,
                    "img_path": row.img_path,
                    "word_difficulty_level": row.word_difficulty_level,
                    "words_per_second": row.words_per_second,
                    "content_level": row.content_level
                }
            )
        
        ranked_contents = {
            "contents_max_count": contents_max_count,
            "ranked_contents": netflix_contents
        }

        return ranked_contents



