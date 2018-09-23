import React, { Component, Fragment } from "react";
import Portal from "../../components/Portal";

export default class TopScorer extends Component {
  state = { open: false };

  position = 0;

  openModal = () => {
    this.position = window.scrollY;
    document.body.style.overflow = "hidden";

    document.body["margin-top"] = `-${this.position}px`;
    console.log(this.position);
    return this.setState({
      open: true
    });
  };

  closeModal = () => {
    document.body.style.overflow = "";
    document.body.style.position = "";
    window.scrollTo(0, this.position);
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
