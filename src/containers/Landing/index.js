import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Card, { CardContainer } from "../../components/Card";
import { mapAllLeaguesToProps, mapFetchAction } from "../../ducks/leagues";
import { curry } from "../../helpers";
import logo from "../../logo.png";

const HeaderSegment = styled.div`
  margin: 20px auto 0;
  text-align: center;
`;

const CustomHeader = (Message, variant) => (
  <HeaderSegment>
    <Typography variant={variant} gutterBottom>
      {Message}
    </Typography>
  </HeaderSegment>
);

const ImageHeader = logo => (
  <HeaderSegment>
    <img src={logo} alt="Predictions!" />
  </HeaderSegment>
);

export class Landing extends Component {
  componentDidMount() {
    this.props.fetch();
  }

  goToLeague = id => {
    const encoded = encodeURI(id);
    return this.props.history.push(`/${encoded}`);
  };

  render() {
    const { allLeagues } = this.props;
    return (
      <Fragment>
        {CustomHeader("Hello!", "display3")}
        {ImageHeader(logo)}
        {CustomHeader(" Which league would you like to predict?", "subheading")}
        <CardContainer>
          {allLeagues.map(({ leagueId, leagueName, country, teams }) => (
            <Card key={leagueId} handler={curry(this.goToLeague)(leagueId)}>
              {leagueName}
              {country}
              {`${teams.length} Teams`}
            </Card>
          ))}
        </CardContainer>
      </Fragment>
    );
  }
}

// Redux
export default connect(
  mapAllLeaguesToProps,
  mapFetchAction
)(Landing);
