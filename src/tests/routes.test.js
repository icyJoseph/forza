import React from "react";
import { shallow } from "enzyme";
import Routes from "../routes";

describe("static copy of the routes", () => {
  it("matches snapshot", () => {
    expect(shallow(<Routes />)).toMatchSnapshot();
  });
});
