import React from "react";
import { CommonContainer, BlueSpan } from "../Common";
import Emoji from "../Emoji";

export const TopScorer = ({ topScorerForLeague }) => (
  <CommonContainer>
    {topScorerForLeague ? (
      <div>
        <BlueSpan>{`${topScorerForLeague.playerName}`}</BlueSpan>
        {" as top scorer! "}
        <Emoji place="ball" />
      </div>
    ) : (
      "Who'll be top scorer?"
    )}
  </CommonContainer>
);
