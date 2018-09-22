import React, { Fragment } from "react";
import styled, { css } from "styled-components";

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

const { leagues } = Mock;
const { teams, leagueName, country } = leagues[0];

const players = buildPlayersTree(teams);

const predictions = [
  { team: "A", place: 1, position: "first" },
  { team: "B", place: 2, position: "second" },
  { team: "C", place: 3, position: "third" }
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

const App = () => (
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

export default App;
