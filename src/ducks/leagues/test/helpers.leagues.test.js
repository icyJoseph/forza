import { efficientReformat, reformat } from "../helpers";

const seed = [
  {
    leagueId: 0,
    teams: [
      {
        teamId: 0,
        topPlayers: [
          { playerId: 0, goalsLastSeason: 1 },
          { playerId: 1, goalsLastSeason: 11 }
        ]
      }
    ]
  }
];

const expected = {
  0: {
    leagueId: 0,
    teams: [
      {
        teamId: 0,
        teamGoalsLastSeason: 12,
        topPlayers: [
          { playerId: 0, goalsLastSeason: 1 },
          { playerId: 1, goalsLastSeason: 11 }
        ]
      }
    ],
    leagueGoalsLastSeason: 12
  }
};

describe("it accumulates goals", () => {
  it("works regular formulate", () => {
    expect(reformat(seed)).toEqual(expected);
  });
  it(" works efficient formula", () => {
    expect(efficientReformat(seed)).toEqual(expected);
  });
});
