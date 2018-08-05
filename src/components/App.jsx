import React, { Component } from "react";
import Profile from "./Profile.jsx";
import { Route, Switch, Redirect} from 'react-router-dom'

import MySafeCalendar from "./Calendar.jsx";
import Contacts from "./Contacts.jsx";
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
            <Switch>
                <Route exact path ="/" component={MySafeCalendar}/>
                <Route exact path ="/contacts" component={Contacts}/>
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

