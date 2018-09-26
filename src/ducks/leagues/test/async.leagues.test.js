import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  fetchLeagues,
  mapFetchAction,
  FETCH_LEAGUES_DATA,
  SUCCESS_LEAGUES_DATA,
  ERROR_LEAGUES_DATA
} from "../";
import { url } from "../../../contants";
import mock from "./mock.data";
import format from "./mock.format";

describe("successful async fetchLeagues", () => {
  const mockAxios = new MockAdapter(axios);
  mockAxios.onGet(url).reply(200, { ...mock });

  const dispatch = jest.fn();
  const promise = fetchLeagues(dispatch);

  it("triggers onFetchLeagueData", () => {
    expect(dispatch).toHaveBeenCalledWith({ type: FETCH_LEAGUES_DATA });
  });

  it("makes network request and dispatches league data", done => {
    return promise.then(() => {
      expect(dispatch).toHaveBeenLastCalledWith({
        type: SUCCESS_LEAGUES_DATA,
        ...format
      });
      done();
    });
  });
});

describe("failed on bad data async fetchLeagues", () => {
  const mockAxios = new MockAdapter(axios);
  mockAxios.onGet(url).reply(200, {});

  const dispatch = jest.fn();
  const promise = fetchLeagues(dispatch);

  it("triggers onFetchLeagueData", () => {
    expect(dispatch).toHaveBeenCalledWith({ type: FETCH_LEAGUES_DATA });
  });

  it("makes network request and dispatches league data", done => {
    return promise.then(() => {
      expect(dispatch).toHaveBeenLastCalledWith({
        type: ERROR_LEAGUES_DATA
      });
      done();
    });
  });
});

describe("failed on 404 error/not found data async fetchLeagues", () => {
  const mockAxios = new MockAdapter(axios);
  mockAxios.onGet(url).reply(404, {});

  const dispatch = jest.fn();
  const promise = fetchLeagues(dispatch);

  it("triggers onFetchLeagueData", () => {
    expect(dispatch).toHaveBeenCalledWith({ type: FETCH_LEAGUES_DATA });
  });

  it("makes network request and dispatches league data", done => {
    return promise.then(() => {
      expect(dispatch).toHaveBeenLastCalledWith({
        type: ERROR_LEAGUES_DATA
      });
      done();
    });
  });
});

describe("mapFetchAction", () => {
  const dispatch = jest.fn();
  const props = mapFetchAction(dispatch);
  it("returns a function `fetch` with dispatch as argument", () => {
    expect(props.fetch).toBeInstanceOf(Function);
    props.fetch();
    expect(dispatch).toHaveBeenCalled();
  });
});