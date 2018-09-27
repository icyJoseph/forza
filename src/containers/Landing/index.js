import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Card, { CardContainer } from "../../components/Card";
import { CustomHeader, ImageHeader } from "../../components/Headers";
import { mapAllLeaguesToProps, mapFetchAction } from "../../ducks/leagues";
import { curry, shouldFetch } from "../../helpers";
import logo from "../../logo.png";

/**
 *
 * @description Fetches leagues data and renders a
 * card for each one of them.
 */
export class Landing extends Component {
  componentDidMount() {
    const { expiry } = this.props;
    return shouldFetch(expiry) && this.props.fetch();
  }

  goToLeague = id => {
    return this.props.history.push(`/${id}`);
  };

  render() {
    const { allLeagues } = this.props;
    return (
      <Fragment>
        {CustomHeader("FORZA CHALLENGE", "display2", true)}
        {ImageHeader(logo)}
        {CustomHeader(" Which league would you like to predict?", "subheading")}
        <CardContainer>
          {Object.keys(allLeagues).map(leagueId => (
            <Card
              key={leagueId}
              handler={curry(this.goToLeague)(leagueId)}
              title={0}
              highlight={[1, 4]}
            >
              {allLeagues[leagueId].leagueName}
              {allLeagues[leagueId].country}
              {`${allLeagues[leagueId].teams.length} Teams`}
              {"Top Players scored"}
              {`${allLeagues[leagueId].leagueGoalsLastSeason}`}
              {"goals last season"}
            </Card>
          ))}
        </CardContainer>
      </Fragment>
    );
  }
}

Landing.propTypes = {
  allLeague: PropTypes.object,
  fetch: PropTypes.func,
  history: PropTypes.object,
  expiry: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
};

// Redux
export default connect(
  mapAllLeaguesToProps,
  mapFetchAction
)(Landing);
