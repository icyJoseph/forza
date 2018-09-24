import leagues, { onFetchLeagueData, onSuccessLeagueData } from "../";

describe("it handles actions", () => {
  it("has initial state, and returns it by default", () => {
    expect(leagues(undefined, { type: "invalid" })).toEqual({
      allLeagues: [],
      loading: false,
      error: false
    });
  });

  it("handles fetching", () => {
    expect(leagues(undefined, onFetchLeagueData)).toEqual({
      allLeagues: [],
      loading: true,
      error: false
    });
  });

  it("handles success", () => {
    const seed = [{ leagues: {} }];
    expect(
      leagues({ allLeagues: [], loading: true }, onSuccessLeagueData(seed))
    ).toEqual({
      allLeagues: seed,
      loading: false,
      error: false
    });
  });
});
