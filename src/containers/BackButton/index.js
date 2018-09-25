import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import { mapSortingToProps, toggleSort } from "../../ducks/sorting";
import { curry, goHome } from "../../helpers";

import logo from "../../logo.png";
const buttonColor = {
  button: { color: "white", marginTop: "5px" }
};

const Pinned = styled.div`
  position: fixed;
  text-align: center;
  bottom: 70px;
  right: 15px;
  display: flex;
  flex-direction: column;
`;

export const BackButton = ({ toggle, sorting, classes, history }) => (
  <Pinned>
    <Button
      variant="fab"
      color={sorting ? "primary" : "secondary"}
      className={classes.button}
      aria-label="Sort By Goals"
      onClick={toggle}
    >
      <img src={logo} alt="Predictions!" width="30px" />
    </Button>
    <Button
      variant="fab"
      color="primary"
      aria-label="Go Back"
      className={classes.button}
      onClick={curry(goHome)(history)}
    >
      <NavigateBefore fontSize="large" />
    </Button>
  </Pinned>
);

const mapToggleToProps = { toggle: toggleSort };

export default connect(
  mapSortingToProps,
  mapToggleToProps
)(withStyles(buttonColor)(BackButton));
