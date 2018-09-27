import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Routes from "./routes";
import saveToStore from "./middleware";
import rootReducer from "./ducks";

import { STATE_NAME, white, dodgerBlue } from "./constants";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

// if no Redux tools present, just use compose from redux library
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

// create the redux store
const store = createStore(rootReducer, storedInitialState, enhancer);

// define a MUI theme
const theme = createMuiTheme({
  palette: {
    primary: { main: dodgerBlue },
    secondary: { main: white }
  }
});

// render the app
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);

// leave service worker to get PWA push on Chrome
registerServiceWorker();
