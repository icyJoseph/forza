import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

const HeaderSegment = styled.div`
  margin: 15px auto 2px;
  text-align: center;
`;

export const CustomHeader = (Message, variant, split = false) => {
  const messageArr = split ? Message.split(" ") : [Message];
  return (
    <HeaderSegment>
      {messageArr.map(message => (
        <Typography key={message} variant={variant}>
          {message}
        </Typography>
      ))}
    </HeaderSegment>
  );
};

export const ImageHeader = logo => (
  <HeaderSegment>
    <img src={logo} alt="Predictions!" style={{ marginTop: "10px" }} />
  </HeaderSegment>
);
