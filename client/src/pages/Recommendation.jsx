import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ContentComponent from "../components/Recommendation/ContentComponent";
import * as CC from "../components/Recommendation/ContentComponents"
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Recommendation () {
  const [data ,setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(50);
  
  const limit = 10
  const fetchUrl = `/api/content/${offset}/${limit}`

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
  }, [])

  return (
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
      <CC.Container>
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
        {/* <Pagination
          currPage={currPage}
          onClickPage={setCurrPage}
          pageCount={Math.ceil(totalCount / 10)}
        /> */}
      </CC.Container>
    </InfiniteScroll>
    
  )
}