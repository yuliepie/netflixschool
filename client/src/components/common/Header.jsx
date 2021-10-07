import React from "react";
import { Link } from "react-router-dom";

export default function Header () {
  return (
    <div>
      <header1 className="header">
        <h1><Link to='/'>넷플릭스쿨</Link></h1>
        {/* <div className="membership">
          <button><Link to='/login'>로그인</Link></button>
          <button><Link to='/signup'>회원가입</Link></button>
        </div> */}
      </header1>
    </div>


  )
}

