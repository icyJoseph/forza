import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Portal from "../../components/Portal";
import { TeamsButtonPad } from "../../components/TeamsButtonPad";
import { PlayersButtonPad } from "../../components/PlayersButtonPad";
import { setPrediction, setTopScorer } from "../../ducks/predictions";

/**
 *
 * @description A set of buttons that will attach to the
 * card selected by the user. This is a singleton.
 * In mobile view they attack to the Floating Action
 * Buttons. It also includes label in the middle of
 * the screen which indicates the current selection.
 */
export const Prediction = ({
  open,
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
    open && (
      <Portal
        hook={hook}
        Component={Component}
        componentProps={componentProps}
      />
    )
  );
};

Prediction.propTypes = {
  open: PropTypes.bool,
  player: PropTypes.object,
  hook: PropTypes.string,
  setTopScorer: PropTypes.func,
  setPrediction: PropTypes.func,
  leagueName: PropTypes.string,
  close: PropTypes.func,
  team: PropTypes.object
};

export default connect(
  undefined,
  { setPrediction, setTopScorer }
)(Prediction);
