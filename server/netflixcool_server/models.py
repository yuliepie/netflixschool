from netflixcool_server import db

class netflixContents(db.Model):
    """
    Represents a user of the application.
    Attributes:
        * netflix_id (int) : 작품별 넷플릭스에서 사용하는 id
        * type (int) : 어떤 종류 ('영화', '드라마', '다큐멘터리')
        * title (string) : 작품 제목
        * genre (int) : 장르 선택 (다중으로 해야하나?)
        * running_time (string) : 러닝 타임
        * story (text) : 작품 줄거리
        * subs_path (string) : 작품 자막 데이터 경로
        * img_path (string) : 작품 대표 사진 경로
        * avg_word_difficulty (int) : 작품 영단어 평균 난이도
        * avg_wps (float) : 작품 wps
        * content_level (int) : 작품 난이도
    """

    __tablename__ = "netflix_contents"

    id                  = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    netflix_id          = db.Column(db.Integer, nullable=False, unique=True)  # netflix id must be unique
    type                = db.Column(db.Integer, nullable=False) 
    title               = db.Column(db.String(100), nullable=False)
    genre               = db.Column(db.Integer, nullable=False) 
    running_time        = db.Column(db.String(25))
    story               = db.Column(db.Text)
    subs_path           = db.Column(db.String(100), nullable=False)
    img_path            = db.Column(db.String(100), nullable=False)
    avg_word_difficulty = db.Column(db.Integer, nullable=False) 
    avg_wps             = db.Column(db.Float, nullable=False) 
    content_level       = db.Column(db.Integer, nullable=False) 

