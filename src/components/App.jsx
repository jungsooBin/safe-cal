import React, { Component } from "react";
import Profile from "./Profile.jsx";
import Routes from '../routes'
import Signin from "./Signin.jsx";
import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut
} from "blockstack";

export default class App extends Component {
  componentDidMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then(userData => {
        window.location = window.location.origin;
      });
    }
  }

  handleSignIn(e) {
    e.preventDefault();
    redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  render() {
    return (
      <div>
        {!isUserSignedIn() ? (
          <Signin handleSignIn={this.handleSignIn} />
        ) : (
          <div id="app-container">
            <Profile handleSignOut={this.handleSignOut} />
            <Routes />
            <SafeCalendar />
          </div>
        )}
      </div>
    );
  }
}
