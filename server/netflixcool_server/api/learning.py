from flask_restx import Resource, Namespace, fields
from netflixcool_server.models import TestQuestion, Sentence, NetflixContent
from  sqlalchemy.sql.expression import func
from datetime import date
from netflixcool_server.level_sets import get_level_sets

learning_ns = Namespace(
    name="learning",
    description="오늘의 예제 문장, 퀴즈를 보내주는 API"
)

learning_fields = learning_ns.model(
    "learning",
    {
        "level": fields.Integer,
        "sentence_id": fields.Integer,
        "title_en": fields.String,
        "title_kr": fields.String,
        "img_path": fields.String,
        "sentence": fields.String,
        "word": fields.String,
        "question_id": fields.Integer,
        "question": fields.String,
        "file_path": fields.String,
        "type": fields.Integer,
        "choices": fields.List(fields.String),
        "answer": fields.Integer
    }
)

@learning_ns.route("")
@learning_ns.response(200, "success")
@learning_ns.response(404, "Sentence or Question not found")
class Learning(Resource):
    """각 레벨 별 오늘의 예제 문장과 오늘의 퀴즈를 가져옵니다."""

    @learning_ns.doc("GET Today's Sentence & Qestion")
    @learning_ns.marshal_with(learning_fields)
    def get(self):

        # 각 레벨 별 예제 문장(sentences 테이블)과 퀴즈(test_questions 테이블) select
        learning = []
        # 오늘 날짜를 seed로 설정
        """
            TODO 하룻동안 동일한 값을 return하는 방법 구상
        """
        # func.setseed(int(date.today().strftime('%Y%m%d')))
        
        levelsets = get_level_sets()

        level = 0
        for levelset in levelsets:
            minwordlevel = min(levelset.word_levels)
            maxwordlevel = max(levelset.word_levels)
            level += 1
            sentence = Sentence.query.filter(Sentence.level.between(minwordlevel, maxwordlevel)).order_by(func.rand()).first()
            question = TestQuestion.query.filter(TestQuestion.level.between(minwordlevel, maxwordlevel)).order_by(func.rand()).first()
            content = NetflixContent.query.filter(NetflixContent.id == sentence.content_id).one()
            # print(int(date.today().strftime('%Y%m%d')))
            
            learning.append(
                {
                    "level": level,
                    "sentence_id": sentence.id,
                    "title_en": content.title_en,
                    "title_kr": content.title_kr,
                    "img_path": content.img_path,
                    "sentence": sentence.sentence,
                    "word": sentence.word,
                    "question_id": question.id,
                    "question": question.question,
                    "file_path": question.file_path,
                    "type": question.type,
                    "choices": [
                        str(question.choice1).strip(), str(question.choice2).strip(), str(question.choice3).strip(),
                        str(question.choice4).strip(), str(question.choice5).strip()],
                    "answer": question.answer
                }
            )
            
        return learning



# import get_level_sets()

# levels = get_level_sets()

# levels[0].label
# levels[0].rank
# levels[0].word_levels

# netflix_conetns에서 word_difficulty_level 불러오고
# sentence에서 word_difficulty_level 문장 꺼내서 보내기