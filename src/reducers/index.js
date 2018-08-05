import {combineReducers} from 'redux';

// import contactReducer from './contactReducer';
import calendarReducer from './calendarReducer';


// `combineReducers` is not currently used, but eventually should be for modular code :D
// When you're ready to use it, un-comment the line below!
// import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  // contacts: contactReducer,
  events: calendarReducer,
});

export default rootReducer;
