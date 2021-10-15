// 영화 소개 페이지

import { content_detail } from '../components/Content/ContentData';
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import WordCloud from "../components/Content/WordCloud";
import {SiSpeedtest} from 'react-icons/si';
import {IoPodiumOutline,IoBookmarksSharp} from 'react-icons/io5';
import SentenceForm from '../components/Content/SentenceForm';

const Container = styled.div`
  background-image: url(${(props) => props.img_path});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  /* padding-top: 30px; */
  /* background-color: #020202; */
  height: 100%;

  color: white;

  ::before {
    content: '';
    opacity: 0.8;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: #424242;
  }
`;
const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 800px;
`;
const Wrapper2 = styled.div`
  padding-top: 30px;
  min-width: 1000px;
  max-width: 1000px;
  justify-content: center;
  margin: 0 auto;
  align-items: center;

  dt,
  dd {
    font-size: 24px;
    margin-bottom: 10px;
  }
`;
const Title = styled.div`
  font-size: 30px;
  display: flex;
  flex-direction: column;
  width: 50%;
`;


const TitleLevelBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailInfo = styled.div``;

const ContentInfoWrapper = styled.div`
  display: flex;
  max-width: 1000px;
  min-width: 1000px;
  font-size: 1.3rem;
  height: 630px;
  padding-bottom: 100px;
`;

const ContentInfo = styled.div`
  padding-top: 20px;
`;

// const EngInfoWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   background-color: antiquewhite;
//   color: black;
// `

const EngInfo = styled.div`
  max-width: 800px;
  min-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* margin-left: 15%; */
  padding-left: 5%;
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

  dt,
  dd {
    font-size: 24px;
  }
`;

const BlackBox = styled.div`
  background-color: #1b1b1b;
  margin-top: 10%;
  margin-bottom: 10%;
  position: relative;
  padding-left: 3rem;
  padding-right: 2rem;
`;

const LevelBox = styled.div`
  background-color: #FAEBD7;
  color : black;
  width: 20%;
  height: 20%;
  padding: 1.5rem;
  border: 1px solid black;
  box-shadow: 7px 7px 7px black;
  border-radius: 10px;
  margin-top: 3%;
  margin-right: 5%;
  /* text-align: center; */
`;

const CloseBox = styled.p`
  background-color: white;
  color : black;
  width: 3.2rem;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  padding-left: 0.5%;
  margin-top: 1%;
`;

const WordCloudBox = styled. div`
  padding-bottom: 20px;
`

const SampleBox = styled.div`
  background-color: gray;
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: 7px 7px 7px black;
  padding:2%;
  width: 53rem;
`;

export default function Content ({location}) {
  console.log('location content state',location.state)
  const [content, setContent] = useState("");
  const [closed, setClosed] = useState(false);

  const HandleMore = () => {
    setClosed(!closed)
  }

  useEffect(() => {
    const callContent = async () => {
      try {
        const response = await axios.get(`/api/content/${location.state}`);
        setContent(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    callContent();
  }, [location]);

  return (
    <Container {...content}>
        <div>
          <BlackBox>
            <Wrapper1>
                <Wrapper2>
                  <TitleLevelBox>
                    <Title className='box_basic'>
                      <h2 className='title_name_en'>{content.title_en}</h2>
                        <span className='title_name_kr' >
                          {content.title_kr}, <span style={{fontSize:'80%'}}>{content.release_year}</span>
                        </span>
                    </Title>
                    <LevelBox>
                      <h3><IoPodiumOutline/> 단어 난이도 : {content.word_difficulty_level}</h3>
                      <h3><SiSpeedtest/> WPS : {content.words_per_second}</h3>
                      <h3><IoBookmarksSharp/> 종합 난이도 : {content.content_level} / 10</h3>
                    </LevelBox>
                  </TitleLevelBox>
                  <ContentInfoWrapper>
                    <DetailInfo className='box_basic'>
                      <div className="info_poster"><img src={content.img_path} alt='movie_poster' /></div>
                      <div className='info_content'>
                      <ContentInfo className='inner_content'>
                        <dl className='list_content'>
                          {/* <dt>장르</dt> */}
                          <dd>{content.genre}</dd>
                        </dl>
                        <dl className='list_content'>
                          {/* <dt>등급</dt> */}
                          <dd>{isNaN(content.age_rating) ?   "전체연령가" : `${content.age_rating} 세 이용가`}</dd>
                        </dl>
                        <dl className='list_content'>
                          {/* <dt>감독</dt> */}
                          <dd>Director : {content.director}</dd>
                        </dl>
                        <dl className='list_content'>
                          {/* <dt>러닝타임</dt> */}
                          <dd>{content.running_time}</dd>
                        </dl>
                      </ContentInfo>
                      </div>
                    </DetailInfo>
                  </ContentInfoWrapper>
                </Wrapper2>
            </Wrapper1>
                  <div>
            <EngInfo>
              <dl className='list_content'>
                {/* <h3>영화 내용</h3> */}
                <dd className={closed ? "":"close"}>{content.story}</dd>
                <CloseBox onClick = {HandleMore}>{closed ? '간략히' : '더보기'}</CloseBox>
              </dl>
              <div>
                <WordCloudBox>
                  <h4>영화에 나오는 중요 단어들</h4>
                  {content.content_unique_words && <WordCloud
                    words={content.content_unique_words}
                  />}
                </WordCloudBox>
                <SampleBox>
                  <h4>영화에 나오는 대표 예문</h4>
                  {content && content.example.map ((example) => {
                    return (
                      // <div className='word_content' key={example.id}>
                      //   {/* <dt>{example.word}</dt> */}
                      //   <dd>{example.sentence}</dd>
                      //   <dd>{example.level}</dd>
                      // </div>
                      <SentenceForm 
                        sentence={example.sentence}
                        word={example.word}
                      />
                    )
                  })}
                </SampleBox>
              </div>
            </EngInfo>
                  </div>
          </BlackBox>
        </div>
    </Container>
  )
}
