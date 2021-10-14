// 객관식 문제 유형
import { useState } from 'react';
import styled from 'styled-components';

const QuizWrapper = styled.div`
  margin: 130px 0 0 0;
  padding: 10px 0 100px 0;
  background-color: gray;
  width: 100%;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: column;
  padding: 50px 0;
  font-size: 25px;

`
const Image = styled.img`
  width: 1000px;
  height: 550px;
  display: block; 
  margin: 30px auto;
`;

const Asking = styled.p`
  font-size: 30px;
  text-align: center;
`;

const Wrap = styled.div`
  text-align: center;
`;

const Reply = styled.div`
  font-size: 24px;
  display: inline-block;
  padding-left: 50px;
`;

const Submit = styled.button`
  margin-top: 20px;

  font-size:30px;
  background-color: #ff8906;
  border: 0px none;
  border-radius : 10px;
  color: white;
  width: 9rem;
  height: 5rem;

  :hover{
      background-color: white;
      cursor: pointer;
      color: black;
  }
`

export default function Quizform (
  {
    file_path,
    question,
    choices,
    answer
  }
  ) {
  const [selectedAnswer, setSelectedAnswer] = useState("0");

  const checkAnswer = (e) => {
    e.preventDefault();
    console.log('selectedAnswer', selectedAnswer)
    console.log('answer', answer)
    return (
      <div>
        { selectedAnswer && (answer === selectedAnswer ?
          alert('맞았습니다.')
        :
          alert('틀렸습니다')
        )}
      </div>
    )
  }
  console.log('choices', choices)
  console.log('answer', answer)
  return (

    <QuizWrapper>
      <Container>
        <h3> Today's Quiz </h3>
        <div><Image src={file_path} alt='questionimg' /></div>
        <Asking>{question}</Asking>
      </Container>
      <Wrap>
        {choices && choices.map((answ, index) => {
          return (
              <Reply key={index}>
                <input
                  type='radio'
                  name='answer'
                  value={`answ.choice`}
                  onChange={(e) => {setSelectedAnswer(e.target.value)}}
                />
                <span>{answ.choice}</span>
              </Reply>
          )
        })}
        <Submit
          onClick={checkAnswer}
        >제출</Submit>
      </Wrap>
    </QuizWrapper>
  )
}
