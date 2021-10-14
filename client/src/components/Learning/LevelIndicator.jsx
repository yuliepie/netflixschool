import styled, { css } from 'styled-components';
import Arrow from './Arrow';
import {
  IoMdArrowDroprightCircle,
  IoMdArrowDropleftCircle,
} from 'react-icons/io';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  font-size: 25px;
`;

const ArrowButton = styled.button`
  margin: ${(props) => (props.flip ? '0 0 0 16px !important' : '0 16px 0 0')};

  ${(props) =>
    props.flip &&
    css`
      transform: scaleX(-1);
    `}

  > svg {
    display: block;
  }
`;

export default function LevelIndicator({
  level,
  currPage,
  onClickPage,
  pageCount,
}) {
  return (
    <Container>
      {/* <ArrowButton
        disabled={currPage === 0}
        onClick={() => onClickPage(currPage - 1)}
      >
        <Arrow />
      </ArrowButton> */}
      <IoMdArrowDropleftCircle size="35" />
      <h2> Level {level}</h2>
      <ArrowButton
        flip
        disabled={currPage === pageCount - 1}
        onClick={() => onClickPage(currPage + 1)}
      >
        <Arrow />
      </ArrowButton>
    </Container>
  );
}
