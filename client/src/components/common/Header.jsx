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
  position: absolute; top:0; left: 0;
  width: 12%;
  height: 12%;
  display: flex;
  align-items: center;
  margin: 2% 0 50% 43.5%;
`;

export default function Header () {
  return (
    <div>
      <header1 className="header">
        <Logo>
          <Link to='/'><Image src = '/img/logo.png' alt='logo' /></Link>
        </Logo>
        {/* <h1><Link to='/'>넷플릭스쿨</Link></h1> */}
        {/* <div className="membership">
          <button><Link to='/login'>로그인</Link></button>
          <button><Link to='/signup'>회원가입</Link></button>
        </div> */}
      </header1>
    </div>


  )
}

