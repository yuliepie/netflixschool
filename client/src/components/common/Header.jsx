import React from "react";
import { Link } from "react-router-dom";

export default function Header () {
  return (
    <div>
      <header1 className="header">
        <h1><Link to='/'>넷플릭스쿨</Link></h1>
        <div className="membership">
          <button><Link to='/login'>로그인</Link></button>
          <button><Link to='/signup'>회원가입</Link></button>
        </div>
      </header1>
      <herder1 className="header">
        <div></div>
        <div className="menu">
          <li><Link to='/intro'>소개</Link></li>
          <li><Link to='/level_test'>레벨테스트</Link></li>
          <li><Link to='/recommendation'>영화추천</Link></li>
        </div>
      </herder1>
    </div>


  )
}

