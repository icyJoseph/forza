import React from "react";
import styled, { css } from "styled-components";
import Paper from "@material-ui/core/Paper";

const commonCard = css`
  padding: 10px 0 10px 0;
  margin: 10px;
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  justify-content: space-around;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

const CardWrap = styled(Paper).attrs({
  style: ({ height }) => ({
    height: height ? `${height}px` : "auto"
  })
})`
  ${commonCard};
  min-width: 170px;
  max-width: 170px;
`;

export const LeagueLabel = styled(CardWrap)`
  min-width: 200px;
  max-width: 200px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 25px;
  justify-content: center;
  margin: 0 auto 100px;
  @media (min-width: 1000px) {
    width: 80%;
  }
`;

export const Wrap = styled.div.attrs({
  style: ({ index, title, highlight }) => ({
    fontSize: index === title ? "14pt" : "12pt",
    color: highlight !== -1 ? "dodgerblue" : "black"
  })
})`
  padding: 2px;
`;

export const Card = ({
  children,
  handler,
  id,
  current,
  title = 0,
  highlight = [1, 4]
}) => {
  const elevation = id === current ? 24 : 3;
  return (
    <CardWrap onClick={handler} elevation={elevation} id={id}>
      {children.map((child, index) => (
        <Wrap
          key={`card-child-${index}-of-${children.length}`}
          title={title}
          index={index}
          highlight={highlight.indexOf(index)}
        >
          {child}
        </Wrap>
      ))}
    </CardWrap>
  );
};

export default Card;
