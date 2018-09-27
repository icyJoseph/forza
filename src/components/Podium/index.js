import React, { Component } from "react";
import PropTypes from "prop-types";
import { Stand } from "../Stand";
import { PlaceHolder } from "../PlaceHolder";
import { TopScorer } from "../TopScorer";
import { PodiumWrapper, FlexCenterContainer } from "../Common";

import podiumSorter from "./utils";
import { setUpMediaQuery } from "../../helpers";

export class Podium extends Component {
  state = { matches: true, open: false };

  componentDidMount() {
    const { query } = this.props;
    setUpMediaQuery.bind(this)(query);
    return this.setMatchesToOpen();
  }

  componentWillUnmount() {
    this.mediaQueryList.removeListener(this.updateMatches);
  }

  setMatchesToOpen = () => {
    const { matches } = this.mediaQueryList;
    return this.setState({ open: matches });
  };

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
        <TopScorer topScorerForLeague={topScorerForLeague} />
        {predictionsForLeague ? (
          <FlexCenterContainer>
            {podiumSorter(matches, predictionsForLeague).map(team => (
              <Stand key={team.teamName} {...team} open={open} />
            ))}
          </FlexCenterContainer>
        ) : (
          <PlaceHolder open={open} leagueName={leagueName} />
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

export default Podium;
