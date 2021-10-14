import styled from 'styled-components';
// import Papago from './Papago';

const Container = styled.div`

  display: flex;
  margin: 0 auto;
  padding-top: 30px;
  background-color: #dfe6ed;
  max-width: 1000px;
  min-width: 1000px;

`

const Image = styled.img`
  margin-right: 30px;
  width: 300px;
  height: 450px;
  display: block; 
`;

const TextWrapper = styled.div`
  margin: 90px 30px 30px 80px;
  display: flex;
  flex-direction: column;
  width: 80%; 
`

const TextTitle = styled.dt`
  font-size: 22px;
  width: 100%; 
`

const Text = styled.dd`
  margin-top:10px;
  font-size: 19px;
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
      <TextWrapper>
        <dl>
          <TextTitle>오늘의 문장</TextTitle>
          <Text>{sentence}</Text>
          {/* <Papago /> */}
        </dl>
        <dl>
          <TextTitle>오늘의 단어</TextTitle>
          <Text>{word}</Text>
        </dl>
      </TextWrapper>
      <Image src={img_path} alt='example_image' />
    </Container>
  )
}
