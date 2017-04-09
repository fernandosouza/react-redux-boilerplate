class Todo {
  constructor(options) {
    this.title = options.title || '';
    this.done = options.done || false;
  }
}

function addTodo(todo) {
}

export function removeTodo(todo) {
}

export default Todo;
export { addTodo };
