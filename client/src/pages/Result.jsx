// 테스트 결과 페이지

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ResultIntro = styled.div`
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 1rem;
  display: flex;
  text-align: center;
  font-size: 3rem;
  `;

const Describe = styled.p`
  padding-left: 1rem;
  padding-bottom: 3rem;
  font-size: 1.5rem;
`;

const Recommend = styled.div`
  font-size: 3rem;
  font-weight: 100px;
  padding-left: 1rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
`;

export default function Result ({location}) {
  console.log('location data', location.state.data)
  const data = location.state.data

  return (
    <div className="recommendBox">
      {/* 결과와 설명 */}
      <ResultIntro>
        <div>
          <span>당신의 영어 수준은</span>
          <span><span style={{fontSize:'5rem'}}>"{data.user_level}"</span>입니다.</span>
        </div>
      </ResultIntro>
      <Describe>현재 영어 실력이 매우 심각한 상태군요. 지금부터 수준에 맞는 작품과 함께 공부를 시작해보는 게 어떨까요?</Describe>

      {/* 수준에 맞는 작품 추천 */}
      <div className="recommend">
        <Recommend>{data.user_level} 레벨 추천 영화</Recommend>
        <div className="box_list">
          <section className='recommendation'>
            {data.normal_content.map((result) => {
              return (
                <span key={result.id} className='recommended_list'>
                  <Link to={{
                      pathname : '/content',
                      state:result.id}}>
                    <img src={result.img_path} alt="movie_poster" className='resultlist_image' />
                  </Link>
                </span>
            )})}
          </section>
        </div>
      </div>
      {/* 한단계 높은 수주의 작품 추천 */}
      <div>
        <Recommend>한단계 높은 수준의 영화로 공부하고 싶다면...</Recommend>
        <div className="box_list">
          <section className='recommendation'>
            {data.hard_content.map((result) => {
              return (
                <span key={result.id} className='recommended_list'>
                  <Link to={{
                      pathname : '/content',
                      state:result.id}}>
                    <img src={result.img_path} alt="movie_poster" className='resultlist_image' />
                  </Link>
                </span>
            )})}
          </section>
        </div>
      </div>
    </div>
  )
}