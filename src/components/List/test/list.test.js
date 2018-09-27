import React from "react";
import { shallow } from "enzyme";
import { ListContainer, Team, Player } from "../";

describe("ListContainer", () => {
  const props = {
    items: [{ teamName: "hi", teamId: 1 }],
    callback: jest.fn(),
    current: "1",
    sorting: false
  };

  const wrapper = shallow(<ListContainer {...props} />);
  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });
  it("by default the component rendered is for Teams", () => {
    expect(wrapper.find(Team)).toHaveLength(1);
  });
});

describe("ListContainer", () => {
  const props = {
    items: [{ playerName: "hello", playerId: 10 }],
    callback: jest.fn(),
    current: "10",
    sorting: false,
    type: "Players"
  };

  const wrapper = shallow(<ListContainer {...props} />);
  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });
  it("since the type is Players it renders Player", () => {
    expect(wrapper.find(Player)).toHaveLength(1);
  });
});

describe("Player", () => {
  const props = {
    playerName: "hello",
    goalsLastSeason: 10,
    callback: jest.fn(),
    current: "10"
  };
  const wrapper = shallow(<Player {...props} />);
  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });
});

describe("Team", () => {
  const props = {
    teamName: "hi",
    teamColor: "#g8g8g8",
    topPlayers: [],
    teamGoalsLastSeason: 10,
    callback: jest.fn(),
    current: "10"
  };
  const wrapper = shallow(<Team {...props} />);
  it("renders", () => {
    expect(wrapper).toBeTruthy();
  });
});
