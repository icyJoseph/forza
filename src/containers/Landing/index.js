import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Card, { CardContainer } from "../../components/Card";
import { mapAllLeaguesToProps, mapFetchAction } from "../../ducks/leagues";
import { curry } from "../../helpers";
import logo from "../../logo.png";

const HeaderSegment = styled.div`
  margin: 15px auto 2px;
  text-align: center;
`;

const CustomHeader = (Message, variant, split = false) => {
  const messageArr = split ? Message.split(" ") : [Message];
  return (
    <HeaderSegment>
      {messageArr.map(message => (
        <Typography key={message} variant={variant}>
          {message}
        </Typography>
      ))}
    </HeaderSegment>
  );
};

const ImageHeader = logo => (
  <HeaderSegment>
    <img src={logo} alt="Predictions!" style={{ marginTop: "10px" }} />
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

// Redux
export default connect(
  mapAllLeaguesToProps,
  mapFetchAction
)(Landing);
