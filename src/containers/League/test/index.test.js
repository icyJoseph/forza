import React from "react";
import { shallow } from "enzyme";
import { League } from "../";

it("renders without crashing", () => {
  const props = {
    fetch: jest.fn(),
    allLeagues: [],
    match: {
      params: { league: 1 }
    }
  };
  const app = shallow(<League {...props} />);
  expect(app).toBeTruthy();
});
