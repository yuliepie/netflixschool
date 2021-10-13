import styled from 'styled-components';
import Papago from './Papago';

const Container = styled.div`
  margin: 0 0 0 10%;
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

const TextTitle = styled.dt`
  font-size: 22px;
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
          <TextTitle>오늘의 문장</TextTitle>
          <dd>{sentence}</dd>
          <Papago />
        </dl>
        <dl>
          <TextTitle>오늘의 단어</TextTitle>
          <dd>{word}</dd>
        </dl>
      </TextWrapper>
    </Container>
  )
}
