import ReactWordcloud from 'react-wordcloud';
import React, { useMemo, useRef, useState } from 'react';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const initialSettings = {
  content: {
    allowNumbers: false,
    maxWords: 100,
    stemmer: null,
    stopwordsInput: '',
  },
  wordcloud: {
    colors: [
      '#1f77b4',
      '#ff7f0e',
      '#2ca02c',
      '#d62728',
      '#9467bd',
      '#8c564b',
      '#e377c2',
      '#7f7f7f',
      '#bcbd22',
      '#17becf',
    ],
    fontFamily: 'times new roman',
    fontSizes: [8, 64],
    padding: 1,
    rotations: undefined,
    rotationAngles: [-90, 90],
    spiral: 'archimedean',
    scale: 'linear',
    transitionDuration: 500,
    // Non-configurable
    deterministic: true,
    enableOptimizations: true,
    enableTooltip: true,
  },
};

const options = {
  rotations: 2,
  rotationAngles: [-90, 0],
};
const size = [600, 400];
 
export default function WordCloud(
  {
    words
  }
  ) {
  return (
    <ReactWordcloud
      options={initialSettings}
      size={size}
      words={words}
    />
  );
}