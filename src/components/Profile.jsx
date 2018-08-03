import React, { Component } from "react";
import { isSignInPending, loadUserData, Person } from "blockstack";

const avatarFallbackImage =
  "https://s3.amazonaws.com/onename/avatar-placeholder.png";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      person: {
        name() {
          return "Anonymous";
        },
        avatarUrl() {
          return avatarFallbackImage;
        }
      }
    };
  }

  render() {
    const { handleSignOut } = this.props;
    const { person } = this.state;
    return !isSignInPending() ? (
      <div id="profile-container">
        <div id="image-container">
          <img
            src={person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage}
          />
        </div>
        <div id="info-container">
          <h3>Hey, {person.name() ? person.name() : "Nameless Person"}!</h3>
          <button id="signout-button" onClick={handleSignOut.bind(this)}>
            Signout
          </button>
        </div>
      </div>
    ) : null;
  }

  componentWillMount() {
    this.setState({
      person: new Person(loadUserData().profile)
    });
  }
}
