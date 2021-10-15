import { useState, useEffect } from 'react';
import styled from 'styled-components';
// import Papago from './Papago';

export default function SentenceForm({
  img_path,
  sentence,
  title_en,
  title_kr,
  word,
}) {
  const [leftSentence, setLeftSentence] = useState('');
  const [rightSentence, setRightSentence] = useState('');

  const GetSentence = () => {
    setLeftSentence(sentence.split(word)[0]);
    setRightSentence(sentence.split(word)[1]);
  };

  useEffect(() => {
    GetSentence();
  }, [word]);

  return (
    <Container>
      <TextWrapper>
        <EnglishSentence>
          {sentence.split(' ').map((words, index) => {
            return (
              <EnglishText highlight={words == word ? true : false}>
                {words}{' '}
              </EnglishText>
            );
          })}
        </EnglishSentence>
        {/* <EnglishText>
          {leftSentence} <Text>{word}</Text> {rightSentence}
        </EnglishText> */}
        {/* <KoreanText>{sentence}</KoreanText> */}
        <TitleText>
          - {title_en}, {title_kr}
        </TitleText>
      </TextWrapper>
      <Image src={img_path} alt="example_image" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 40px 0;
  background-color: #ffffff;
  max-width: 1000px;
  min-width: 1000px;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px gray;
`;

const Image = styled.img`
  margin-right: 30px;
  width: 250px;
  height: 300px;
  display: block;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px gray;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 0 30px;
  text-align: center;
`;

const EnglishText = styled.span`
  /* display: flex;
  flex-direction: column; */
  font-size: 35px;
  margin-top: 10px;
  text-shadow: 2px 2px 2px gray;
  color: ${(props) => (props.highlight ? 'red' : 'black')};
  font-style: ${(props) => (props.highlight ? 'bold' : 'normal')};
`;

const EnglishSentence = styled.span``;

const KoreanText = styled.span`
  font-size: 30px;
  margin-top: 10px;
`;

const TitleText = styled.span`
  font-size: 25px;
  margin-top: 15px;
  font-style: italic;
`;

const Text = styled.span`
  font-weight: bold;
  margin: 0 10px;
  color: red;
`;
