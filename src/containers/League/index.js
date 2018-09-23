import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Card, { CardContainer } from "../../components/Card";
import List from "../../components/List";
import Podium from "../../components/Podium";
import { mapAllLeaguesToProps, mapFetchAction } from "../../ducks/leagues";

import { buildPlayersTree } from "../../helpers";

const breakpoint = "(min-width: 599px)";

const predictions = [
  { team: "A", place: 1 },
  { team: "B", place: 2 },
  { team: "C", place: 3 }
];

export const PredictionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const StyledTabs = styled(Tabs)`
  margin-bottom: 20px;
`;

export class League extends Component {
  state = {
    value: 0
  };

  handleChange = (e, value) => this.setState({ value });

  render() {
    const league = this.props.allLeagues.find(
      league => league.leagueId === Number(this.props.match.params.league)
    );

    if (!league) {
      this.props.fetch();
      return <div>Just one sec...</div>;
    }

    const { leagueName = "", country = "", teams = [] } = league;
    const playersTree = buildPlayersTree(teams);
    const players = Object.keys(playersTree).reduce(
      (acc, player) => acc.concat(playersTree[player]),
      []
    );
    const { value } = this.state;
    return (
      <Fragment>
        <PredictionContainer>
          <Card height={20}>{[`${country} - ${leagueName}`]}</Card>
          <Podium query={breakpoint} predictions={predictions} />
        </PredictionContainer>
        <StyledTabs value={value} onChange={this.handleChange} centered>
          <Tab label="Teams" />
          <Tab label="Top Players" />
        </StyledTabs>
        {value === 0 && (
          <CardContainer>
            <List items={teams} type="teams" />
          </CardContainer>
        )}
        {value === 1 && (
          <CardContainer>
            <List items={players} type="players" />
          </CardContainer>
        )}
      </Fragment>
    );
  }
}

// Redux
export default connect(
  mapAllLeaguesToProps,
  mapFetchAction
)(League);
