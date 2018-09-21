import React, { Component } from "react";
import { Place } from "./styled";

const Stand = ({ place, team }) => {
  return (
    <Place place={place}>
      <span>{team}</span>
      <span>{place}</span>
    </Place>
  );
};

const predictions = [
  { team: "A", place: 1, position: "first" },
  { team: "B", place: 2, position: "second" },
  { team: "C", place: 3, position: "third" }
];

const wideScreen = ["second", "first", "third"];
const narrowScreen = ["first", "second", "third"];

function sortPodium(match, position) {
  switch (match) {
    case true:
      return wideScreen.indexOf(position);
    case false:
      return narrowScreen.indexOf(position);
    default:
      return -1;
  }
}

class Podium extends Component {
  state = { matches: true };

  componentDidMount() {
    const { query } = this.props;
    // to be able to test
    const targetWindow = this.props.targetWindow || window;

    this.mediaQueryList = targetWindow.matchMedia(query);

    const { matches } = this.mediaQueryList;
    this.mediaQueryList.addListener(this.updateMatches);
    return this.setState({ matches });
  }

  componentWillUnmount() {
    this.mediaQueryList.removeListener(this.updateMatches);
  }

  updateMatches = () => {
    const { matches } = this.mediaQueryList;

    return this.setState({ matches });
  };

  render() {
    const { matches } = this.state;
    const sorted = predictions.sort(
      (a, b) =>
        sortPodium(matches, a.position) - sortPodium(matches, b.position)
    );
    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center"
        }}
      >
        {sorted.map(team => (
          <Stand key={team.team} {...team} />
        ))}
      </div>
    );
  }
}
export default Podium;
