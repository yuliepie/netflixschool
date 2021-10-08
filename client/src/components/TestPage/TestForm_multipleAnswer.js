import React from 'react';
import {question} from './TestQuestions/Questions2';

export default function TestFormMultipleAnswer () {
  return(
    <div>
      <img src={question.imgPath} alt='questionimg' />
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