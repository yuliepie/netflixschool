// 객관식 문제 유형

import React from 'react';
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

export default function TestFormMultipleAnswer ({props}) {
  const questionNumber = parseInt(props.question)
  return(
    <div>
      <Wrap>
        <h1>test {questionNumber}</h1>
      </Wrap>
      <div><Image src={props.imgPath} alt='questionimg' /></div>
      <Asking>{props.koreanSentence}</Asking>
      <Wrap>
      {props.choices.map((answ, index) => {
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
