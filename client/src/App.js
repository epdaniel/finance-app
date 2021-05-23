import React from "react";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/login">
            <LogIn/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
