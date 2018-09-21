import React from "react";
import styled from "styled-components";
import TopScorer from "../TopScorer";

import List from "../../components/List";
import Podium from "../../components/Podium";
import Mock from "../../mock/api";
import { buildPlayersTree } from "../../helpers";
const breakpoint = "(min-width: 599px)";

const { leagues } = Mock;
const { teams } = leagues[0];

const players = buildPlayersTree(teams);

const predictions = [
  { team: "A", place: 1, position: "first" },
  { team: "B", place: 2, position: "second" },
  { team: "C", place: 3, position: "third" }
];

const Stick = styled.div`
  position: sticky;
  top: 0;
  height: 100%;
  background-color: white;
`;

const App = () => (
  <div>
    <Stick>
      <header>
        <h1>Your Premier League Predictions</h1>
      </header>
      <Podium query={breakpoint} predictions={predictions} />
    </Stick>
    <TopScorer>
      {Object.keys(players).map(player => (
        <div key={player}>{player}</div>
      ))}
    </TopScorer>
    <List teams={teams} callback={e => console.log(e)} />
  </div>
);

export default App;
