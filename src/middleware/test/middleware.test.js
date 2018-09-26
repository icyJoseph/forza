import { createStore } from "redux";
import saveStore, { saveState, getStateAndSave } from "../";
import rootReducer from "../../ducks/";
import { TOGGLE_SORTING } from "../../ducks/sorting";
import { STATE_NAME } from "../../contants";

const TEST = "test";

const mockedState = {
  leagues: { allLeagues: {}, error: false, loading: false },
  predictions: { predictions: {}, topScorer: {} },
  sorting: false
};

describe("localStorage mock", () => {
  afterAll(() => {
    localStorage.removeItem(TEST);
  });
  it("reads from empty local storage", () => {
    expect(localStorage.getItem(TEST)).toEqual(null);
  });

  it("writes to local storage", () => {
    const data = { message: "hi" };

    localStorage.setItem(TEST, JSON.stringify(data));
    expect(JSON.parse(localStorage.getItem(TEST))).toEqual(data);
  });
});

describe("saveState", () => {
  afterAll(() => {
    localStorage.removeItem(STATE_NAME);
  });

  const stateToSave = {
    sorting: false
  };

  it("saves to the localStorage", () => {
    saveState(stateToSave);
    const savedState = JSON.parse(localStorage.getItem(STATE_NAME));
    expect(savedState).toEqual(stateToSave);
  });
});

describe("getStateAndSave", () => {
  afterAll(() => {
    localStorage.removeItem(STATE_NAME);
  });

  const state = { sorting: false };

  const store = { subscribe: jest.fn(), getState: jest.fn(() => state) };

  it("saves the given state as a side effect", () => {
    const enhancer = getStateAndSave(store);
    enhancer();
    const savedState = JSON.parse(localStorage.getItem(STATE_NAME));
    expect(savedState).toEqual(state);
  });
});

describe("saveStore", () => {
  afterAll(() => {
    localStorage.removeItem(STATE_NAME);
  });

  const state = {
    sorting: false
  };

  const expectedState = {
    ...mockedState,
    sorting: true
  };

  const store = saveStore()(createStore)(rootReducer, state);

  it("returns the store with the given state", () => {
    expect(store.getState()).toEqual(mockedState);
  });
  it("saves the state when the state changes", () => {
    store.dispatch({ type: TOGGLE_SORTING });
    const savedState = JSON.parse(localStorage.getItem(STATE_NAME));
    expect(savedState).toEqual(expectedState);
  });
});
