import React, { useState } from "react";
import UserProfile from "./userProfile";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { GoogleLogin, GoogleLogout } from "react-google-login";


const CLIENT_ID =
  "232952519661-430s05vr9he9sf0o45b88nde6jid56vg.apps.googleusercontent.com";

const styles = {
  GoogleContainer: {
    // width: "100%",
    margin: 0,
  },
  UserImage: {
    width: "30px",
    marginRight: "-2px",
    marginBottom: "-5px",
    borderRadius: "50%",
  },
};

const GoogleBtn = ({ classes, logInCallback }) => {
  const [isLoggedIn, setisLoggedIn] = useState(UserProfile.tryRememberLogin())
  //accessToken: '' //TODO: what's this? think it's an access token to identify the user to google's services

  const login = (response) => {
    let profile = response.getBasicProfile();
    UserProfile.login(
      response.getAuthResponse().id_token,
      profile.getName(),
      profile.getImageUrl()
    );
    //console.log('Log in from: ' + response.getAuthResponse().id_token);
    //console.log('Name: ' + profile.getName());
    if (response.accessToken) {
      setisLoggedIn(true);
      logInCallback();
    }
  }

  const logout = (response) => {
    UserProfile.logOut();
    setisLoggedIn(false);
  }

  const handleLoginFailure = (response) => {
    alert("Failed to log in");
  }

  const handleLogoutFailure = (response) => {
    alert("Failed to log out");
  }


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
          <Grid item>
            <b> {UserProfile.getName()} </b>
          </Grid>
          <Grid item>
            <GoogleLogout
              clientId={CLIENT_ID}
              buttonText="Sign out"
              onLogoutSuccess={logout}
              onFailure={handleLogoutFailure}
            />
          </Grid>
        </>) :
        (<Grid item>
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Sign in"
            onSuccess={login}
            onFailure={handleLoginFailure}
            cookiePolicy={"single_host_origin"}
            responseType="code,token"
          />
        </Grid>)}
    </Grid>
  );

}

export default withStyles(styles)(GoogleBtn);