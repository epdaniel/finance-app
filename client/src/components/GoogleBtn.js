import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import UserProfile from "./userProfile";

// TODOO: REMOVE THIS TO ENV FILE??
const CLIENT_ID =
  "232952519661-430s05vr9he9sf0o45b88nde6jid56vg.apps.googleusercontent.com";

class GoogleBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: UserProfile.tryRememberLogin(),
      logInCallback: props.logInCallback,
      //accessToken: '' //TODO: what's this?
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login(response) {
    let profile = response.getBasicProfile();
    UserProfile.login(
      response.getAuthResponse().id_token,
      profile.getName(),
      profile.getImageUrl()
    );
    //console.log('Log in from: ' + response.getAuthResponse().id_token);
    //console.log('Name: ' + profile.getName());
    if (response.accessToken) {
      this.setState((state) => ({
        ...this.state,
        isLoggedIn: true,
        //accessToken: response.accessToken
      }));
      this.state.logInCallback();
    }
  }

  logout(response) {
    UserProfile.logOut();
    this.setState((state) => ({
      ...this.state,
      isLoggedIn: false,
      //accessToken: ''
    }));
  }

  handleLoginFailure(response) {
    alert("Failed to log in");
  }

  handleLogoutFailure(response) {
    alert("Failed to log out");
  }

  render() {
    return (
      <div>
        {this.state.isLoggedIn ? (
          <div>
            <img
              style={userGoogleImgStyle}
              src={UserProfile.getImgUrl()}
              alt="User"
            ></img>
            <b> {UserProfile.getName()} </b>
            <br></br>
            <br></br>
            <GoogleLogout
              clientId={CLIENT_ID}
              buttonText="Sign out"
              onLogoutSuccess={this.logout}
              onFailure={this.handleLogoutFailure}
            ></GoogleLogout>
          </div>
        ) : (
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Sign in"
            onSuccess={this.login}
            onFailure={this.handleLoginFailure}
            cookiePolicy={"single_host_origin"}
            responseType="code,token"
          />
        )}
      </div>
    );
  }
}

const userGoogleImgStyle = {
  width: "30px",
  marginBottom: "-10px",
  borderRadius: "50%",
};

export default GoogleBtn;
