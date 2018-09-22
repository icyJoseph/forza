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
  const { league } = action.payload;
  switch (action.type) {
    case SET_PREDICTION:
      const current = state.predictions[league] || [];
      return {
        ...state,
        predictions: {
          ...state.predictions,
          [league]: current.concat({
            ...action.payload,
            league
          })
        }
      };
    case SET_TOPSCORER:
      return {
        ...state,
        topScorer: { ...state.topScorer, [league]: action.payload.playerName }
      };
  }
}

export default predictions;
