import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import {connect} from 'react-redux';
import {fetchSingleCalendar, addEventToSingleCalendar, deleteEvent} from '../reducers/calendarReducer'

import "react-big-calendar/lib/css/react-big-calendar.css";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class PresentSafeCalendar extends Component {
  componentDidMount() {
    this.props.loadACalendar();
  }

  render() {
    var userNames = this.props.subscribers.map((subscriber) => {
      return (
          <li key={subscriber.username}>{subscriber.username}</li>
      );
    });
    return (
      <form onSubmit={this.addSubscriber.bind(this)}>
        <h3>Find calendar</h3>
        <input name="username" ref={element => this.input = element} defaultValue="Enter Blockstack.id" />
        <button type="submit">Add</button>
    
        <ul>
            {userNames}
        </ul>
				<div className="container">
				<h3>Remove all friends</h3> 
                <a className="button is-danger" onClick={this.props.removeAllSubscribers.bind(this)}>x</a>
				</div>
        </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.calendars.events
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadACalendar: () => dispatch(fetchSingleCalendar()),
  addEvent: (events, event) => dispatch(addEventToSingleCalendar(events, event)),
  deleteEvent: (events, selectedEvent) => dispatch(deleteEvent(events, selectedEvent))

});

const MySafeCalendar = connect(mapStateToProps, mapDispatchToProps)(PresentSafeCalendar)
export default MySafeCalendar;
