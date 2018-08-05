
import { getFile, putFile } from 'blockstack';

export const RECEIVE_A_CALENDAR = 'RECEIVE_A_CALENDAR';
export const ADD_AN_EVENT = 'ADD_AN_EVENT';
export const DELETE_A_CALENDAR = 'DELETE_A_CALENDAR';

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
    const file = await getFile('schedule.json', options);
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
    const addedEvents = [...events, event];
    const options = { encrypt: true };
    await putFile('schedule.json', JSON.stringify(addedEvents), options);
    return dispatch(addAnEvent(addedEvents));
  } catch (error) {
    console.log(error);
  }
}





