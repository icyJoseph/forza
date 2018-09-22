import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

import { fetchLeaguesData, leaguesData } from "../../ducks/leagues";

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

export class League extends Component {
  state = {
    leagueName: "",
    country: "",
    teams: [],
    err: null
  };

  componentDidMount() {
    // Mock eventual network interactions
    // if the user somehow ends up here without data
    const league = this.props.leagues.data.find(
      league => league.leagueId === Number(this.props.match.params.league)
    );
    if (!league) {
      this.props.fetch();
      return new Promise(resolve => setTimeout(resolve, 1000))
        .then(() => this.props.data(Mock))
        .then(() => {
          const { params } = this.props.match;

          return this.setState({
            ...this.props.leagues.data.find(
              league => league.leagueId === Number(params.league)
            )
          });
        });
    }
    return this.setState({ ...league });
  }

  render() {
    const { leagueName, country, teams } = this.state;
    const players = buildPlayersTree(teams);

    return (
      <Fragment>
        <div>
          {leagueName} - {country}
        </div>
        <div style={{ marginTop: 40 }}>
          <Podium query={breakpoint} predictions={predictions} />
        </div>
        <div style={{ marginTop: 40 }}>
          <TopScorer>
            {Object.keys(players).map(player => (
              <div key={player}>{player}</div>
            ))}
          </TopScorer>
        </div>
        <div style={{ marginTop: 40 }}>
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
)(League);
