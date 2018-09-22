import predictions, { setPrediction, setTopScorer } from "../";

describe("it handles user predictions", () => {
  it("takes a teams place prediction", () => {
    expect(predictions(undefined, setPrediction({ teamName: "A" }, 1))).toEqual(
      {
        predictions: [{ team: "A", place: 1 }],
        topScorer: ""
      }
    );
  });

  it("takes top scorer prediction", () => {
    expect(predictions(undefined, setTopScorer({ playerName: "JS" }))).toEqual({
      predictions: [],
      topScorer: "JS"
    });
  });
});
