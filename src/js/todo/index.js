'use strict';

class Todo {
  constructor(options) {
    this.title = options.title || '';
    this.done = options.done || false;
  }
}

export function addTodo(todo) {
}

export function removeTodo(todo) {
}

export default Todo;
