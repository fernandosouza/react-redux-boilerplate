import React, { Component } from 'react';

class TodoFormComponent extends Component {
  constructor(opt) {
    super(opt);
    this.state = {
      todoTitle: this.props.todoTitle
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.handleSubmit) {
      this.props.handleSubmit(this.state.todoTitle);
      this.setState({
        todoTitle: ''
      })
    }
  }

  handleTodoTitleChange(event) {
    this.setState({
      todoTitle: event.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          autoFocus
          value={this.state.todoTitle}
          onChange={this.handleTodoTitleChange.bind(this)}
          type="text" />
        <button type="submit">{this.props.submitLabel || 'Add new todo'}</button>
      </form>
    )
  }
}

export default TodoFormComponent;
