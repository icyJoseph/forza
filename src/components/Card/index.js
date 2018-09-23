import React from "react";
import styled, { css } from "styled-components";

import Paper from "@material-ui/core/Paper";

const commonCard = css`
  padding: 10px 0 10px 0;
  margin: 10px;
  min-width: 150px;
  max-width: 200px;
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
`;

const CardWrap = styled(Paper).attrs({
  style: ({ height }) => ({
    height: height ? `${height}px` : "80px"
  })
})`
  ${commonCard};
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 25px;
  justify-content: center;
  margin: 0 auto 20px;
  @media (min-width: 1000px) {
    width: 80%;
  }
`;

export const Card = ({ children, handler, ...style }) => (
  <CardWrap onClick={handler} elevation={3} {...style}>
    {children.map((child, index) => (
      <div key={`card-child-${index}-of-${children.length}`}>{child}</div>
    ))}
  </CardWrap>
);

export default Card;
