from flask import request
from flask_restx import Resource, Namespace, fields, reqparse
from netflixcool_server.models import NetflixContent, TestQuestion
import random
from netflixcool_server.level_sets import get_level_sets

test_ns = Namespace(name="test", description="영어 레벨 테스트 관련 api 리스트.")

content_fields = test_ns.model(
    "content",
    {
        "id": fields.Integer,
        "title_en": fields.String,
        "title_kr": fields.String,
        "img_path": fields.String,
    }
)

test_answer_fields = test_ns.model(
    "test_answer", 
    {
        "user_level": fields.String,
        "normal_content": fields.List(fields.Nested(content_fields)),
        "hard_content": fields.List(fields.Nested(content_fields))
    }
)

json_parser = test_ns.parser()
json_parser.add_argument('answers', type=list, location='json')

def return_content_result(content):
    return {
        "id": content.id,
        "title_en": content.title_en,
        "title_kr": content.title_kr,
        "img_path": content.img_path,
    }


@test_ns.route("/result")
@test_ns.response(200, "success")
class Test(Resource):
    """사용자에게 레벨 테스트 문제를 제공하고, 결과를 분석한 후 사용자의 영어 레벨과 추천 컨텐츠를 반환합니다."""

    @test_ns.doc("post_test_results")
    @test_ns.doc(parser=json_parser)
    @test_ns.expect(json_parser)
    @test_ns.marshal_with(test_answer_fields)
    def post(self):

        MAX_LEVEL = 5

        args = json_parser.parse_args()

        list_answers = args['answers']

        current_level = 0
        wrong_answers = 0
        isStop = False
        # 3개씩 나눠서 계산, 15번 문제까지 있다고 쳤을 때 range(1, 6)
        for i in range(1, MAX_LEVEL+1):
            list_temp = list_answers[(i*3)-3:i*3]   # {0:3}, {3:6}, ...
            wrong_answers = 0
            for answer in list_temp:
                if answer==False:
                    wrong_answers += 1
                    if wrong_answers == 2:
                        current_level = i
                        isStop = True
                        break
            if isStop:
                break
        # 걸러진 레벨이 없다면 모든 레벨을 통과한 것이므로 최고 레벨로.
        if current_level == 0:
            current_level = MAX_LEVEL
        
        levelsets = get_level_sets()
        minwordlevel = 1
        maxwordlevel = 15

        """ 현재 레벨 계산 """
        for levelset in levelsets:
            if current_level == levelset.level:
                minwordlevel = min(levelset.word_levels)
                maxwordlevel = max(levelset.word_levels)
        
        normal_contents = NetflixContent.query.filter(
            NetflixContent.word_difficulty_level.between(minwordlevel, maxwordlevel)
        ).all()
        # 결과가 5개가 안 되면 그대로 출력
        if len(normal_contents) < 5:
            normal_contents_details = [
                return_content_result(x) for x in normal_contents
            ]
        # 결과가 5개 이상이면 랜덤 5개 출력
        else:
            normal_contents_details = [
                return_content_result(x) for x in random.sample(normal_contents, 5)
            ]
        
        # 최고 레벨일 때 처리
        if current_level == MAX_LEVEL:
            next_level = current_level
        else:
            next_level = current_level + 1
        
        """ 다음 레벨 계산"""
        for levelset in levelsets:
            if next_level == levelset.level:
                minwordlevel = min(levelset.word_levels)
                maxwordlevel = max(levelset.word_levels)

        hard_contents = NetflixContent.query.filter(
            NetflixContent.word_difficulty_level.between(minwordlevel, maxwordlevel)
        ).all()
        # 결과가 5개가 안 되면 그대로 출력
        if len(hard_contents) < 5:
            hard_contents_details = [
                return_content_result(x) for x in hard_contents
            ]
        # 결과가 5개 이상이면 랜덤 5개 출력
        else:
            hard_contents_details = [
                return_content_result(x) for x in random.sample(hard_contents, 5)
            ]

        result = {
            "user_level": current_level,
            "normal_content": normal_contents_details,
            "hard_content": hard_contents_details,
        }

        return result


