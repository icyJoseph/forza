import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLeaguesData, leaguesData } from "../../ducks/leagues";

import Mock from "../../mock/api";

export class Landing extends Component {
  state = {
    leagues: []
  };

  componentDidMount() {
    // Mock eventual network interactions
    this.props.fetch();
    return new Promise(resolve => setTimeout(resolve, 1000))
      .then(() => this.props.data(Mock))
      .then(() => this.setState({ leagues: this.props.leagues.data }));
  }

  goToLeague = e => {
    const encoded = encodeURI(e.target.id);
    return this.props.history.push(`/${encoded}`);
  };

  render() {
    const { leagues } = this.state;
    return (
      <div>
        <div style={{ margin: 50 }}>
          <div>Hi! Welcome to Predictions App</div>
          <div>Which league would you like to predict?</div>
        </div>
        {leagues.map(league => (
          <div
            style={{ margin: 50 }}
            id={league.leagueId}
            key={league.leagueId}
            onClick={this.goToLeague}
          >
            {league.leagueName}
          </div>
        ))}
      </div>
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
)(Landing);
