import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Podium from "../../containers/Podium";
import Prediction from "../../containers/Prediction";

import { CardContainer, LeagueLabel } from "../../components/Card";
import List from "../../components/List";
import { mapAllLeaguesToProps, mapFetchAction } from "../../ducks/leagues";

import { buildPlayersTree, goHome } from "../../helpers";

const breakpoint = "(min-width: 685px)";
const topMenuBreakPoint = "(min-width: 600px)";

export const PredictionContainer = styled.div`
  position: sticky;
  top: ${props => props.top}
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background: #fbfcfa;
  z-index: 20;
`;

export const StyledTabs = styled(Tabs)`
  margin-bottom: 20px;
`;

export class League extends Component {
  state = {
    value: 0,
    open: false,
    id: null,
    top: 56,
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
    const source = e.path.find(elem => elem.id === this.state.id);
    return !source ? this.closePredictionMaker() : null;
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

    const { leagueName = "", country = "", teams = [] } = league;
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
          <LeagueLabel height={20}>
            {[`${country} - ${leagueName}`]}
          </LeagueLabel>
          <Podium query={breakpoint} leagueName={leagueName} />
        </PredictionContainer>
        <StyledTabs value={value} onChange={this.handleChange} centered>
          <Tab label="Teams" />
          <Tab label="Top Players" />
        </StyledTabs>
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
