// 객관식 문제 유형
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

export default function Quizform (
  {
    file_path,
    question,
    choices
  }
  ) {

  return(
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
                value={answ.choice}
              />
              <span>{answ.choice}</span>
            </Reply>
        )
      })}
      </Wrap>
    </QuizWrapper>
  )
}
