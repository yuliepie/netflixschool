// 테스트 전 주의사항 페이지

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';


const TestPrecautions = () => {
    return(
        <IconContext.Provider
            value={{ color: '#E82B0C', size: '50px' }}
            >
            <div>
                <IntroBlock>
                    <div>
                        <h1>
                            <strong>주의사항</strong>
                        </h1>
                        <br />
                        <br />
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
                    <br />
                    <div>

                            <Link to="/dotest">
                                <YesBox>Yes</YesBox>
                                {/* <AiFillCheckCircle /> */}
                            </Link>
                            <Link to="/">
                                <YesBox>No</YesBox>
                                {/* <MdCancel /> */}
                            </Link>
                        
                    </div>
                </ReadyBox>
            </div>
        </IconContext.Provider>
    )
}

export default TestPrecautions;

const IntroBlock = styled.div`
/* 
    width:600px;
    height:300px; */
    margin-top: 15%;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    /* position:absolute; */
    /* left:50%;
    top:40%; */
    /* margin-left:-200px; */
    /* margin-top:-150px; */

    h1 {
        font-weight: 300;
        font-size: 45px;
    }
    h2 {
        font-weight: 200;
        font-size: 20px;
    }
`;

const ReadyBox = styled.div`
    /* width:600px;
    height:300px;
    position:absolute;
    left:50%;
    top:70%;
    margin-left:-290px;
    margin-top:-150px; */
    flex-direction: row;
    margin-top: 70px;
    text-align: center;
    align-items: center;

    p {
        font-size: 70px;
    }
`;

const YesBox = styled.button`
    margin-top: 20px;
    font-size:60px;
    background-color:black;
    border-radius : 10px;
    color: white;
    width: 10rem;
    height: 5rem;
    margin-right:70px;
    margin-left:70px;

    :hover{
        background-color: #E82B0C;
        cursor: pointer;
        color: black;
    }
`;

// const ButtonBox = styled.button`
//     display: flex;
//     /* flex-direction: row; */
//     border: none;
//     justify-content: center;
// `;