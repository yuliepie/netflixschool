import styled, { css } from 'styled-components';
import Arrow from './Arrow';
import {
  IoMdArrowDroprightCircle,
  IoMdArrowDropleftCircle,
} from 'react-icons/io';

export default function LevelIndicator({
  level,
  currPage,
  onClickPage,
  pageCount,
}) {
  return (
    <Container>
      <IconWrapper disabled={currPage === 0}>
        <IoMdArrowDropleftCircle
          size="35"
          onClick={() => onClickPage(currPage - 1)}
        />
      </IconWrapper>
      <h2> Level {level}</h2>
      <IconWrapper disabled={currPage === pageCount - 1}>
        <IoMdArrowDroprightCircle
          size="35"
          onClick={() => onClickPage(currPage + 1)}
        />
      </IconWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
  font-size: 25px;
  /* background-color: red; */
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0px 15px;
  cursor: pointer;
  display: ${(props) => (props.disabled ? 'none' : 'normal')};
`;
