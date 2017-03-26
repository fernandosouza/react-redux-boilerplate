import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewTodo } from '../../actions';
import { bindActionCreators } from 'redux';

import Todo from '../../todo';

// I'm going to transform this dumb component into a smart component
// it basicaly means that I will connect this component to the
// React-Redux Library.
class List extends Component {
  constructor(options) {
    super(options);
    this.state = {};
  }

  addNewTodo() {
    let todo = new Todo({title: this.state.todoTitle});
    this.props.addNewTodo(todo);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.todoTitle) {
      return;
    }
    this.addNewTodo();
    this.setState({
      todoTitle: ''
    });
  }

  handleTodoTitleChange(event) {
    this.setState({
      todoTitle: event.target.value
    })
  }

  renderItems() {
    return this.props.todos.map(todo => {
      let status = todo.done ? 'DONE' : 'NOT DONE';
      return (
        <li key={todo.title}>{todo.title} - {status}</li>
      );
    });
  }

  render() {
    return (
      <div className="list">
        <h1>List Component</h1>
        <ul>
          {this.renderItems()}
        </ul>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <input autoFocus value={this.state.todoTitle} onChange={this.handleTodoTitleChange.bind(this)} type="text" name="title" />
          <button type="submit">Add new todo</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  // Whatever is returned willshow up as props inside the container above.
  return {
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addNewTodo: addNewTodo }, dispatch);
}

// This is connecting the List component to the mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(List);
