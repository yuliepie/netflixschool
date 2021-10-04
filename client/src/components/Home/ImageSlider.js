
import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { SliderData } from "./SliderData";


export default function ImageSlider ({ slides }) {
  const[current, setCurrent ] = useState(0);
  const length = slides.length

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length -1 : current - 1)
  }
  console.log('current', current);

  if (! Array.isArray(slides) || slides.length <= 0) {
    return null;
  }


  return (
    <section className='slider'>
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {SliderData.map((slide, index) => {
        return (
          <div className={index === current ? 'alide active' : 'slide'} key={index} >
            {index === current && (<img src={slide.image} alt="netflixschool image" className='image'/>)}
          </div>
        )
      })}
    </section>
  )
}