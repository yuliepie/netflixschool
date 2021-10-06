import React from "react";
import ImageSlider from "../components/Home/ImageSlider";
import { SliderData } from "../components/Home/SliderData";
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'

export default function Home () {
  return (
    <div>
      <Header />
      <ImageSlider slides={SliderData} />
      <div>다양한 영화와 드라마</div>
      <div>효율적인 학습</div>
      <div>넷플릭스쿨과 할수 있는 것들</div>
      <div>카운터</div>
      <Footer />
    </div>
  )
}