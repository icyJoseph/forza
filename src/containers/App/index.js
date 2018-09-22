import React, { Component, Fragment } from "react";
import styled, { css } from "styled-components";

import { connect } from "react-redux";

import { fetchLeaguesData, leaguesData } from "../../ducks/leagues";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import List from "../../components/List";
import Podium from "../../components/Podium";
import TopScorer from "../TopScorer";

import Mock from "../../mock/api";
import { buildPlayersTree } from "../../helpers";

const breakpoint = "(min-width: 599px)";

const predictions = [
  { team: "A", place: 1 },
  { team: "B", place: 2 },
  { team: "C", place: 3 }
];

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

export class App extends Component {
  state = {
    leagueName: "",
    country: "",
    teams: [],
    err: null
  };

  componentDidMount() {
    // Mock eventual network interactions
    this.props.fetch();
    return new Promise((resolve, reject) => setTimeout(() => resolve(), 1000))
      .then(() => this.props.data(Mock))
      .then(() => this.setState({ ...this.props.leagues.data[0] }));
  }

  render() {
    const { leagueName, country, teams } = this.state;
    const players = buildPlayersTree(teams);

    return (
      <Fragment>
        <Bar position="static" color="primary">
          <Toolbar>
            <MainTitle variant="title" color="inherit">
              {leagueName} Predictions - {country}
            </MainTitle>
            <Button color="inherit">Share</Button>
            <Button color="inherit">Reset</Button>
          </Toolbar>
        </Bar>
        <div style={{ marginTop: 40, border: "1px solid" }}>
          <Podium query={breakpoint} predictions={predictions} />
        </div>
        <div style={{ marginTop: 40, border: "1px solid" }}>
          <TopScorer>
            {Object.keys(players).map(player => (
              <div key={player}>{player}</div>
            ))}
          </TopScorer>
        </div>
        <div style={{ marginTop: 40, border: "1px solid" }}>
          <List teams={teams} callback={e => console.log(e)} />
        </div>
      </Fragment>
    );
  }
}

// TODO: refactor
export default connect(
  ({ leagues }) => ({ leagues }),
  dispatch => ({
    fetch: () => dispatch(fetchLeaguesData),
    data: ({ leagues }) => dispatch(leaguesData(leagues))
  })
)(App);
