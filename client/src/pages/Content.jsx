// 영화 소개 페이지

import { content_detail } from "../components/Content/ContentData"

import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import WordCloud from "../components/Content/WordCloud";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding-top: 30px; */
  background-color: #020202;

  color: white;

`
const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 800px;
`
const Wrapper2 = styled.div`
  padding-top: 30px;
  min-width: 1000px;
  max-width: 1000px;
  justify-content: center;
  margin: 0 auto;
  align-items: center;

  dt, dd {
    font-size: 24px;
    margin-bottom: 10px;
  }
`
const Title = styled.div`
  font-size: 35px;
  display: flex;
  flex-direction: column;
`

const BackImage = styled.div`
  background-image: url(${content.img_path});
  background-size: cover;
  background-position:center center;
  background-color: black;    

  ::before {
  content: '';
  opacity: 0.7;
  position: absolute;
  top: 0px;
  left: 368px;
  right: 0px;
  bottom: -44px;
  background-color: #292929;
}
`

const DetailInfo = styled.div`

`

const ContentInfoWrapper = styled.div`
  display: flex;
  max-width: 1000px;
  min-width: 1000px;
  font-size: 1.3rem;
  height: 630px;
  padding-bottom: 100px;
`

const ContentInfo = styled.div`
  padding-top: 20px;
`

const EngInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: antiquewhite;
  color: black;
`

const EngInfo = styled.div`
  max-width: 800px;
  min-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 15%;
  font-size: 1.1rem;
  padding-bottom: 100px;

  h3 {
    font-size: 30px;
    margin-top: 10px;
    margin-bottom: 6px;
  }

  h4 {
    font-size: 27px;
    margin-top: 10px;
    margin-bottom: 6px;
  }

  dt, dd {
    font-size: 24px;
  }
`

export default function Content ({location}) {
  console.log('location content state',location.state)
  const [content, setContent] = useState("");

  useEffect(() => {
    const callContent = async () => {
      try {
        const response = await axios.get(
          `/api/content/${location.state}`
        );
        setContent(response.data);
        console.log(response.data)
      } catch (e) {
        console.log(e)
      }
    };
    callContent();
  }, [location]);


  return (
    <Container>
        <Wrapper1>
          <BackImage>
            <Wrapper2>
              <Title className='box_basic'>
                <h2 className='title_name_en'>{content.title_en}</h2>
                <h3 className='title_name_kr'>{content.title_kr}</h3>
              </Title>
              <ContentInfoWrapper>
                <DetailInfo className='box_basic'>
                  <div className="info_poster"><img src={content.img_path} alt='movie_poster' /></div>
                  <div className='info_content'>
                  <ContentInfo className='inner_content'>
                    <dl className='list_content'>
                      <dt>개봉연도</dt>
                      <dd>{content.release_year}</dd>
                    </dl>
                    <dl className='list_content'>
                      <dt>장르</dt>
                      <dd>{content.genre}</dd>
                    </dl>
                    <dl className='list_content'>
                      <dt>등급</dt>
                      <dd>{isNaN(content.age_rating) ?   "전체연령가" : `${content.age_rating} 세 이용가`}</dd>
                    </dl>
                    <dl className='list_content'>
                      <dt>감독</dt>
                      <dd>{content.director}</dd>
                    </dl>
                    <dl className='list_content'>
                      <dt>러닝타임</dt>
                      <dd>{content.running_time}</dd>
                    </dl>
                  </ContentInfo>
                  </div>
                </DetailInfo>
              </ContentInfoWrapper>
            </Wrapper2>
          </BackImage>
        </Wrapper1>
      <EngInfoWrapper>
        <EngInfo>
          <dl className='list_content'>
            <h3>영화 내용</h3>
            <dd>{content.story}</dd>
          </dl>
          <div>
            <h3>단어 난이도 : {content.word_difficulty_level}</h3>
            <h3>WPS : {content.words_per_second}</h3>
            <h3>종합 난이도 : {content.content_level} / 10</h3>
            <h4>영화에 나오는 중요 단어들</h4>
            {content.content_unique_words && <WordCloud 
              words={content.content_unique_words}
            />}
            <h4>영화에 나오는 대표 단어 및 예문</h4>
            {content_detail && content_detail.example.map ((example) => {
              return (
                <div className='word_content' key={example.id}>
                  <dt>{example.word}</dt>
                  <dd>{example.sentence}</dd>
                  <dd>{example.level}</dd>
                </div>
              )
            })}
          </div>
        </EngInfo>
      </EngInfoWrapper>
    </Container>
  )
}