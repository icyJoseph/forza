import predictions, { setPrediction, setTopScorer } from "../";

describe("it handles user predictions", () => {
  it("takes a teams place prediction", () => {
    expect(
      predictions(undefined, setPrediction({ league: "La", teamName: "A" }, 1))
    ).toEqual({
      predictions: { La: [{ teamName: "A", place: 1, league: "La" }] },
      topScorer: ""
    });
  });

  it("takes top scorer prediction", () => {
    expect(
      predictions(undefined, setTopScorer({ playerName: "JS", league: "La" }))
    ).toEqual({
      predictions: {},
      topScorer: { La: "JS" }
    });
  });
});
