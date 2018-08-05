
import { getFile, putFile } from 'blockstack';

export const RECEIVE_A_FRIENDS = 'RECEIVE_A_FRIENDS';
export const ADD_A_FRIEND = 'ADD_A_FRIEND';
export const DELETE_A_FRIEND = 'DELETE_A_FRIEND';

export const receiveFriends = (friends) => ({
  type: RECEIVE_A_FRIENDS,
  payload: friends
})

export const addAFriend = (friends) => ({
  type: ADD_A_FRIEND,
  payload: friends
})

export const deleteAnEvent = (friends) => ({
  type: DELETE_A_FRIEND,
  payload: friends
})

export const fetchFriends = () => async (dispatch) => {
  try {
    const options = { decrypt: true };
    const file = await getFile('myFriends.json', options);
    const friends = await JSON.parse(file || '[]');
    return dispatch(receiveFriends(friends))
  } catch (error) {
    console.log(error);
  }
}

export const addEventToSingleCalendar = (friends, event) => async (dispatch) => {
  try {
    const friendsAfterAdd = [...friends, event];
    const options = { encrypt: true };
    await putFile('myFriends.json', JSON.stringify(friendsAfterAdd), options);
    return dispatch(addAnEvent(friendsAfterAdd));
  } catch (error) {
    console.log(error);
  }
}

export const deleteEvent = (friends, selectedEvent) => async (dispatch) => {
  try {
    const friendsAfterDelete = [...friends.filter(event => event !== selectedEvent)]
    const options = { encrypt: true };
    await putFile('myFriends.json', JSON.stringify(friendsAfterDelete), options);
    return dispatch(deleteAnEvent(friendsAfterDelete));
  } catch (error) {
    console.log(error);
  }
}

const initialState = {
  friends: [],
};

const calendarReducer = (calendarState = initialState, action) => {
  switch (action.type) {
    case RECEIVE_A_CALENDAR:
      return {
        ...calendarState, 
        friends: action.payload
      };
    case ADD_AN_EVENT:
      return {
        ...calendarState,
        friends: action.payload
      };
    case DELETE_AN_EVENT:
      return {
        ...calendarState,
        friends: action.payload
      };
    default:
      return calendarState    
  }
};

export default calendarReducer;



