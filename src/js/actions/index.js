export const LOAD_TODOS = 'LOAD_TODOS';
export const NEW_TODO = 'NEW_TODO';
export const SELECT_TODO_FOR_EDITING = 'SELECT_TODO_FOR_EDITING';
export const REMOVE_TODO = 'REMOVE_TODO';

let todos = firebase.database().ref('todo');

export function addTodoAction(todo) {
  return dispatch => todos.push(todo);
}

export function editTodoAction(todo) {
  return dispatch => firebase.database().ref('todo').child(todo.id).update(todo);
}

export function loadTodosAction() {
  return dispatch => {
    todos.on('value', snapshot => {
      let data = [];
      
      snapshot.forEach(childSnapshot => {
        let childData = childSnapshot.val();
        childData.id = childSnapshot.key;

        data.push(childData);
      });

      dispatch({
        payload: data,
        type: LOAD_TODOS
      })
    });
  }
}

export function removeTodoAction(key) {
  return dispatch => todos.child(key).remove();
}

export function selectTodoForEditingAction(todo) {
  return {
    payload: todo,
    type: SELECT_TODO_FOR_EDITING
  }
}