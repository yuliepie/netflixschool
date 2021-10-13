// 소개 페이지

import styled from 'styled-components';


export default function Intro () {
  return (
    <div >
      {/* <div>
        <Logo src = '/img/logo.png' alt='logo' />
      </div> */}
      <br />
      <br />
      <div>
        <div style={{textAlign:'center'}}>
          <h1 style={{backgroundColor : "#dc143c ", color:'white', width:'50%', margin:'auto'}}>Introduce The Topic</h1>
        </div >
        <strong>
          <p style={{textAlign:'center'}}>
            코로나로 인해 오프라인 수업이 제한되면서 다양한 온라인 교육 강의에 대한 수요가 증가하고 있습니다.
          </p>
        </strong>
        <div><Image src='/img/article.png' alt='questionimg' /></div>
        <AlignCenter>
          <strong>
            <p style={{textAlign:'center'}}>
              이런 추세에 따라 저희는 OTT플랫폼 중 넷플릭스에 있는 작품을 영어 공부에 사용할 수 있도록 사용자의 수준에 맞는 작품을 추천해주는 서비스를 제공하고자 합니다. 궁극적으로 사용자가 본인 수준에 맞는 작품을 가지고 더욱 쉽고 효율적으로 영어 학습을 할 수 있도록 도와주는 서비스입니다.
            </p>
          </strong>
        </AlignCenter>
        <br />
      </div>
      <br />
      <br />
      <div style={{textAlign:'center'}}>
        <h1 style={{backgroundColor : "#dc143c", color:'white', width:'50%', margin:'auto'}}>The Process Of Handling Data</h1>
        <div>
          <h2 >A. 데이터 수집</h2>
            <strong>
              <p> a. 영어 단어 데이터</p>
            <AlignCenter>
              <p>영어 단어의 레벨을 기준으로 작품 대사에서 사용되는 대사의 난이도를 판단하기 위해 여러 검증된 기관의 단어 리스트를 수집했습니다. 해당 리스트에는 각 기관별 레벨로 단어를 나누고 있습니다. </p>
            </AlignCenter>
            <AlignList>
              <p style ={{fontSize:'18px',  border: "4px dashed", width:'30%'}}>
                <p>Oxford</p>
                <p>Lexile</p>
                <p>New General Service List</p>
                <p>TOEFL</p>
                <p>AWSL</p>
                <p>TSL(TOEIC)</p>
                <p>BSL(Business Service Language)</p>
                <p>네이버 사전</p>
              </p>
            </AlignList>
              <p>약 3만개 이상의 단어를 수집하여 난이도 선정의 정확성을 높이고자 하였습니다.</p>
            <br />
            <br />
            <li>b. 작품 데이터</li>
            <AlignCenter>
              <p>
                넷플릭스 자막을 추출하여 데이터를 얻었고 데이터에 포함되어있는 컬럼 중 말하는 시간의 시작과 끝, 대사 컬럼을 이용하였습니다. 대사 컬럼의 데이터들은 대사를 단어 단위로 나누어주는 과정을 진행하여 작품에서 사용하는 단어를 모두 수집하였습니다. 
                <br />
                <br />
              
                해당 데이터를 통해
              </p>
            </AlignCenter>
                  <AlignList>
                    <p style={{fontSize:'18px',  border: "4px dashed", width:'50%'}}>
                      <p>작품 내 대사들이 사용하는 단어의 난이도와 단어의 사용 빈도수</p>
                      <p>한 문장을 말힐 때 걸리는 시간 - 말의 속도 WPS</p>
                      <div><img src='/img/Wps.png' alt='wps' /></div>
                    </p>
                  </AlignList>
                두가지 기준을 이용하여 작품의 난이도를 결정하였습니다.
          </strong>
        </div>
        <br />
        <br />
        <div>
          <strong>
            <h2>B. 데이터 분석</h2>
              <AlignList>
                <p style={{fontSize:'18px',  border: "4px dashed", width:'30%'}}>
                  <p>작품 대본데이터</p>
                  <p>WPS 수치 데이터</p>
                  <p>다양한 출처의 영어 단어 난이도 데이터</p>
                </p>
              </AlignList>
            총 세가지 데이터를 이용하여 데이터 분석 과정을 진행했습니다.
            <br />
              <p style={{textAlign:'center'}}>영어 단어 난이도 데이터를 다양하게 수집했기 때문에 작품에서 사용하는 단어들이 단어 리스트별로 어떤 난이도를 갖는지 작품별로 바그래프를 그려 확인해보았습니다.</p>
              <div><img src='/img/About.Time_level.png' alt='aboutTime' /></div>
              <br />
              <AlignCenter>
                <p>위 그래프가 그 중 하나입니다. 해당 그래프를 통해 작품에서 단어 리스트별 난이도 분포가 어떻게 되는지 확인하였고 단어 리스트들이 어떤 경향성을 갖는지 히트맵을 이용하여 확인해보았습니다.</p>
              </AlignCenter>
              <br />
              <div><img src='/img/Heatmap.png' alt='Heatmap' /></div>
              <br />
              <p>이런 과정을 통해 데이터를 분석했고 최종적으로 영단어 레벨을 6단계로 나눈 결과를 도출했습니다.</p>
          </strong>
        </div>
      </div> 
    </div>
  )
}

const Logo = styled.img`
  margin: 0px auto;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  margin: 0px auto;
  width: 20%;
  display: flex;
  align-items: center;
`;

const AlignCenter = styled.div`
  margin: auto;
  width: 20%;
  display: flex;
  text-align: center;
`;


const AlignList = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;