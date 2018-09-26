import React from "react";
import { connect } from "react-redux";
import Portal from "../../components/Portal";
import { TeamsButtonPad } from "../../components/TeamsButtonPad";
import { PlayersButtonPad } from "../../components/PlayersButtonPad";
import { setPrediction, setTopScorer } from "../../ducks/predictions";

export const Prediction = ({
  player,
  hook,
  setTopScorer,
  setPrediction,
  leagueName,
  close,
  team
}) => {
  const Component = player ? PlayersButtonPad : TeamsButtonPad;
  const componentProps = player
    ? {
        player,
        setTopScorer,
        close
      }
    : {
        close,
        setPrediction,
        leagueName,
        team
      };
  return (
    <Portal hook={hook} Component={Component} componentProps={componentProps} />
  );
};

export default connect(
  undefined,
  { setPrediction, setTopScorer }
)(Prediction);
