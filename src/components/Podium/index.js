import React, { Component } from "react";
import { Place, PodiumWrapper } from "./styled";

import podiumSorter from "./utils";

const Stand = ({ place, team }) => {
  return (
    <Place place={place}>
      <span>{team}</span>
      <span>{place}</span>
    </Place>
  );
};

class Podium extends Component {
  state = { matches: true };

  componentDidMount() {
    const { query } = this.props;
    // to be able to test
    const targetWindow = this.props.targetWindow || window;
    // get the matchMedia function
    this.mediaQueryList = targetWindow.matchMedia(query);
    // listen to updates
    this.mediaQueryList.addListener(this.updateMatches);
    // are we matching?
    return this.updateMatches();
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
    const { predictions } = this.props;
    const podium = podiumSorter(matches, predictions);
    return (
      <PodiumWrapper>
        {podium.map(team => (
          <Stand key={team.team} {...team} />
        ))}
      </PodiumWrapper>
    );
  }
}
export default Podium;
