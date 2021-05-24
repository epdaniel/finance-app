import React, { useState, useEffect, useContext, createContext } from "react";

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
        // localStorage.setItem("IdToken", token);
        // localStorage.setItem("username", name);
        // localStorage.setItem("userImg", url);
    };

    const logout = () => {
        setIdToken(null);
        setUsername("");
        setImgUrl("");
        setLoggedIn(false);
        localStorage.clear();
    };

    // const attemptLogin = () => {
    //     // maybe check for the token validity? think about in regards to the refresh func
    //     if (localStorage.getItem("IdToken") !== null) {
    //         login(
    //             localStorage.getItem("IdToken"),
    //             localStorage.getItem("username"),
    //             localStorage.getItem("userImg")
    //         );
    //         return true;
    //     }
    //     return false;
    // };

    useEffect(() => {
        //attemptLogin();
        console.log("on useauth mount?");
        const unsubscribe = () => {
            console.log("on useauth unmount? whats going on");
        };
        return () => unsubscribe();
    }, []);

    return {
        loggedIn: loggedIn,
        idToken: idToken,
        userName: username,
        imgUrl: imgUrl,
        login: login,
        logout: logout,
    };
};
