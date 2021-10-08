from flask import request
from flask_restx import Resource, Namespace, fields, reqparse
from netflixcool_server import db
from netflixcool_server.models import NetflixContent
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
