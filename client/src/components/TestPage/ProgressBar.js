import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import AnimatedNumber from 'react-animated-number';

function ProgressBar({ progress }) {
  return (
    <Container>
      <TextWrapper>
        <Number
          value={progress}
          stepPrecision={0}
          formatValue={(n) => `${n}%`}
        />
      </TextWrapper>
      <BarWrapper>
        <Bar progress={progress} />
      </BarWrapper>
    </Container>
  );
}

export default ProgressBar;

const Container = styled.div`
  width: 80%;
  max-width: 80%;
  min-width: 540px;
  display: flex;
  flex-direction: column;
`;

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const BarWrapper = styled.div`
  width: 100%;
  height: 16px;
  background-color: #dcdcdc;
  margin-bottom: 30px;
  border-radius: 4px;
  box-shadow: 1px 1px 1px 1px gray;
`;

const Bar = styled.div`
  width: ${(props) => `${props.progress}%`};
  height: 16px;
  background-color: #e82b0c;
  border-radius: 4px;
  transition: width ease 0.5s;
  box-shadow: 1px 1px 1px 1px gray;
`;

const Number = styled(AnimatedNumber)`
  transition: 0.3s ease-out;
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  font-size: 30px;
  text-shadow: 2px 2px 2px gray;
`;
