import ReactWordcloud from 'react-wordcloud';
import React, { useMemo, useRef, useState } from 'react';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const initialSettings = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: true,
  fontFamily: "impact",
  fontSizes: [5, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1,
  rotations: 3,
  rotationAngles: [0, 30],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000
};

const callbacks = {
  onWordClick: console.log,
  onWordMouseOver: console.log,
}

const size = [600, 400];

export default function WordCloud(
  {
    words
  }
  ) {
  return (
    <ReactWordcloud
      callbacks={callbacks}
      options={initialSettings}
      size={size}
      words={words}
    />
  );
}