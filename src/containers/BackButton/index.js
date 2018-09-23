import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import { curry, goHome } from "../../helpers";

const buttonColor = {
  button: { color: "white", background: "dodgerblue" }
};

const Pinned = styled.div`
  position: fixed;
  text-align: center;
  bottom: 30px;
  right: 30px;
`;

const BackButton = ({ classes, history }) => (
  <Pinned onClick={curry(goHome)(history)}>
    <Button variant="fab" className={classes.button}>
      <NavigateBefore fontSize="large" />
    </Button>
  </Pinned>
);

export default withStyles(buttonColor)(BackButton);
