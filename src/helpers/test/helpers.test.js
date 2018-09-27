import { buildPlayersTree, curry, handleShare, shouldFetch } from "../";
import { homepage } from "../../constants";

const leagueName = "test";
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
    teamColor: "#65b2e9",
    leagueName
  },
  "Romelu Lukaku": {
    playerId: 4,
    playerName: "Romelu Lukaku",
    goalsLastSeason: 16,
    teamId: 2,
    teamName: "Manchester United",
    teamColor: "#DA291C",
    leagueName
  },
  "Jesse Lingard": {
    playerId: 5,
    playerName: "Jesse Lingard",
    goalsLastSeason: 7,
    teamId: 2,
    teamName: "Manchester United",
    teamColor: "#DA291C",
    leagueName
  }
};

describe("given teams data from a league", () => {
  it("collects top players from every team into an object", () => {
    expect(buildPlayersTree(teams, leagueName)).toMatchObject(expected);
  });
});

describe("curry", () => {
  const sum = (...args) => args.reduce((acc, val) => acc + val, 0);
  it("does partial application", () => {
    expect(curry(sum)(1, 2, 3)(4, 5, 6)).toEqual(21);
  });
});

describe("handle share", () => {
  const leagueName = "La";
  const predictions = { 1: { teamName: "A" } };
  const topScorer = { playerName: "B" };

  // our mock window.navigator.share will return the data it transmits
  // to the share api, let's make sure we are passing it correctly

  const expected = {
    text: "A will win the La, with B as top scorer.",
    title: "My La Predictions.",
    url: homepage
  };

  it("shares the data", done => {
    handleShare(leagueName, predictions, topScorer).then(res => {
      expect(res).toEqual(expected);
      done();
    });
  });
});

describe("shouldFetch", () => {
  const expiry = "2018-06-11T04:49:03.603Z";
  const veryLateDate = "9999-06-11T04:49:03.603Z";

  it("evaluates if now > expiry", () => {
    expect(shouldFetch(expiry)).toEqual(true);
  });
  it("evaluates true if expiry is undefined", () => {
    expect(shouldFetch(undefined)).toEqual(true);
  });
  it("evaluates expiry < now", () => {
    expect(shouldFetch(veryLateDate)).toEqual(false);
  });
});
