// 테스트 전 주의사항 페이지

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {Animator, Fade, ScrollContainer, ScrollPage, Sticky, batch, MoveOut} from 'react-scroll-motion';
import ScrollToBottom from '../common/ScrollBottom';

const TestIntro = () => {
    return (
        <div style={{ marginLeft: '23rem', height:'20rem',width:'30rem',textAlign:'center'}}>
            {/* <div style={{padding:'1rem'}}></div> */}
            <span style={{ fontSize: "1.5rem", color: "black"}}>
                정확한 수준에 맞게 공부하지 않는다면 100%의 효과를 볼 수 없습니다. 넷플릭스쿨의 테스트를 통해 당신의 현재 레벨을 확인해보세요! 
            </span>
        </div>
    )
}

const Precautions = () => {
    return(
        <div style={{marginLeft: '23rem',width:'50rem'}}>
            <span style={{ fontSize: "1rem", color: "black", textAlign:'center'}}>
                <h1 style={{color:'#E82B0C', fontSize:'3rem'}}>
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
                <br />
                <p style={{fontSize:'70px'}}><strong>Ready?</strong></p>
                <br />
                <div>
                    <Link to="/dotest">
                        <YesBox>Yes</YesBox>
                    </Link>
                    <Link to="/">
                        <YesBox>No</YesBox>
                    </Link>
                </div>
            </span>
        </div>
    )
}

function TestPrecautions() {
    return (
            <div className="container">
                <ScrollContainer>
                    <ScrollPage page = {0}>
                        <div className='testReadyFirst'>
                            <h1>테스트를 통해 당신의 레벨을 확인해보세요!</h1>
                        </div>
                        <Animator animation={batch(Sticky(), Fade(), MoveOut(0, -1000))}>
                            <TestIntro />
                        </Animator>
                        <button onClick={ScrollToBottom}>
                            xczc
                        </button>
                    </ScrollPage>
                    <ScrollPage page={1}>
                        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -50))}>
                            <Precautions />
                        </Animator>
                    </ScrollPage>
                </ScrollContainer>
            </div>
        );
    }

export default TestPrecautions;

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



// const TestPrecautions = () => {
//     return(
//         <IconContext.Provider
//             value={{ color: '#E82B0C', size: '50px' }}
//             >
//             <div>
//                 <IntroBlock>
//                     <div>
//                         <h1>
//                             <strong>주의사항</strong>
//                         </h1>
//                         <br />
//                         <br />
//                         <h2>
//                             테스트 도중 이탈할 시 테스트 내용은 저장되지 않습니다.<br />
//                             <br />
//                             다른 사람과 상의하거나 답을 찾아볼 경우 정확한 결과를 받을 수 없습니다.<br />
//                             <br />
//                         </h2>
//                     </div>
//                 </IntroBlock>
//                 <ReadyBox>
//                     <p><strong>Ready?</strong></p>
//                     <br />
//                     <div>

//                             <Link to="/dotest">
//                                 <YesBox>Yes</YesBox>
//                             </Link>
//                             <Link to="/">
//                                 <YesBox>No</YesBox>
//                             </Link>
                        
//                     </div>
//                 </ReadyBox>
//             </div>
//         </IconContext.Provider>
//     )
// }



// const IntroBlock = styled.div`
//     display: flex;
//     padding-top: 15%;
//     align-items: center;
//     text-align: center;
//     justify-content: center;

//     h1 {
//         font-weight: 300;
//         font-size: 45px;
//     }
//     h2 {
//         font-weight: 200;
//         font-size: 20px;
//     }
// `;

// const ReadyBox = styled.div`
//     flex-direction: row;
//     margin-top: 70px;
//     text-align: center;
//     align-items: center;

//     p {
//         font-size: 70px;
//     }
// `;




// const Box = styled.div`
//     margin-left: 23rem;
// `;