// 객관식 문제 유형

import React from 'react';
import styled from 'styled-components';

export default function TestFormMultipleAnswer({
  question,
  number,
  getAnswer,
  getChoice,
  answer,
  choice,
}) {
  // const questionNumber = parseInt(props.question)

  const handleChange = (e) => {
    getChoice(number, e.target.value);
    getAnswer(number, e.target.value === question.answer ? true : false);
  };

  const handleClick = (e) => {
    console.log(choice);
  };

  return (
    <div>
      <Wrap>
        <Image src={question.imgPath} alt="questionimg" />
      </Wrap>

      <QuestionWrapper>
        <Asking>
          Q{number}. {question.koreanSentence}
        </Asking>
      </QuestionWrapper>
      <ExampleWrapper>
        {question.choices.map((answ, index) => {
          return (
            <Reply key={index}>
              <Label
                checked={
                  choice[number - 1] === String(index + 1) ? true : false
                }
              >
                <input
                  type="radio"
                  name="answer"
                  value={index + 1}
                  onChange={handleChange}
                  onClick={handleClick}
                  checked={
                    choice[number - 1] === String(index + 1) ? true : false
                  }
                />
                <span>{answ.choice}</span>
              </Label>
            </Reply>
          );
        })}
      </ExampleWrapper>
    </div>
  );
}

const Image = styled.img`
  width: 60%;
  height: 500px;
  display: block;
  margin: 0px auto;
`;

const QuestionWrapper = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const ExampleWrapper = styled.div`
  height: 100px;
  margin-top: 10px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Asking = styled.p`
  font-size: 30px;
  text-align: center;
`;

const Wrap = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Reply = styled.div`
  font-size: 24px;
  display: inline-block;
  padding-left: 50px;
`;

const Label = styled.label`
  cursor: pointer;
  width: 13rem;
  margin-top: 15px;
  background-color: ${(props) => (props.checked ? '#000000' : '#ffffff')};
  color: ${(props) => (props.checked ? '#ffffff' : '#000000')};
  border-radius: 10px;
  border: 2px solid #000000;
  display: inline-block;
  cursor: pointer;
  font-size: 23px;
  padding: 20px 8px;
  text-align: center;
  text-decoration: none;

  :hover {
    background-color: #000000;
    color: #ffffff;
  }

  > input {
    display: none;
  }
`;
