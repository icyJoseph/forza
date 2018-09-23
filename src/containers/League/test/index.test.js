import React from "react";
import { shallow } from "enzyme";
import { League } from "../";

it("renders without crashing", () => {
  const props = {
    fetch: jest.fn(),
    data: jest.fn(),
    leagues: { data: [] }
  };
  const app = shallow(<League {...props} />);
  expect(app).toBeTruthy();
});