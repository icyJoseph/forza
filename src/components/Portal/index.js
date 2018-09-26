import React, { Component as ReactComponent } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { FLOATING_BOTTOM_MENU, portalBreakPoint } from "../../constants";
import { setUpMediaQuery } from "../../helpers";

const PortalWrap = styled.div`
  position: absolute;
  margin-top: 80px;
  width: 170px;
  z-index: 10;
  display: flex;
  justify-content: space-evenly;
`;

export const elementSelector = (matches, hook) =>
  matches ? hook : FLOATING_BOTTOM_MENU;

export const wrap = (matches, Component, componentProps) =>
  matches ? (
    <PortalWrap>
      <Component matches={matches} {...componentProps} />
    </PortalWrap>
  ) : (
    <Component matches={matches} {...componentProps} />
  );

export class Portal extends ReactComponent {
  state = {
    matches: false
  };

  componentDidMount() {
    return setUpMediaQuery.bind(this)(portalBreakPoint);
  }

  updateMatches = () => {
    const { matches } = this.mediaQueryList;
    return this.setState({ matches });
  };

  componentWillUnmount() {
    this.mediaQueryList.removeListener(this.updateMatches);
  }

  render() {
    const { matches } = this.state;
    const { Component, hook, componentProps } = this.props;

    const portalElem = elementSelector(matches, hook);
    const elem = document.getElementById(portalElem);

    const Portal = wrap(matches, Component, componentProps);

    return ReactDOM.createPortal(Portal, elem);
  }
}

export default Portal;
