import React from 'react';
import TestPrecautions from '../components/TestPage/TestPrecautions';
import Fade from "react-reveal/Fade";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TestButton = styled.p`
    text-align:center;
    font-size: 45px;
    color: red;
`;

const TestMain = () => {
    return(
        <div>
            <Fade top >
                <TestPrecautions />
                <Link to=
                "/dotest" style={{'textDecoration':'none'}}>
                    <TestButton>Test Start</TestButton>
                </Link>
            </Fade>
        </div>
    )
}

export default TestMain;