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

//reducer
function predictions(state = initialState, action) {
  const { leagueName } = action.payload ? action.payload : { leagueName: null };
  switch (action.type) {
    case SET_PREDICTION:
      const current = state.predictions[leagueName] || {};
      return {
        ...state,
        predictions: {
          ...state.predictions,
          [leagueName]: {
            ...Object.keys(current).reduce(
              (acc, val) =>
                action.payload.teamName === current[val].teamName
                  ? { ...acc }
                  : { ...acc, [val]: current[val] },
              {}
            ),
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
