import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const PortalWrap = styled.div`
  position: absolute;
  margin-top: -50px;
  width: 160px;
  z-index: 10;
`;

export default ({ children, hook }) => {
  const elem = document.getElementById(hook);
  const Portal = <PortalWrap>{children}</PortalWrap>;

  return ReactDOM.createPortal(Portal, elem);
};
