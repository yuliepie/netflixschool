// 영화 소개 페이지

import { content_detail } from "../components/Content/ContentData"

import axios from "axios"
import { useEffect, useState } from "react"

export default function Content ({location}) {
  console.log('location content state',location.state)
  const [content, setContent] = useState("");

  useEffect(() => {
    const callContent = async () => {
      try {
        const response = await axios.get(
          `/api/content/${location.state}`
        );
        setContent(response.data);
        console.log(response.data)
      } catch (e) {
        console.log(e)
      }
    };
    callContent();
  }, [location]);


  return (
    <div>
      <div className='box_basic'>
        <div className='detail_title'>
          <h2 className='title_name_en'>{content.title_en}</h2>
          <h2 className='title_name_kr'>{content.title_kr}</h2>
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
            <dt>등급</dt>
            <dd>{content.age_rating}</dd>
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
          <h2>영단어 난이도 : {content.word_difficulty_level}</h2>
          <h2>말하기 속도 : {content.words_per_second}</h2>
          <h2>작품 영어 난이도 : {content.content_level}</h2>
          <h3>영화에 나오는 대표 단어 및 예문</h3>
          {content_detail.example.map ((example) => {
            return (
              <div className='word_content' key={example.id}>
                <dt>{example.word}</dt>
                <dd>{example.sentence}</dd>
                <dd>{example.level}</dd>
              </div>
            )
          })}
          <h3>content_unique_words</h3>
          {content_detail.example.map ((example) => {
            return (
              <div className='word_content' key={example.id}>
                <dt>{example.word}</dt>
                <dd>{example.frequency}</dd>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}