import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import {connect} from 'react-redux';
import { getFile, putFile } from "blockstack";
import {fetchSingleCalendar} from '../reducers/calendarReducer'

import "react-big-calendar/lib/css/react-big-calendar.css";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class PresentSafeCalendar extends Component {
  componentDidMount() {
    this.props.loadACalendar();
  }

  

  async deleteEvent(selectedEvent) {
    await this.setState({
      events: [...this.state.events.filter(event => event !== selectedEvent)]
    });
    const events = this.state.events;
    const options = { encrypt: true };
    await putFile("schedule.json", JSON.stringify(events), options);
  }

  render() {
    const {events} = this.props;
    return (
      <div id="calendar-container">
        <Calendar
          selectable
          defaultDate={new Date()}
          defaultView="week"
          events={this.state.events}
          views={{
            week: true,
            day: true
          }}
          onSelectSlot={async slotInfo => {
            const eventName = await prompt("What is the name of the event?");
            this.saveNewEvent({
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
    events: state.events
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadACalendar: () => dispatch(fetchSingleCalendar())
})

const SafeCalendar = connect(mapStateToProps, mapDispatchToProps)(PresentSafeCalendar)
export default SafeCalendar;
