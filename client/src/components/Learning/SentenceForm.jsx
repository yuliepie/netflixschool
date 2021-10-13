// 객관식 문제 유형
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding-top: 30px;
  background-color: #dfe6ed;
`

const Image = styled.img`
  width: 300px;
  height: 450px;
  display: block; 
`;

const TextWrapper = styled.div`
  margin: 90px 30px 30px 80px;
  display: flex;
  flex-direction: column;
`


export default function Quizform (
  {
    img_path,
    sentence,
    word
  }
  ) {

  return(
    <Container>
      <Image src={img_path} alt='example_image' />
      <TextWrapper>
        <dl>
          <dt>오늘의 문장</dt>
          <dd>{sentence}</dd>
        </dl>
        <dl>
          <dt>오늘의 단어</dt>
          <dd>{word}</dd>
        </dl>
      </TextWrapper>
    </Container>
  )
}
