// 객관식 문제 유형
import styled from 'styled-components';

const Image = styled.img`
  width: 60%;
  height: 60%;
  display: block; 
  margin: 0px auto;
`;

const Asking = styled.p`
  font-size: 30px;
  text-align: center;
`;

const Wrap = styled.div`
  text-align: center;
`;

const Reply = styled.div`
  font-size: 24px;
  display: inline-block;
  padding-left: 50px;
`;

export default function Quizform (
  {
    img_path,
    sentence,
    word
  }
  ) {

  return(
    <div>
      <div><img src={img_path} alt='example_image' /></div>
      <div>
        <div>
          <dl>
            <dt>오늘의 문장</dt>
            <dd>{sentence}</dd>
          </dl>
          <dl>
            <dt>오늘의 단어</dt>
            <dd>{word}</dd>
          </dl>
        </div>
      </div>
    </div>
  )
}
