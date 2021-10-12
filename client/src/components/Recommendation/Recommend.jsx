import { useState } from 'react';

export default function Recommend ({location}) {
  console.log('location content state',location.state)
  const [recommend, setRecommend] = useState("");


  return (
    <div>
      <div className='box_basic'>
        <div className='detail_title'>
          <h2 className='title_name'>{recommend.title_en} {recommend.title_kr}</h2>
        </div>
        <div className="info_poster"><img src={recommend.img_path} alt='movie_poster' /></div>
        <div className='info_content'>
          <div className='inner_content'>
            <dl className='list_content'>
              <dt>단어 난이도 지수</dt>
              <dd>{recommend.word_difficulty_level}</dd>
            </dl>
            <dl className='list_content'>
              <dt>WPS 지수</dt>
              <dd>{recommend.words_per_second}</dd>
            </dl>
            <dl className='list_content'>
              <dt>종합 난이도 지수</dt>
              <dd>{recommend.content_level}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
