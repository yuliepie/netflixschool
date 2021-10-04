import React from "react";
import ImageSlider from "./ImageSlider";
import { SliderData } from "./SliderData";

export default function Home () {
  return (
    <div>
      < ImageSlider slides={SliderData} />
    </div>
  )
}