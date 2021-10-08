import React from 'react';
import {question} from './TestQuestions/Questions2';
import styled from 'styled-components';

const Image = styled.img`
  width: 60%;
  height: 60%;
  display: block; 
  margin: 0px auto;
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

export default function TestFormMultipleAnswer (props) {
  return(
    <div>
      <div><Image src={question.imgPath} alt='questionimg' /></div>
      <Asking>{question.koreanSentence}</Asking>
      <Wrap>
      {question.choices.map((answ, index) => {
        return (
          <Reply key={index}>
            <input 
              type='radio' 
              name='answer' 
              value={answ.choice}
            /><span>{answ.choice}</span>
          </Reply>
        )
      })}
      </Wrap>
    </div>
  )
}


{/* <div><Image src={question.imgPath} alt='questionimg' /></div>
      <p>{question.koreanSentence}</p>
      {question.choices.map((answ, index) => {
        return (
          <div key={index}>
            <input type='radio' name='answer'/><span>{answ.choice}</span>
          </div>
        )
      })} */}