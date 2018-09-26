import React from "react";
import { shallow } from "enzyme";
import { League } from "../";
import { podiumBreakpoint } from "../../../constants";

it("renders without crashing", () => {
  const mockListener = jest.fn();
  const props = {
    fetch: jest.fn(),
    allLeagues: [],
    match: {
      params: { league: 1 }
    },
    targetWindow: {
      matchMedia: query => ({
        matches: query === podiumBreakpoint,
        addListener: mockListener
      })
    }
  };
  const app = shallow(<League {...props} />);
  expect(app).toBeTruthy();
});
