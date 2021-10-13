// 테스트 결과 페이지

import { Link } from 'react-router-dom';

export default function Result ({location}) {
  console.log('location data', location.state.data)
  const data = location.state.data

  return (
    <div>
      <div>
        <h1>결과 출력</h1>
        <h2>당신의 레벨은 {data.user_level}입니다.</h2>
      </div>
      <div>
        <h1>레벨에 맞는 영화</h1>
        <div className="box_list">
          <section className='recommendation'>
            {data.normal_content.map((result) => {
              return (
                <li key={result.id} className='recommended_list'>
                  <Link to={{
                      pathname : '/content',
                      state:result.id}}>
                    <img src={result.img_path} alt="movie_poster" className='resultlist_image' />
                  </Link>
                </li>
            )})}
          </section>
        </div>
      </div>
      <div>
        <h1>한단계 수준 높은 영화</h1>
        <div className="box_list">
          <section className='recommendation'>
            {data.hard_content.map((result) => {
              return (
                <li key={result.id} className='recommended_list'>
                  <Link to={{
                      pathname : '/content',
                      state:result.id}}>
                    <img src={result.img_path} alt="movie_poster" className='resultlist_image' />
                  </Link>
                </li>
            )})}
          </section>
        </div>
      </div>
    </div>
  )
}