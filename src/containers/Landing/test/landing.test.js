import React from "react";
import { shallow } from "enzyme";
import { Landing } from "../";
import { Card } from "../../../components/Card";

describe("Landing", () => {
  const push = jest.fn();
  const expiry = "2018-09-27";
  const props = {
    fetch: jest.fn(),
    allLeagues: { a: { leagueName: "a", leagueId: 1, teams: [] } },
    history: {
      push
    },
    expiry
  };
  const app = shallow(<Landing {...props} />);

  it("renders without crashing", () => {
    expect(app).toBeTruthy();
  });

  it("renders league name", () => {
    expect(
      app
        .children()
        .at(3)
        .find(Card)
        .children()
        .at(0)
        .text()
    ).toEqual(props.allLeagues["a"].leagueName);
  });

  it("calls history push", () => {
    const cardWrap = app
      .children()
      .at(3)
      .find(Card)
      .at(0);

    cardWrap.props().handler();

    expect(props.history.push).toHaveBeenCalled();
  });
});
