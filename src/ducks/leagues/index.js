// action types
const FETCH_LEAGUES_DATA = "leagues fetch";
const SUCCESS_LEAGUES_DATA = "leagues success";

// actions
export const onFetchLeagueData = {
  type: FETCH_LEAGUES_DATA
};

export const onSuccessLeagueData = allLeagues => ({
  type: SUCCESS_LEAGUES_DATA,
  allLeagues
});

// initial state
const initialState = {
  allLeagues: [],
  loading: false
};

// reducer
function leagues(state = initialState, action) {
  switch (action.type) {
    case FETCH_LEAGUES_DATA:
      return { ...state, loading: true };
    case SUCCESS_LEAGUES_DATA:
      const { allLeagues } = action;
      return { ...state, allLeagues, loading: false };
    default:
      return state;
  }
}

export default leagues;
