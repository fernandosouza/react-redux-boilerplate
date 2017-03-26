import { fetchTodos, addTodo } from '../todo';

export const LOAD_TODOS = 'LOAD_TODOS';
export const NEW_TODO = 'NEW_TODO';

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
