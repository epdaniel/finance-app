import React, { useState } from "react";
import UserProfile from "./userProfile";
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
  }
};

const GoogleBtn = ({ classes }) => {
  const [isLoggedIn, setisLoggedIn] = useState(UserProfile.tryRememberLogin())

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
  }

  const logout = (response) => {
    UserProfile.logOut();
    setisLoggedIn(false);
    window.location.reload();
  }

  const handleLoginFailure = (response) => {
    alert("Failed to log in, try again later");
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
          <Grid item className={classes.googleName}>
              {UserProfile.getName()}
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
            onSuccess={login}
            onFailure={handleLoginFailure}
            cookiePolicy={"single_host_origin"}
            responseType="code,token"
            isSignedIn={true}
          />
        </Grid>)}
    </Grid>
  );
}

export default withStyles(styles)(GoogleBtn);