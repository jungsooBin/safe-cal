
import { getFile, putFile } from 'blockstack';

export const RECEIVE_A_CALENDAR = 'RECEIVE_A_CALENDAR';
export const ADD_AN_EVENT = 'ADD_AN_EVENT';
export const DELETE_AN_EVENT = 'DELETE_AN_EVENT';

export const receiveACalendar = (events) => ({
  type: RECEIVE_A_CALENDAR,
  payload: events
})

export const addAnEvent = (events) => ({
  type: ADD_AN_EVENT,
  payload: events
})

export const deleteAnEvent = (events) => ({
  type: DELETE_AN_EVENT,
  payload: events
})



export const fetchSingleCalendar = () => async (dispatch) => {
  try {
    const options = { decrypt: true };
    const file = await getFile('myCal.json', options);
    const events = await JSON.parse(file || '[]');
    const fetchEvents = events.map(event => ({
      name: event.name,
      start: new Date(event.start),
      end: new Date(event.end)
    }));
    return dispatch(receiveACalendar(fetchEvents))
  } catch (error) {
    console.log(error);
  }
}

export const addEventToSingleCalendar = (events, event) => async (dispatch) => {
  try {
    const eventsAfterAdd = [...events, event];
    const options = { encrypt: true };
    await putFile('myCal.json', JSON.stringify(eventsAfterAdd), options);
    return dispatch(addAnEvent(eventsAfterAdd));
  } catch (error) {
    console.log(error);
  }
}

export const deleteEvent = (events, selectedEvent) => async (dispatch) => {
  try {
    const eventsAfterDelete = [...events.filter(event => event !== selectedEvent)]
    const options = { encrypt: true };
    await putFile('myCal.json', JSON.stringify(eventsAfterDelete), options);
    return dispatch(addAnEvent(eventsAfterDelete));
  } catch (error) {
    console.log(error);
  }
}

const initialState = {
  events: [],
};

const calendarReducer = (calendarState = initialState, action) => {
  switch (action.type) {
    case RECEIVE_A_CALENDAR:
      return {
        ...calendarState, 
        events: action.payload
      };
    case ADD_AN_EVENT:
      return {
        ...calendarState,
        all: action.payload
      };
    case DELETE_AN_EVENT:
      return {
        ...calendarState,
        campus: action.payload
      };
    default:
      return calendarState    
  }
};

export default calendarReducer;



