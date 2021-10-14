// 테스트 준비 완료 후 나타나는 테스트 페이지

import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/TestPage/Navbar';
import Result from './Result';
import TestBox from '../components/TestPage/TestBox';

const TestPage = ({ history }) => {
  const [seconds, setSeconds] = useState(parseInt(3));

  // 테스트 준비 ~ 시작 사이 3초 준비시간 countdown
  useEffect(() => {
    const timer = setInterval(() => {
      if (parseInt(seconds) >= 0) {
        setSeconds(parseInt(seconds) - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  // 테스트 시작시 바로 1번 문제로 페이지 전환
  useEffect(() => {
    history.push('/doTest/1');
    // const unblock = history.block('테스트를 끝내겠습니까?');
    // return () => {
    // unblock();
    // history.push('/');
    // };
  }, [history]);

  if (seconds > 0) {
    return (
      <StartBox>
        <div>
          <span>
            <span style={{ fontSize: '150px', color: '#E82B0C' }}>
              {seconds}
            </span>{' '}
            초 후 테스트가 시작됩니다.
          </span>
        </div>
        <div>
          <div></div>
        </div>
      </StartBox>
    );
  }
  if (seconds === 0) {
    return (
      <div>
        <TestStart>
          <h1>Test Start !</h1>
        </TestStart>
      </div>
    );
  }
  return (
    <div>
      {/* <Navbar/> */}
      <Switch>
        <Route path="/result" component={Result} />
        <Route path="/doTest/:number" component={TestBox} />
      </Switch>
    </div>
  );
};

export default TestPage;

const StartBox = styled.div`
  display: flex;
  text-align: center;
  margin-top: 20%;
  color: #002a54;
  justify-content: center;
  font-size: 2rem;
  font-weight: 1000;
`;

const TestStart = styled.div`
  display: flex;
  text-align: center;
  margin-top: 20%;
  color: #e82b0c;
  justify-content: center;
  font-size: 4rem;
  font-weight: 1000;
`;
