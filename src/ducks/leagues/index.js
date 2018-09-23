import axios from "axios";

// constants
const url = "http://192.168.0.4:1337/";

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
export const mapAllLeaguesToProps = ({ leagues: { allLeagues } }) => ({
  allLeagues
});

// async handler
export const fetchLeagues = dispatch => {
  dispatch(onFetchLeagueData);
  return axios
    .get(url)
    .then(({ data: { leagues } }) => leagues)
    .then(res => dispatch(onSuccessLeagueData(res)))
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
