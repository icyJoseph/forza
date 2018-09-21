import React from "react";

const ListContainer = ({ teams, callback }) => (
  <div>
    {teams.map(team => (
      <ListElement key={team.teamId} {...team} callback={callback} />
    ))}
  </div>
);

const ListElement = ({ teamName, callback }) => (
  <div style={{ margin: 20, display: "flex" }}>
    <div onClick={() => callback({ name: teamName })}>{teamName}</div>
  </div>
);

export default ListContainer;
