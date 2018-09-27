import React from "react";
import { shallow } from "enzyme";
import Routes, {
  TopMenu,
  League,
  Landing,
  FloatingActionButtons
} from "../routes";
import { url } from "../config";

describe("static copy of the routes", () => {
  it("matches snapshot", () => {
    expect(shallow(<Routes />)).toMatchSnapshot();
  });
});

describe("TopMenu", () => {
  const loaded = shallow(<TopMenu />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

describe("League", () => {
  const loaded = shallow(<League />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

describe("Landing", () => {
  const loaded = shallow(<Landing />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

describe("FloatingActionButtons", () => {
  const loaded = shallow(<FloatingActionButtons />);
  it("returns", () => {
    expect(loaded.exists()).toEqual(true);
  });
});

describe("builds the correct endpoint for development", () => {
  expect(url).toEqual("http://localhost:1337/");
});
