import React, { Fragment } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Portal from "../../components/Portal";
import { setPrediction, setTopScorer } from "../../ducks/predictions";
import { curry } from "../../helpers";

const StyledAnswerButton = styled(Button).attrs({
  style: ({ middle, background }) => ({
    marginTop: middle !== 2 ? "-20px" : "0px",
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

const StyledMobileAnswerButton = styled(Button).attrs({
  style: () => ({ marginBottom: "3px" })
})``;

const MobileAnswerButton = ({ content, ...props }) => (
  <StyledMobileAnswerButton
    variant="fab"
    color="primary"
    aria-label={content}
    {...props}
  >
    <Typography color="secondary">{content}</Typography>
  </StyledMobileAnswerButton>
);

const SideLabel = ({ matches, content }) =>
  !matches && (
    <Paper
      elevation={10}
      style={{
        position: "absolute",
        minWidth: "100px",
        right: "70px",
        padding: "10px",
        bottom: "10px",
        background: "dodgerblue",
        color: "white"
      }}
    >
      {content}
    </Paper>
  );

const places = [1, 2, 3];
const TeamsButtonPad = ({ leagueName, team, matches, ...props }) => {
  const Buttons = places.map(place => {
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
      <SideLabel matches={matches} content={team.teamName} />
    </Fragment>
  );
};

const [YES, NO] = ["Yes", "No"];
const AnswerTopScorer = ({ setTopScorer, player, answer, close }) => {
  if (answer === YES) setTopScorer(player);
  return close();
};

const PlayersButtonPad = ({ matches, ...props }) => {
  const Buttons = [
    { answer: YES, background: "green" },
    { answer: NO, background: "red" }
  ].map(({ answer, background }) => {
    const Component = matches ? AnswerButton : MobileAnswerButton;
    return (
      <Component
        key={answer}
        content={answer}
        background={background}
        onClick={curry(AnswerTopScorer)({ answer, ...props })}
      />
    );
  });

  return (
    <Fragment>
      {Buttons}
      <SideLabel matches={matches} content={props.player.playerName} />
    </Fragment>
  );
};

const Prediction = ({
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
