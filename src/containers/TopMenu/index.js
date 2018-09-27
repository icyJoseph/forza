import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Bar, MainTitle } from "../../components/Common";
import { resetAll } from "../../ducks/predictions";
import { curry, goHome } from "../../helpers";
import { TOPMENU, SHARE, CLEAR } from "../../constants";

/**
 *
 * @description Stateless component which renders a
 * Material UI AppBar and the share,
 * clear buttons when the user navigates inside a league.
 */
export const TopMenu = ({ match, allLeagues, history, resetAll }) => {
  const { params } = match;
  const league = allLeagues[params.league];

  const leagueName = league ? league.leagueName : null;
  const country = league ? league.country : null;
  return (
    <Bar id={TOPMENU} position="sticky">
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
            <Button color="inherit">{SHARE}</Button>
            <Button color="inherit" onClick={curry(resetAll)(leagueName)}>
              {CLEAR}
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
)(TopMenu);

TopMenu.propTypes = {
  match: PropTypes.func,
  allLeagues: PropTypes.object,
  history: PropTypes.func,
  resetAll: PropTypes.object
};
