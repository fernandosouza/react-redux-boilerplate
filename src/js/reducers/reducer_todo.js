// A Reducer is a function that returns a peace of the application state.
export default function(state = [], action) {
  if (action.type === 'NEW_TODO') {
    return [action.payload, ...state];
  }

  if (action.type === 'LOAD_TODOS') {
    return action.payload;
  }

  return null;
}
