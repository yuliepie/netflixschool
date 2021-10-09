import React from 'react';
import {MdNextPlan, MdDoneOutline} from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { QuestionData } from './TestQuestions/q_data'
import TestFormMultipleAnswer from './TestForm_multipleAnswer';

const TestBox = ({match}) => {
    const { number } = match.params;
    const question = QuestionData[number];

    if(!question) {
        return <div>존재하지 않는 번호</div>;
    }
    if (parseInt(question.question) === 10){
        return(
            <div>
                <div>
                    <TestFormMultipleAnswer  props = {question}/>
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
            <TestFormMultipleAnswer  props = {question}/>
            <div>
                <NextIcons>
                    <Link to={`/doTest/${parseInt(question.question)+1}`}>
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