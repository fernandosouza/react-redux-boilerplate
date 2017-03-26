import { fetchTodos, addTodo } from '../todo';

export const LOAD_TODOS = 'LOAD_TODOS';
export const NEW_TODO = 'NEW_TODO';
export const SELECT_TODO_FOR_EDITING = 'SELECT_TODO_FOR_EDITING';

export function addNewTodo(todo) {
  return {
    type: NEW_TODO,
    payload: addTodo(todo)
  };
}

export function loadTodos() {
  return {
    type: LOAD_TODOS,
    payload: fetchTodos()
  }
}

export function selectTodoForEditing(todo) {
  return {
    type: SELECT_TODO_FOR_EDITING,
    payload: todo
  }
}
