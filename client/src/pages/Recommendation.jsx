// import styled from "styled-components";
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import Slider from '@mui/material/Slider';
import InfiniteScroll from 'react-infinite-scroll-component';
import ContentComponent from "../components/Recommendation/ContentComponent";
import * as CC from "../components/Recommendation/ContentComponents"


function valuetext(value){
  return `${value}`
}

const minDistance = 1;

export default function Recommendation () {
  const history = useHistory();

  const [data ,setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [sorting, setSorting] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(50);
  const [value, setValue] = useState([0, 10]);
  
  const limit = 10
  const fetchUrl = `/api/content?offset=${offset}&limit=${limit}&sorting=${sorting}&minlevel=${value[0]}&maxlevel=${value[1]}`

  // 콘텐츠 리스트 가져오는 부분
  const fetchRecommends = () => {
    axios.get(fetchUrl)
      .then(response => {
        // console.log(response);
        setData([...data, ...response.data.ranked_contents])
        // console.log(data.length, totalCount);
        setTotalCount(response.data.contents_max_count);
        if (data.length >= totalCount){
          setHasMore(false);
        }
      })
      .catch(err => {
        console.log('err:', err);
        console.log('err.resonse:', err.response);
      });
    setOffset(offset + 10);
  };

  useEffect(() => {
    fetchRecommends();
  }, [sorting])

  // 정렬 버튼 눌렀을 때 event
  const handleSortingClick = () => {
    if (sorting === 1){
      setSorting(0)
    } else {
      setSorting(1)
    }
    setData([]);
    setOffset(0);
  }

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

  // 검색(필터링) 버튼 눌렀을 때
  const handleFilteringClick = () => {
    setSorting(1)
    setData([]);
    setOffset(0);
  }

  return (
    <CC.Container>
      <CC.Button onClick={handleSortingClick}>정렬</CC.Button>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        color='secondary'
        max='10'
        valueLabelDisplay='on'
        disableSwap
      />
      <CC.Button onClick={handleFilteringClick}>확인</CC.Button>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchRecommends}
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
            //   <li key={index} className='recommendation'>
            //     <Link to={{
            //       pathname : '/recommend',
            //       state: recommend.id}}>
            //     <Recommend ></Recommend>
            //     <img src={recommend.img_path} alt="movie_poster" className='recommendlist_image' />
            //   </Link>
            // </li>
          )})}
        </CC.ListWrapper>
      </InfiniteScroll>
    </CC.Container>
  )
}