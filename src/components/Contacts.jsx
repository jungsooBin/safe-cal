import React, { Component } from "react";

import {connect} from 'react-redux';
import {fetchFriends, addFriendToList, deleteFriend} from '../reducers/contactReducer'
import "react-big-calendar/lib/css/react-big-calendar.css";

const userNames = (friends) => {
  if(friends) {
    this.props.contacts.map((friend) => {
      return (
          <li key={friend.username}>{friend.username}</li>
      );
  })}
  else {
    return <p> there is no contact</p>
  }
};

class PresentContacts extends Component {
  constructor(props){
    super(props)

    this.state = {
      contacts: this.props.contacts,
      newContact:''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {

    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
    this.props.loadFriends();
  }

  render() {
    
    return (
      <div id="calendar-container">

        <form onSubmit={event => this.props.handleSubmit(event, this.state.contacts, this.state.newContact)}>
          <h3>Add Contact</h3>
          <input name="rate" type = "text" value = {this.state.newContact || ''} onChange={this.handleInputChange} />
          <button type="submit">Add</button>
          
        </form>
        <ul>
          {userNames(this.props.contacts.friends)}
        </ul>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts.friends
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadFriends: () => dispatch(fetchFriends()),
  addFriend: (friends, friend) => dispatch(addFriendToList(friends, friend)),
  deleteAFriend: (friends, friend) => dispatch(deleteFriend(friends, friend)),
  handleSubmit: async (event, friends, friend) =>{
    event.preventDefault();
    await dispatch(addFriendToList(friends, friend));
  }
});

const Contacts = connect(mapStateToProps, mapDispatchToProps)(PresentContacts)
export default Contacts;
