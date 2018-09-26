import React from "react";
import { shallow } from "enzyme";

import { FloatingActionButtons, sortingColor } from "../";
import { buttonColor, PRIMARY, SECONDARY } from "../../../contants";

describe("FloatingActionButtons", () => {
  const props = {
    toggle: jest.fn(),
    sorting: false,
    classes: buttonColor,
    history: { push: jest.fn() }
  };
  const wrapper = shallow(<FloatingActionButtons {...props} />);
  const children = wrapper.children();
  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });
  it("initially has two children", () => {
    expect(children).toHaveLength(2);
  });
  it("first children navigates back home", () => {
    const backButton = children.at(0);
    backButton.simulate("click");
    expect(props.history.push).toHaveBeenCalledWith("/");
  });
  it("second children triggers the toggle prop", () => {
    const sortGoalsButton = children.at(1);
    sortGoalsButton.simulate("click");
    expect(props.toggle).toHaveBeenCalled();
  });
  it("has buttons which display content", () => {
    {
      expect(children.at(0).children()).toHaveLength(1);
      expect(children.at(1).children()).toHaveLength(1);
    }
  });
});

describe("sortingColors", () => {
  it("chooses either from primary or secondary", () => {
    expect(sortingColor(true)).toEqual(PRIMARY);
    expect(sortingColor(false)).toEqual(SECONDARY);
  });
});
