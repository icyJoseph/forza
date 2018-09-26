import React, { Fragment } from "react";
import { AnswerButton, MobileAnswerButton } from "../Buttons";
import { SideLabel } from "../Label";
import { curry } from "../../helpers";
import { YES, NO } from "../../constants";

export const AnswerTopScorer = ({ setTopScorer, player, answer, close }) => {
  if (answer === YES) setTopScorer(player);
  return close();
};

export const PlayersButtonPad = ({ matches, ...props }) => {
  const Pads = [NO, YES];
  const toUse = matches ? Pads.slice(0).reverse() : Pads;
  const Buttons = toUse.map(answer => {
    const Component = matches ? AnswerButton : MobileAnswerButton;
    return (
      <Component
        key={answer}
        content={answer}
        onClick={curry(AnswerTopScorer)({ answer, ...props })}
      />
    );
  });

  return (
    <Fragment>
      {Buttons}
      <SideLabel
        matches={matches}
        content={props.player.playerName}
        handler={props.close}
      />
    </Fragment>
  );
};
