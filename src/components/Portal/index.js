import React, { Component as ReactComponent } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const PortalWrap = styled.div`
  position: absolute;
  margin-top: 80px;
  width: 170px;
  z-index: 10;
  display: flex;
  justify-content: space-evenly;
`;

const portalBreakPoint = "(min-width: 699px)";

export default class Portal extends ReactComponent {
  state = {
    matches: false
  };
  componentDidMount() {
    const targetWindow = this.props.targetWindow || window;
    // get the matchMedia function
    this.mediaQueryList = targetWindow.matchMedia(portalBreakPoint);
    // listen to updates
    this.mediaQueryList.addListener(this.updateMatches);
    // are we matching?
    return this.updateMatches();
  }

  updateMatches = () => {
    const { matches } = this.mediaQueryList;

    return this.setState({ matches });
  };

  componentWillUnmount() {
    this.mediaQueryList.removeListener(this.updateMatches);
  }

  render() {
    const { Component, hook, componentProps } = this.props;
    const { matches } = this.state;
    const portalElem = matches ? hook : "@pinned";
    const elem = document.getElementById(portalElem);

    const Portal = matches ? (
      <PortalWrap>
        <Component matches={matches} {...componentProps} />
      </PortalWrap>
    ) : (
      <Component matches={matches} {...componentProps} />
    );

    return ReactDOM.createPortal(Portal, elem);
  }
}
