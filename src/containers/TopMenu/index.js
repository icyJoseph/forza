import React from "react";
import styled, { css } from "styled-components";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const baseStyle = css`
  flex-grow: 1;
`;

const MainTitle = styled(Typography)`
  ${baseStyle};
`;

const Bar = styled(AppBar)`
  ${baseStyle};
  border: 1px solid;
`;

export const TopMenu = () => (
  <Bar position="static" color="primary">
    <Toolbar>
      <MainTitle variant="title" color="inherit">
        Predictions
      </MainTitle>
      <Button color="inherit">Share</Button>
      <Button color="inherit">Reset</Button>
    </Toolbar>
  </Bar>
);

export default TopMenu;
