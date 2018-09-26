import React from "react";
import Emoji from "../Emoji";
import { Position, Name, Place } from "../Common";

export const Stand = ({ place, teamName, open }) => {
  return (
    <div>
      <Position>
        <Emoji place={place} />
      </Position>
      <Place place={place} elevation={3} open={open}>
        <Name>{teamName}</Name>
      </Place>
    </div>
  );
};
