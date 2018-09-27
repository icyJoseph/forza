import { goalCriteria, sortList, shouldHighlight } from "../utils";
import {
  PLAYERS,
  TEAMS,
  GOALS_LAST_SEASON,
  TEAM_GOALS_LAST_SEASON
} from "../../../constants";

describe("goalCriteria", () => {
  const fn = goalCriteria(PLAYERS);
  const fn2 = goalCriteria(TEAMS);
  const args = [
    { [GOALS_LAST_SEASON]: 1, [TEAM_GOALS_LAST_SEASON]: 100 },
    { [GOALS_LAST_SEASON]: 1, [TEAM_GOALS_LAST_SEASON]: 10 }
  ];
  it("enforces the correct criteria", () => {
    expect(fn(...args)).toEqual(0);
  });
  it("enforces the correct criteria", () => {
    expect(fn2(...args)).toEqual(-90);
  });
});

describe("sorts or lets through", () => {
  const items = [
    {
      id: 0,
      [GOALS_LAST_SEASON]: 10,
      [TEAM_GOALS_LAST_SEASON]: 100
    },
    {
      id: 1,
      [GOALS_LAST_SEASON]: 10,
      [TEAM_GOALS_LAST_SEASON]: 1000
    }
  ];

  it("sorts without modifying", () => {
    const sorting = true;
    expect(sortList(items, sorting, TEAMS)).toEqual([
      {
        id: 1,
        [GOALS_LAST_SEASON]: 10,
        [TEAM_GOALS_LAST_SEASON]: 1000
      },
      {
        id: 0,
        [GOALS_LAST_SEASON]: 10,
        [TEAM_GOALS_LAST_SEASON]: 100
      }
    ]);
    expect(items).toEqual([
      {
        id: 0,
        [GOALS_LAST_SEASON]: 10,
        [TEAM_GOALS_LAST_SEASON]: 100
      },
      {
        id: 1,
        [GOALS_LAST_SEASON]: 10,
        [TEAM_GOALS_LAST_SEASON]: 1000
      }
    ]);
  });
  it("goes through", () => {
    const sorting = false;
    expect(sortList(items, sorting, TEAMS)).toEqual(items);
  });
});
