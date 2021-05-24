import React from "react";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import { ProvideAuth } from "./components/useAuth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    return (
        <ProvideAuth>
            <Router>
                <Switch>
                    <Route path="/login">
                        <LogIn />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </ProvideAuth>
    );
}

export default App;
