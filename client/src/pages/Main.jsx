// 메안(렌딩)페이지

import React from "react";
// import { Link } from "react-scroll"
import { Link } from "react-router-dom";
import {BsBoxArrowInRight} from 'react-icons/bs'

const Intro = () => {
  return(
    <>
      <h1>소개페이지</h1> 
      <Link to ="/intro">
        <BsBoxArrowInRight className="gotoPage" size='15rem' color='black'/>
      </Link>
    </>
  )
}

const Test = () => {
  return(
    <>
      <h1>테스트페이지</h1> 
      <Link to ="/test">
        <BsBoxArrowInRight className="gotoPage" size='15rem' color='white'/>
      </Link>
    </>
  )
}

const Ranking = () => {
  return(
    <>
      <h1>랭킹페이지</h1> 
      <Link to ="/ContentsRanking">
        <BsBoxArrowInRight className="gotoPage" size='15rem' color='black'/>
      </Link>
    </>
  )
}

const Learning = () => {
  return(
    <>
      <h1>학습페이지</h1> 
      <Link to ="/learning">
        <BsBoxArrowInRight className="gotoPage" size='15rem' color='white'/>
      </Link>
    </>
  )
}

export default function Main () {
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