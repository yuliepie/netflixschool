import { useState, useEffect } from 'react';
import styled from 'styled-components';
// import Papago from './Papago';

export default function SentenceForm({ img_path, sentence, word }) {
  const [leftSentence, setLeftSentence] = useState('');
  const [rightSentence, setRightSentence] = useState('');

  const GetSentence = () => {
    setLeftSentence(sentence.split(word)[0]);
    setRightSentence(sentence.split(word)[1]);
  };

  useEffect(() => {
    GetSentence();
  }, []);

  return (
    <Container>
      <TextWrapper>
        <EnglishText>
          {leftSentence} <Text>{word}</Text> {rightSentence}
        </EnglishText>
        {/* <KoreanText>{sentence}</KoreanText> */}
        <TitleText>- Bad Boys, 나쁜 녀석들</TitleText>
      </TextWrapper>
      <Image src={img_path} alt="example_image" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 20px 0;
  background-color: #dfe6ed;
  max-width: 1000px;
  min-width: 1000px;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px gray;
`;

const Image = styled.img`
  margin-right: 30px;
  width: 300px;
  height: 300px;
  display: block;
  border-radius: 20px;
  box-shadow: 1px 1px 1px 1px gray;
`;

const TextWrapper = styled.div`
  /* margin: 90px 30px 30px 80px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
`;

const EnglishText = styled.p`
  display: flex;
  flex-direction: row;
  font-size: 35px;
  margin-top: 10px;
  text-shadow: 2px 2px 2px gray;
`;

const KoreanText = styled.p`
  font-size: 30px;
  margin-top: 10px;
`;

const TitleText = styled.p`
  font-size: 25px;
  margin-top: 15px;
  padding-left: 300px;
  font-style: italic;
`;

const Text = styled.p`
  font-weight: bold;
  margin: 0 10px;
  color: red;
`;
