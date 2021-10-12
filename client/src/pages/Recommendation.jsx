import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

// import SelectLevel from "./SelectLevel";
import Pagination from "../components/Recommendation/Pagination";
import Recommend from "../components/Recommendation/Recommend";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1232px;
  height: 100vh;
  margin: 0 auto;
  padding: 50px 0;
  flex-direction: column;
`

const RecommendContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function Recommendation () {
  const [recommendation, setRecommendation]= useState();
  const [currPage, setCurrPage] = useState(0);
  const [totalCount, setTotalCount] = useState(200);

  useEffect(() => {
    (async function () {
      try {
        const offset = currPage * 10;
        const limit = offset + 10
        const trackUrl = `/api/content/${offset}/${limit}`;
        const response = await axios.get(trackUrl);
        console.log(response);
        setTotalCount(response.contents_max_count);
        setRecommendation(response);  
      } catch(e) {
        console.log(e)
      }

    })();
  }, [currPage]); 

  return (
    <Container>
      <RecommendContainer>
        {recommendation.map((recommend, index) => {
          return (
            <li key={index} className='recommendation'>
              <Link to={{
                pathname : '/recommend',
                state: recommend.id}}>
              <img src={recommend.img_path} alt="movie_poster" className='recommendlist_image' />
            </Link>
          </li>
        )})}
      </RecommendContainer>
      <Pagination
        currPage={currPage}
        onClickPage={setCurrPage}
        pageCount={Math.ceil(totalCount / 10)}
      />
    </Container>
  )
}