import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewTodo, loadTodos, selectTodoForEditing } from '../../actions';
import { bindActionCreators } from 'redux';
import TodoComponent from '../todo';

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
    this.props.selectTodoForEditing(todo);
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
        key={todo.id}>
        <TodoComponent todo={todo} edit={this.props.selectedForEditing == todo} />
        <button onClick={this.editTodo.bind(this, todo)} type="button">Edit</button>
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
    todos: state.todos,
    selectedForEditing: state.selecteTodoForEditing
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addNewTodo: addNewTodo,
    loadTodos: loadTodos,
    selectTodoForEditing: selectTodoForEditing
  }, dispatch);
}

// This is connecting the List component to the mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(List);
