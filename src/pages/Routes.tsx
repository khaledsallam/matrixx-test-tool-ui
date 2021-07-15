import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage";
import Onboarding from "./Onboarding";
import BalanceRecharge from "./BalanceRecharge";
import Grid from "@material-ui/core/Grid";

const wrapped =
  <T extends Record<string, unknown>>(Component: React.ComponentType<T>) =>
  (props: T): React.ReactElement<T> =>
    (
      <Grid container direction={"column"} className={"container"}>
        <Component {...props} />
      </Grid>
    );

export const RoutesSwitch = () => (
  <Router>
    <Switch>
      <Route path={"/onboarding"} component={wrapped(Onboarding)} />
      <Route path={"/recharge"} component={wrapped(BalanceRecharge)} />
      <Route path={"/"} component={wrapped(LandingPage)} />
    </Switch>
  </Router>
);

export default RoutesSwitch;
