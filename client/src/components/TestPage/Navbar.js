// 테스트 페이지 문제 내비게이션

import React from "react";
import { NavLink } from "react-router-dom";
import './NavBar.css';


const Navbar = () => {

    const Question_num = [1,2,3,4,5,6,7,8,9,10];
    const numList = Question_num.map(num => (
        <div key = {`${num}`} className="question" >
            <NavLink
                activeStyle={{
                    color: "white",
                    backgroundColor:"#E82B0C",
                }}
                to={`/doTest/${num}`}
                style={{textDecoration:'none', color:'#002A54' ,padding: '48px'}}
                >
                Q{num}
            </NavLink>
        </div>
    ))
    
    return (
        <div>
            <div>
                <nav className="wrapper">{numList}</nav>
            </div>
        </div>
    );
};

export default Navbar;