import React, { Component, Fragment } from "react";
import Portal from "../../components/Portal";

export default class TopScorer extends Component {
  state = { open: false };

  openModal = () => {
    document.body.style.overflow = "hidden";
    return this.setState({
      open: true
    });
  };

  closeModal = () => {
    document.body.style.overflow = "scroll";
    return this.setState({
      open: false
    });
  };

  render() {
    return (
      <Fragment>
        <button onClick={this.openModal}>
          Choose Top Scorer of the Season
        </button>
        {this.state.open && (
          <Portal children={this.props.children} callback={this.closeModal} />
        )}
      </Fragment>
    );
  }
}
