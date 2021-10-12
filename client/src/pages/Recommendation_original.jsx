import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ContentComponent from "../components/Recommendation/ContentComponent";
import * as CC from "../components/Recommendation/ContentComponents"

// import SelectLevel from "./SelectLevel";
import Pagination from "../components/Recommendation/Pagination";
import Recommend from "../components/Recommendation/Recommend";


export default function Recommendation () {
  const [recommendation, setRecommendation]= useState();
  const [currPage, setCurrPage] = useState(0);
  const [totalCount, setTotalCount] = useState(200);

  useEffect(() => {
    (async function() {
      const offset = currPage * 10;
      const limit = offset + 10
      const trackUrl = `/api/content/${offset}/${limit}`;
      await axios.get(trackUrl)
        .then(response => {
          console.log(response);
          const ranked_contents = response.data.ranked_contents
          const contents_max_count = response.data.contents_max_count
          setRecommendation(ranked_contents);
          setTotalCount(ranked_contents);
          console.log(contents_max_count);
        })
        .catch(err => {
          console.log('err:', err);
          console.log('err.resonse:', err.response);
        })
    })();
  }, [currPage]);

  return (
    <CC.Container>
      <CC.ListWrapper>
        {recommendation && recommendation.map((recommend, index) => {
          return (
            <Link to={{ pathname : '/recommend',
                  state: recommend.id}}>
              <ContentComponent
                id={recommend.id}
                title_kr={recommend.title_kr}
                img_path={recommend.img_path}
                word_difficulty_level={recommend.word_difficulty_level}
                words_per_second={recommend.words_per_second}
                content_level={recommend.content_level}
              />
            </Link>
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
  )
}