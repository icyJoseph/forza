import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import { Pinned } from "../../components/Pinned";
import { mapSortingToProps, toggleSort } from "../../ducks/sorting";
import { curry, goHome } from "../../helpers";
import {
  buttonColor,
  FLOATING_BOTTOM_MENU,
  SORT_BY_GOALS,
  PREDICTIONS,
  PRIMARY,
  SECONDARY,
  GO_BACK
} from "../../constants";

import logo from "../../logo.png";

export const sortingColor = sorting => (sorting ? PRIMARY : SECONDARY);

/**
 *
 * @description  Normally two buttons.
 * Back and sort by goals.
 * In mobile view the Prediction container
 * attaches to the Floating Action Buttons.
 */
export const FloatingActionButtons = ({
  toggle,
  sorting,
  classes,
  history
}) => (
  <Pinned id={FLOATING_BOTTOM_MENU}>
    <Button
      variant="fab"
      color={PRIMARY}
      aria-label={GO_BACK}
      className={classes.button}
      onClick={curry(goHome)(history)}
    >
      <NavigateBefore fontSize="large" />
    </Button>
    <Button
      variant="fab"
      color={sortingColor(sorting)}
      className={classes.button}
      aria-label={SORT_BY_GOALS}
      onClick={toggle}
    >
      <img src={logo} alt={PREDICTIONS} width="30px" />
    </Button>
  </Pinned>
);

const mapToggleToProps = { toggle: toggleSort };
const withConnect = connect(
  mapSortingToProps,
  mapToggleToProps
);

const withButtonColor = withStyles(buttonColor);

export default compose(
  withConnect,
  withButtonColor
)(FloatingActionButtons);
