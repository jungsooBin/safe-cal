import React, { Component } from "react";
import { isSignInPending, loadUserData, Person } from "blockstack";
import Contacts from "./Contacts.jsx";
import { Link } from "react-router-dom";

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

  componentDidMount() {
    this.setState({
      person: new Person(loadUserData().profile)
    });
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
          <Link to="/">
            <button type="submit">MyCal</button>
          </Link>
          <Link to="/contacts">
            <button type="submit">Contacts</button>
          </Link>
          <button type="submit" onClick={handleSignOut}>
            Signout
          </button>
        </div>
      </div>
    ) : null;
  }
}
