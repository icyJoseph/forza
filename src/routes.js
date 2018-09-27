import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Loading from "./components/Loading";

const delay = 600;

export const TopMenu = Loadable({
  loader: () => import("./containers/TopMenu"),
  loading: Loading,
  delay
});

export const League = Loadable({
  loader: () => import("./containers/League"),
  loading: Loading,
  delay
});

export const Landing = Loadable({
  loader: () => import("./containers/Landing"),
  loading: Loading,
  delay
});

export const FloatingActionButtons = Loadable({
  loader: () => import("./containers/FloatingActionButtons"),
  loading: Loading,
  delay
});

const Router = () => (
  <BrowserRouter>
    <Fragment>
      <Route path="/:league?" component={TopMenu} />
      <Switch>
        <Route exact path="/:league" component={League} />
        <Route path="/" component={Landing} />
      </Switch>
      <Route path="/:league" component={FloatingActionButtons} />
    </Fragment>
  </BrowserRouter>
);

export default Router;
