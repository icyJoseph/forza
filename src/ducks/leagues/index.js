import axios from "axios";
import { efficientReformat } from "./helpers";
import { url } from "../../constants";
import { addExpiry } from "../../helpers";

// action types
export const FETCH_LEAGUES_DATA = "leagues fetch";
export const SUCCESS_LEAGUES_DATA = "leagues success";
export const ERROR_LEAGUES_DATA = "leagues error";

// actions
export const onFetchLeagueData = {
  type: FETCH_LEAGUES_DATA
};

export const onSuccessLeagueData = ({ allLeagues, expiry }) => ({
  type: SUCCESS_LEAGUES_DATA,
  allLeagues,
  expiry
});

export const onErroLeagueData = {
  type: ERROR_LEAGUES_DATA
};

// selector
export const mapAllLeaguesToProps = ({
  leagues: { allLeagues, loading, expiry }
}) => ({
  allLeagues,
  expiry,
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
    .then(addExpiry)
    .then(allLeagues => dispatch(onSuccessLeagueData(allLeagues)))
    .catch(() => dispatch(onErroLeagueData));
};

// dispatcher
export const mapFetchAction = dispatch => ({
  fetch: () => fetchLeagues(dispatch)
});

// initial state
const initialState = {
  allLeagues: {},
  loading: false,
  error: false,
  expiry: null
};

// reducer
function leagues(state = initialState, action) {
  switch (action.type) {
    case FETCH_LEAGUES_DATA:
      return { ...state, loading: true, error: false };
    case SUCCESS_LEAGUES_DATA:
      const { allLeagues, expiry } = action;
      return { ...state, allLeagues, expiry, loading: false, error: false };
    case ERROR_LEAGUES_DATA:
      return { ...state, error: true, loading: false };
    default:
      return state;
  }
}

export default leagues;
