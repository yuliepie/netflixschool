// 메인페이지 마지막 이미지 - 서비스 간단 소개

export default function Cando() {
  return (

    <section className='shortcut'>
      <h3 className='capable_list'>넷플릭스쿨과 할 수 있는 것들</h3>
      <div className=''>
        <div className='split'>
          <div>
            <h4>
              <span>레벨 테스트</span>
            </h4>
            <p>엄선한 문제로 유저의 시험 점수를 예측하고 분석결과를 Visual Analytics로 제공합니다.</p>
          </div>
          <div>
            <h4>
              <span>추천 학습</span>
            </h4>
            <p>레벨 테스트를 통해 확인된 학습자의 수준을 바탕으로 AI가 맞춤형 영화를 추천합니다.</p>
          </div>
        </div>
        {/* <div>
          <h4>
            <span>선택 학습</span>
          </h4>
          <p>AI가 추천 하는 영화 외에도 직접 영어 수준을 골라 그에 맞는 수준의 영화를 감상해 보세요.</p>
        </div> */}
        <div className='split'>
          <div>
            <h4>
              <span>분석</span>
            </h4>
            <p >영화의 난이도 및 사용자의 영어 실력이 다각적으로 분석됩니다</p>
          </div>
          <div>
            <h4>
              <span>영화와 드라마</span>
            </h4>
            <p>최신 트렌드를 반영한 100여개의 넷플릭스 영화와 드라마들의 추천이 준비되어 있습니다.</p>
          </div>
        </div>
      </div>
		</section>
  )
}