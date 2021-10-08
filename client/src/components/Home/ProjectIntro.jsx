// 메인페이지 이미지 중 소개 페이지로 이동하는 컴포넌트

import { Link } from "react-router-dom";

export default function Testintro() {
  return (
    <section className='shortcut_right_div'>
      {/* <img src='/img/32.jpeg' alt='projectinfo_img' />   */}
      <div className='shortcut_right'>
        <h3>뼈를 갈아 만든 프로젝트</h3>
        <p>OTT2 팀원들의 3주간의 희노애락이 모두 담긴 결과의 과정들을 살펴보실 수 있습니다.</p>
      </div>
      <div className='shortcut_button_right'><Link to="/intro" style={{'textDecoration':'none'}}><button className="shortcut_button">프로젝트 소개 보기</button></Link></div>
    </section>
  )
}