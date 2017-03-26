class Todo {
  constructor(options) {
    this.title = options.title || '';
    this.done = options.done || false;
  }
}

export default Todo;
