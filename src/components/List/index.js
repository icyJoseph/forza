import React from "react";
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

export const Team = ({
  teamName,
  teamColor,
  topPlayers,
  callback,
  current
}) => (
  <Card id={teamName} handler={curry(callback)(teamName)} current={current}>
    {teamName}
    <Flag color={teamColor} />
    {topPlayers.map(({ playerName }) => (
      <div key={playerName}>{playerName}</div>
    ))}
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
  <Card id={playerName} handler={curry(callback)(playerName)} current={current}>
    {playerName}
    {goalsLastSeason}
    {teamName}
    <Flag color={teamColor} />
  </Card>
);

export const ListContainer = ({ items, callback, type = "team", current }) =>
  items.map((item, index) => {
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
