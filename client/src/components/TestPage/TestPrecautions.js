// 테스트 전 주의사항 페이지

import React from 'react';
import styled from 'styled-components';
import {AiFillCheckCircle} from 'react-icons/ai'
import {MdCancel} from 'react-icons/md'
import { Link } from 'react-router-dom';
// import Zoom from "react-reveal/Zoom";

const TestPrecautions = () => {
    return(
        
            <div>
                <IntroBlock>
                    
                    <div>
                        <h1>
                            <strong>주의사항</strong>
                        </h1>
                        <h2>
                            테스트 도중 이탈할 시 테스트 내용은 저장되지 않습니다.<br />
                            <br />
                            다른 사람과 상의하거나 답을 찾아볼 경우 정확한 결과를 받을 수 없습니다.<br />
                            <br />
                        </h2>
                    </div>
                    
                </IntroBlock>
                <ReadyBox>
                    
                    <p><strong>Ready?</strong></p>
                    <div>
                        <Link to="/dotest">
                            <AiFillCheckCircle size="30"/>
                        </Link>
                        <Link to="/">
                            <MdCancel size="30"/>
                        </Link>
                    </div>
                    
                </ReadyBox>
            </div>
    
    )
}

export default TestPrecautions;

const IntroBlock = styled.div`

    width:600px;
    height:300px;
    position:absolute;
    left:50%;
    top:40%;
    margin-left:-290px;
    margin-top:-150px;

    h1 {
        text-align: center;
        margin: 50;
        font-weight: 300;
        font-size: 45px;
    }
    h2 {
        text-align: center;
        font-weight: 200;
        font-size: 20px;
    }
    /* span {
        display: flex;
        text-align: center;
        align-items: center;
        margin: auto;
    } */
`;

const ReadyBox = styled.div`
    width:600px;
    height:300px;
    position:absolute;
    left:50%;
    top:70%;
    margin-left:-290px;
    margin-top:-150px;
    text-align: center;
    align-items: center;

    p {
        font-size: 30px;
    }
`;