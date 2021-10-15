// 소개 페이지

import styled from 'styled-components';
import './Intro.css'
import {Animator, FadeUp, ScrollContainer, ScrollPage, Sticky, Zoom, batch, MoveOut, ZoomIn, StickyIn, FadeIn, FadeOut, Move, MoveIn} from 'react-scroll-motion';

const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());


export default function Intro () {
  return (
    <div>
      <IntroPage>
        <TopTitlte>
          <Title>어려운 영어공부,<br/>
            넷플릭스쿨과 함께 해보세요!</Title>
        </TopTitlte>
        <div className="IntroPage">
        </div>
        <DescBox>Netflixschool은 사용자에게 맞춘 영어 학습용 넷플릭스 컨텐츠를 추천해주는 웹 서비스입니다.
            데이터 분석을 통해 얻은 인사이트로 다양한 넷플릭스 컨텐츠의 종합 영어 난이도를 평가해, 사용자를 적정 난이도 레벨의 컨텐츠와 매칭시켜줍니다.
        </DescBox>
          <HowToUse>
            <h1 style={{fontFamily:'score', fontSize:'3rem'}}>How To Use</h1>
            <p>넷플릭스쿨을 가장 효율적으로 사용하는 방법!</p>
          </HowToUse>
        <HowToUseHeaddiv>
          <HowToUseHead>
            <span>
              먼저 넷플릭스쿨의 '테스트' 페이지에서 간단한 테스트를 통해 자신의 영어 실력을 진단받아보세요. 넷플릭스 컨텐츠에서 비롯된 대사들로 이루어져 있으며, 사용자의 어휘능력을 평가하는데 목적을 둡니다.<br/>
              <br/>
              테스트를 마치면 결과 분석을 통해 이용자의 현재 영어 어휘수준에 대한 간단한 결과보고와 함께, 영어공부에 도움이 될만한 컨텐츠를 맞춤 추천해드려요!
            </span>
          </HowToUseHead>
          <Image src='./img/32.jpeg' alt="image1" />
        </HowToUseHeaddiv>
        <HowToUseHeaddiv>
        <ImageLeft src='./img/32.jpeg' alt="image1" />
          <HowToUseHead>
            <span>
            또한 NEI Ranking Page에 방문하시면 다양한 넷플릭스 컨텐츠의 종합 영어난이도(NEI)를 한눈에 볼 수 있습니다. NEI 지수를 구경해보고, 관심 있는 작품을 선택해 작품의 상세 정보와 실제 영어 예문도 확인해보세요.
            </span>
          </HowToUseHead>
        </HowToUseHeaddiv>
        <HowToUseHeaddiv>
          <HowToUseHead>
            <span>
            Today's Netflix English 탭에 방문해서 단어 레벨별 오늘의 영어 예문, 그리고 간단한 퀴즈도 풀며 나의 데일리 영어공부를 시작해보세요.
            </span>
          </HowToUseHead>
          <Image src='./img/32.jpeg' alt="image1" />
        </HowToUseHeaddiv>
        
        <HowToUse>
          <h1 style={{fontFamily:'score', fontSize:'3rem'}}>How it works?</h1>
          <p>넷플릭스쿨을 가장 효율적으로 사용하는 방법!</p>
        </HowToUse>
      </IntroPage>
    </div>
  )
}

{/* <div class="vl"></div> */}


const IntroPage = styled.div`
  height: 100%;
  width: 100% ;
`;

const TopTitlte = styled.div`
  display: flex;
  padding: 5%;
`

const Title = styled.h1`
  text-shadow: 3px 3px 3px lightgray;
  font-size: 2.5rem;
`;

const DescBox = styled.h2`
  width: 50%;
  padding-left: 5%;
  padding-top: 3%;
`;

const HowToUse = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  padding: 20%;

  p{
    padding: 1%;
    font-size: 1.5rem;
  }
`;

const HowToUseHead = styled.div`
  width: 40%;
  padding-left: 5%; 
  font-size: 1.2rem;
`;

const HowToUseHeaddiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
padding-top: 5%;
`;

const Image = styled.img`
  /* height: 60%; */
  width: 48%;
  float: right;
`;

const ImageLeft = styled.img`
  /* height: 60%; */
  width: 49%;
`;






{/* <div style={{width:'100%', height:'100vh'}} >
      <div className="IntroPage">
        <h1>About us</h1>
      </div>
    </div> */}

// const Image = styled.img`
//   margin: 0px auto;
//   width: 20%;
//   display: flex;
//   align-items: center;
// `;

// const AlignCenter = styled.div`
//   margin: auto;
//   width: 20%;
//   display: flex;
//   text-align: center;
// `;


