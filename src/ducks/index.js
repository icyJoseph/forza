import { combineReducers } from "redux";
import leagues from "./leagues";
import predictions from "./predictions";
import sorting from "./sorting";

const rootReducer = combineReducers({
  leagues,
  predictions,
  sorting
});

export default rootReducer;
