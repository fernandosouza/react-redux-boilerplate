'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addTodoAction,
  editTodoAction,
  loadTodosAction,
  selectTodoForEditingAction,
  removeTodoAction } from '../actions';
import { bindActionCreators } from 'redux';
import TodoComponent from './TodoComponent';
import TodoFormComponent from './TodoFormComponent';

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
    this.props.loadTodosAction();
  }

  handleAddSubmit(title) {
    if (!title) return;
    let todo = new Todo({
      title: title
    });
    this.props.addTodoAction(todo);
  }

  handleEditSubmit(todo, title) {
    if (!title) return;
    todo.title = title;
    this.props.editTodoAction(todo);
  }

  renderTodo(todo) {
    return (
      <div>
        <TodoComponent todo={todo} />
        {this.renderActionButtons(todo)}
      </div>
    )
  }

  renderFormEditOrTodo(todo) {
    let { selectedForEditing } = this.props;
    if (selectedForEditing && selectedForEditing === todo) {
      return (
        <TodoFormComponent
          todoTitle={selectedForEditing.title}
          handleSubmit={this.handleEditSubmit.bind(this, todo)}
          submitLabel="Save" />
      )
    }

    return this.renderTodo(todo);
  }

  renderList() {
    if (this.props.todos === null) {
      return <p>Fetching data</p>;
    } else if (!this.props.todos.length) {
      return <p>You have no todo</p>;
    } else {
      return <ul className="list-group">{this.props.todos.map(this.renderTodos.bind(this))}</ul>;
    }
  }

  renderActionButtons(todo) {
    let { removeTodoAction, selectTodoForEditingAction } = this.props;

    return (
      <div className="btn-group pull-right todo-action-group" role="group">
        <button
          className="btn btn-default btn-sm"
          onClick={selectTodoForEditingAction.bind(this, todo)}
          type="button">Edit</button>
        <button
          className="btn btn-default btn-sm"
          onClick={removeTodoAction.bind(this, todo.id)}
          type="button">Remove</button>
      </div>
    )
  }

  renderTodos(todo) {
    let status = todo.done ? 'DONE' : 'NOT DONE';

    return (
      <li
        className="list-group-item"
        key={todo.id}>
        {this.renderFormEditOrTodo(todo)}
      </li>
    );
  }

  render() {
    return (
      <div className="list">
        <h1>List Component</h1>
        {this.renderList()}
        <TodoFormComponent handleSubmit={this.handleAddSubmit.bind(this)} />
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
    editTodoAction,
    loadTodosAction,
    selectTodoForEditingAction,
    removeTodoAction,
  }, dispatch);
}

// This is connecting the List component to the mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
