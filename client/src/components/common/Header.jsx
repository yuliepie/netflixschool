// 메인 페이지 header

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
`;

const Image = styled.img`
  position: absolute;
  top :25%;
  left: 50%;
  right: 50%;
  transform: translate(-50%, 50%);
  width: 50;
  height: 12%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin: 40vh 40vh 40vh 40vh; */
`;

const Box = styled.div`
  width:90vw;
  height:100vh;
`;

const Welcome = styled.h1`
  position: relative;
  top : 45%;
  left: 5%;
  /* transform: translate(-50%, 50%); */
  display: flex;
  text-align: center;
  justify-content: center;
`;

export default function Header () {
  return (
    <div className = "MainFirst">
      {/* <header1 className="header"> */}
        <Box>
          <Logo>
            <Link to='/'><Image src = '/img/logo.png' alt='logo' /></Link>
          </Logo>
          <Welcome>Welcome to NETFLIX SCHOOL !</Welcome>

        </Box>
        {/* <h1><Link to='/'>넷플릭스쿨</Link></h1> */}
        {/* <div className="membership">
          <button><Link to='/login'>로그인</Link></button>
          <button><Link to='/signup'>회원가입</Link></button>
        </div> */}
      {/* </header1> */}
    </div>
  )
}

