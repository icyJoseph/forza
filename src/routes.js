import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import TopMenu from "./containers/TopMenu";
import League from "./containers/League";
import Landing from "./containers/Landing";
import BackButton from "./containers/BackButton";

const Router = () => (
  <BrowserRouter>
    <Fragment>
      <Route path="/" component={TopMenu} />
      <Switch>
        <Route exact path="/:league" component={League} />
        <Route path="/" component={Landing} />
      </Switch>
      <Route
        path="/:league"
        render={({ ...props }) => <BackButton {...props} />}
      />
    </Fragment>
  </BrowserRouter>
);

export default Router;