import React from "react";
import { useAuth } from "./useAuth";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const CLIENT_ID =
    "232952519661-430s05vr9he9sf0o45b88nde6jid56vg.apps.googleusercontent.com";
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
    const auth = useAuth();

    const login = (response) => {
        let profile = response.getBasicProfile();

        if (response.accessToken) {
            auth.login(
                response.getAuthResponse().id_token,
                profile.getName(),
                profile.getImageUrl()
            );
        }
    };

    const logout = (response) => {
        auth.logout();
    };

    const handleLoginFailure = (response) => {
        alert("Failed to log in, try again later");
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
            {auth.loggedIn ? (
                <>
                    <Grid item>
                        <img
                            className={classes.UserImage}
                            src={auth.imgUrl}
                            alt="Google User"
                        />
                    </Grid>
                    <Grid item className={classes.googleName}>
                        {auth.userName}
                    </Grid>
                    <Grid item>
                        <GoogleLogout
                            clientId={CLIENT_ID}
                            buttonText="Sign out"
                            onLogoutSuccess={logout}
                        />
                    </Grid>
                </>
            ) : (
                <Grid item>
                    <GoogleLogin
                        clientId={CLIENT_ID}
                        onSuccess={login}
                        onFailure={handleLoginFailure}
                        cookiePolicy={"single_host_origin"}
                        responseType="code,token"
                        isSignedIn={true}
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default withStyles(styles)(GoogleBtn);
