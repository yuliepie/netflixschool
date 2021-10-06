import { Link } from 'react-router-dom';

import { ResultData } from "./ResultData";

export default function Result () {
  return (
    <div>
      <div>
        <h1>결과 출력</h1>
        <h2>당신의 레벨은 {ResultData.user_level}입니다.</h2>
      </div>
      <div>
        <h1>레벨에 맞는 영화</h1>
        {ResultData.normal_content.map((result, index) => {
        return (
          <Link to='/content' ><img src={result.image_path} alt="netflixschool" className='resultlist_image' /></Link>
        )})}
      </div>
      <div>
      <h1>한단계 수준 높은 영화</h1>
        {ResultData.hard_content.map((result, index) => {
        return (
          <Link to='/content'><img src={result.image_path} alt="netflixschool" className='resultlist_image' /></Link>
        )})}
      </div>
    </div>
  )
}