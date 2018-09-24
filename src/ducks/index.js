import { combineReducers } from "redux";
import leagues from "./leagues";
import predictions from "./predictions";

const rootReducer = combineReducers({
  leagues,
  predictions
});

export default rootReducer;
