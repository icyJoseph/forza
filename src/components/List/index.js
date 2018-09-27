import React from "react";
import PropTypes from "prop-types";
import Card from "../Card";
import { curry } from "../../helpers";
import { TEAMS, PLAYERS } from "../../constants";
import { Flag } from "../Flag";
import { shouldHighlight, sortList } from "./utils";

// the threshold can later on be served by the user

export const Team = ({
  teamName,
  teamColor,
  topPlayers,
  teamGoalsLastSeason,
  callback,
  current
}) => (
  <Card
    id={teamName}
    handler={curry(callback)(teamName)}
    current={current}
    highlight={shouldHighlight(teamGoalsLastSeason, 50, 3)}
  >
    {teamName}
    <Flag color={teamColor} />
    {topPlayers.length > 1
      ? `${topPlayers.length} top players`
      : `${topPlayers.length} top player`}
    {`with ${teamGoalsLastSeason} goals last season`}
  </Card>
);

export const Player = ({
  playerName,
  teamName,
  teamColor,
  goalsLastSeason,
  callback,
  current
}) => (
  <Card
    id={playerName}
    handler={curry(callback)(playerName)}
    current={current}
    highlight={shouldHighlight(goalsLastSeason, 20, 1)}
  >
    {playerName}
    {`${goalsLastSeason} goals last season`}
    {teamName}
    <Flag color={teamColor} />
  </Card>
);

export const ListContainer = ({
  items,
  callback,
  type = TEAMS,
  current,
  sorting
}) =>
  sortList(items, sorting, type).map((item, index) => {
    const Component = type === PLAYERS ? Player : Team;
    return (
      <Component
        key={`${type}-${index}`}
        {...item}
        callback={callback}
        current={current}
      />
    );
  });

ListContainer.propTypes = {
  items: PropTypes.array,
  callback: PropTypes.func,
  type: PropTypes.string,
  current: PropTypes.string,
  sorting: PropTypes.bool
};

export default ListContainer;
