const SET_PREDICTION = "prediction set";
const SET_TOPSCORER = "prediction top scorer";
const RESET_PREDICTION = "prediction reset";

//actions
export const setPrediction = (team, place) => ({
  type: SET_PREDICTION,
  payload: { ...team, place }
});

export const setTopScorer = player => ({
  type: SET_TOPSCORER,
  payload: player
});

export const resetAll = leagueName => ({
  type: RESET_PREDICTION,
  payload: { leagueName }
});

//initial state
const initialState = {
  predictions: {},
  topScorer: {}
};

// helpers
const replaceTeams = (teamId, current) => (acc, val) =>
  teamId === current[val].teamId ? { ...acc } : { ...acc, [val]: current[val] };

const getPayload = ({ payload }) => (payload ? payload : { leagueName: null });

//reducer
function predictions(state = initialState, action) {
  const { leagueName } = getPayload(action);
  switch (action.type) {
    case SET_PREDICTION:
      const current = state.predictions[leagueName] || {};
      const { teamId } = action.payload;
      const searchAndReplace = replaceTeams(teamId, current);
      return {
        ...state,
        predictions: {
          ...state.predictions,
          [leagueName]: {
            ...Object.keys(current).reduce(searchAndReplace, {}),
            [action.payload.place]: { ...action.payload }
          }
        }
      };
    case SET_TOPSCORER:
      return {
        ...state,
        topScorer: {
          ...state.topScorer,
          [leagueName]: { ...action.payload, leagueName }
        }
      };
    case RESET_PREDICTION:
      const { [leagueName]: omit, ...otherPredictions } = state.predictions;
      const { [leagueName]: omit2, ...otherTopScorers } = state.topScorer;
      return {
        ...state,
        predictions: { ...otherPredictions },
        topScorer: { ...otherTopScorers }
      };
    default:
      return state;
  }
}

export default predictions;
