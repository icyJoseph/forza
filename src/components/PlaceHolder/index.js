import React from "react";
import { PlaceHolderContainer, CenteredDiv } from "../Common";

export const PlaceHolder = ({ open, leagueName }) => (
  <PlaceHolderContainer>
    <CenteredDiv>{`How will the ${leagueName} end?`}</CenteredDiv>
    <CenteredDiv>
      Click on the teams. {!open && "Click here to expand."}
    </CenteredDiv>
  </PlaceHolderContainer>
);
