import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Podium from "../../containers/Podium";
import Prediction from "../../containers/Prediction";

import { CardContainer } from "../../components/Card";
import List from "../../components/List";
import { mapAllLeaguesToProps, mapFetchAction } from "../../ducks/leagues";

import { buildPlayersTree, goHome } from "../../helpers";

const breakpoint = "(min-width: 785px)";
const topMenuBreakPoint = "(min-width: 600px)";

export const PredictionContainer = styled.div`
  position: sticky;
  top: ${props => props.top}
  display: flex;
  flex-direction: column;
  padding-top:10px;
  margin-bottom: 20px;
  z-index: 20;
`;

export const StyledBottomNavigation = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100%;
`;

export class League extends Component {
  state = {
    value: 0,
    open: false,
    id: null,
    top: "56px",
    league: undefined
  };

  root = null;

  componentDidMount() {
    this.root = document.getElementById("root");
    // take user to the top
    window.scrollTo(0, 0);
    const league = this.props.allLeagues[this.props.match.params.league];
    if (!league) {
      this.props.fetch();
    } else {
      this.setState({ league });
    }

    const targetWindow = this.props.targetWindow || window;
    // get the matchMedia function
    this.mediaQueryList = targetWindow.matchMedia(topMenuBreakPoint);
    // listen to updates
    this.mediaQueryList.addListener(this.updateMatches);
    // are we matching?
    return this.updateMatches();
  }

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
    const menu = document.getElementById("TopMenu");
    const top = window.getComputedStyle(menu).height;
    return this.setState({ top });
  };
  handleChange = (e, value) => this.setState({ value });

  bubbleHandler = e => {
    const source =
      e &&
      e.path &&
      e.path.find(elem => elem.id === this.state.id || elem.id === "@pinned");
    return !source && e.path ? this.closePredictionMaker() : null;
  };

  openPredictionMaker = id => {
    this.root.addEventListener("click", this.bubbleHandler);
    return this.setState({
      open: true,
      id
    });
  };

  closePredictionMaker = () => {
    this.root.removeEventListener("click", this.bubbleHandler);
    return this.setState({
      open: false,
      id: null
    });
  };

  render() {
    const { league } = this.state;
    if (!league) {
      return <div>Just one sec...</div>;
    }

    const { leagueName = "", teams = [] } = league;
    const playersTree = buildPlayersTree(teams, leagueName);

    const players = Object.keys(playersTree).reduce(
      (acc, player) => acc.concat(playersTree[player]),
      []
    );
    const { value, open, id, top } = this.state;
    const { sorting } = this.props;
    return (
      <Fragment>
        <PredictionContainer top={top}>
          <Podium query={breakpoint} leagueName={leagueName} />
        </PredictionContainer>
        {value === 0 && (
          <CardContainer>
            <List
              items={teams}
              type="teams"
              callback={this.openPredictionMaker}
              current={id}
              sorting={sorting}
            />
          </CardContainer>
        )}
        {value === 1 && (
          <CardContainer>
            <List
              items={players}
              type="players"
              callback={this.openPredictionMaker}
              current={id}
              sorting={sorting}
            />
          </CardContainer>
        )}
        {open && (
          <Prediction
            player={playersTree[id]}
            leagueName={league.leagueName}
            team={league.teams.find(team => team.teamName === id)}
            close={this.closePredictionMaker}
            hook={id}
          />
        )}
        <StyledBottomNavigation
          showLabels
          value={value}
          onChange={this.handleChange}
        >
          <BottomNavigationAction label="Teams" />
          <BottomNavigationAction label="Players" />
        </StyledBottomNavigation>
      </Fragment>
    );
  }
}

const combineMap = ({ sorting, ...rest }) => ({
  ...mapAllLeaguesToProps(rest),
  sorting
});

// Redux
export default connect(
  combineMap,
  mapFetchAction
)(League);
