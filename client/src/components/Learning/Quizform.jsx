// 객관식 문제 유형
import { useState } from 'react';
import styled from 'styled-components';

export default function Quizform({
  file_path,
  question,
  choices,
  answer,
  type,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState('0');

  const handleChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const AskingList = (type) => {
    if (type === '1') {
      return '다음 중 빈칸에 들어갈 단어를 고르세요.';
    } else if (type === '2') {
      return '다음 중 빈칸에 들어갈 단어로 적절하지 않은 단어를 고르세요.';
    }
  };

  const checkAnswer = (e) => {
    e.preventDefault();
    console.log('selectedAnswer', selectedAnswer);
    console.log('answer', answer);
    return (
      <div>
        {selectedAnswer &&
          (answer === selectedAnswer
            ? alert('맞았습니다.')
            : alert('틀렸습니다'))}
      </div>
    );
  };
  console.log('type', type);
  console.log('answer', answer);

  return (
    <Container>
      <Title> Today's Quiz </Title>
      <QuestionWrapper>
        <div>
          <Image src={file_path} alt="questionimg" />
          <Image2 src={file_path} alt="questionimg" />
        </div>
        <Subtitle>{question}</Subtitle>
      </QuestionWrapper>
      <Asking>{AskingList(type)}</Asking>
      <ExampleWrapper>
        {choices &&
          choices.slice(undefined, 2).map((answ, index) => {
            return (
              <Reply key={index}>
                <LabelWrapper>
                  <Num
                    checked={
                      selectedAnswer === String(index + 1) ? true : false
                    }
                  >
                    {index == 0 ? 'A' : 'B'}
                  </Num>
                  <Label
                    checked={
                      selectedAnswer === String(index + 1) ? true : false
                    }
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={index + 1}
                      onChange={handleChange}
                      checked={
                        selectedAnswer === String(index + 1) ? true : false
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
        {choices &&
          choices.slice(2, 4).map((answ, index) => {
            return (
              <Reply key={index}>
                <LabelWrapper>
                  <Num
                    checked={
                      selectedAnswer === String(index + 3) ? true : false
                    }
                  >
                    {index == 0 ? 'C' : 'D'}
                  </Num>
                  <Label
                    checked={
                      selectedAnswer === String(index + 3) ? true : false
                    }
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={index + 3}
                      onChange={handleChange}
                      checked={
                        selectedAnswer === String(index + 3) ? true : false
                      }
                    />
                    <span>{answ.choice}</span>
                  </Label>
                </LabelWrapper>
              </Reply>
            );
          })}
      </ExampleWrapper>
      <Submit
        disabled={selectedAnswer !== '0' ? false : true}
        onClick={checkAnswer}
      >
        Submit
      </Submit>
    </Container>
  );
}

const Container = styled.div`
  /* width: 1000px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffefd5;
  max-width: 1000px;
  min-width: 1000px;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px gray;
`;

const QuestionWrapper = styled.div`
  width: 90%;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  background-color: black;
  border-radius: 30px;
  box-shadow: 2px 2px 2px 2px gray;
  position: relative;
`;
const Image = styled.img`
  height: 400px;
  width: 100%;
  display: block;
  margin: 0px auto;
  border-radius: 30px 30px 0 0 / 30px 30px 0 0;
`;

const Image2 = styled.img`
  width: 1000px;
  height: 550px;
  display: block;
  margin: 30px auto;
  position: absolute;
  top: 30%;
  left: 30%;
  display: none;
`;
const Title = styled.h1`
  /* background-color: #f4a460; */
  font-size: 40px;
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: center;
  padding: 2px 10px;
  text-shadow: 2px 2px 2px gray;
`;
const Asking = styled.h1`
  background-color: #f4a460;
  font-size: 30px;
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center;
  padding: 2px 10px;
  box-shadow: 1px 1px 1px 1px gray;
`;

const ExampleWrapper = styled.div`
  text-align: center;
  height: 80px;
`;

const Subtitle = styled.p`
  font-size: 25px;
  text-align: center;
  color: #ffffff;
  padding: 40px 0 40px 0;
`;

const Reply = styled.div`
  font-size: 24px;
  display: inline-block;
  padding-left: 50px;
`;

const Submit = styled.button`
  padding: 0px 10px;
  font-size: 25px;
  background-color: #e82b0c;
  border-radius: 10px;
  color: white;
  width: 150px;
  height: 55px;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  margin-bottom: 30px;

  :hover {
    background-color: white;
    cursor: pointer;
    color: red;
  }
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
