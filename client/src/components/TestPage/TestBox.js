import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { QuestionData } from './TestQuestions/q_data';
import TestFormMultipleAnswer from './TestForm_multipleAnswer';
import axios from 'axios';

const TestBox = ({ match, history }) => {
  const [answer, setAnswer] = useState(
    Array.from({ length: 10 }, () => 'None'),
  );
  const [choice, setChoice] = useState(
    Array.from({ length: 10 }, () => 'None'),
  );

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

  const handleResult = async (e) => {
    e.preventDefault();

    const response = await axios.post('/api/test/result', {
      answer: answer,
    });
    history.push({
      pathname: '/result',
      state: { data: response.data },
    });
  };

  const { number } = match.params;
  const question = QuestionData[number];

  if (!question) {
    return <div>존재하지 않는 번호</div>;
  }

  return (
    <div>
      <TestFormMultipleAnswer
        question={question}
        number={number}
        getAnswer={getAnswer}
        getChoice={getChoice}
        answer={answer}
        choice={choice}
      />
      <div>
        <div className="submitBox">
          {parseInt(question.question) === 10 ? (
            <div>
              <YesBox onClick={handleResult}>Submit</YesBox>
            </div>
          ) : (
            <Link to={`/doTest/${parseInt(question.question) + 1}`}>
              <NextBox>Next</NextBox>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestBox;

const YesBox = styled.button`
  margin-top: 20px;
  margin-right: 50px;
  font-size: 30px;
  background-color: #e82b0c;
  border-radius: 10px;
  color: white;
  width: 9rem;
  height: 5rem;

  :hover {
    background-color: white;
    cursor: pointer;
    color: red;
  }
`;

const NextBox = styled.button`
  margin-top: 20px;
  margin-right: 50px;
  font-size: 30px;
  background-color: black;
  border-radius: 10px;
  color: white;
  width: 9rem;
  height: 5rem;

  :hover {
    background-color: white;
    cursor: pointer;
    color: black;
  }
`;
