import React from "react";
import ImageSlider from "../components/Home/ImageSlider";
import { SliderData } from "../components/Home/SliderData";
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'

export default function Home () {
  return (
    <div>
      <Header />
      < ImageSlider slides={SliderData} />
      <Footer />
    </div>
  )
}