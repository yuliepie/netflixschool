// 메안(렌딩)페이지

import React from "react";
import ImageSlider from "../components/Home/ImageSlider";
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'

import { SliderData } from "../components/Home/SliderData";
import TestShortcut from '../components/Home/TestShortcut';
import ProjectShortcut from '../components/Home/ProjectShortcut';
import WhatCanDo from "../components/Home/WhatCanDo";

export default function Home () {
  return (
    <div>
      <Header />
      <ImageSlider slides={SliderData} />
      <TestShortcut />
      <ProjectShortcut />
      <WhatCanDo />
      <Footer />
    </div>
  )
}