// 메안(렌딩)페이지

import React from "react";
import ImageSlider from "../components/Home/ImageSlider";
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'

import { SliderData } from "../components/Home/SliderData";
import TestIntro from '../components/Home/TestIntro';
import ProjectIntro from '../components/Home/ProjectIntro';
import WhatCanDo from "../components/Home/WhatCanDo";
import Sidebar from "../components/common/Sidebar";

export default function Home () {

  return (
    <div>
      <div>
        <Header />
      </div>
      {/* <ImageSlider slides={SliderData} /> */}
      {/* <div>
        <TestIntro />
      </div>
      <ProjectIntro />
      <WhatCanDo /> */}
      <hr />
      <Footer />
    </div>
  )
}