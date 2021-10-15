import { useState, useEffect } from 'react';
import styled from 'styled-components';
// import Papago from './Papago';

export default function SentenceForm({
  sentence,
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
      </TextWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 40px 0;
  background-color: #262626;
  width: 100%;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px black;
  margin-bottom: 10px
`;

const Image = styled.img`
  margin-right: 30px;
  width: 250px;
  height: 300px;
  display: block;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px black;
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
  text-shadow: 2px 2px 2px black;
  color: ${(props) => (props.highlight ? 'yellow' : '#ffffff')};
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
  color: #ffffff;
`;

const Text = styled.span`
  font-weight: bold;
  margin: 0 10px;
  color: red;
`;
