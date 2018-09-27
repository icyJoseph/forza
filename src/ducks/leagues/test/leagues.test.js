import leagues, {
  mapAllLeaguesToProps,
  onFetchLeagueData,
  onSuccessLeagueData,
  onErroLeagueData
} from "../";

describe("selector", () => {
  const expiry = new Date("2018");

  it("selects from the state", () => {
    expect(
      mapAllLeaguesToProps({
        leagues: { allLeagues: { a: {}, b: {} }, loading: false, expiry }
      })
    ).toEqual({ allLeagues: { a: {}, b: {} }, loading: false, expiry });
  });
});

describe("Reducer handles actions", () => {
  it("has initial state, and returns it by default", () => {
    expect(leagues(undefined, { type: "invalid" })).toEqual({
      allLeagues: {},
      loading: false,
      error: false,
      expiry: null
    });
  });

  it("handles fetching", () => {
    expect(leagues(undefined, onFetchLeagueData)).toEqual({
      allLeagues: {},
      loading: true,
      error: false,
      expiry: null
    });
  });

  it("handles success", () => {
    const expiry = new Date("2018");
    const seed = { league: {} };
    expect(
      leagues(
        { allLeagues: { league: {} }, expiry: null, loading: true },
        onSuccessLeagueData({ allLeagues: seed, expiry })
      )
    ).toEqual({
      allLeagues: seed,
      loading: false,
      error: false,
      expiry
    });
  });
  it("handles error", () => {
    const seed = { league: {} };
    expect(
      leagues(
        { allLeagues: { league: {} }, expiry: null, loading: true },
        onErroLeagueData
      )
    ).toEqual({
      allLeagues: seed,
      loading: false,
      error: true,
      expiry: null
    });
  });
});
