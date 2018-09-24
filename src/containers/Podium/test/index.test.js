import React from "react";
import { shallow } from "enzyme";

import { Podium } from "../";
import { Name } from "../styled";

const predictions = {
  SomeLeague: {
    1: { teamName: "A", place: 1 },
    2: { teamName: "B", place: 2 },
    3: { teamName: "C", place: 3 }
  }
};

const topScorer = {
  SomeLeague: {
    playerName: "SomeGuy"
  }
};

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

describe.only("It renders a Podium for wide screens", () => {
  const wrapper = shallow(
    <Podium
      query={breakpoint}
      predictions={predictions}
      targetWindow={mockWideScreen}
      leagueName={"SomeLeague"}
      topScorer={topScorer}
    />
  );

  const children = wrapper.children();
  it("renders", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("renders 2 children, scorer and podium", () => {
    expect(children).toHaveLength(2);
  });

  it("renders the winner in the middle", () => {
    expect(
      children
        .at(1)
        .children()
        .at(1)
        .dive()
        .find(Name)
        .render()
        .text()
    ).toEqual("A");
  });

  it("attaches listener", () => {
    expect(mockListener).toHaveBeenCalled();
  });
});

describe("It renders a Podium for narrow screens", () => {
  const wrapper = shallow(
    <Podium
      query={breakpoint}
      predictions={predictions}
      targetWindow={mockNarrowScreen}
      leagueName={"SomeLeague"}
      topScorer={topScorer}
    />
  );

  const children = wrapper.children();

  it("renders", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("renders 2 children, scorer and podium", () => {
    expect(children).toHaveLength(2);
  });

  it("renders the winner in the middle", () => {
    expect(
      children
        .at(1)
        .children()
        .at(1)
        .dive()
        .find(Name)
        .render()
        .text()
    ).toEqual("A");
  });
});
