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

  const AskingList = (type) => {
    if (type === 1) {
      return '다음 중 빈칸에 들어갈 단어를 고르세요.';
    } else if (type === 2) {
      return '다음 중 빈칸에 들어갈 단어로 적절하지 않은 단어를 고르세요.';
    }
  };

  const handleChange = (e) => {
    getChoice(number, e.target.value);
    getAnswer(number, e.target.value === question.answer ? true : false);
  };

  return (
    <Container>
      <QuestionWrapper>
        <Image src={question.imgPath} alt="questionimg" />
        <Subtitle>{question.koreanSentence}</Subtitle>
      </QuestionWrapper>
      <Asking>
        Q{number}. {AskingList(question.type)}
      </Asking>
      <ExampleWrapper>
        {question.choices.slice(undefined, 2).map((answ, index) => {
          return (
            <Reply key={index}>
              <LabelWrapper>
                <Num
                  checked={
                    choice[number - 1] === String(index + 1) ? true : false
                  }
                >
                  {index == 0 ? 'A' : 'B'}
                </Num>
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
                    checked={
                      choice[number - 1] === String(index + 1) ? true : false
                    }
                  />
                  <span>{answ.choice}</span>
                </Label>
              </LabelWrapper>
            </Reply>
          );
        })}
      </ExampleWrapper>
      <ExampleWrapper>
        {question.choices.slice(2, 4).map((answ, index) => {
          return (
            <Reply key={index}>
              <LabelWrapper>
                <Num
                  checked={
                    choice[number - 1] === String(index + 3) ? true : false
                  }
                >
                  {index == 0 ? 'C' : 'D'}
                </Num>
                <Label
                  checked={
                    choice[number - 1] === String(index + 3) ? true : false
                  }
                >
                  <input
                    type="radio"
                    name="answer"
                    value={index + 3}
                    onChange={handleChange}
                    checked={
                      choice[number - 1] === String(index + 3) ? true : false
                    }
                  />
                  <span>{answ.choice}</span>
                </Label>
              </LabelWrapper>
            </Reply>
          );
        })}
      </ExampleWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  height: 400px;
  width: 100%;
  display: block;
  margin: 0px auto;
  border-radius: 30px 30px 0 0 / 30px 30px 0 0;
`;

const QuestionWrapper = styled.div`
  width: 90%;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  background-color: black;
  border-radius: 30px;
  box-shadow: 2px 2px 2px 2px gray;
`;

const ExampleWrapper = styled.div`
  height: 80px;
  width: 800px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Subtitle = styled.p`
  font-size: 25px;
  text-align: center;
  color: #ffffff;
  padding: 40px 0 40px 0;
`;

const Asking = styled.h1`
  background-color: #f4a460;
  font-size: 30px;
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center;
  padding: 2px 5px;
  box-shadow: 1px 1px 1px 1px gray;
`;

const Reply = styled.div`
  font-size: 24px;
  display: inline-block;
`;

const LabelWrapper = styled.label`
  cursor: pointer;
`;

const Num = styled.div`
  font-size: 25px;
  display: inline-block;
  padding: 13px 30px;
  border: 0.5px solid #bc8f8f;
  background: NavajoWhite;
  color: ${(props) => (props.checked ? '#e82b0c' : '#000000')};
  box-shadow: 1px 1px 1px 1px gray;
`;

const Label = styled.label`
  width: 280px;
  color: ${(props) => (props.checked ? '#e82b0c' : '#000000')};
  background-color: #ffefd5;
  border: 0.5px solid #bc8f8f;
  display: inline-block;
  font-size: 23px;
  padding: 13px 8px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 1px 1px 1px 1px gray;

  > input {
    display: none;
  }
`;
