import React, { useState, useContext, createContext } from "react";

const authContext = createContext();

export const useAuth = () => useContext(authContext);

export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useProvideAuth = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [idToken, setIdToken] = useState(null);
    const [username, setUsername] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    const login = (token, name, url) => {
        setIdToken(token);
        setUsername(name);
        setImgUrl(url);
        setLoggedIn(true);
    };

    const logout = () => {
        setIdToken(null);
        setUsername("");
        setImgUrl("");
        setLoggedIn(false);
    };

    return {
        loggedIn: loggedIn,
        idToken: idToken,
        userName: username,
        imgUrl: imgUrl,
        login: login,
        logout: logout,
        setIdToken: setIdToken,
    };
};
