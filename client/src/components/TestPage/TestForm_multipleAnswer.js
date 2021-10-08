// 객관식 문제 유형

import React from 'react';
import {question} from './TestQuestions/Questions2';
import styled from 'styled-components';

const Image = styled.img`
  width: 70%;
  height: 70%;
`;

export default function TestFormMultipleAnswer (props) {
  return(
    <div>
      <div><Image src={question.imgPath} alt='questionimg' /></div>
      <p>{question.koreanSentence}</p>
      {question.choices.map((answ, index) => {
        return (
          <div key={index}>
            <input type='radio' name='answer'/><span>{answ.choice}</span>
          </div>
        )
      })}

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