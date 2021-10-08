import React from 'react';
import {MdNextPlan, MdDoneOutline} from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { QuestionData } from './TestQuestions/q_data'

const TestBox = ({match}) => {
    console.log(match)
    console.log(match.params)
    const { number } = match.params;
    const question = QuestionData[number];
    const questionNumber = parseInt(question.question)
    console.log(question)
    
    if(!question) {
        return <div>존재하지 않는 번호</div>;
    }
    if (questionNumber === 10){
        return(
            <div>
                <div>
                    <h1>test {questionNumber}</h1>
                    <NextIcons>
                        <Link to='/result'>
                            <MdDoneOutline size="50" />
                        </Link>
                    </NextIcons>
                </div>
            </div>
        )
    }
    return(
        <div>
            <h1>test {questionNumber}</h1>
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


            <div>
                <NextIcons>
                    <Link to={`/doTest/${questionNumber+1}`}>
                        <MdNextPlan size="50" />
                    </Link>
                </NextIcons>
            </div>
        </div>
    );
};

export default TestBox;

const NextIcons = styled.div`
    bottom: 0;
    padding: 15px 0;
    text-align: center;
    width:200px; 
    margin: 0 auto auto auto;
`;

const Image = styled.img`
    width: 70%;
    height: 70%;
`;