import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { QuestionData } from './TestQuestions/q_data'
import TestFormMultipleAnswer from './TestForm_multipleAnswer';
import axios from 'axios';
import { IconContext } from 'react-icons';

const TestBox = ({match}) => {
    const [data, setData] = useState({});
    
    const answer = [1,2,3,4]


    const handleResult = (e) => {
        e.preventDefault();

        axios.post('/api/test/result', {answer: answer}
        ).then((response) =>{
            console.log(response.data)
            setData(response.data)
        }).catch(e)(
            console.log(e)
        )
    }

    const { number } = match.params;
    const question = QuestionData[number];

    if(!question) {
        return <div>존재하지 않는 번호</div>;
    }
    if (parseInt(question.question) === 10){
        return(
            <div>
                <TestFormMultipleAnswer  props = {question}/>
                <div className="submitBox">
                    <div>
                        <Link to={{
                            pathname : '/result',
                            state:{
                                data : data
                            }}}>
                            <YesBox>Submit</YesBox>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div>
            <TestFormMultipleAnswer  props = {question}/>
            <div>
                <div className="submitBox">
                    <Link to={`/doTest/${parseInt(question.question)+1}`}>
                        <NextBox>Next</NextBox>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TestBox;

const YesBox = styled.button`
    margin-top: 20px;
    margin-right: 50px;
    font-size:30px;
    background-color: #E82B0C;
    border-radius : 10px;
    color: white;
    width: 9rem;
    height: 5rem;
    
    :hover{
        background-color: white;
        cursor: pointer;
        color: red;
    }
`;


const NextBox = styled.button`
    margin-top: 20px;
    margin-right: 50px;
    font-size:30px;
    background-color:black;
    border-radius : 10px;
    color: white;
    width: 9rem;
    height: 5rem;

    :hover{
        background-color: white;
        cursor: pointer;
        color: black;
    }
`;