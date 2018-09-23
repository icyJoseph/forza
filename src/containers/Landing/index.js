import React, { Component } from "react";
import { connect } from "react-redux";

import { mapAllLeaguesToProps, mapFetchAction } from "../../ducks/leagues";

export class Landing extends Component {
  componentDidMount() {
    this.props.fetch();
  }

  goToLeague = e => {
    const encoded = encodeURI(e.target.id);
    return this.props.history.push(`/${encoded}`);
  };

  render() {
    const { allLeagues } = this.props;
    return (
      <div>
        <div style={{ margin: 50 }}>
          <div>Hi! Welcome to Predictions App</div>
          <div>Which league would you like to predict?</div>
        </div>
        {allLeagues.map(league => (
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

// Redux
export default connect(
  mapAllLeaguesToProps,
  mapFetchAction
)(Landing);
