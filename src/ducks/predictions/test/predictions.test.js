import predictions, {
  setPrediction,
  setTopScorer,
  resetAll,
  replaceTeams
} from "../";

describe("it handles user predictions", () => {
  it("takes a teams place prediction", () => {
    expect(
      predictions(
        undefined,
        setPrediction({ leagueName: "La", teamName: "A", teamId: 1 }, 1)
      )
    ).toEqual({
      predictions: {
        La: { 1: { teamName: "A", place: 1, leagueName: "La", teamId: 1 } }
      },
      topScorer: {}
    });
  });

  it("updates a teams place prediction", () => {
    expect(
      predictions(
        {
          predictions: {
            La: { 1: { teamName: "A", place: 1, leagueName: "La", teamId: 1 } }
          },
          topScorer: {}
        },
        setPrediction({ leagueName: "La", teamName: "A", teamId: 1 }, 3)
      )
    ).toEqual({
      predictions: {
        La: { 3: { teamName: "A", place: 3, leagueName: "La", teamId: 1 } }
      },
      topScorer: {}
    });
  });

  it("takes top scorer prediction", () => {
    expect(
      predictions(
        undefined,
        setTopScorer({ playerName: "JS", leagueName: "La" })
      )
    ).toEqual({
      predictions: {},
      topScorer: { La: { playerName: "JS", leagueName: "La" } }
    });
  });

  it("resets predictions", () => {
    expect(
      predictions(
        {
          predictions: {
            Ab: { 1: { teamName: "A", place: 1, leagueName: "La", teamId: 1 } },
            La: { 1: { teamName: "A", place: 1, leagueName: "La", teamId: 1 } }
          },
          topScorer: { La: { playerName: "John" } }
        },
        resetAll("La")
      )
    ).toEqual({
      predictions: {
        Ab: { 1: { teamName: "A", place: 1, leagueName: "La", teamId: 1 } }
      },
      topScorer: {}
    });
  });
});

describe("replaceTeams", () => {
  it("adds a new team", () => {
    const teamId = 1;
    const current = { 1: { teamId: 2 } };
    const accumulator = replaceTeams(teamId, current);
    const acc = { 1: { teamId: 2 } };
    const val = 1;
    expect(accumulator(acc, val)).toEqual({ "1": { teamId: 2 } });
  });
});
