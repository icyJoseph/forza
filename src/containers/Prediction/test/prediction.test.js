import React from "react";
import { shallow } from "enzyme";
import { Prediction } from "../";
import Portal from "../../../components/Portal";

describe("Prediction for teams", () => {
  const props = {
    open: true,
    player: null,
    hook: "@pinned",
    setTopScorer: jest.fn(),
    setPrediction: jest.fn(),
    leagueName: "La",
    close: jest.fn(),
    team: { teamName: "hi" }
  };
  const app = shallow(<Prediction {...props} />);
  it("renders something", () => {
    expect(app).toBeTruthy();
  });
  it("has a Portal child", () => {
    expect(app.find(Portal)).toHaveLength(1);
  });
});

describe("Prediction for players", () => {
  const props = {
    open: true,
    player: { playerName: "hello" },
    hook: "@pinned",
    setTopScorer: jest.fn(),
    setPrediction: jest.fn(),
    leagueName: "La",
    close: jest.fn(),
    team: null
  };
  const app = shallow(<Prediction {...props} />);
  it("renders something", () => {
    expect(app).toBeTruthy();
  });
  it("has a Portal child", () => {
    expect(app.find(Portal)).toHaveLength(1);
  });
});

describe("When its told to be closed", () => {
  const props = {
    open: false,
    player: null,
    hook: "@pinned",
    setTopScorer: jest.fn(),
    setPrediction: jest.fn(),
    leagueName: "La",
    close: jest.fn(),
    team: { teamName: "hi" }
  };
  const app = shallow(<Prediction {...props} />);
  it("renders empty", () => {
    expect(app.isEmptyRender()).toBeTruthy();
  });
  it("has a Portal child", () => {
    expect(app.find(Portal)).toHaveLength(0);
  });
});
