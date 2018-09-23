import React from "react";
import styled from "styled-components";
import Card from "../Card";

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

export const Team = ({ teamName, teamColor, topPlayers, callback }) => (
  <Card handler={callback}>
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
  callback
}) => (
  <Card handler={callback}>
    {playerName}
    {goalsLastSeason}
    {teamName}
    <Flag color={teamColor} />
  </Card>
);

export const ListContainer = ({ items, callback, type = "team" }) =>
  items.map((item, index) => {
    const Component = type === "players" ? Player : Team;
    return <Component key={`${type}-${index}`} {...item} callback={callback} />;
  });

export default ListContainer;
