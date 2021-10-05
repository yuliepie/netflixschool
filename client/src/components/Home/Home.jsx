import React from "react";
import ImageSlider from "./ImageSlider";
import { SliderData } from "./SliderData";

export default function Home () {
  return (
    <div>
      <ImageSlider slides={SliderData} />
      <div>다양한 영화와 드라마</div>
      <div>효율적인 학습</div>
      <div>넷플릭스쿨과 할수 있는 것들</div>
      <div>카운터</div>
    </div>
  )
}