import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css';
import { Route, Switch } from "react-router-dom";
import Testinfo from './TestInfo';

const Navbar = () => {
    const Question_num = [1,2,3,4,5,6,7,8,9,10];
    const numList = Question_num.map(num => (
        <div key = {`${num}`}>
            <Link 
                to={`/testForm/${num}`} 
                style={{ textDecoration: 'none', fontWeight:'bold', fontSize:'25px', color:'red'}}
                >
                Q{num}
            </Link>
        </div>
    ))
    return (
        <div>
            <div>
                <nav className="wrapper">{numList}</nav>
            </div>
            <Switch>
                <Route path="/testForm/:number" component={Testinfo} />
            </Switch>
        </div>
    );
};

export default Navbar;


{/* <div>
                <Link to="/testForm" style={{ textDecoration: 'none' }}>
                    Q1
                </Link>
            </div>
            <div>
                <Link to="/testForm" style={{ textDecoration: 'none' }}>
                    Q2
                </Link>
            </div>
            <div>
                <Link to="/testForm" style={{ textDecoration: 'none' }}>
                    Q3
                </Link>
            </div>
            <div>
                <Link to="/testForm" style={{ textDecoration: 'none' }}>
                    Q4
                </Link>
            </div> */}