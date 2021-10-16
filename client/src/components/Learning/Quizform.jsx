// 객관식 문제 유형
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';

export default function Quizform({
  file_path,
  question,
  choices,
  answer,
  type,
  currPage,
  korean,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState('0');
  const [result, setResult] = useState('0');

  const handleChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const AskingList = (type) => {
    if (type === 1) {
      return '다음 중 빈칸에 들어갈 단어를 고르세요.';
    } else if (type === 2) {
      return '다음 중 빈칸에 들어갈 단어로 적절하지 않은 단어를 고르세요.';
    } else if (type === 3) {
      return '다음 중 단어 뜻으로 적절한 것을 고르세요.';
    }
  };

  const handleClick = () => {
    setResult('0');
  };

  const checkAnswer = (e) => {
    e.preventDefault();
    return (
      <div>
        {selectedAnswer &&
          (String(answer) === String(selectedAnswer)
            ? setResult('1')
            : setResult('2'))}
      </div>
    );
  };

  useEffect(() => {
    setSelectedAnswer('0');
    setResult('0');
  }, [currPage]);

  function prepocess(sentence) {
    const start = sentence.indexOf('[');
    const end = sentence.indexOf(']');
    const newsentence1 = sentence.substring(0, start + 1);
    const newsentence2 = sentence.substring(end);
    const final = newsentence1 + '  ' + newsentence2;
    // console.log("start",start);
    // console.log("end",end);
    // console.log("newsentence",newsentence1)
    return final;
  }

  return (
    <Container>
      <Title> Today's Quiz </Title>
      <QuestionWrapper>
        <ImageWrapper>
          <Image src={file_path} alt="questionimg" />
          <IconWrapperO result={result} onClick={handleClick}>
            <BsCheckCircle size="300" color="#7FFF00" />
          </IconWrapperO>
          <IconWrapperX result={result} onClick={handleClick}>
            <BsXCircle size="300" color="#DC143C" />
          </IconWrapperX>
        </ImageWrapper>
        <Subtitle>{type === 3 ? question : prepocess(question)}</Subtitle>
        <Subtitle>{type === (1 || 2) ? korean : <></>}</Subtitle>
        <Asking>{AskingList(type)}</Asking>
      </QuestionWrapper>
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
                    <span>{answ}</span>
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
                    <span>{answ}</span>
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
  background-color: #262626;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px black;
`;

const QuestionWrapper = styled.div`
  width: 90%;
  margin-top: 10px;
  margin-bottom: 20px;
  background-color: black;
  border-radius: 30px;
  box-shadow: 2px 2px 2px 2px black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-bottom: 20px;
`;

const ImageWrapper = styled.div`
  width: 100%;
`;

const Image = styled.img`
  height: 400px;
  width: 100%;
  display: block;
  margin: 0px auto;
  border-radius: 30px 30px 0 0 / 30px 30px 0 0;
`;

const IconWrapperO = styled.div`
  display: block;
  margin: 30px auto;
  position: absolute;
  top: 10%;
  left: 35%;
  display: ${(props) => (props.result == '1' ? 'nomarl' : 'none')};
  cursor: pointer;
`;

const IconWrapperX = styled.div`
  display: block;
  margin: 30px auto;
  position: absolute;
  top: 10%;
  left: 35%;
  display: ${(props) => (props.result == '2' ? 'nomarl' : 'none')};
  cursor: pointer;
`;

const Title = styled.h1`
  /* background-color: #f4a460; */
  font-size: 40px;
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: center;
  padding: 2px 10px;
  text-shadow: 2px 2px 2px black;
  color: #ffffff;
`;
const Asking = styled.h1`
  background-color: #ffffff;
  width: 90%;
  font-size: 25px;
  padding: 10px 10px;
  /* margin: 0 0 20px 0; */
  text-align: center;
  /* padding: 2px 5px; */
  border-radius: 20px;
  color: black;
`;

const ExampleWrapper = styled.div`
  text-align: center;
  height: 80px;
`;

const Subtitle = styled.p`
  font-size: 25px;
  text-align: center;
  color: #ffffff;
  padding: 10px 0 10px 0;
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
  border: 0.5px solid #000000;
  background-color: ${(props) => (props.checked ? '#A52A2A' : '#d3d3d3')};
  color: ${(props) => (props.checked ? '#ffffff' : '#000000')};
  box-shadow: 1px 1px 1px 1px black;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 15px;
`;

const Label = styled.label`
  width: 280px;
  color: ${(props) => (props.checked ? '#ffffff' : '#000000')};
  background-color: ${(props) => (props.checked ? '#e82b0c' : '#d3d3d3')};
  border: 0.5px solid #000000;
  display: inline-block;
  font-size: 23px;
  padding: 13px 8px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 1px 1px 1px 1px black;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 15px;

  > input {
    display: none;
  }
`;
