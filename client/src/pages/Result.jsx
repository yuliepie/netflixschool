// 테스트 결과 페이지

import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ResultIntro = styled.div`
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 1rem;
  display: flex;
  text-align: center;
  font-size: 3rem;

  span{
    margin-left: 1rem;
    position: relative;
    color: white;
  }
  `;

const Describe = styled.p`
  padding-left: 1rem;
  padding-bottom: 3rem;
  font-size: 1.5rem;
  position: relative;
  color: white;
  width: 90%;
  margin-left: 5%;
  display: flex;
  text-align: center;
  justify-content: center;
`;

const Recommend = styled.div`
  font-size: 3rem;
  font-weight: 100px;
  padding-left: 1rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
  position: relative;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const ResultImage = styled.div`
//   border : solid;
//   border-radius: 10px;
// `;

export default function Result ({location, history}) {
  console.log('location data', location.state.data)
  const data = location.state.data

  // useEffect(() => {
  //   const onblock = history.block('페이지를 나가겠습니까?')
  //   return(
  //     onblock()
  //   )
  // },[history])


  return (
    <div className="recommendBox">
      {/* 결과와 설명 */}
      <div >
        <ResultIntro>
          <div style={{width:'100%'}}>
            <span>당신의 영어 레벨은</span>
            <span><span style={{fontSize:'5rem'}}>‘{data.user_level}’</span> 입니다.</span>
          </div>
        </ResultIntro>
          <Describe>
            현재 영어 실력이 매우 심각한 상태군요. 지금부터 수준에 맞는 작품과 함께 공부를 시작해보는 게 어떨까요?
          </Describe>
      </div>

      {/* 수준에 맞는 작품 추천 */}
      <div className="recommend">
        <Recommend>‘{data.user_level}’ 레벨 추천 영화</Recommend>
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
        <Recommend>한단계 높은 레벨의 작품을 보고싶다면 ...</Recommend>
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
      <ToRanking>
        <h1>더 다양한 작품을 추천 받고 싶으신가요?</h1>
        <div style={{marginLeft:'4rem'}}>
          <Link to="/contentsranking" style={{textDecoration:'none'}}>
            <ToRankingButton >YES</ToRankingButton>
          </Link>
        </div>
      </ToRanking>
      <Totobox>
      </Totobox>
    </div>
  )
}

const ToRanking = styled.div`
  position: relative;
  color: white;
  width: 100%;
  height: 10rem;
  padding: 2rem;
  padding-bottom: 3rem;
  font-size: 120%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const ToRankingButton = styled.h1`
  border: 5px solid #E82B0C;
  border-radius: 10px;
  box-shadow: 5px 5px 5px black;
  background-color: #E82B0C;
  color:white;
  padding: 0.5rem;
  width: 100%;
  font-weight: bolder;

  :hover{
    border-color: black;
    background-color: black;
    color : white;
  }
`;

const Totobox = styled.div`
  position: relative;
`;