from flask import request
from flask_restx import Resource, Namespace, fields
from netflixcool_server.models import NetflixContent, TestQuestion
import random

test_ns = Namespace(name="test", description="영어 레벨 테스트 관련 api 리스트.")

test_answers = test_ns.model("test_answers", {"answers": fields.List(fields.Integer)})


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
    @test_ns.expect(test_answers)
    def post(self):
        data = request.get_json()
        answers = data.get("answers")

        # 정답 리스트로 알고리즘 연산 후 유저 레벨 도출
        randoms = [random.randint(1, 5) for _ in range(100)]
        result_level = random.choice(randoms)

        normal_contents = NetflixContent.query.filter_by(
            content_level=result_level
        ).all()
        normal_contents_details = [
            return_content_result(x) for x in random.sample(normal_contents, 5)
        ]

        hard_contents = NetflixContent.query.filter_by(
            content_level=result_level + 1
        ).all()
        hard_contents_details = [
            return_content_result(x) for x in random.sample(hard_contents, 5)
        ]

        result = {
            "user_level": result_level,
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
                    }
                )

        question_A_rand = random.sample(questions_A, 3)
        question_B_rand = random.sample(questions_B, 3)
        question_C_rand = random.sample(questions_C, 3)
        question_D_rand = random.sample(questions_D, 3)
        question_E_rand = random.sample(questions_E, 3)
        questions = question_A_rand + question_B_rand + question_C_rand + question_D_rand + question_E_rand

        return questions


