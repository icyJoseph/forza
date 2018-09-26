import reducer, { TOGGLE_SORTING, toggleSort, mapSortingToProps } from "../";

describe("toggleSort", () => {
  it("returns action type TOGGLE_SORTING", () => {
    expect(toggleSort()).toEqual({ type: TOGGLE_SORTING });
  });
});

describe("mapSortingToProps", () => {
  it("maps from the state object", () => {
    const state = { sorting: false };
    expect(mapSortingToProps(state)).toEqual({ sorting: false });
  });
});

describe("reducer", () => {
  it("toggles to true", () => {
    expect(reducer(undefined, { type: TOGGLE_SORTING })).toEqual(true);
  });
  it("toggles to false", () => {
    expect(reducer(true, { type: TOGGLE_SORTING })).toEqual(false);
  });
});
