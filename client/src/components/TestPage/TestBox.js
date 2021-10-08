// 객관식 문제 유형

import React from 'react';
import {MdNextPlan, MdDoneOutline} from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TestFormMultipleAnswer from '../TestPage/TestForm_multipleAnswer';

const TestBox = ({props}) => {
    if (props === 10){
        return(
            <div>
                <div>
                    <h1>test {props}</h1>
                    <TestFormMultipleAnswer />

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
            <h1>test {props}</h1>
            
            <div>
                <NextIcons>
                    <Link to={`/doTest/${props+1}`}>
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