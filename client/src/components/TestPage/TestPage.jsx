import React,{ useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';

const StartBox = styled.div`
    display: flex;
    text-shadow: center;
    width: 100%;
    height: 200;
`;

const TestStart = () => {
    return (
        <StartBox>
            <h1>The test will begin in 3 seconds.</h1>
        </StartBox>
    )
}

const TestPage = ({history}) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    });

    useEffect(() => {
        console.log(history);
        const unblock = history.block('테스트를 포기하실건가요?');
        return () => {
        unblock();
        history.push('/');
        };
    }, [history]);

    return (
        <div>
            <BrowserRouter>
            {loading ? <TestStart /> : <Navbar/>}
            </BrowserRouter>
        </div>
);
}


export default TestPage;