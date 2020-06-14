import React from "react";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import {
  Switch,
  Route,
} from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "typeface-roboto";

function App(props) {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
