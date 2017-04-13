'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addTodoAction,
  loadTodos,
  selectTodoForEditing,
  removeTodoAction } from '../actions';
import { bindActionCreators } from 'redux';
import TodoComponent from './TodoComponent';

import Todo from '../todo';

// I'm going to transform this dumb component into a smart component
// it basicaly means that I will connect this component to the
// React-Redux Library.
class TodoContainer extends Component {
  constructor(options) {
    super(options);
    this.state = {};
  }

  componentWillMount() {
    this.props.loadTodos();
  }

  addNewTodo() {
    let todo = new Todo({
      title: this.state.todoTitle
    });
    this.props.addTodoAction(todo);
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
    let { removeTodoAction, selectTodoForEditing } = this.props;

    return (
      <li
        key={todo.id}>
        <TodoComponent todo={todo} edit={this.props.selectedForEditing == todo} />
        <button onClick={selectTodoForEditing.bind(this, todo)} type="button">Edit</button>
        <button onClick={removeTodoAction.bind(this, todo.id)} type="button">Remove</button>
      </li>
    );
  }

  render() {
    let listItens = () => {
      if (!this.props.todos.length) {
        return <p>Fetching data</p>;
      }
      else {
        return this.props.todos.map(this.renderItems.bind(this));
      }
    }

    return (
      <div className="list">
        <h1>List Component</h1>
        <ul>
          {listItens()}
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
    addTodoAction,
    loadTodos,
    selectTodoForEditing,
    removeTodoAction
  }, dispatch);
}

// This is connecting the List component to the mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
