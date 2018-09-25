import React, { Fragment } from "react";
import styled from "styled-components";
import Card from "../Card";
import { curry } from "../../helpers";

const Flag = styled.div.attrs({
  style: ({ color }) => ({
    backgroundColor: `${color}`,
    border: color === "#FFFFFF" ? "1px dashed gray" : ""
  })
})`
  width: 30px;
  height: 5px;
  margin: 3px auto;
`;

// the threshold can later on be served by the user
const shouldHighlight = (goals, threshold, index) =>
  goals > threshold ? [index] : [];

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

const goalCriteria = type => {
  const key = type === "players" ? "goalsLastSeason" : "teamGoalsLastSeason";
  return (a, b) => b[key] - a[key];
};

const sortList = (items, sorting, type) => {
  const copy = items.slice(0);
  return sorting ? copy.sort(goalCriteria(type)) : items;
};

export const ListContainer = ({
  items,
  callback,
  type = "team",
  current,
  sorting
}) =>
  sortList(items, sorting, type).map((item, index) => {
    const Component = type === "players" ? Player : Team;
    return (
      <Component
        key={`${type}-${index}`}
        {...item}
        callback={callback}
        current={current}
      />
    );
  });

export default ListContainer;
