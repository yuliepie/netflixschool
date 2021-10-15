import { useEffect, useState } from "react";
import axios from "axios";
import { ImSortAmountAsc, ImSortAmountDesc } from "react-icons/im";
import ContentComponent from "../components/ContentsRanking/ContentComponent";
import * as CC from "../components/ContentsRanking/ContentComponents"


function valuetext(value){
  return `${value}`
}

const minDistance = 1;

export default function ContentsRanking () {

  const [data ,setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [sorting, setSorting] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(11);
  const [value, setValue] = useState([0, 10]);
  const [isMouseUp, setIsMouseUp] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [btnStatus, setBtnStatus] = useState(false); // 버튼 상태
  
  const limit = 10
  const fetchUrl = `/api/content?offset=${offset}&limit=${limit}&sorting=${sorting}&minlevel=${value[0]}&maxlevel=${value[1]}`

  // 콘텐츠 리스트 가져오는 부분
  const fetchContentsRanking = () => {
    axios.get(fetchUrl)
      .then(response => {
        // console.log(response);
        setData([...data, ...response.data.ranked_contents])
        // console.log(data.length, totalCount);
        setTotalCount(response.data.contents_max_count);
        if (data.length >= totalCount){
          setHasMore(false);
        } else {
          setHasMore(true);
        }
        
      })
      .catch(err => {
        console.log('err:', err);
        console.log('err.resonse:', err.response);
      });
    setOffset(offset + 10);
  };

  useEffect(() => {
    fetchContentsRanking();
    // console.log(fetchUrl);
  }, [sorting])

  // 정렬 버튼 눌렀을 때 event
  const handleClickSortingButton = () => {
    if (sorting === 0){
      setSorting(1);
    } else {
      setSorting(0);
    }
    setData([]);
    setOffset(0);
  }

  useEffect(() => {    
    fetchContentsRanking();
    console.log(fetchUrl);
  }, [isMouseUp])

  // 슬라이더 움직였을 때 event
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return ;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  // 슬라이더 움직일 때 제어
  const handleMouseUp = () => {
    setIsMouseUp(!isMouseUp);
    setData([])
    setOffset(0)
  }

  // top 버튼 visible 처리
  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    // console.log(scrollY)
    if(scrollY > 100) {
      // 100 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else {
      // 100 이하면 버튼이 사라지게
      setBtnStatus(false);
    }
  }

  // 클릭하면 스크롤이 위로 올라가는 함수
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setScrollY(0);  // scrollY 의 값을 초기화
    setBtnStatus(false); // btnStatus의 값을 false로 바꿈 => 버튼 숨김
  }

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow)
    }
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow)
    }
  })

  return (
    <CC.Container>
      <CC.ConditionContainer>
        <CC.Title>Netflix English Index 랭킹</CC.Title>
        <CC.SliderBox>
          <CC.StyledSlider
            value={value}
            onChange={handleChange}
            onMouseUp={handleMouseUp}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            color='secondary'
            max={10}
            disableSwap
          />
        </CC.SliderBox>
        {sorting ? (
          <CC.Button onClick={handleClickSortingButton}>
            <ImSortAmountDesc/>NEI 내림차순
          </CC.Button>
        ) : (
          <CC.Button onClick={handleClickSortingButton}>
            <ImSortAmountAsc/>NEI 오름차순
          </CC.Button>
        ) }
        
      </CC.ConditionContainer>

      <CC.TopBtn
          active={btnStatus}
          className={btnStatus ? "topBtn active" : "topBtn"} // 버튼 노출 여부
          onClick={handleTop}  // 버튼 클릭시 함수 호출
      >TOP</CC.TopBtn>
      <CC.StyledInfiniteScroll
        dataLength={data.length}
        next={fetchContentsRanking}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{textAlign: 'center'}}>
            <b>마지막 컨텐츠입니다.</b>
          </p>
        }
      >
        <CC.ListWrapper>
          {data && data.map((recommend, index) => {
            return (
              <CC.StyledLink to={{ pathname : '/content',
                    state: recommend.id}} key={`content-${index}`}>
                <ContentComponent 
                  id={recommend.id}
                  title_kr={recommend.title_kr}
                  img_path={recommend.img_path}
                  word_difficulty_level={recommend.word_difficulty_level}
                  words_per_second={recommend.words_per_second}
                  content_level={recommend.content_level}
                />
              </CC.StyledLink>
          )})}
        </CC.ListWrapper>
      </CC.StyledInfiniteScroll>
    </CC.Container>
  )
}