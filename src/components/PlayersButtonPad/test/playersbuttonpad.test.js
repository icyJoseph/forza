import React from "react";
import { shallow } from "enzyme";
import { PlayersButtonPad } from "../";

import { AnswerButton, MobileAnswerButton } from "../../Buttons";

describe("PlayersButtonPad mobile", () => {
  const props = {
    player: {
      playerName: "name"
    },
    close: jest.fn(),
    matches: false,
    setTopScorer: jest.fn()
  };
  const wrapper = shallow(<PlayersButtonPad {...props} />);
  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });
  it("renders Mobile Buttons", () => {
    // yes and no
    expect(wrapper.find(MobileAnswerButton)).toHaveLength(2);
  });

  it("uses the functions to setPrediction and close", () => {
    // clicking index-1 because in mobile the buttons are reversed
    wrapper
      .find(MobileAnswerButton)
      .at(1)
      .simulate("click");
    expect(props.setTopScorer).toHaveBeenCalledWith({
      playerName: "name"
    });
    expect(props.close).toHaveBeenCalledTimes(1);
  });
});

describe("PlayersButtonPad desktop", () => {
  const props = {
    player: {
      playerName: "name"
    },
    close: jest.fn(),
    matches: true,
    setTopScorer: jest.fn()
  };
  const wrapper = shallow(<PlayersButtonPad {...props} />);
  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });
  it("renders Desktop Buttons", () => {
    // yes and no
    expect(wrapper.find(AnswerButton)).toHaveLength(2);
  });
  it("uses the functions to setTopScorer and close", () => {
    wrapper
      .find(AnswerButton)
      .at(0)
      .simulate("click");
    expect(props.setTopScorer).toHaveBeenCalledWith({
      playerName: "name"
    });
    expect(props.close).toHaveBeenCalledTimes(1);
  });
});
