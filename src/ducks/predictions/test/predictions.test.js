import predictions, { setPrediction, setTopScorer } from "../";

describe("it handles user predictions", () => {
  it("takes a teams place prediction", () => {
    expect(
      predictions(
        undefined,
        setPrediction({ leagueName: "La", teamName: "A" }, 1)
      )
    ).toEqual({
      predictions: { La: { 1: { teamName: "A", place: 1, leagueName: "La" } } },
      topScorer: ""
    });
  });
  it("updates a teams place prediction", () => {
    expect(
      predictions(
        {
          predictions: {
            La: { 1: { teamName: "A", place: 1, leagueName: "La" } }
          },
          topScorer: ""
        },
        setPrediction({ leagueName: "La", teamName: "A" }, 3)
      )
    ).toEqual({
      predictions: { La: { 3: { teamName: "A", place: 3, leagueName: "La" } } },
      topScorer: ""
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
});
