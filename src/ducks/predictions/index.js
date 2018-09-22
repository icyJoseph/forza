const SET_PREDICTION = "prediction set";
const SET_TOPSCORER = "prediction top scorer";

//actions
export const setPrediction = (team, place) => ({
  type: SET_PREDICTION,
  payload: { team: team.teamName, place }
});

export const setTopScorer = player => ({
  type: SET_TOPSCORER,
  payload: player
});

//initial state
const initialState = {
  predictions: [],
  topScorer: ""
};

//reducer
function predictions(state = initialState, action) {
  switch (action.type) {
    case SET_PREDICTION:
      return {
        ...state,
        predictions: state.predictions.concat(action.payload)
      };
    case SET_TOPSCORER:
      return {
        ...state,
        topScorer: action.payload.playerName
      };
  }
}

export default predictions;
