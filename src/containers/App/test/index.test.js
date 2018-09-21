import React from "react";
import { shallow } from "enzyme";
import App from "../";

it("renders without crashing", () => {
  const app = shallow(<App />);
  expect(app).toBeTruthy();
});
