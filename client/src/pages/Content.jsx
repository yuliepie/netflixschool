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
  padding-top: 30px;
  background-color: #020202;
  color: white;
`

const Title = styled.div`
  font-size: 1.5rem;

`

const DetailInfo = styled.div`

`
const ContentInfoWrapper = styled.div`
  display: flex;
  max-width: 1000px;
  min-width: 1000px;
  font-size: 1.3rem;
  height: 650px;
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
  margin-left: 130px;
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  min-width: 1000px;
  font-size: 1.1rem;

  h3, h4 {
    margin-top: 10px;
    margin-bottom: 6px;
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
      <Title className='detail_title'>
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
            <h4>영화에 나오는 대표 단어 및 예문</h4>
            {content && content.example.map ((example) => {
              return (
                <div className='word_content' key={example.id}>
                  <dt>{example.word}</dt>
                  <dd>{example.sentence}</dd>
                  <dd>{example.level}</dd>
                </div>
              )
            })}
            <h4>content_unique_words</h4>
            {content && content.content_unique_words.map ((content_unique_word) => {
              return (
                <div className='word_content' key={content.id}>
                  <dt>{content.text}</dt>
                  <dd>{content.value}</dd>
                </div>
              )
            })}
            <WordCloud 
              words={content.content_unique_words}
            />
          </div>
        </EngInfo>
      </EngInfoWrapper>
    </Container>
  )
}