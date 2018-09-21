import { buildPlayersTree } from "../";

const teams = [
  {
    teamId: 1,
    teamName: "Manchester City",
    teamColor: "#65b2e9",
    topPlayers: [
      {
        playerId: 1,
        playerName: "Sergio Aguero",
        goalsLastSeason: 21
      }
    ]
  },
  {
    teamId: 2,
    teamName: "Manchester United",
    teamColor: "#DA291C",
    topPlayers: [
      {
        playerId: 4,
        playerName: "Romelu Lukaku",
        goalsLastSeason: 16
      },
      {
        playerId: 5,
        playerName: "Jesse Lingard",
        goalsLastSeason: 7
      }
    ]
  }
];

const expected = {
  "Sergio Aguero": {
    playerId: 1,
    playerName: "Sergio Aguero",
    goalsLastSeason: 21,
    teamId: 1,
    teamName: "Manchester City",
    teamColor: "#65b2e9"
  },
  "Romelu Lukaku": {
    playerId: 4,
    playerName: "Romelu Lukaku",
    goalsLastSeason: 16,
    teamId: 2,
    teamName: "Manchester United",
    teamColor: "#DA291C"
  },
  "Jesse Lingard": {
    playerId: 5,
    playerName: "Jesse Lingard",
    goalsLastSeason: 7,
    teamId: 2,
    teamName: "Manchester United",
    teamColor: "#DA291C"
  }
};

describe("given teams data from a league", () => {
  it("collects top players from every team into an object", () => {
    expect(buildPlayersTree(teams)).toMatchObject(expected);
  });
});
