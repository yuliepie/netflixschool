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
        <div>
          <Image src={question.imgPath} alt="questionimg" />
        </div>
      </Wrap>

      <Wrap>
        <Asking>{question.koreanSentence}</Asking>
      </Wrap>
      <Wrap>
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
      </Wrap>
    </div>
  );
}

const Image = styled.img`
  width: 60%;
  height: 60%;
  display: block;
  margin: 0px auto;
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
  width: 200px;
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  background: ${(props) =>
    props.checked
      ? 'linear-gradient(to bottom, #b1adf4 5%, #f6f6f6 100%)'
      : 'linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%)'};
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #6a5acd;
  display: inline-block;
  cursor: pointer;
  color: #6a5acd;
  font-size: 16px;
  padding: 8px 10px;
  text-align: center;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ffffff;

  :hover {
    background: ${(props) =>
      props.checked
        ? 'linear-gradient(to bottom, #f6f6f6 5%, #b1adf4 100%)'
        : 'linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%)'};

    background-color: #f6f6f6;
  }

  :active {
    position: relative;
    top: 1px;
  }

  > input {
    display: none;
  }
`;
