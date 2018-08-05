
import { getFile, putFile } from "blockstack";

export const RECEIVE_A_CALENDAR = 'RECEIVE_A_CALENDAR';

export const receiveACalendar = (events) => ({
  type: RECEIVE_A_CALENDAR,
  payload: events
})

export const fetchSingleCalendar = (campusId) => async (dispatch) => {
  try {
    const file = await getFile('schedule.json', options);
    const events = await JSON.parse(file || '[]');
    const fetchEvents = events.map(event => ({
      name: event.name,
      start: new Date(event.start),
      end: new Date(event.end)
    }));
    return dispatch(receiveACalendar(fetchEvents))
  } catch (error) {
    console.log(error)
  }
}

