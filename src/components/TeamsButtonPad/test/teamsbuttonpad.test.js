import React from "react";
import { shallow } from "enzyme";
import { TeamsButtonPad } from "../";

import { AnswerButton, MobileAnswerButton } from "../../Buttons";

describe("TeamsButtonPad mobile", () => {
  const props = {
    leagueName: "a",
    team: {
      teamName: "b"
    },
    close: jest.fn(),
    matches: false,
    setPrediction: jest.fn()
  };
  const wrapper = shallow(<TeamsButtonPad {...props} />);
  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });
  it("renders Mobile Buttons", () => {
    expect(wrapper.find(MobileAnswerButton)).toHaveLength(3);
  });

  it("uses the functions to setPrediction and close", () => {
    wrapper
      .find(MobileAnswerButton)
      .at(0)
      .simulate("click");
    expect(props.setPrediction).toHaveBeenCalledWith(
      {
        leagueName: "a",
        teamName: "b"
      },
      1
    );
    expect(props.close).toHaveBeenCalledTimes(1);
  });
});

describe("TeamsButtonPad desktop", () => {
  const props = {
    leagueName: "a",
    team: {
      teamName: "b"
    },
    close: jest.fn(),
    matches: true,
    setPrediction: jest.fn()
  };
  const wrapper = shallow(<TeamsButtonPad {...props} />);
  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });
  it("renders Desktop Buttons", () => {
    expect(wrapper.find(AnswerButton)).toHaveLength(3);
  });
  it("uses the functions to setPrediction and close", () => {
    wrapper
      .find(AnswerButton)
      .at(0)
      .simulate("click");
    expect(props.setPrediction).toHaveBeenCalledWith(
      {
        leagueName: "a",
        teamName: "b"
      },
      1
    );
    expect(props.close).toHaveBeenCalledTimes(1);
  });
});