// const AlignList = styled.div`
//   margin: auto;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// <div >
//       <br />
//       <br />
//       <div>
//         <div style={{textAlign:'center'}}>
//           <h1 style={{backgroundColor : "#dc143c ", color:'white', width:'50%', margin:'auto'}}>Introduce The Topic</h1>
//         </div >
//         <strong>
//           <p style={{textAlign:'center'}}>
//             코로나로 인해 오프라인 수업이 제한되면서 다양한 온라인 교육 강의에 대한 수요가 증가하고 있습니다.
//           </p>
//         </strong>
//         <div><Image src='/img/article.png' alt='questionimg' /></div>
//         <AlignCenter>
//           <strong>
//             <p style={{textAlign:'center'}}>
//               이런 추세에 따라 저희는 OTT플랫폼 중 넷플릭스에 있는 작품을 영어 공부에 사용할 수 있도록 사용자의 수준에 맞는 작품을 추천해주는 서비스를 제공하고자 합니다. 궁극적으로 사용자가 본인 수준에 맞는 작품을 가지고 더욱 쉽고 효율적으로 영어 학습을 할 수 있도록 도와주는 서비스입니다.
//             </p>
//           </strong>
//         </AlignCenter>
//         <br />
//       </div>
//       <br />
//       <br />
//       <div style={{textAlign:'center'}}>
//         <h1 style={{backgroundColor : "#dc143c", color:'white', width:'50%', margin:'auto'}}>The Process Of Handling Data</h1>
//         <div>
//           <h2 >A. 데이터 수집</h2>
//             <strong>
//               <p> a. 영어 단어 데이터</p>
//             <AlignCenter>
//               <p>영어 단어의 레벨을 기준으로 작품 대사에서 사용되는 대사의 난이도를 판단하기 위해 여러 검증된 기관의 단어 리스트를 수집했습니다. 해당 리스트에는 각 기관별 레벨로 단어를 나누고 있습니다. </p>
//             </AlignCenter>
//             <AlignList>
//               <span style ={{fontSize:'18px',  border: "4px dashed", width:'30%'}}>
//                 <p>Oxford</p>
//                 <p>Lexile</p>
//                 <p>New General Service List</p>
//                 <p>TOEFL</p>
//                 <p>AWSL</p>
//                 <p>TSL(TOEIC)</p>
//                 <p>BSL(Business Service Language)</p>
//                 <p>네이버 사전</p>
//               </span>
//             </AlignList>
//               <p>약 3만개 이상의 단어를 수집하여 난이도 선정의 정확성을 높이고자 하였습니다.</p>
//             <br />
//             <br />
//             <li>b. 작품 데이터</li>
//             <AlignCenter>
//               <p>
//                 넷플릭스 자막을 추출하여 데이터를 얻었고 데이터에 포함되어있는 컬럼 중 말하는 시간의 시작과 끝, 대사 컬럼을 이용하였습니다. 대사 컬럼의 데이터들은 대사를 단어 단위로 나누어주는 과정을 진행하여 작품에서 사용하는 단어를 모두 수집하였습니다. 
//                 <br />
//                 <br />
              
//                 해당 데이터를 통해
//               </p>
//             </AlignCenter>
//                   <AlignList>
//                     <span style={{fontSize:'18px',  border: "4px dashed", width:'50%'}}>
//                       <p>작품 내 대사들이 사용하는 단어의 난이도와 단어의 사용 빈도수</p>
//                       <p>한 문장을 말힐 때 걸리는 시간 - 말의 속도 WPS</p>
//                       <div><img src='/img/Wps.png' alt='wps' /></div>
//                     </span>
//                   </AlignList>
//                 두가지 기준을 이용하여 작품의 난이도를 결정하였습니다.
//           </strong>
//         </div>
//         <br />
//         <br />
//         <div>
//           <strong>
//             <h2>B. 데이터 분석</h2>
//               <AlignList>
//                 <span style={{fontSize:'18px',  border: "4px dashed", width:'30%'}}>
//                   <p>작품 대본데이터</p>
//                   <p>WPS 수치 데이터</p>
//                   <p>다양한 출처의 영어 단어 난이도 데이터</p>
//                 </span>
//               </AlignList>
//             총 세가지 데이터를 이용하여 데이터 분석 과정을 진행했습니다.
//             <br />
//               <p style={{textAlign:'center'}}>영어 단어 난이도 데이터를 다양하게 수집했기 때문에 작품에서 사용하는 단어들이 단어 리스트별로 어떤 난이도를 갖는지 작품별로 바그래프를 그려 확인해보았습니다.</p>
//               <div><img src='/img/About.Time_level.png' alt='aboutTime' /></div>
//               <br />
//               <AlignCenter>
//                 <p>위 그래프가 그 중 하나입니다. 해당 그래프를 통해 작품에서 단어 리스트별 난이도 분포가 어떻게 되는지 확인하였고 단어 리스트들이 어떤 경향성을 갖는지 히트맵을 이용하여 확인해보았습니다.</p>
//               </AlignCenter>
//               <br />
//               <div><img src='/img/Heatmap.png' alt='Heatmap' /></div>
//               <br />
//               <p>이런 과정을 통해 데이터를 분석했고 최종적으로 영단어 레벨을 6단계로 나눈 결과를 도출했습니다.</p>
//           </strong>
//         </div>
//       </div> 
//     </div>