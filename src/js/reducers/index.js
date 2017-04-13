import { combineReducers } from 'redux';
import { todoReducer, selectTodoForEditing } from './reducer_todo';

// The Combine Reducer is where we crate our application state
const rootReducer = combineReducers({
  todos: todoReducer,
  selecteTodoForEditing: selectTodoForEditing
});

export default rootReducer;
