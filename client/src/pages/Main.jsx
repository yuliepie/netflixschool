// 메안(렌딩)페이지

import React from "react";
import ImageSlider from "../components/Home/ImageSlider";
import Header from '../components/common/Header'

import { SliderData } from "../components/Home/SliderData";
import TestIntro from '../components/Home/TestIntro';
import ProjectIntro from '../components/Home/ProjectIntro';
import WhatCanDo from "../components/Home/WhatCanDo";



export default function Main () {
  return (
    <div >
      <div className="MainFirst">
          {/* <Header /> */}
        {/* </div>
        <ImageSlider slides={SliderData} />
        <div> */}
          {/* <TestIntro />
        <ProjectIntro />
        <WhatCanDo /> */}
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