from netflixcool_server import db


class NetflixContent(db.Model):
    """
    Attributes:
        * type (int) : 어떤 종류 ('영화', '드라마', '다큐멘터리')
        * netflix_id (string) : 넷플릭스 작품 고유 id
        * title (string) : 작품 제목
        * title_kr (string) : 작품 제목 (한글)
        * title_en (string) : 작품 제목 (영문)
        * genre (string) : 장르
        * age_rating (sring) : 연령 등급
        * director (string) : 감독
        * release_year (String) : 개봉연도
        * running_time (string) : 러닝 타임
        * story (text) : 작품 줄거리
        * subs_path (string) : 작품 자막 데이터 경로
        * img_path (string) : 작품 대표 사진 경로
        * word_difficulty_level (int) : 작품 영단어 평균 난이도
        * words_per_second (float) : 작품 wps
        * content_level (int) : 작품 난이도
    """

    __tablename__ = "netflix_contents"

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    type = db.Column(db.Integer, db.ForeignKey("content_types.id"), nullable=False)
    netflix_id = db.Column(db.String(20))
    title = db.Column(db.String(100), nullable=False)
    title_kr = db.Column(db.String(100), nullable=False)
    title_en = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(200), nullable=False)
    age_rating = db.Column(db.String(10))
    director = db.Column(db.String(100))
    release_year = db.Column(db.Integer)
    running_time = db.Column(db.String(25))
    story = db.Column(db.Text)
    subs_path = db.Column(db.String(255), nullable=False)
    img_path = db.Column(db.String(255), nullable=False)
    word_difficulty_level = db.Column(db.Integer)
    words_per_second = db.Column(db.Float)
    content_level = db.Column(db.Integer, db.ForeignKey("content_levels.id"))

    sentences = db.relationship("Sentence", backref="netflix_content", lazy=True)


class Sentence(db.Model):
    """
    Attributes:
        * content_id (int) : 작품 id (F.K - netflixContents.id)
        * start (string) : 자막 시각 시간
        * sentence (string) : 문장
        * word (string) : 핵심 단어
        * level (int) : 핵심 단어 level

    """

    __tablename__ = "sentences"

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    content_id = db.Column(db.Integer, db.ForeignKey("netflix_contents.id"), nullable=False)
    start = db.Column(db.String(100), nullable=False)
    sentence = db.Column(db.String(255), nullable=False)
    word = db.Column(db.String(100), nullable=False)
    level = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "content_id": self.content_id,
            "start": self.start,
            "sentence": self.sentence,
            "word": self.word,
            "level": self.level,
        }


class TestQuestion(db.Model):
    """
    Attributes:
        * question (string) : 테스트 질문
        * file_path (string) : 질문 시 필요한 이미지 파일 등의 경로
        * type (int) : 테스트 유형 (OX, 객관식 등)
        * level (int) : 난이도
        * choice1 (string) : 보기 1
        * choice2 (string) : 보기 2
        * choice3 (string) : 보기 3
        * choice4 (string) : 보기 4
        * choice5 (string) : 보기 5
        * answer (int) : 테스트 정답

    """

    __tablename__ = "test_questions"

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    question = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(255), nullable=False)
    type = db.Column(db.Integer, nullable=False)
    level = db.Column(db.Integer, nullable=False)
    choice1 = db.Column(db.String(255))
    choice2 = db.Column(db.String(255))
    choice3 = db.Column(db.String(255))
    choice4 = db.Column(db.String(255))
    choice5 = db.Column(db.String(255))
    answer = db.Column(db.Integer, nullable=False)


class ContentType(db.Model):
    """
    Attributes:
        * name (string) : 타입의 종류 (영화, 드라마)
    """

    __tablename__ = "content_types"

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)


class ContentLevel(db.Model):
    """
    Attributes:
        * level (string) : 컨텐츠 종합 난이도 레벨의 종류 / 숫자로 해도되고 어떤 단어형태로도 가능/ 아직 미정
    """

    __tablename__ = "content_levels"

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    level = db.Column(db.String(255), nullable=False)

class ContentUniqueWord(db.Model):
    """
    Attributes:
        * content_id (int) : 작품 id (F.K - netflixContents.id)
        * word (string) : 단어
        * level (int) : 단어 레벨
        * frequency (int) : 단어 사용 횟수
        * hashtag (string) : 단어 카테고리
    """
    __tablename__ = "content_unique_words"

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    content_id = db.Column(db.Integer, db.ForeignKey("netflix_contents.id"), nullable=False)
    word = db.Column(db.String(50), nullable=False)
    level = db.Column(db.Integer, nullable=False)
    frequency = db.Column(db.Integer, nullable=False)
    hashtag = db.Column(db.String(50))

class ContentHashtag(db.Model):
    """
    Attributes:
        * content_id (int) : 작품 id (F.K - netflixContents.id)
        * hashtag (string) : 단어 카테고리
    """
    __tablename__ = "content_hashtags"

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    content_id = db.Column(db.Integer, db.ForeignKey("netflix_contents.id"), nullable=False)
    hashtag = db.Column(db.String(50), nullable=False)

class ContentWordLevel(db.Model):
    """
    Attributes:
        * content_id (int) : 작품 id (F.K - netflixContents.id)
        * level_1 ~ 6 (int) : 해당 작품에서 사용된 각 단어 레벨의 횟수
        * wps (float) : Words Per Second
    """
    __tablename__ = "content_word_levels"

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    content_id = db.Column(db.Integer, db.ForeignKey("netflix_contents.id"), nullable=False)
    level_1 = db.Column(db.Integer, nullable=False)
    level_2 = db.Column(db.Integer, nullable=False)
    level_3 = db.Column(db.Integer, nullable=False)
    level_4 = db.Column(db.Integer, nullable=False)
    level_5 = db.Column(db.Integer, nullable=False)
    level_6 = db.Column(db.Integer, nullable=False)
    wps = db.Column(db.Float, nullable=False)