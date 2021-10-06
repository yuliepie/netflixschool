import React from 'react';
import styled from 'styled-components';

const IntroBlock = styled.div`

    h1 {
        text-align: center;
        margin: 50;
        font-weight: 300;
        font-size: 45px;
    }
    h2 {
        text-align: center;
        font-weight: 200;
        font-size: 20px;
    }
    button {
        display: flex;
        align-items: center;
        margin: auto;
    }
`;

const TestPrecautions = () => {
    return(
        <div>
            <IntroBlock>
                <div>
                    <h1>
                        <strong>주의사항</strong>
                    </h1>
                    <h2>
                        주의사항 1<br />
                        주의사항 2<br />
                        주의사항 3<br />
                    </h2>
                </div>
                <div>
                    <h1> Ready? </h1>
                    <button>yes</button>
                    <button>no</button>
                </div>
            </IntroBlock>
        </div>
    )
}

export default TestPrecautions;