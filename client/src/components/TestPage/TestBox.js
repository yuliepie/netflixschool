import React  from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { QuestionData } from './TestQuestions/q_data'
import TestFormMultipleAnswer from './TestForm_multipleAnswer';
import axios from 'axios';

const TestBox = ({match, history}) => {
    
    const answer = [1,2,3,4]

    const handleResult = async(e) => {
        e.preventDefault();

        const response = await axios.post('/api/test/result', {answer: answer})
        history.push({
            pathname: "/result",
            state: {data: response.data}
        })
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
                        <YesBox onClick = {handleResult}>Submit</YesBox>
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