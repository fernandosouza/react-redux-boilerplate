// A Reducer is a function that returns a peace of the application state.
export default function(state = [], action) {
  if (action.type === 'NEW_BOOK') {
    return state.concat(action.payload);
  }

  return state;
}
