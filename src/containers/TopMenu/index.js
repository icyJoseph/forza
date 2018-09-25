import React, { Fragment } from "react";
import styled, { css } from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { resetAll } from "../../ducks/predictions";
import { curry, goHome } from "../../helpers";

const baseStyle = css`
  flex-grow: 1;
`;

const MainTitle = styled(Typography)`
  ${baseStyle};
  cursor: pointer;
`;

const Bar = styled(AppBar)`
  ${baseStyle};
`;

const barStyle = {
  bar: { backgroundColor: "dodgerBlue" }
};

export const TopMenu = ({ match, allLeagues, history, classes, resetAll }) => {
  const { params } = match;
  const league = allLeagues[params.league];

  const leagueName = league ? league.leagueName : null;
  const country = league ? league.country : null;
  return (
    <Bar id="TopMenu" position="sticky" className={classes.bar}>
      <Toolbar>
        <MainTitle
          variant="title"
          color="inherit"
          onClick={curry(goHome)(history)}
        >
          {!leagueName ? "Predictions" : `${leagueName} - ${country}`}
        </MainTitle>
        {leagueName && (
          <Fragment>
            <Button color="inherit">Share</Button>
            <Button color="inherit" onClick={curry(resetAll)(leagueName)}>
              Clear
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </Bar>
  );
};

export default connect(
  ({ leagues: { allLeagues } }) => ({ allLeagues }),
  { resetAll }
)(withStyles(barStyle)(TopMenu));
