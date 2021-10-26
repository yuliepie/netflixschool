import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { data } from './Learning.data';
import Quizform from '../components/Learning/Quizform';
import SentenceForm from '../components/Learning/SentenceForm';
import LevelIndicator from '../components/Learning/LevelIndicator';

export default function Learning() {
  const [learningData, setLearningData] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`/api/learning`);
        console.log('r', response);
        setLearningData(response.data);
        setPageCount(response.data.length);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  // useEffect(() => {
  //   setLearningData(data);
  //   setPageCount(Object.keys(data).length);
  // }, []);

  return (
    <div>
      {learningData.length > 0  && (
        <Container>
          <Title>Today's Netflix English</Title>
          <LevelIndicator
            level={`${learningData[currPage]?.level}`}
            currPage={currPage}
            onClickPage={setCurrPage}
            pageCount={pageCount}
          />
          <SentenceWrapper>
            <SentenceForm
              img_path={learningData[currPage].img_path}
              sentence={learningData[currPage].sentence}
              title_en={learningData[currPage].title_en}
              title_kr={learningData[currPage].title_kr}
              word={learningData[currPage].word}
            />
          </SentenceWrapper>
          <QuizWrapper>
            <Quizform
              question={learningData[currPage].question}
              file_path={learningData[currPage].file_path}
              choices={learningData[currPage].choices}
              answer={learningData[currPage].answer}
              type={learningData[currPage].type}
              korean={learningData[currPage].korean}
              currPage={currPage}
            />
          </QuizWrapper>
        </Container>
      )}
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`;

const Title = styled.h1`
  margin-top: 30px;
  font-size: 50px;
`;

const SentenceWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 80px;
`;

const QuizWrapper = styled.div`
  width: 1000px;
  height: 100%;
  margin-bottom: 100px;
`;
