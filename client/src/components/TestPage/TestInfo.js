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
    }
};

const Testinfo = ({ match }) => {
    const question = data[match.params.number];
    console.log(question)
    if(!question) {
        return <div>존재하지 않는 번호</div>;
    }
    return(
        <div>
            <TestForm props = {question.number}/>
        </div>
    );
};


export default Testinfo;