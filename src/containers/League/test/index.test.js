import React from "react";
import { shallow } from "enzyme";
import { League } from "../";
import Loading from "../../../components/Loading";
import { StyledBottomNavigation } from "../../../components/Common";
import { podiumBreakpoint } from "../../../constants";
import Prediction from "../../Prediction";
import Podium from "../../../components/Podium";
import { CardContainer } from "../../../components/Card";

describe("League without data", () => {
  const mockListener = jest.fn();
  const removeMockListener = jest.fn();
  const props = {
    fetch: jest.fn(),
    allLeagues: {},
    match: {
      params: { league: 1 }
    },
    targetWindow: {
      matchMedia: query => ({
        matches: query === podiumBreakpoint,
        addListener: mockListener,
        removeListener: removeMockListener
      })
    }
  };
  const app = shallow(<League {...props} />);
  it("renders without crashing", () => {
    expect(app).toBeTruthy();
  });

  it("renders the Loading component", () => {
    expect(app.find(Loading)).toHaveLength(1);
  });
  it("removes listener on unmount", () => {
    app.instance().componentWillUnmount();
    expect(removeMockListener).toHaveBeenCalled();
  });
});

describe("League with data", () => {
  const mockListener = jest.fn();
  const removeMockListener = jest.fn();
  const props = {
    fetch: jest.fn(),
    allLeagues: { 1: { leagueName: "Hi", leagueId: 1, teams: [] } },
    match: {
      params: { league: 1 }
    },
    targetWindow: {
      matchMedia: query => ({
        matches: query === podiumBreakpoint,
        addListener: mockListener,
        removeListener: removeMockListener
      })
    }
  };
  const mock = jest.fn();
  const scrollToMock = function(a, b) {
    return mock(a, b);
  };

  Object.defineProperty(window, "scrollTo", {
    value: scrollToMock
  });
  const app = shallow(<League {...props} />, {
    disableLifecycleMethods: false
  });
  it("renders without crashing", () => {
    expect(app).toBeTruthy();
  });
  it("scrolls to top", () => {
    expect(mock).toHaveBeenCalledWith(0, 0);
  });

  it("renders the Bottom Navigation component", () => {
    expect(app.find(StyledBottomNavigation)).toHaveLength(1);
  });
  it("renders a Podium", () => {
    expect(app.find(Podium)).toHaveLength(1);
  });
  it("renders a CardContainer", () => {
    expect(app.find(CardContainer)).toHaveLength(1);
  });
  it("renders a Prediction", () => {
    expect(app.find(Prediction)).toHaveLength(1);
  });
  it("changes tabs", () => {
    const initialState = app.state("value");
    app
      .find(StyledBottomNavigation)
      .props()
      .onChange("hi", "Players");
    const nextState = app.state("value");
    expect(initialState).toEqual("Teams");
    expect(nextState).toEqual("Players");
  });
  it("removes listener on unmount", () => {
    app.instance().componentWillUnmount();
    expect(removeMockListener).toHaveBeenCalled();
  });
});
