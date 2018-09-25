import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Place, PodiumWrapper, Name, Position } from "./styled";

import podiumSorter from "./utils";

const Stand = ({ place, teamName, open }) => {
  return (
    <div>
      <Position>{place}</Position>
      <Place place={place} elevation={3} open={open}>
        <Name>{teamName}</Name>
      </Place>
    </div>
  );
};

const PlaceHolder = ({ open }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      height: "150px",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <div style={{ margin: "0 auto" }}>How will the league end?</div>
    <div style={{ margin: "0 auto" }}>
      Click on the teams. {!open && "Click here to expand."}
    </div>
  </div>
);

export class Podium extends Component {
  state = { matches: true, open: false };

  componentDidMount() {
    const { query } = this.props;
    // to be able to test
    const targetWindow = this.props.targetWindow || window;
    // get the matchMedia function
    this.mediaQueryList = targetWindow.matchMedia(query);
    // listen to updates
    this.mediaQueryList.addListener(this.updateMatches);
    // are we matching?
    const { matches } = this.mediaQueryList;
    this.setState({ open: matches });
    return this.updateMatches();
  }

  componentWillUnmount() {
    this.mediaQueryList.removeListener(this.updateMatches);
  }

  updateMatches = () => {
    const { matches } = this.mediaQueryList;

    return this.setState({ matches });
  };

  togglePodium = () =>
    this.setState(prevState => ({
      open: !prevState.open
    }));

  render() {
    const { matches, open } = this.state;
    const { predictions, leagueName, topScorer } = this.props;
    const predictionsForLeague = predictions[leagueName];
    const topScorerForLeague = topScorer[leagueName];

    return (
      <PodiumWrapper elevation={10} open={open} onClick={this.togglePodium}>
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
              <Stand key={team.teamName} {...team} open={open} />
            ))}
          </div>
        ) : (
          <PlaceHolder open={open} />
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
