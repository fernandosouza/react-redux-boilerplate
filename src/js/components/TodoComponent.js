import React, { Component } from 'react';

class TodoComponent extends Component {
  constructor(opt) {
    super(opt);
  }

  renderDetails() {
    return this.props.todo.title;
  }

  render() {
    return (
      <p className="todo-title">
        {this.renderDetails()}
      </p>
    )
  }
}

export default TodoComponent;
