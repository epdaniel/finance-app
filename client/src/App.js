import React from "react";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import { ProvideAuth, useAuth } from "./components/useAuth";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
        <Route
            {...rest}
            render={() =>
                auth.loggedIn ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                        }}
                    />
                )
            }
        />
    );
}

function App() {
    return (
        <ProvideAuth>
            <Router>
                <Switch>
                    <Route path="/login">
                        <LogIn />
                    </Route>
                    <PrivateRoute path="/">
                        <Home />
                    </PrivateRoute>
                </Switch>
            </Router>
        </ProvideAuth>
    );
}

export default App;
