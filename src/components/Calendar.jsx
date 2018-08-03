import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class SafeCalendar extends Component {
  constructor() {
    super();
    this.state = {
      events: [
        {
          start: new Date(),
          end: new Date(moment().add(1, "day"))
        }
      ]
    };
  }

  render() {
    return (
      <div id="calendar-container">
        <Calendar
          defaultDate={new Date()}
          defaultView="week"
          events={this.state.events}
          views={{
            week: true,
            day: true
          }}
          color="#6067f1"
        />
      </div>
    );
  }
}

export default SafeCalendar;
