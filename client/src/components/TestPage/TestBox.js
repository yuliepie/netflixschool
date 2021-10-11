import React, { useState } from 'react';
import {MdNextPlan, MdDoneOutline} from 'react-icons/md';
import {IoMdCheckboxOutline} from 'react-icons/io'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { QuestionData } from './TestQuestions/q_data'
import TestFormMultipleAnswer from './TestForm_multipleAnswer';
import axios from 'axios';

const TestBox = ({match}) => {
    const [data, setData] = useState({});
    const [level, setLevel] = useState({});
    
    const answer = [1,2,3,4]


    const handleResult = (e) => {
        e.preventDefault();

        axios.post('/api/test/result', {answer: answer}
        ).then((response) =>{
            console.log(response.data)
            setData(response.data)
        })
        // .then(
        //     console.log(
        //         'data',data
        //     )
        // )
    }

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
                    <IoMdCheckboxOutline size="50" onClick = {handleResult}/>
                    <NextIcons>
                        <Link to={{
                            pathname : '/result',
                            state:{
                                data : data
                            }}}>
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
                        <IoMdCheckboxOutline size="50" />
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