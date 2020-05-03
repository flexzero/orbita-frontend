import React from "react";
import LoginView from "./components/Login/LoginView";
import Dashboard from "./components/Dashboard/Dashboard";
import {
  Switch,
  Route,
} from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App(props) {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login" component={LoginView} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
