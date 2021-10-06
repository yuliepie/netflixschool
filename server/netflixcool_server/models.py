from netflixcool_server import db

class netflixContents(db.Model):
    """
    Represents a user of the application.
    Attributes:
        * type (int) : 어떤 종류 ('영화', '드라마', '다큐멘터리')
        * title (string) : 작품 제목
        * genre (string) : 장르
        * age_rating (sring) : 연령 등급
        * director (string) : 감독
        * year (String) : 개봉연도
        * running_time (string) : 러닝 타임
        * story (text) : 작품 줄거리
        * subs_path (string) : 작품 자막 데이터 경로
        * img_path (string) : 작품 대표 사진 경로
        * avg_word_difficulty (int) : 작품 영단어 평균 난이도
        * avg_wps (float) : 작품 wps
        * content_level (int) : 작품 난이도
    """

    __tablename__ = "netflixContents"

    id                  = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    type                = db.Column(db.Integer, db.ForeignKey('contentTypes.id'), nullable=False) 
    title               = db.Column(db.String(100), nullable=False)
    genre               = db.Column(db.String(200), nullable=False)
    age_rating          = db.Column(db.String(10))
    director            = db.Column(db.String(100))
    release_year        = db.Column(db.String(5))
    running_time        = db.Column(db.String(25))
    story               = db.Column(db.Text)
    subs_path           = db.Column(db.String(255))
    img_path            = db.Column(db.String(255))
    avg_word_difficulty = db.Column(db.Integer, nullable=False) 
    avg_wps             = db.Column(db.Float, nullable=False) 
    content_level       = db.Column(db.Integer, db.ForeignKey('contentLevels.id'), nullable=False)


class sentences(db.Model):
    """
    Represents a user of the application.
    Attributes:
        * movie_id (int) : 작품 id (F.K - netflixContents.id)
        * sentence (string) : 문장
        * word (string) : 핵심 단어
        * level (int) : 핵심 단어 level

    """

    __tablename__ = "sentences"

    id          = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    content_id  = db.Column(db.Integer, db.ForeignKey('netflixContents.id'), nullable=False)
    sentence    = db.Column(db.String(255), nullable=False) 
    word        = db.Column(db.String(100), nullable=False)
    level       = db.Column(db.Integer, nullable=False) 


class testQuestions(db.Model):
    """
    Represents a user of the application.
    Attributes:
        * question (string) : 테스트 질문
        * type (int) : 테스트 유형 (OX, 객관식 등)
        * level (int) : 난이도
        * choice1 (string) : 보기 1
        * choice2 (string) : 보기 2
        * choice3 (string) : 보기 3
        * choice4 (string) : 보기 4
        * choice5 (string) : 보기 5
        * answer (int) : 테스트 정답

    """

    __tablename__ = "testQuestions"

    id          = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    question    = db.Column(db.String(255), nullable=False)
    file_path    = db.Column(db.String(255), nullable=False)
    type        = db.Column(db.Integer, nullable=False)
    level       = db.Column(db.Integer, nullable=False)
    choice1     = db.Column(db.String(255))
    choice2     = db.Column(db.String(255))
    choice3     = db.Column(db.String(255))
    choice4     = db.Column(db.String(255))
    choice5     = db.Column(db.String(255))
    answer      = db.Column(db.Integer, nullable=False)


class contentTypes(db.Model):
    """
    Represents a user of the application.
    Attributes:
        * name (string) : 타입의 종류 (영화, 드라마, 다큐멘터리 ...)
    """

    __tablename__ = "contentTypes"

    id          = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    name        = db.Column(db.String(255), nullable=False)


# class genres(db.Model):
#     """
#     Represents a user of the application.
#     Attributes:
#         * name (string) : 장르의 종류 (코믹, 호러, 액션 ...)
#     """

#     __tablename__ = "genres"

#     id          = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
#     name        = db.Column(db.String(255), nullable=False)


# class wordDifficultyLevels(db.Model):
#     """
#     Represents a user of the application.
#     Attributes:
#         * level (string) : 레벨의 종류 / 숫자로 해도되고 어떤 단어형태로도 가능/ 아직 미정
#     """

#     __tablename__ = "wordDifficultyLevels"

#     id          = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
#     level       = db.Column(db.String(255), nullable=False)


class contentLevels(db.Model):
    """
    Represents a user of the application.
    Attributes:
        * level (string) : 레벨의 종류 / 숫자로 해도되고 어떤 단어형태로도 가능/ 아직 미정
    """

    __tablename__ = "contentLevels"

    id          = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    level       = db.Column(db.String(255), nullable=False)