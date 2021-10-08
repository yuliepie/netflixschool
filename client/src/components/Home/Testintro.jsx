import { Link } from "react-router-dom";

export default function Testintro() {
  return (
    <section className='shortcut_left_div'>
      <div>
        {/* <img src="/img/jaredd-craig-HH4WBGNyltc-unsplash.jpg" alt="" style={{'width': '100%'}}/> */}
        <div className='shortcut_left'>
          <h3>수준에 맞는 학습</h3>
          <p>자신의 수준에 맞는 영화나 드라마로 꾸준히 학습을 지속하면 효율적으로 영어실력이 향상됨을 경험할 수 있습니다.</p>
        </div>
        <div class='shortcut_button_left'><Link to="/test" style={{'textDecoration':'none'}}><button className="shortcut_button">레벨 테스트 하러 가기</button></Link></div>
      </div>
    </section>
  )
}