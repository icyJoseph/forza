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

import { buildPlayersTree, goHome, setUpMediaQuery } from "../../helpers";
import { podiumBreakpoint, topMenuBreakPoint } from "../../constants";

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
    value: "teams",
    open: false,
    id: null,
    top: "56px",
    league: undefined
  };

  componentDidMount() {
    // take user to the top
    window.scrollTo(0, 0);

    const league = this.props.allLeagues[this.props.match.params.league];

    if (!league) {
      this.props.fetch();
    } else {
      this.setState({ league });
    }

    return setUpMediaQuery.bind(this)(topMenuBreakPoint);
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

  handleChange = (e, value) => this.setState({ value, open: false, id: null });

  togglePredictionMaker = id => {
    return this.setState(prevState => ({
      open: prevState.id === id ? !prevState.open : true,
      id: prevState.id === id ? null : id
    }));
  };

  closePredictionMaker = () => {
    return this.setState({
      open: false,
      id: null
    });
  };

  render() {
    const { sorting } = this.props;
    const { league, value, open, id, top } = this.state;
    if (!league) {
      return <div>Just one sec...</div>;
    }

    const { leagueName = "", teams = [] } = league;
    const playersTree = buildPlayersTree(teams, leagueName);

    const players = Object.keys(playersTree).reduce(
      (acc, player) => acc.concat(playersTree[player]),
      []
    );

    return (
      <Fragment>
        <PredictionContainer top={top}>
          <Podium query={podiumBreakpoint} leagueName={leagueName} />
        </PredictionContainer>
        {value === "teams" && (
          <CardContainer id="teams">
            <List
              items={teams}
              type="teams"
              callback={this.togglePredictionMaker}
              current={id}
              sorting={sorting}
            />
          </CardContainer>
        )}
        {value === "players" && (
          <CardContainer id="players">
            <List
              items={players}
              type="players"
              callback={this.togglePredictionMaker}
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
          <BottomNavigationAction
            id="bottomTeams"
            value="teams"
            label="teams"
          />
          <BottomNavigationAction
            id="bottomPlayers"
            value="players"
            label="players"
          />
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
