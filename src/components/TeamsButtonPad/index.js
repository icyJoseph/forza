import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { SideLabel } from "../Label";
import { PLACES } from "../../constants";
import { curry } from "../../helpers";
import { AnswerButton, MobileAnswerButton } from "../Buttons";

export const AnswerPrediction = ({ setPrediction, payload, place, close }) => {
  setPrediction(payload, place);
  return close();
};

export const TeamsButtonPad = ({ leagueName, team, matches, ...props }) => {
  const Buttons = PLACES.map(place => {
    const Component = matches ? AnswerButton : MobileAnswerButton;
    return (
      <Component
        key={place}
        middle={place}
        content={place}
        onClick={curry(AnswerPrediction)({
          payload: { leagueName, ...team },
          place,
          ...props
        })}
      />
    );
  });
  return (
    <Fragment>
      {Buttons}
      <SideLabel
        matches={matches}
        content={team.teamName}
        handler={props.close}
      />
    </Fragment>
  );
};

TeamsButtonPad.propTypes = {
  leagueName: PropTypes.string,
  team: PropTypes.object,
  matches: PropTypes.bool
};
