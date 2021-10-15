// 메안(렌딩)페이지

import React,{ useEffect, useState } from "react";
// import { Link } from "react-scroll"
import { Link } from "react-router-dom";
import {FiArrowUpCircle} from 'react-icons/fi'

const Intro = () => {
  return(
    <>
      <div style={{backgroundColor:'#FAEBD7', height:'25rem', width:'70%'}}>
          <h1>About 넷플릭스쿨</h1>
          <Link to ="/intro" style={{ textDecoration: 'none'}}>
            <p>Learn More</p>
          </Link>
        </div>
    </>
  )
}

const Test = () => {
  return(
    <>
      <div style={{backgroundColor:'#003F63', color:'white', height:'25rem', width:'70%'}}>
        <h1>Level Test</h1> 
        <Link to ="/test" style={{ textDecoration: 'none'}}>
          {/* <BsBoxArrowInRight className="gotoPage" size='5rem' color='white'/> */}
          <p>Take A Test</p>
        </Link>
      </div>
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