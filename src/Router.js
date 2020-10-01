import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import SetupView from "./views/SetupView";
import OverlayView from "./views/OverlayView";

export default function App() {
  return (
    <Router>
      <Route path="/:alley/:fromLane/:toLane" component={OverlayView} />
      <Route exact path="/" component={SetupView} />
    </Router>
  );
}
