import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SetupView from "./views/SetupView";
import OverlayView from "./views/OverlayView";

const nameSpace = "sterling-scoring";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path={`/${nameSpace}/:alley/:fromLane/:toLane`}>
          <OverlayView />
        </Route>
        <Route path={`/${nameSpace}`}>
          <SetupView />
        </Route>
      </Switch>
    </Router>
  );
}
