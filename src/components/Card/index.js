import React from "react";
import styled from "styled-components";

import Paper from "@material-ui/core/Paper";

const CardWrap = styled(Paper).attrs({
  style: ({ height }) => ({
    height: height ? `${height}px` : "80px"
  })
})`
  padding: 10px 0 10px 0;
  margin: 10px;
  min-width: 180px;
  max-width: 200px;
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 25px;
  justify-content: center;
  @media (min-width: 800px) {
    margin: 0 10%;
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
