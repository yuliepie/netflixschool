import React from 'react';
import {MdNextPlan} from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NextIcons = styled.div`
    bottom: 0;
    padding: 15px 0;
    text-align: center;
    width:200px; 
    margin: 0 auto
`;

const TestForm = ({props}) => {
    return(
        <div>
            <h1>test {props}</h1>
            <NextIcons>
                <Link to={`/testForm/${props+1}`}>
                    <MdNextPlan size="50" />
                </Link>
            </NextIcons>
        </div>
    )
}

export default TestForm;