test_question_fields = test_ns.model(
    'test_question', {
        'id': fields.Integer,
        'question': fields.String,
        'file_path': fields.String,
        'type': fields.Integer,
        'level': fields.Integer,
        'choice': fields.List(fields.String),
        # 'choice1': fields.String,
        # 'choice2': fields.String,
        # 'choice3': fields.String,
        # 'choice4': fields.String,
        # 'choice5': fields.String,
        'answer': fields.Integer,
        'korean': fields.String
    }
)

@test_ns.route('/question')
@test_ns.response(200, 'success')
@test_ns.response(404, 'Questions not found')
class TestQuestions(Resource):
    """GET TEST_QUESTIONS API"""
    @test_ns.doc('GET Test Questions')
    @test_ns.marshal_with(test_question_fields, as_list=True)
    def get(self):  

        test_questions = TestQuestion.query.all()

        questions = []

        questions_A = []
        questions_B = []
        questions_C = []
        questions_D = []
        questions_E = []
        
        for question in test_questions:
            if question.level >= 1 and question.level <= 8:
                questions_A.append(
                    {
                        'id': question.id,
                        'question': question.question,
                        'type': question.type,
                        'file_path': question.file_path,
                        'level': question.level,
                        'choice': [question.choice1, question.choice2, question.choice3, question.choice4, question.choice5],
                        # 'choice1': question.choice1,
                        # 'choice2': question.choice2,
                        # 'choice3': question.choice3,
                        # 'choice4': question.choice4,
                        # 'choice5': question.choice5,
                        'answer': question.answer,
                        'korean': question.korean,
                    }
                )
            elif question.level == 9 or question.level == 10:
                questions_B.append(
                    {
                        'id': question.id,
                        'question': question.question,
                        'type': question.type,
                        'file_path': question.file_path,
                        'level': question.level,
                        'choice': [question.choice1, question.choice2, question.choice3, question.choice4, question.choice5],
                        # 'choice1': question.choice1,
                        # 'choice2': question.choice2,
                        # 'choice3': question.choice3,
                        # 'choice4': question.choice4,
                        # 'choice5': question.choice5,
                        'answer': question.answer,
                        'korean': question.korean,
                    }
                )
            elif question.level == 11:
                questions_C.append(
                    {
                        'id': question.id,
                        'question': question.question,
                        'type': question.type,
                        'file_path': question.file_path,
                        'level': question.level,
                        'choice': [question.choice1, question.choice2, question.choice3, question.choice4, question.choice5],
                        # 'choice1': question.choice1,
                        # 'choice2': question.choice2,
                        # 'choice3': question.choice3,
                        # 'choice4': question.choice4,
                        # 'choice5': question.choice5,
                        'answer': question.answer,
                        'korean': question.korean,
                    }
                )
            elif question.level == 12:
                questions_D.append(
                    {
                        'id': question.id,
                        'question': question.question,
                        'type': question.type,
                        'file_path': question.file_path,
                        'level': question.level,
                        'choice': [question.choice1, question.choice2, question.choice3, question.choice4, question.choice5],
                        # 'choice1': question.choice1,
                        # 'choice2': question.choice2,
                        # 'choice3': question.choice3,
                        # 'choice4': question.choice4,
                        # 'choice5': question.choice5,
                        'answer': question.answer,
                        'korean': question.korean,
                    }
                )
            elif question.level == 13 or question.level == 15:
                questions_E.append(
                    {
                        'id': question.id,
                        'question': question.question,
                        'type': question.type,
                        'file_path': question.file_path,
                        'level': question.level,
                        'choice': [question.choice1, question.choice2, question.choice3, question.choice4, question.choice5],
                        # 'choice1': question.choice1,
                        # 'choice2': question.choice2,
                        # 'choice3': question.choice3,
                        # 'choice4': question.choice4,
                        # 'choice5': question.choice5,
                        'answer': question.answer,
                        'korean': question.korean,
                    }
                )

        question_A_rand = random.sample(questions_A, 3)
        question_B_rand = random.sample(questions_B, 3)
        question_C_rand = random.sample(questions_C, 3)
        question_D_rand = random.sample(questions_D, 3)
        question_E_rand = random.sample(questions_E, 3)
        questions = question_A_rand + question_B_rand + question_C_rand + question_D_rand + question_E_rand

        return questions


