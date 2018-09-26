import React from "react";

import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import { dodgerBlue } from "../../constants";

export const Label = styled(Paper).attrs({
  style: () => ({
    background: dodgerBlue
  })
})`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  min-width: 100px;
  padding: 10px;
  bottom: 70px;
  color: white;
`;

export const SideLabel = ({ matches, content, handler }) =>
  !matches && (
    <Label elevation={10} onClick={handler}>
      {content}
    </Label>
  );
