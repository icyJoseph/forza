import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Prediction from "../../containers/Prediction";

import Podium from "../../components/Podium";
import Loading from "../../components/Loading";
import { CardContainer } from "../../components/Card";
import List from "../../components/List";
import { mapAllLeaguesToProps, mapFetchAction } from "../../ducks/leagues";
import {
  curry,
  buildPlayersTree,
  goHome,
  setUpMediaQuery
} from "../../helpers";
import {
  PredictionContainer,
  StyledBottomNavigation
} from "../../components/Common";

import { toggler } from "./utils";
import {
  podiumBreakpoint,
  topMenuBreakPoint,
  TEAMS,
  PLAYERS,
  TOPMENU
} from "../../constants";

export class League extends Component {
  state = {
    value: TEAMS,
    open: false,
    id: null,
    top: "56px",
    league: undefined
  };

  componentDidMount() {
    // take user to the top
    window.scrollTo(0, 0);
    const league = this.props.allLeagues[this.props.match.params.league];
    this.shouldFetchOrSet(league);
    return setUpMediaQuery.bind(this)(topMenuBreakPoint);
  }

  shouldFetchOrSet = league =>
    !league ? this.props.fetch() : this.setState({ league });

  componentDidUpdate() {
    const league = this.props.allLeagues[this.props.match.params.league];
    if (!league) {
      return goHome(this.props.history);
    } else if (this.state.league.leagueId !== league.leagueId) {
      return this.setState({ league });
    }
    return null;
  }

  componentWillUnmount() {
    this.mediaQueryList.removeListener(this.updateMatches);
  }

  updateMatches = () => {
    const menu = document.getElementById(TOPMENU);
    const top = menu && window.getComputedStyle(menu).height;
    return top && this.setState({ top });
  };

  handleChange = (e, value) => this.setState({ value, open: false, id: null });

  togglePredictionMaker = id => this.setState(curry(toggler)(id));

  closePredictionMaker = () => {
    return this.setState({
      open: false,
      id: null
    });
  };

  render() {
    const { sorting, predictions } = this.props;
    const { league, value, open, id, top } = this.state;
    if (!league) {
      return <Loading />;
    }

    const { leagueName = "", teams = [] } = league;
    const playersTree = buildPlayersTree(teams, leagueName);

    const players = Object.keys(playersTree).reduce(
      (acc, player) => acc.concat(playersTree[player]),
      []
    );

    const listProps = { items: value === TEAMS ? teams : players };

    return (
      <Fragment>
        <PredictionContainer top={top}>
          <Podium
            query={podiumBreakpoint}
            leagueName={leagueName}
            {...predictions}
          />
        </PredictionContainer>
        <CardContainer>
          <List
            {...listProps}
            type={value}
            callback={this.togglePredictionMaker}
            current={id}
            sorting={sorting}
          />
        </CardContainer>
        <Prediction
          open={open}
          hook={id}
          player={playersTree[id]}
          leagueName={league.leagueName}
          team={league.teams.find(team => team.teamName === id)}
          close={this.closePredictionMaker}
        />
        <StyledBottomNavigation
          showLabels
          value={value}
          onChange={this.handleChange}
        >
          {[TEAMS, PLAYERS].map(item => (
            <BottomNavigationAction key={item} value={item} label={item} />
          ))}
        </StyledBottomNavigation>
      </Fragment>
    );
  }
}

League.propTypes = {
  fetch: PropTypes.func,
  allLeagues: PropTypes.object,
  sorting: PropTypes.bool,
  predictions: PropTypes.object
};

export const mapStateToProps = ({ predictions, sorting, ...rest }) => ({
  sorting,
  predictions,
  ...mapAllLeaguesToProps(rest)
});

// Redux
export default connect(
  mapStateToProps,
  mapFetchAction
)(League);
