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
    const {events} = this.props;
    return (
      <div id="calendar-container">
        <Calendar
          selectable
          defaultDate={new Date()}
          defaultView="week"
          events={events}
          views={{
            week: true,
            day: true
          }}
          onSelectSlot={async slotInfo => {
            const eventName = await prompt("What is the name of the event?");
            this.addEvent(events, {
              name: eventName,
              start: new Date(slotInfo.start),
              end: new Date(slotInfo.end)
            });
          }}
          onSelectEvent={selectedEvent => {
            this.deleteEvent(selectedEvent);
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.calendars.events
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadACalendar: () => dispatch(fetchSingleCalendar()),
  addEvent: (events, event) => dispatch(addEventToSingleCalendar(events, event)),
  deleteEvent: (events, selectedEvent) => dispatch(deleteEvent(events, selectedEvent))

});

const SafeCalendar = connect(mapStateToProps, mapDispatchToProps)(PresentSafeCalendar)
export default SafeCalendar;
