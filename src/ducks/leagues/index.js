import axios from "axios";
import { efficientReformat } from "./helpers";

// constants -> change to process env later on
const url = "http://localhost:1337/large";

// action types
const FETCH_LEAGUES_DATA = "leagues fetch";
const SUCCESS_LEAGUES_DATA = "leagues success";
const ERROR_LEAGUES_DATA = "leagues error";

// actions
export const onFetchLeagueData = {
  type: FETCH_LEAGUES_DATA
};

export const onSuccessLeagueData = allLeagues => ({
  type: SUCCESS_LEAGUES_DATA,
  allLeagues
});

export const onErroLeagueData = {
  type: ERROR_LEAGUES_DATA
};

// selector
export const mapAllLeaguesToProps = ({ leagues: { allLeagues, loading } }) => ({
  allLeagues,
  loading
});

// async handler
export const fetchLeagues = dispatch => {
  dispatch(onFetchLeagueData);
  // TODO: add cache logic here
  return axios
    .get(url)
    .then(({ data: { leagues } }) => leagues)
    .then(efficientReformat)
    .then(allLeagues => dispatch(onSuccessLeagueData(allLeagues)))
    .catch(() => dispatch(onErroLeagueData));
};

// dispatcher
export const mapFetchAction = dispatch => ({
  fetch: () => fetchLeagues(dispatch)
});

// initial state
const initialState = {
  allLeagues: [],
  loading: false,
  error: false
};

// reducer
function leagues(state = initialState, action) {
  switch (action.type) {
    case FETCH_LEAGUES_DATA:
      return { ...state, loading: true, error: false };
    case SUCCESS_LEAGUES_DATA:
      const { allLeagues } = action;
      return { ...state, allLeagues, loading: false, error: false };
    case ERROR_LEAGUES_DATA:
      return { ...state, error: true };
    default:
      return state;
  }
}

export default leagues;
