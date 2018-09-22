// action types
const FETCH_LEAGUES_DATA = "leagues fetch";
const SUCCESS_LEAGUES_DATA = "leagues success";

// actions
export const fetchLeaguesData = {
  type: FETCH_LEAGUES_DATA
};

export const leaguesData = leagues => ({
  type: SUCCESS_LEAGUES_DATA,
  leagues
});

// initial state
const initialState = {
  data: [],
  loading: false
};

// reducer
function leagues(state = initialState, action) {
  switch (action.type) {
    case FETCH_LEAGUES_DATA:
      return { ...state, loading: true };
    case SUCCESS_LEAGUES_DATA:
      const { leagues } = action;
      return { ...state, data: leagues, loading: false };
    default:
      return state;
  }
}

export default leagues;
