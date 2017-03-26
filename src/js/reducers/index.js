import { combineReducers } from 'redux';
import todoReducer from './reducer_todo';

// The Combine Reducer is where we crate our application state
const rootReducer = combineReducers({
  todos: todoReducer
});

export default rootReducer;
