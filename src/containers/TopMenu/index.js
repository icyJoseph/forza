import React from "react";
import styled, { css } from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { curry, goHome } from "../../helpers";

const baseStyle = css`
  flex-grow: 1;
`;

const MainTitle = styled(Typography)`
  ${baseStyle};
`;

const Bar = styled(AppBar)`
  ${baseStyle};
`;

const barStyle = {
  bar: { backgroundColor: "dodgerBlue" }
};

export const TopMenu = ({ history, classes }) => (
  <Bar position="sticky" className={classes.bar}>
    <Toolbar>
      <MainTitle
        variant="title"
        color="inherit"
        onClick={curry(goHome)(history)}
      >
        Predictions
      </MainTitle>
      <Button color="inherit">Share</Button>
      <Button color="inherit">Reset</Button>
    </Toolbar>
  </Bar>
);

export default withStyles(barStyle)(TopMenu);
