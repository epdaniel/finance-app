import React, { useState, useEffect } from "react";
import UserProfile from "./userProfile";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const styles = {
    GoogleContainer: {
        margin: 0,
        marginRight: 4,
    },
    UserImage: {
        width: "28px",
        marginBottom: "-5px",
        borderRadius: "50%",
    },
    googleName: {
        color: "#3c4043",
        fontSize: "14px",
    },
};

const GoogleBtn = ({ classes }) => {
    const [isLoggedIn, setisLoggedIn] = useState(false);

    useEffect(() => {
        let attemptLogin = async () => {
            let status = await UserProfile.tryRememberLogin();
            setisLoggedIn(status);
        };
        attemptLogin();
    }, []);

    const login = (response) => {
        let profile = response.getBasicProfile();
        UserProfile.login(
            response.getAuthResponse().id_token,
            profile.getName(),
            profile.getImageUrl()
        );
        if (response.accessToken) {
            setisLoggedIn(true);
            window.location.reload();
        }
    };

    const logout = (response) => {
        UserProfile.logOut();
        setisLoggedIn(false);
        window.location.reload();
    };

    const handleLoginFailure = (response) => {
        alert("Failed to log in, try again later");
    };

    const handleLogoutFailure = (response) => {
        alert("Failed to log out");
    };

    return (
        <Grid
            container
            className={classes.GoogleContainer}
            direction="row"
            spacing={1}
            justify="center"
            alignItems="center"
        >
            {isLoggedIn ? (
                <>
                    <Grid item>
                        <img
                            className={classes.UserImage}
                            src={UserProfile.getImgUrl()}
                            alt="Google User"
                        />
                    </Grid>
                    <Grid item className={classes.googleName}>
                        {UserProfile.getName()}
                    </Grid>
                    <Grid item>
                        <GoogleLogout
                            clientId={UserProfile.getGoogleClientId()}
                            buttonText="Sign out"
                            onLogoutSuccess={logout}
                            onFailure={handleLogoutFailure}
                        />
                    </Grid>
                </>
            ) : (
                <Grid item>
                    <GoogleLogin
                        clientId={UserProfile.getGoogleClientId()}
                        buttonText="Sign in"
                        onSuccess={login}
                        onFailure={handleLoginFailure}
                        cookiePolicy={"single_host_origin"}
                        responseType="code,token"
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default withStyles(styles)(GoogleBtn);
