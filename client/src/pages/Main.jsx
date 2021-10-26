// 메안(렌딩)페이지

import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {FiArrowUpCircle} from 'react-icons/fi'
import styled from "styled-components";
import "./Main.css"


const Intro = () => {
  return(
    <>
      <IntroBox>
            <h1>넷플릭스쿨을 소개합니다!</h1>
            <IntroSmallBox>
              <span>넷플릭스쿨은 사용자 맞춤 영어 학습용 넷플릭스 컨텐츠 추천 웹 서비스입니다.
              다양한 데이터를 분석하여 도출한 넷플릭스 컨텐츠들의 종합 영어 난이도를 통해 사용자에게 영어 수준에 맞는 컨텐츠를 매칭해줍니다.</span>
              <Link to ="/intro" style={{ textDecoration: 'none'}}>
                <p>Learn More</p>
              </Link>
            </IntroSmallBox>
      </IntroBox>
    </>
  )
}

const Test = () => {
  return(
    <TestFirstBox>
      <img src="/img/test_example.png" alt="example" style={{'width': '30%', 'height':'60%' ,position:'relative', border:'1px solid black', borderRadius:'10px', boxShadow:'7px 7px 7px black', margin: '5%'}}/>
      <TestBox>
          <h1>현재 영어 실력을 확인하고 싶으신가요?</h1>
          <TestSpanBox>
            <span>간단한 테스트를 통해 영어 수준이 어느 정도인지 확인해보세요! 테스트 문제들은 실제 넷플리스 작품에 등장하는 대사들로 이루어져 있습니다.</span>
          </TestSpanBox>
          <ToTestBtn>
            <Link to ="/test" style={{ textDecoration: 'none'}}>
              <p>Take A Test</p>
            </Link>
          </ToTestBtn>
      </TestBox>
    </TestFirstBox>
  )
}

const Ranking = () => {
  return(
    <>
      <RankingBox>
        <RankingSmallBox>
          <h1>넷플릭스쿨의 차별점, NEI Value</h1>
          <RankingSpan>
            <span>NEI수치란 넷플릭스 컨텐츠의 대사/말의 속도 그리고 영어 단어의 데이터를 통해 정한 넷플릭스 작품 종합 영어 난이도입니다. NEI수치별로 다양한 컨텐츠를 추천받으세요!</span>
          </RankingSpan>
          <ToRankBtn>
            <Link to ="/ContentsRanking" style={{ textDecoration: 'none'}} >
              <p>Learn More</p>
            </Link>
          </ToRankBtn>
        </RankingSmallBox>
        <img src="/img/ranking_example.png" alt="example" style={{'width': '30%', 'height':'60%' ,position:'relative', border:'1px solid black', borderRadius:'10px', boxShadow:'7px 7px 7px black', margin: '5%', display:'flex', alignItems:'end'}}/>
      </RankingBox>
    </>
  )
}

const Learning = () => {
  return(
    <>
      <LearningBox>
        <img src="/img/learning_example.png" alt="example" style={{'width': '30%', 'height':'60%' ,position:'relative', border:'1px solid black', borderRadius:'10px', boxShadow:'7px 7px 7px black', margin: '5%'}}/>
        <LearningSmallBox>
          <h1>1일, 한 문장, 퀴즈 한개!</h1>
          <TestSpanBox><span>Today's Netflix English를 통해 매일 레벨별로 한개씩 오늘의 문장과 단어를 확인해보세요. 간단한 퀴즈를 통해 꾸준한 실력 확인도 가능합니다.</span></TestSpanBox>
          <ToTestBtn>
            <Link to ="/learning" >
              <p>Learn More</p>
            </Link>
          </ToTestBtn>
        </LearningSmallBox>
      </LearningBox>
    </>
  )
}

export default function Main () {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  return (
    <div className="container">
      <div className="MainFirst" id="1">
        <MainTitle>
          <h1 className="MainTitle" style={{fontFamily: "score", textShadow: '6px 5px 5px black'}}>NetflixSchool,</h1>
          <h2 style={{textShadow: '6px 5px 5px black'}}>재밌게 영어 공부하고 싶다면, 넷플릭스쿨.</h2>
        </MainTitle>
      </div>
      <div className="MainIntro" id="2">
        <Intro/>
      </div>
      <div className="MainTest" id="3">
        <Test/>
      </div>
      <div className="MainRanking" id="4">
        <Ranking/>
      </div>
      <div className="MainLearning" id="5">
        <Learning />
      </div>

      {showButton && (
        <button onClick={scrollToTop} className="back-to-top">
          <FiArrowUpCircle style={{color:'white'}} />
        </button>
      )}
    </div>
  )
}

const MainTitle = styled.div`
  width: 50%;
  display: flex;
  text-align: center;
  flex-direction: column;
  margin-bottom: 10%;
  
`;

const IntroBox = styled.div`
  background-color: #FAEBD7;
  height: 25rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const IntroSmallBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 5%;
`;

const TestFirstBox = styled.div`
  background-color: #003F63;
  height: 25rem;
  width: 100%;
  display: flex;
`;

const TestBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-top: 5%;
  padding-right: 5%;
  /* justify-content: end; */
  /* flex-direction: column; */
  /* justify-content: space-around; */
`;

const TestSpanBox = styled.div`
  padding-top: 5%;
  /* padding-right: 10%; */
  /* width: 50%; */
  display: flex;
  text-align: center;
`;

const ToTestBtn = styled.div`
  display: flex;
  margin-top: 5%;
  margin-right: 40%;
  /* align-items: center; */
`;

const RankingBox = styled.div`
  background-color: #BAB7AC;
  color: white;
  height: 25rem;
  width: 100%;
  display: flex;
  /* padding-top: 5%; */
`;


const RankingSpan = styled.div`
  padding-top: 3%;
  display: flex;
  text-align: center;
`;

const RankingSmallBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 5%;
  padding-left: 5%;
  width: 50%;
`;

const ToRankBtn = styled.div`
  display: flex;
  margin-top: 5%;
  margin-left: 30%;
  /* align-items: center; */
`;

const LearningBox = styled.div`
  background-color: black;
  color:white;
  height: 25rem;
  width: 100%;
  display: flex;
`;

const LearningSmallBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-top: 5%;
  padding-right: 5%;
  /* justify-content: end; */
  /* flex-direction: column; */
  /* justify-content: space-around; */
`;



// import Slider from "react-slick"; 
// // import './slick.css'; 
// // import './slick-theme.css';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "green" }}
//       onClick={onClick}
//     />
//   );
// }

// export default class SimpleSlider extends Component {
//   render() {
//     const settings = {
//       dots: true,
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 1,
//       arrows: true,
//       centerMode: true,
//       className: 'react__slick__slider__parent',
//       nextArrow: <SampleNextArrow />,
//       prevArrow: <SamplePrevArrow />
//     };
//     return (
//       <div>
//         <h2> Single Item</h2>
//         <Slider {...settings}>
//           <div>
//             <h3>1</h3>
//           </div>
//           <div>
//             <h3>2</h3>
//           </div>
//           <div>
//             <h3>3</h3>
//           </div>
//           <div>
//             <h3>4</h3>
//           </div>
//           <div>
//             <h3>5</h3>
//           </div>
//           <div>
//             <h3>6</h3>
//           </div>
//         </Slider>
//       </div>
//     );
//   }
// }