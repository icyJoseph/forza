import React from "react";
import styled from "styled-components";

import Paper from "@material-ui/core/Paper";

const CardWrap = styled(Paper)`
  padding: 10px 0 10px 0;
  height: 80px;
  margin: 10px;
  max-width: 200px;
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const CardContainer = styled.div`
display: flex
flex-wrap: wrap
padding: 0 25px
`;

export const Card = ({ children, handler }) => (
  <CardWrap onClick={handler} elevation={3}>
    {children.map((child, index) => (
      <div key={`card-child-${index}-of-${children.length}`}>{child}</div>
    ))}
  </CardWrap>
);

export default Card;
