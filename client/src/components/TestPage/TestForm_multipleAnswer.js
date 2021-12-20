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
    } else if (type === 3) {
      return '다음 중 단어 뜻으로 적절한 것을 고르세요.';
    }
  };

  const handleChange = (e) => {
    getChoice(number, e.target.value);
    getAnswer(
      number,
      String(e.target.value) === String(question.answer) ? true : false,
    );
    console.log('answer', answer);
  };

  function prepocess(sentence) {
    const start = sentence.indexOf('[');
    const end = sentence.indexOf(']');
    const newsentence1 = sentence.substring(0, start + 1);
    const newsentence2 = sentence.substring(end);
    const final = newsentence1 + '  ' + newsentence2;
    // console.log("start",start);
    // console.log("end",end);
    // console.log("newsentence",newsentence1)
    return final;
  }

  return (
    <Container>
      <QuestionWrapper>
        {question.file_path && (
          <Image src={question.file_path} alt="questionimg" />
        )}
        <Subtitle>
          {question.type === 3
            ? question.question
            : prepocess(question.question)}
        </Subtitle>
        <Subtitle>
          {question.type === 1 || question.type === 2 ? question.korean : <></>}
        </Subtitle>
        <Asking>
          Q{number}. {AskingList(question.type)}
        </Asking>
      </QuestionWrapper>
      <ExampleWrapper>
        {question.choice &&
          question.choice.slice(undefined, 2).map((answ, index) => {
            return (
              <Reply key={index}>
                <LabelWrapper>
                  <Num
                    checked={
                      choice[number - 1] === String(index + 1) ? true : false
                    }
                  >
                    {index === 0 ? 'A' : 'B'}
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
                    <span>{answ}</span>
                  </Label>
                </LabelWrapper>
              </Reply>
            );
          })}
      </ExampleWrapper>
      <ExampleWrapper>
        {question.choice &&
          question.choice.slice(2, 4).map((answ, index) => {
            return (
              <Reply key={index}>
                <LabelWrapper>
                  <Num
                    checked={
                      choice[number - 1] === String(index + 3) ? true : false
                    }
                  >
                    {index === 0 ? 'C' : 'D'}
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
                    <span>{answ}</span>
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
  /* width: 1000px; */
  width: 65%;
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
  margin-bottom: 20px;
  background-color: black;
  border-radius: 30px;
  box-shadow: 2px 2px 2px 2px gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ExampleWrapper = styled.div`
  height: 80px;
  width: 800px;
  /* width: 85%; */
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Subtitle = styled.p`
  font-size: 25px;
  text-align: center;
  color: #ffffff;
  padding: 10px 0 10px 0;
`;

const Asking = styled.h1`
  background-color: #ffffff;
  width: 90%;
  font-size: 25px;
  padding: 20px 10px;
  margin: 0 0 20px 0;
  text-align: center;
  padding: 2px 5px;
  border-radius: 20px;
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
  border: 0.5px solid #000000;
  background-color: ${(props) => (props.checked ? '#A52A2A' : '#d3d3d3')};
  color: ${(props) => (props.checked ? '#ffffff' : '#000000')};
  box-shadow: 1px 1px 1px 1px gray;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 15px;
`;

const Label = styled.label`
  width: 280px;
  color: ${(props) => (props.checked ? '#ffffff' : '#000000')};
  background-color: ${(props) => (props.checked ? '#e82b0c' : '#d3d3d3')};
  border: 0.5px solid #000000;
  display: inline-block;
  font-size: 23px;
  padding: 13px 8px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 1px 1px 1px 1px gray;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 15px;

  > input {
    display: none;
  }
`;
