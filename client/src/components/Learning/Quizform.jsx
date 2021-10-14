// 객관식 문제 유형
import { useState } from 'react';
import styled from 'styled-components';

export default function Quizform({ file_path, question, choices, answer }) {
  const [selectedAnswer, setSelectedAnswer] = useState('0');

  const handleChange = (e) => {
    setSelectedAnswer(e.target.value);
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
  console.log('choices', choices);
  console.log('answer', answer);

  return (
    <Container>
      <QuestionWrapper>
        <h3> Today's Quiz </h3>
        <div>
          <Image src={file_path} alt="questionimg" />
          <Image2 src={file_path} alt="questionimg" />
        </div>
        <Subtitle>{question}</Subtitle>
      </QuestionWrapper>
      <Asking>{question}</Asking>
      <ExampleWrapper>
        {choices.map((answ, index) => {
          return (
            <Reply key={index}>
              <Label
                checked={selectedAnswer === String(index + 1) ? true : false}
              >
                <input
                  type="radio"
                  name="answer"
                  value={index + 1}
                  onChange={handleChange}
                  checked={selectedAnswer === String(index + 1) ? true : false}
                />
                <span>{answ.choice}</span>
              </Label>
            </Reply>
          );
        })}
        <Submit onClick={checkAnswer}>제출</Submit>
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

const Asking = styled.p`
  font-size: 30px;
  text-align: center;
`;

const ExampleWrapper = styled.div`
  text-align: center;
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
  margin-top: 20px;

  font-size: 30px;
  background-color: #ff8906;
  border: 0px none;
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
