import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Portal from "../../components/Portal";

import { setPrediction, setTopScorer } from "../../ducks/predictions";
import { curry } from "../../helpers";

const StyledAnswerButton = styled(Button).attrs({
  style: ({ middle, background }) => ({
    marginTop: middle === 2 ? "-20px" : "0px",
    background: background ? background : "gray"
  })
})`
  bottom: 20px;
  margin: auto;
  color: white;
`;

const AnswerButton = ({ content, ...props }) => (
  <StyledAnswerButton variant="fab" mini {...props}>
    <Typography color="secondary">{content}</Typography>
  </StyledAnswerButton>
);

const AnswerPrediction = ({ setPrediction, payload, place, close }) => {
  setPrediction(payload, place);
  return close();
};

const places = [1, 2, 3];
const TeamsButtonPad = ({ leagueName, team, ...props }) =>
  places.map(place => (
    <AnswerButton
      key={place}
      middle={place}
      content={place}
      onClick={curry(AnswerPrediction)({
        payload: { leagueName, ...team },
        place,
        ...props
      })}
    />
  ));

const [YES, NO] = ["Yes", "No"];
const AnswerTopScorer = ({ setTopScorer, player, answer, close }) => {
  if (answer === YES) setTopScorer(player);
  return close();
};

const PlayersButtonPad = ({ ...props }) =>
  [{ answer: YES, background: "green" }, { answer: NO, background: "red" }].map(
    ({ answer, background }) => (
      <AnswerButton
        key={answer}
        content={answer}
        background={background}
        onClick={curry(AnswerTopScorer)({ answer, ...props })}
      />
    )
  );

const Prediction = ({
  player,
  hook,
  setTopScorer,
  setPrediction,
  leagueName,
  close,
  team
}) => (
  <Portal hook={hook}>
    {player ? (
      <PlayersButtonPad
        player={player}
        setTopScorer={setTopScorer}
        close={close}
      />
    ) : (
      <TeamsButtonPad
        close={close}
        setPrediction={setPrediction}
        leagueName={leagueName}
        team={team}
      />
    )}
  </Portal>
);

export default connect(
  undefined,
  { setPrediction, setTopScorer }
)(Prediction);
