import React from "react";
import { shallow } from "enzyme";
import Button from "@material-ui/core/Button";
import { TopMenu, mapStateToProps } from "../";
import { MainTitle } from "../../../components/Common";

describe("maps state to props", () => {
  it("returns the data from store", () => {
    const league = { a: { leagueId: "a" } };
    const store = {
      leagues: { allLeagues: { ...league } },
      predictions: { predictions: {}, topScorer: {} }
    };
    expect(mapStateToProps(store)).toEqual({
      allLeagues: { ...league },
      predictions: {},
      topScorer: {}
    });
  });
});

describe("TopMenu on landing", () => {
  const resetAll = jest.fn();
  const push = jest.fn();
  const props = {
    resetAll,
    fetch: jest.fn(),
    allLeagues: { 1: { leagueName: "a", leagueId: 1 } },
    match: { params: {} },
    predictions: {},
    history: {
      push
    },
    topScorer: {}
  };
  const app = shallow(<TopMenu {...props} />);
  const children = app.children();
  it("renders without crashing", () => {
    expect(app).toBeTruthy();
  });
  it("renders one children", () => {
    expect(children).toHaveLength(1);
  });
  it("renders without two buttons", () => {
    expect(children.find(Button)).toHaveLength(0);
  });

  it("shows Predictions title", () => {
    const title = children.find(MainTitle);
    expect(title.render().text()).toEqual("Predictions");
  });
  it("navigates back when clicking the MainTitle", () => {
    children.find(MainTitle).simulate("click");
    expect(push).toHaveBeenCalledTimes(1);
  });
});

describe("TopMenu inside League 1", () => {
  const resetAll = jest.fn();
  const push = jest.fn();
  const props = {
    resetAll,
    fetch: jest.fn(),
    allLeagues: { 1: { leagueName: "a", leagueId: 1 } },
    match: {
      params: { league: 1 }
    },
    predictions: {},
    history: {
      push
    },
    topScorer: {}
  };
  const app = shallow(<TopMenu {...props} />);
  const children = app.children();
  it("renders without crashing", () => {
    expect(app).toBeTruthy();
  });
  it("renders one children", () => {
    expect(children).toHaveLength(1);
  });
  it("renders two buttons", () => {
    expect(children.find(Button)).toHaveLength(2);
  });
  it("resets predictions when clicking the second button", () => {
    children
      .find(Button)
      .at(1)
      .simulate("click");
    expect(resetAll).toHaveBeenCalledTimes(1);
    expect(resetAll).toHaveBeenCalledWith(props.allLeagues[1].leagueName);
  });
  it("navigates back when clicking the MainTitle", () => {
    children.find(MainTitle).simulate("click");
    expect(push).toHaveBeenCalledTimes(1);
  });
});
