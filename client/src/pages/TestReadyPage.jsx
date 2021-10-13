// 테스트 준비 페이지

import React, { useEffect } from 'react';
import TestPrecautions from '../components/TestPage/TestPrecautions';

const TestReadyPage = ({history}) => {
    // useEffect(() => {
    //     history.push('/test')
    // },[history])
    return(
        <div>
            <TestPrecautions />
        </div>
    )
}

export default TestReadyPage;