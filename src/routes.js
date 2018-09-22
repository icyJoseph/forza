import React, { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import TopMenu from "./containers/TopMenu";
import App from "./containers/App";

const Router = () => (
  <BrowserRouter>
    <Fragment>
      <Route path="/" component={TopMenu} />
      <Route path="/" component={App} />
    </Fragment>
  </BrowserRouter>
);

export default Router;
