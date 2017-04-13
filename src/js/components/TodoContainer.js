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

  renderFormEdit(todo) {
    let { selectedForEditing } = this.props;
    if (selectedForEditing && selectedForEditing === todo) {
      return (
        <TodoFormComponent
          todoTitle={selectedForEditing.title}
          handleSubmit={this.handleEditSubmit.bind(this, todo)}
          submitLabel="Save" />
      )
    };
  }

  renderItems(todo) {
    let status = todo.done ? 'DONE' : 'NOT DONE';
    let { removeTodoAction, selectTodoForEditingAction } = this.props;

    return (
      <li
        key={todo.id}>
        <TodoComponent todo={todo} />
        {this.renderFormEdit(todo)}
        <button onClick={selectTodoForEditingAction.bind(this, todo)} type="button">Edit</button>
        <button onClick={removeTodoAction.bind(this, todo.id)} type="button">Remove</button>
      </li>
    );
  }

  renderList() {
    if (this.props.todos === null) {
      return <p>Fetching data</p>;
    } else if (!this.props.todos.length) {
      return <p>You have no todo</p>;
    } else {
      return <ul>{this.props.todos.map(this.renderItems.bind(this))}</ul>;
    }
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
