// 주관식 문제 유형

import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { QuestionData } from "./QuestionData";

const TestFormShortAnswer = ({ slides }) => {
    const[current, setCurrent ] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length -1 : current - 1)
    };
    console.log('current', current);

    if (! Array.isArray(slides) || slides.length <= 0) {
        return null
    };


    return (
        <div>
            <section className='slider'>
            <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
            <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
            {QuestionData.map((slide, index) => {
                return (
                <div className={index === current ? 'slide active' : 'slide'} key={index} >
                    {index === current && (<img src={slide.image} alt="netflixschool" className='slideimage'/>)}
                </div>
                )
            })}
            </section>
            <input name='answer' />
        </div>
    )

}

export default TestFormShortAnswer;