// 영화 소개 페이지

import { content_detail } from "../components/Content/ContentData"

import axios from "axios"
import { useEffect, useState } from "react"

export default function Content () {
  const [content, setContent] = useState("");

  useEffect(() => {
    const callContent = async () => {
      try {
        const response = await axios.get(
          '/content/1'
        );
        setContent(response.data);
        console.log(response.data)
      } catch (e) {
        console.log(e)
      }
    };

    callContent();
  }, []);


  return (
    <div>
      <div className='box_basic'>
        <div className='detail_title'>
          <h2 className='title_name'>{content.title}</h2>
        </div>
        <div className="info_poster"><img src={content.img_path} alt='movie_poster' /></div>
        <div className='info_content'>
        <div className='inner_content'>
          <dl className='list_content'>
            <dt>개봉연도</dt>
            <dd>{content.release_year}</dd>
          </dl>
          <dl className='list_content'>
            <dt>장르</dt>
            <dd>{content.genre}</dd>
          </dl>
          <dl className='list_content'>
            <dt>감독</dt>
            <dd>{content.director}</dd>
          </dl>
          <dl className='list_content'>
            <dt>러닝타임</dt>
            <dd>{content.running_time}</dd>
          </dl>
        </div>
        </div>
      </div>
      <div className='content_detail'>
        <dl className='list_content'>
          <h3>영화 내용</h3>
          <dd>{content.story}</dd>
        </dl>
        <div>
          <h3>영화에 나오는 대표 단어 및 예문</h3>
          {content_detail.example.map ((example, index) => {
            return (
              <div className='word_content' key={index}>
                <dt>{example.word}</dt>
                <dd>{example.sentence}</dd>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  // return (
  //   <div>
  //     <div className='box_basic'>
  //       <div className='detail_title'>
  //         <h2 className='title_name'>{content_detail.title}</h2>
  //       </div>
  //       <div className="info_poster"><img src={content_detail.img_path} alt='movie_poster' /></div>
  //       <div className='info_content'>
  //       <div className='inner_content'>
  //         <dl className='list_content'>
  //           <dt>개봉연도</dt>
  //           <dd>{content_detail.year}</dd>
  //         </dl>
  //         <dl className='list_content'>
  //           <dt>장르</dt>
  //           <dd>{content_detail.genre}</dd>
  //         </dl>
  //         <dl className='list_content'>
  //           <dt>감독</dt>
  //           <dd>{content_detail.director}</dd>
  //         </dl>
  //         <dl className='list_content'>
  //           <dt>러닝타임</dt>
  //           <dd>{content_detail.running_time}</dd>
  //         </dl>
  //       </div>
  //       </div>
  //     </div>
  //     <div className='content_detail'>
  //       <dl className='list_content'>
  //         <h3>영화 내용</h3>
  //         <dd>{content_detail.story}</dd>
  //       </dl>
  //       <div>
  //         <h3>영화에 나오는 대표 단어 및 예문</h3>
  //         {content_detail.example.map ((example, index) => {
  //           return (
  //             <div className='word_content' key={index}>
  //               <dt>{example.word}</dt>
  //               <dd>{example.sentence}</dd>
  //             </div>
  //           )
  //         })}
  //       </div>
  //     </div>
  //   </div>
  // )
}