import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./routes";
import registerServiceWorker from "./registerServiceWorker";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./ducks";

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, undefined, reduxDevTools);
const dodgerBlue = "#1E90FF";
const white = "#ffffff";

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
