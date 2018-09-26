import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export const StyledAnswerButton = styled(Button).attrs({
  style: ({ middle, background }) => ({
    marginTop: middle !== 2 ? "-20px" : "0px",
    background: background ? background : "dodgerblue"
  })
})`
  bottom: 20px;
  margin: auto;
  color: white;
`;

export const AnswerButton = ({ content, ...props }) => (
  <StyledAnswerButton variant="fab" mini {...props}>
    <Typography color="secondary">{content}</Typography>
  </StyledAnswerButton>
);

export const StyledMobileAnswerButton = styled(Button).attrs({
  style: () => ({ marginBottom: "3px" })
})``;

export const MobileAnswerButton = ({ content, ...props }) => (
  <StyledMobileAnswerButton
    variant="fab"
    color="primary"
    id={content}
    aria-label={content}
    {...props}
  >
    <Typography color="secondary">{content}</Typography>
  </StyledMobileAnswerButton>
);
