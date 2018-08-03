import React, { Component } from "react";

const Signin = props => {
  const { handleSignIn } = props;

  return (
    <div id="signin-container">
      <h1>Safe Calendar</h1>
      <button type="submit" onClick={handleSignIn.bind(this)}>
        Sign In with Blockstack
      </button>
    </div>
  );
};

export default Signin;
