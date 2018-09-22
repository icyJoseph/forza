import leagues, { fetchLeaguesData, leaguesData } from "../";

describe("it handles actions", () => {
  it("has initial state, and returns it by default", () => {
    expect(leagues(undefined, { type: "invalid" })).toEqual({
      data: [],
      loading: false
    });
  });

  it("handles fetching", () => {
    expect(leagues(undefined, fetchLeaguesData)).toEqual({
      data: [],
      loading: true
    });
  });

  it("handles success", () => {
    const seed = [{ leagues: {} }];
    expect(leagues({ data: [], loading: true }, leaguesData(seed))).toEqual({
      data: seed,
      loading: false
    });
  });
});
