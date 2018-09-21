import React from "react";

const ListContainer = ({ teams }) => (
  <ul style={{ listStyle: "none" }}>
    {teams.map(team => (
      <ListElement key={team.teamId} {...team} />
    ))}
  </ul>
);

const ListElement = ({ teamName }) => <li>{teamName}</li>;

export default ListContainer;
