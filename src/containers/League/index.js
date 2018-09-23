import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

import { StickyPredictions } from "./styled";

import { mapAllLeaguesToProps, mapFetchAction } from "../../ducks/leagues";

import List from "../../components/List";
import Podium from "../../components/Podium";

// import { buildPlayersTree } from "../../helpers";

const breakpoint = "(min-width: 599px)";

const predictions = [
  { team: "A", place: 1 },
  { team: "B", place: 2 },
  { team: "C", place: 3 }
];

export class League extends Component {
  render() {
    const league = this.props.allLeagues.find(
      league => league.leagueId === Number(this.props.match.params.league)
    );

    if (!league) {
      this.props.fetch();
      return <div>Just one sec...</div>;
    }

    const { leagueName = "", country = "", teams = [] } = league;
    // const players = buildPlayersTree(teams);

    return (
      <Fragment>
        <StickyPredictions>
          <div style={{ paddingTop: 15 }}>
            {leagueName} - {country}
          </div>
          <div>
            <Podium query={breakpoint} predictions={predictions} />
          </div>
        </StickyPredictions>
        {/* <div style={{ marginTop: 40 }}>
          <TopScorer>
            {Object.keys(players).map(player => (
              <div key={player}>{player}</div>
            ))}
          </TopScorer>
        </div> */}
        <div style={{ marginTop: 40 }}>
          <List teams={teams} callback={e => console.log(e)} />
        </div>
      </Fragment>
    );
  }
}

// Redux
export default connect(
  mapAllLeaguesToProps,
  mapFetchAction
)(League);
