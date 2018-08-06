
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

export const deleteAFriend = (friends) => ({
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

export const addFriendToList = (friends, friend) => async (dispatch) => {
  try {
    const keyData = await getFile('key.json', {
      username: friend
    });
    const friendsAfterAdd = [...friends, {username: friend, publicKey: JSON.parse(keyData)}];
    const options = { encrypt: true };
    await putFile('myFriends.json', JSON.stringify(friendsAfterAdd), options);
    return dispatch(addAFriend(friendsAfterAdd));
  } catch (error) {
    console.log(error);
  }
}

export const deleteFriend = (friends, selectedEvent) => async (dispatch) => {
  try {
    const friendsAfterDelete = [...friends.filter(event => event !== selectedEvent)]
    const options = { encrypt: true };
    await putFile('myFriends.json', JSON.stringify(friendsAfterDelete), options);
    return dispatch(deleteAFriend(friendsAfterDelete));
  } catch (error) {
    console.log(error);
  }
}

const initialState = {
  friends: [],
};

const contactReducer = (friendState = initialState, action) => {
  switch (action.type) {
    case RECEIVE_A_FRIENDS:
      return {
        ...friendState, 
        friends: action.payload
      };
    case ADD_A_FRIEND:
      return {
        ...friendState,
        friends: action.payload
      };
    case DELETE_A_FRIEND:
      return {
        ...friendState,
        friends: action.payload
      };
    default:
      return friendState;    
  }
};

export default contactReducer;



