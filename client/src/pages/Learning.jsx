import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import {data} from './Learning.data';
import Quizform from '../components/Learning/Quizform';
import SentenceForm from '../components/Learning/SentenceForm';
import LevelIndicator from '../components/Learning/LevelIndicator';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  background-color: #dfe6ed;
`

const SentenceWrapper = styled.div`
  width: 70%;
  height: 70%;  
`

const QuizWrapper = styled.div`
  width: 85%;
  height: 85%;
`

export default function Learning () {
  const [learningData, setLearningData] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);


  useEffect(() => {
    (async function() {
      try {
        const response = await axios.get(
          `/api/learning`
        );
        console.log('r', response);
        setLearningData(response.data);
        setPageCount(response.data.length);
        console.log(response.data);
      } catch (e) {
        console.log(e)
      }
    })()
  },[])

  console.log('l',learningData.length)
  return (
    <div>
      {data && <Container>
        <LevelIndicator
          level={`${data[currPage].level}`}
          currPage={currPage}
          onClickPage={setCurrPage}
          pageCount={pageCount}
        />
        <SentenceWrapper>
          <SentenceForm
            img_path={`${data[currPage].img_path}`}
            sentence={`${data[currPage].sentence}`}
            word={`${data[currPage].word}`}
          />
        </SentenceWrapper>
        <QuizWrapper>
          <Quizform
            question={`${data[currPage].question}`}
            file_path={`${data[currPage].file_path}`}
            // choices={`${data[currPage].choices}`}
          />
        </QuizWrapper>
      </Container>}
    </div>
  )
}