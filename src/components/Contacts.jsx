import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { lookupProfile } from "blockstack";
import {
  fetchFriends,
  addFriendToList,
  deleteFriend
} from "../reducers/contactReducer";
import "react-big-calendar/lib/css/react-big-calendar.css";

const userNames = friends => {
  if (friends) {
    this.props.contacts.map(friend => {
      return <li key={friend.username}>{friend.username}</li>;
    });
  } else {
    return <p />;
  }
};

class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: this.props.contacts,
      newContact: "",
      results: [],
      manualResults: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    let link = "https://core.blockstack.org/v1/search?query=";
    axios
      .get(link + this.state.newContact)
      .then(res => {
        if (res.data.results.length > 0) {
          this.setState({ results: res.data.results });
        } else {
          this.setState({ results: [] });
          lookupProfile(
            this.state.newContact,
            "https://core.blockstack.org/v1/names"
          )
            .then(profile => {
              console.log(profile);
              this.setState({ manualResults: profile });
            })
            .catch(error => {
              console.log("could not resolve profile");
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.props.loadFriends();
  }

  render() {
    return (
      <div id="contacts-container">
        <ul>{userNames(this.props.contacts.friends)}</ul>
        <form
          onSubmit={event =>
            this.props.handleSubmit(
              event,
              this.state.contacts,
              this.state.newContact
            )
          }
        >
          <h3>Contacts</h3>
          <input
            name="newContact"
            type="text"
            value={this.state.newContact || ""}
            onChange={this.handleInputChange}
          />
          <button type="submit">Search</button>
        </form>
        <div>
          <ul className="collection">
            {this.state.results.map(result => {
              let profile = result.profile;
              let image = profile.image;
              let imageLink;
              if (image != null) {
                if (image[0]) {
                  imageLink = image[0].contentUrl;
                } else {
                  imageLink =
                    "https://s3.amazonaws.com/onename/avatar-placeholder.png";
                }
              } else {
                imageLink =
                  "https://s3.amazonaws.com/onename/avatar-placeholder.png";
              }
              return (
                <div key={result.username}>
                  <a
                    className="contact-add"
                    onClick={() =>
                      this.setState({
                        addContact: result.username,
                        newContactImg: imageLink,
                        name: result.profile.name,
                        confirmAdd: true
                      })
                    }
                  >
                    <li className="contact-container">
                      <img src={imageLink} alt="avatar" className="circle" />
                      <h4>{result.profile.name}</h4>
                      <h5>{result.username}</h5>
                    </li>
                  </a>
                </div>
              );
            })}
            {this.state.manualResults !== {} ? (
              <div key={this.state.newContact} />
            ) : (
              <div />
            )}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts.friends
  };
};

const mapDispatchToProps = dispatch => ({
  loadFriends: () => dispatch(fetchFriends()),
  addFriend: (friends, friend) => dispatch(addFriendToList(friends, friend)),
  deleteAFriend: (friends, friend) => dispatch(deleteFriend(friends, friend)),
  handleSubmit: async (event, friends, friend) => {
    event.preventDefault();
    await dispatch(addFriendToList(friends, friend));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contacts);
