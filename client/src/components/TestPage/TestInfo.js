// db 생성 전 임시 사용

import React from "react";
import TestForm from "./TestForm_multiple";

const data = {
    1 : {
        number : 1,
        description : "문제 1번"
    },
    2 : {
        number : 2,
        description : "문제 2번"
    },
    10 : {
        number : 10,
        description : "문제 10번"
    }
};

const Testinfo = ({ match}) => {


    const question = data[match.params.number];
    console.log(question)
    if(!question) {
        return <div>존재하지 않는 번호</div>;
    }
    console.log(question.number)
    return(
        <div>
            <TestForm props = {question.number}/>
        </div>
    );
};


export default Testinfo;