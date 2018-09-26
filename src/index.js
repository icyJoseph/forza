import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Routes from "./routes";
import saveToStore from "./middleware";
import rootReducer from "./ducks";

import { STATE_NAME, white, dodgerBlue } from "./contants";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

// redux dev tools plus saving to local storage
const enhancer = composeEnhancers(saveToStore());

// get forza key from local storage
const storedStateJSON = localStorage.getItem(STATE_NAME);

// parse it or returnning undefined
const storedInitialState = storedStateJSON
  ? JSON.parse(storedStateJSON)
  : undefined;

const store = createStore(rootReducer, storedInitialState, enhancer);

const theme = createMuiTheme({
  palette: {
    primary: { main: dodgerBlue },
    secondary: { main: white }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
