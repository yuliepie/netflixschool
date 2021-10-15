import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import { QuestionData } from './TestQuestions/q_data';
import TestFormMultipleAnswer from './TestForm_multipleAnswer';
import ProgressBar from './ProgressBar';
import axios from 'axios';

const TestBox = ({ match, history }) => {
  const [answer, setAnswer] = useState(
    Array.from({ length: 15 }, () => 'None'),
  );
  const [choice, setChoice] = useState(
    Array.from({ length: 15 }, () => 'None'),
  );
  const [progress, setProgress] = useState(0);
  const [questionData, setQuestionData] = useState([]);

  const getAnswer = (questionNum, result) => {
    const leftAnswer = answer.slice(undefined, questionNum - 1);
    const rightAnswer = answer.slice(questionNum);
    setAnswer([...leftAnswer, result, ...rightAnswer]);
  };

  function getChoice(questionNum, choiceNun) {
    const leftChoice = choice.slice(undefined, questionNum - 1);
    const rightChoice = choice.slice(questionNum);
    setChoice([...leftChoice, choiceNun, ...rightChoice]);
  }

  useEffect(() => {
    setProgress(
      parseInt(
        ((choice.length -
          choice.filter((element) => 'None' === element).length) /
          choice.length) *
          100,
      ),
    );
    console.log('p', progress);
  }, [choice]);

  // // 문제 GET API
  // const GetQuestionAPI = async () => {
  //   const response = await axios.post('/api/test/question');
  //   return response;
  // };

  // useEffect(() => {
  //   QuestionData = GetQuestionAPI();
  // }, []);

  useEffect(() => {
    (async function () {
      const response = await axios.get('/api/test/question');
      console.log('a', response.data);
      setQuestionData(response.data);
      // setAnswer(
      //   Array.from({ length: Object.keys(questionData).length }, () => 'None'),
      // );
      // setChoice(
      //   Array.from({ length: Object.keys(questionData).length }, () => 'None'),
      // );
    })();
  }, []);

  // 결과 POST API
  const handleResult = async (e) => {
    e.preventDefault();
    // console.log('-- answer data -- ', answer)
    const response = await axios.post(
      '/api/test/result', 
      JSON.stringify({'answers': answer}), 
      {
        headers: {
          "Content-Type": `application/json`,
        }
      });
    history.push({
      pathname: '/result',
      state: { data: response.data },
    });
  };

  const { number } = match.params;
  const question = questionData[number - 1];

  // if (!question) {
  //   return <div>존재하지 않는 번호</div>;
  // }

  return (
    <Container>
      <ProgressBar progress={progress} />
      {question && (
        <TestFormMultipleAnswer
          question={question}
          number={number}
          getAnswer={getAnswer}
          getChoice={getChoice}
          answer={answer}
          choice={choice}
        />
      )}
      <div>
        <ButtonWrapper>
          {parseInt(number) === 15 ? (
            <YesBox
              disabled={choice[number - 1] !== 'None' ? false : true}
              onClick={handleResult}
            >
              Submit
            </YesBox>
          ) : (
            <Link to={`/doTest/${parseInt(number) + 1}`}>
              <NextBox
                disabled={choice[number - 1] !== 'None' ? false : true}
                number={number}
              >
                Next
              </NextBox>
            </Link>
          )}
        </ButtonWrapper>
      </div>
    </Container>
  );
};

export default TestBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 300px;
`;

const YesBox = styled.button`
  padding: 0px 10px;
  font-size: 25px;
  background-color: #e82b0c;
  border-radius: 10px;
  color: white;
  width: 150px;
  height: 55px;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};

  :hover {
    background-color: white;
    cursor: pointer;
    color: red;
  }
`;

const NextBox = styled.button`
  padding: 0px 10px;
  font-size: 25px;
  background-color: black;
  border-radius: 10px;
  color: white;
  width: 150px;
  height: 55px;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  box-shadow: 1px 1px 1px 1px gray;

  :hover {
    background-color: white;
    cursor: pointer;
    color: black;
  }
`;
