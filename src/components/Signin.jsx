import React from "react";

const Signin = props => {
  const { handleSignIn } = props;

  return (
    <div id="signin-container">
      <h1>SafeCal</h1>
      <button type="submit" onClick={handleSignIn}>
        Sign In with Blockstack
      </button>
    </div>
  );
};

export default Signin;
