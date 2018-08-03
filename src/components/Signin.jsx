import React, { Component } from "react";
import { isUserSignedIn } from "blockstack";

export default class Signin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSignIn } = this.props;

    return (
      <div id="signin-container">
        <h1>Safe Calendar</h1>
        <button onClick={handleSignIn.bind(this)}>
          Sign In with Blockstack
        </button>
      </div>
    );
  }
}
