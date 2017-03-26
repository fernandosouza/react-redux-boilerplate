import { NEW_TODO, LOAD_TODOS, SELECT_TODO_FOR_EDITING } from '../actions';

// A Reducer is a function that returns a peace of the application state.
export default function(state = [], action) {
  if (action.type === NEW_TODO) {
    return [action.payload, ...state];
  }

  if (action.type === LOAD_TODOS) {
    return action.payload;
  }

  return state;
}


export function selectTodoForEditing (state = null, action) {
  if (action.type === SELECT_TODO_FOR_EDITING) {
    return action.payload;
  }

  return state;
}
