import React from "react";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import NavigateBefore from "@material-ui/icons/NavigateBefore";

import { goHome } from "../../helpers";

const Pinned = styled.div`
  position: absolute;
  text-align: center;
  bottom: 30px;
  right: 30px;
`;

const BackButton = ({ history }) => (
  <Pinned onClick={goHome(history)}>
    <Button variant="fab" color="primary">
      <NavigateBefore />
    </Button>
  </Pinned>
);

export default BackButton;
