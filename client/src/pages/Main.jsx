// 메안(렌딩)페이지

import React,{ useEffect, useState } from "react";
// import { Link } from "react-scroll"
import { Link } from "react-router-dom";
import {FiArrowUpCircle} from 'react-icons/fi'
import styled from "styled-components";

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

const TestBox = styled.div`
  background-color: #003F63;
  height: 25rem;
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-around;
`;

const TestSmallBox = styled.div`
  background-color: #FAEBD7;
  /* height: 25rem; */
  /* width: 50%; */
  display: flex;
  flex-direction: column;
  margin-left: 50%;
`;

const Intro = () => {
  return(
    <>
      <IntroBox>
            <h1>About 넷플릭스쿨</h1>
            <IntroSmallBox>
              <span>넷플릭스쿨은 사용자에게 맞춘 영어 학습용 넷플릭스 컨텐츠 추천 웹 서비스입니다.
              데이터 분석을 통해 얻은 인사이트로 다양한 넷플릭스 컨텐츠의 종합 영어 난이도를 평가해, 사용자를 적정 난이도 레벨의 컨텐츠와 매칭시켜줍니다.</span>
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
    <>
      <TestBox>
        <img src="/img/test_example.png" alt="example" style={{'width': '30%', 'height':'85%' ,position:'relative', border:'1px solid black', borderRadius:'10px', boxShadow:'7px 7px 7px black'}}/>
          <TestSmallBox>
            <h1>Level Test</h1>
            <span>넷플리스 컨텐츠에서 비롯된 대사로 이루어져 있는 간단한 테스트를 통해 자신의 영어 실력을 진단 받아보세요.</span>
                    <Link to ="/test" style={{ textDecoration: 'none'}}>
            <p>Take A Test</p>
                    </Link>
          </TestSmallBox>
      </TestBox>
    </>
  )
}

const Ranking = () => {
  return(
    <>
      <div style={{backgroundColor:'#BAB7AC', color:'white', height:'25rem', width:'70%'}}>
        <h1>NEI Ranking</h1> 
        <Link to ="/ContentsRanking" style={{ textDecoration: 'none'}} >
          <p>Learn More</p>
        </Link>
      </div>
    </>
  )
}

const Learning = () => {
  return(
    <>
      <div style={{backgroundColor:'black', color:'white', height:'25rem', width:'70%'}}>
        <h1>Today's English</h1> 
        <Link to ="/learning" >
          <p>Learn More</p>
        </Link>
      </div>
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
        <h1>넷플릭스쿨</h1>
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