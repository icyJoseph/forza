import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Place, PodiumWrapper, Name, Position } from "./styled";

import podiumSorter from "./utils";

const Stand = ({ place, teamName }) => {
  return (
    <Place place={place} elevation={3}>
      <Name>{teamName}</Name>
      <Position>{place}</Position>
    </Place>
  );
};

const PlaceHolder = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      height: "150px",
      justifyContent: "center"
    }}
  >
    <div style={{ margin: "0 auto" }}>How will the league end?</div>
    <div style={{ margin: "0 auto" }}>Click on the teams below.</div>
  </div>
);

export class Podium extends Component {
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
    const { predictions, leagueName, topScorer } = this.props;
    const predictionsForLeague = predictions[leagueName];
    const topScorerForLeague = topScorer[leagueName];

    return (
      <PodiumWrapper>
        <div style={{ margin: "5px auto 0", height: "30px" }}>
          {topScorerForLeague
            ? `${topScorerForLeague.playerName} as top scorer!`
            : "Who'll be top scorer?"}
        </div>

        {predictionsForLeague ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "center"
            }}
          >
            {podiumSorter(matches, predictionsForLeague).map(team => (
              <Stand key={team.teamName} {...team} />
            ))}
          </div>
        ) : (
          <PlaceHolder />
        )}
      </PodiumWrapper>
    );
  }
}

Podium.propTypes = {
  predictions: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  targetWindow: PropTypes.object
};

Podium.defaultProps = {
  predictions: {},
  query: "(min-width: 599px)"
};

Stand.propTypes = {
  place: PropTypes.number,
  team: PropTypes.string
};

export default connect(({ predictions: { predictions, topScorer } }) => ({
  predictions,
  topScorer
}))(Podium);
