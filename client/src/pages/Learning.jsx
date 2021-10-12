import styled from 'styled-components';

import {data} from './Learning.data';


export default function Learning () {
  return (
    <div>
      <div className='box_basic'>
        <div className='detail_title'>
          <h2 className='title_name'> Level {data.level} Today's examples</h2>
        </div>
        <div className="info_poster"><img src={data.img_path} alt='example_image' /></div>
        <div className='info_content'>
        <div className='inner_content'>
          <dl className='list_content'>
            <dt>오늘의 문장</dt>
            <dd>{data.sentence}</dd>
          </dl>
          <dl className='list_content'>
            <dt>오늘의 단어</dt>
            <dd>{data.word}</dd>
          </dl>
        </div>
        </div>
      </div>
      <div className='content_detail'>
        <dl className='list_content'>
          <h3>Today's Quiz</h3>
          <div className="info_poster"><img src={data.file_path} alt='quiz_image' /></div>
          <dd>{data.question}</dd>
        </dl>
      </div>
    </div>
  )
}