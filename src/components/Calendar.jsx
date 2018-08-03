import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import { getFile, putFile } from "blockstack";

import "react-big-calendar/lib/css/react-big-calendar.css";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class SafeCalendar extends Component {
  constructor() {
    super();
    this.state = {
      events: []
    };
    this.saveNewEvent = this.saveNewEvent.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const options = { decrypt: true };
    let file = await getFile("events.json", options);
    let events = JSON.parse(file || "[]");
    this.setState({
      events
    });
  }

  async saveNewEvent(event) {
    await this.setState({
      events: [...this.state.events, event]
    });
    let events = this.state.events;
    const options = { encrypt: true };
    await putFile("events.json", JSON.stringify(events), options);
  }

  render() {
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
            let eventName = await prompt("What is the name of the event?");
            this.saveNewEvent({
              name: eventName,
              start: new Date(slotInfo.start),
              end: new Date(slotInfo.end)
            });
          }}
        />
      </div>
    );
  }
}

export default SafeCalendar;
