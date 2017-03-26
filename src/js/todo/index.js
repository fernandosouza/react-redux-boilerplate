class Todo {
  constructor(options) {
    this.title = options.title || '';
    this.done = options.done || false;
    this.id = options.id
  }
}

export default Todo;
