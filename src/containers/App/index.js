import React from "react";

import Podium from "../../components/Podium";
import Mock from "../../mock/api";

const breakpoint = "(min-width: 599px)";

const { leagues } = Mock;
const { teams } = leagues[0];

const predictions = [
  { team: "A", place: 1, position: "first" },
  { team: "B", place: 2, position: "second" },
  { team: "C", place: 3, position: "third" }
];

const App = () => (
  <div>
    <header>
      <h1>Your Premier League Predictions</h1>
    </header>
    <Podium query={breakpoint} predictions={predictions} />
  </div>
);

export default App;
