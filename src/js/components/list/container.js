import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewTodo, loadTodos } from '../../actions';
import { bindActionCreators } from 'redux';

import Todo from '../../todo';

// I'm going to transform this dumb component into a smart component
// it basicaly means that I will connect this component to the
// React-Redux Library.
class List extends Component {
  constructor(options) {
    super(options);
    this.state = {};
    this.props.loadTodos();
  }

  addNewTodo() {
    let todo = new Todo({
      title: this.state.todoTitle,
      id: this.props.todos.length + 1
    });
    this.props.addNewTodo(todo);
  }

  editTodo(todo) {
    this.setState({
      todoTitle: todo.title
    });
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

  renderItems(todo) {
    let status = todo.done ? 'DONE' : 'NOT DONE';
    return (
      <li
        onClick={this.editTodo.bind(this, todo)}
        key={todo.id}>
        {todo.title} - {status}
      </li>
    );
  }

  render() {
    let emptyListMessage = () => {
      if (!this.props.todos) {
        return <p>Loading data</p>;
      }
      else {
        return this.props.todos.map(this.renderItems.bind(this));
      }
    }

    return (
      <div className="list">
        <h1>List Component</h1>
        <ul>
          {emptyListMessage()}
        </ul>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            autoFocus
            value={this.state.todoTitle}
            onChange={this.handleTodoTitleChange.bind(this)}
            type="text" />
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
  return bindActionCreators({ addNewTodo: addNewTodo, loadTodos: loadTodos }, dispatch);
}

// This is connecting the List component to the mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(List);
