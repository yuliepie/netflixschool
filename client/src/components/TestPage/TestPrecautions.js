// 테스트 전 주의사항 페이지

import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { Link } from 'react-scroll'

const TestIntro = () => {
    return (
        <div>
          <div style={{display:'flex', flexDirection:'row', paddingTop:'2%'}}>
            <span className="testIntroBoxtwo">넷플릭스 컨텐츠를 이용한 재밌는 테스트</span>
            <div className="testIntroBox">
                <span style={{ fontSize: "1.5rem", color: "black"}}>
                    정확한 수준에 맞게 공부하지 않는다면 100% 학습 효과를 볼 수 없습니다. 다양한 데이터를 바탕으로 심도있게 고안해낸 넷플릭스쿨의 테스트를 통해 당신의 현재 레벨을 확인해보세요!
                </span>
            </div>
          </div>
        </div>
    )
}

const Precautions = () => {
  return (
    <div className="ready" id="ready">
      <span style={{ fontSize: '1rem', color: 'black', textAlign: 'center' }}>
        <h1 style={{ color: '#E82B0C', fontSize: '3rem', textAlign: 'center'  }}>
          <strong>주의사항</strong>
        </h1>
        <br />
        <br />
        <h2>
          테스트 도중 이탈할 시 테스트 내용은 저장되지 않습니다.
          <br />
          <br />
          다른 사람과 상의하거나 답을 찾아볼 경우 정확한 결과를 받을 수
          없습니다.
          <br />
          <br />
        </h2>
        <br />
        <p style={{ fontSize: '70px' }}>
          <strong>Ready?</strong>
        </p>
        <br />
        <div>
          <NavLink to="/dotest">
            <YesBox>Yes</YesBox>
          </NavLink>
          <NavLink to="/">
            <YesBox>No</YesBox>
          </NavLink>
        </div>
      </span>
    </div>
  );
};

function TestPrecautions() {
    return (
            <div>
                <div style={{width:'100%', height:'100vh'}} >
                    <div className='testReadyFirst'>
                        <h1>테스트를 통해 당신의 레벨을 확인해보세요!</h1>
                    </div>
                    <TestIntro />
                    <TestBoxes>
                      <TestTime>
                        <span>테스트 유형</span>
                        <h1>객관식</h1>
                      </TestTime>
                      <TestTime>
                        <span>테스트 예상 소요시간</span>
                        <h1>10m</h1>
                      </TestTime>
                      <TestTime>
                        <span>테스트 문제수</span>
                        <h1>15Q</h1>
                      </TestTime>
                    </TestBoxes>
                    <GoToTest>
                      <p className="goTest">테스트 보러가기</p>
                    <Link to="ready" spy={true} smooth={true}>
                      <span className="goTestButton">
                          click me
                      </span>
                      </Link>
                    </GoToTest>
                    
                </div>
                <div>
                    <Precautions />
                </div>
            </div>
        );
    }

export default TestPrecautions;

const TestBoxes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;


const TestTime = styled.div`
  padding: 3%;
`;

const YesBox = styled.button`
  margin-top: 20px;
  font-size: 60px;
  background-color: black;
  border-radius: 10px;
  color: white;
  width: 10rem;
  height: 5rem;
  margin-right: 70px;
  margin-left: 70px;

  :hover {
    background-color: #e82b0c;
    cursor: pointer;
    color: black;
  }
`;

const GoToTest = styled.div`
  display: flex;
  /* flex-direction: column;
  justify-content: center; */
  margin: auto;
  width: 30%;
  flex-direction: column;
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
