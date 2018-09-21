import React from "react";
import { shallow } from "enzyme";

import Podium from "../";

const predictions = [
  { team: "A", place: 1, position: "first" },
  { team: "B", place: 2, position: "second" },
  { team: "C", place: 3, position: "third" }
];

const breakpoint = "(min-width: 599px)";

const mockListener = jest.fn();
const mockWideScreen = {
  matchMedia: query => ({
    matches: query === breakpoint,
    addListener: mockListener
  })
};

const mockNarrowScreen = {
  matchMedia: query => ({
    matches: query !== breakpoint,
    addListener: mockListener
  })
};

describe("It renders a Podium for wide screens", () => {
  const wrapper = shallow(
    <Podium query={breakpoint} targetWindow={mockWideScreen} />
  );

  const children = wrapper.children();

  it("renders 3 children", () => {
    expect(wrapper).toHaveLength(1);
    expect(children).toHaveLength(3);
  });

  it("renders the winner in the middle", () => {
    expect(
      children
        .at(1)
        .dive()
        .find("span")
        .at(0)
        .text()
    ).toEqual("A");
  });

  it("attaches listener", () => {
    expect(mockListener).toHaveBeenCalled();
  });
});

describe("It renders a Podium for narrow screens", () => {
  const wrapper = shallow(
    <Podium query={breakpoint} targetWindow={mockNarrowScreen} />
  );

  const children = wrapper.children();

  it("renders 3 children", () => {
    expect(wrapper).toHaveLength(1);
    expect(children).toHaveLength(3);
  });

  it("renders the winner in the middle", () => {
    expect(
      children
        .at(0)
        .dive()
        .find("span")
        .at(0)
        .text()
    ).toEqual("A");
  });
});
