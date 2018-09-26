import React from "react";
import styled, { css } from "styled-components";
import Paper from "@material-ui/core/Paper";
import Emoji from "../../../components/Emoji";

const common = css`
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const Name = styled.div`
  text-align: center;
  align-items: center;
`;

export const Position = styled.div`
  ${common};
  align-items: flex-end;
`;

export const Place = styled(Paper).attrs({
  style: ({ place, open }) => ({
    height: open ? `${100 - place * 15}px` : "40px"
  })
})`
  transition: height 0.5s ease;
  display: flex;
  flex-direction: column;
  align-content: stretch;
  border-radius: 15px 0px;
  text-align: center;
  margin: 0 5px;
  min-width: 120px;
  max-width: 120px;
  word-wrap: break-word;
  @media (min-width: 685px) {
    min-width: 160px;
    max-width: 160px;
  }
  @media (min-width: 400px) {
    min-width: 110px;
    max-width: 110px;
  }
`;

export const PodiumWrapper = styled(Paper).attrs({
  style: ({ open }) => ({
    height: open ? "200px" : "115px"
  })
})`
  transition: height 0.5s ease;
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const PlaceHolderContainer = styled.div`
display: flex
flex-direction: column
height: 150px
justify-content: center
align-items: center
`;

export const CenteredDiv = styled.div`
  margin: 0 auto;
`;

export const PlaceHolder = ({ open, leagueName }) => (
  <PlaceHolderContainer>
    <CenteredDiv>{`How will the ${leagueName} end?`}</CenteredDiv>
    <CenteredDiv>
      Click on the teams. {!open && "Click here to expand."}
    </CenteredDiv>
  </PlaceHolderContainer>
);

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

export const TopScorerContainer = styled.div`
  margin: 5px auto 0;
  height: 30px;
`;

export const BlueSpan = styled.span`
  color: dodgerblue;
`;

export const TopScorer = ({ topScorerForLeague }) => (
  <TopScorerContainer>
    {topScorerForLeague ? (
      <div>
        <BlueSpan>{`${topScorerForLeague.playerName}`}</BlueSpan>
        {" as top scorer! "}
        <Emoji place="ball" />
      </div>
    ) : (
      "Who'll be top scorer?"
    )}
  </TopScorerContainer>
);

export const PredictionsForLeague = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;
