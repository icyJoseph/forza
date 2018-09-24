const SET_PREDICTION = "prediction set";
const SET_TOPSCORER = "prediction top scorer";

//actions
export const setPrediction = (team, place) => ({
  type: SET_PREDICTION,
  payload: { ...team, place }
});

export const setTopScorer = player => ({
  type: SET_TOPSCORER,
  payload: player
});

//initial state
const initialState = {
  predictions: {},
  topScorer: ""
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
    default:
      return state;
  }
}

export default predictions;
