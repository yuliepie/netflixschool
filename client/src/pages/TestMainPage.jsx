// 테스트 준비 완료 후 나타나는 테스트 페이지

import React,{ useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/TestPage/Navbar';
import Result from './Result';
import TestBox from '../components/TestPage/TestBox';

const TestPage = ({history}) => {
    const [seconds, setSeconds] = useState(parseInt(3));

    // 테스트 준비 ~ 시작 사이 3초 준비시간 countdown
    useEffect(() => {
        const timer = setInterval(() => {
            if (parseInt(seconds) >= 0){
                setSeconds(parseInt(seconds) - 1);
            }
        },1000);
        return () => clearTimeout(timer);
    },[seconds])

    // 테스트 도중 페이지 이탈시 경고
    // useEffect(() => {
    //     const unblock = history.block('테스트를 끝내겠습니까?');
    //     return () => {
    //     unblock();
    //     history.push('/');
    //     };
    // }, [history]);

    if (seconds > 0){
        return (
            <div>
                <StartBox>테스트 시작까지 남은 시간</StartBox>
                <div>
                    <StartBox><h1>{seconds}</h1></StartBox>
                </div>
            </div>
        )
    }
    if (seconds === 0){
        return(
            <div>
                <TestStart><h1>Test Start !</h1></TestStart>
            </div>
        )
    }
    return (
        <div>
            <Navbar/>
            <Switch>
                <Route path="/result" component={Result} />
                <Route path="/doTest/:number" component={TestBox} />
            </Switch>
        </div>
    );
}


export default TestPage;



const StartBox = styled.div`
    display: flex;
    text-align: center;
    margin: 150px auto;
    color : gray;
    padding: 1rem;
    display: flex;
    justify-content: center;
    font-size: 2rem;
    font-weight: 1000;
`;

const TestStart = styled.div`
    display: flex;
    text-align: center;
    margin: 150px auto;
    color : red;
    padding: 1rem;
    display: flex;
    justify-content: center;
    font-size: 4rem;
    font-weight: 1000;
`;