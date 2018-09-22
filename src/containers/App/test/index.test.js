import React from "react";
import { shallow } from "enzyme";
import { App } from "../";

it("renders without crashing", () => {
  const props = {
    fetch: jest.fn(),
    data: jest.fn()
  };
  const app = shallow(<App {...props} />);
  expect(app).toBeTruthy();
});
