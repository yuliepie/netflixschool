// 메안(렌딩)페이지

import React from "react";
import ImageSlider from "../components/Home/ImageSlider";
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'

import { SliderData } from "../components/Home/SliderData";
import HomeIntro from '../components/Home/Testintro';
import ProjectIntro from '../components/Home/ProjectIntro';
import Cando from "../components/Home/Cando";

export default function Home () {
  return (
    <div>
      <Header />
      <ImageSlider slides={SliderData} />
      <HomeIntro />
      <ProjectIntro />
      <Cando />
      <div>카운터</div>
      <Footer />
    </div>
  )
}