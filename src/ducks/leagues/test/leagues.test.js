import leagues, {
  mapAllLeaguesToProps,
  onFetchLeagueData,
  onSuccessLeagueData,
  onErroLeagueData
} from "../";

describe("selector", () => {
  it("selects from the state", () => {
    expect(
      mapAllLeaguesToProps({
        leagues: { allLeagues: { a: {}, b: {} }, loading: false }
      })
    ).toEqual({ allLeagues: { a: {}, b: {} }, loading: false });
  });
});

describe("Reducer handles actions", () => {
  it("has initial state, and returns it by default", () => {
    expect(leagues(undefined, { type: "invalid" })).toEqual({
      allLeagues: {},
      loading: false,
      error: false
    });
  });

  it("handles fetching", () => {
    expect(leagues(undefined, onFetchLeagueData)).toEqual({
      allLeagues: {},
      loading: true,
      error: false
    });
  });

  it("handles success", () => {
    const seed = { league: {} };
    expect(
      leagues(
        { allLeagues: { league: {} }, loading: true },
        onSuccessLeagueData(seed)
      )
    ).toEqual({
      allLeagues: seed,
      loading: false,
      error: false
    });
  });
  it("handles error", () => {
    const seed = { league: {} };
    expect(
      leagues({ allLeagues: { league: {} }, loading: true }, onErroLeagueData)
    ).toEqual({
      allLeagues: seed,
      loading: false,
      error: true
    });
  });
});
