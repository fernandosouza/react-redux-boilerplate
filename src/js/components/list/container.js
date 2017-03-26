import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewTodo } from '../../actions';
import { bindActionCreators } from 'redux';

// I'm going to transform this dumb component into a smart component
// it basicaly means that I will connect this component to the
// React-Redux Library.
class List extends Component {
  constructor(options) {
    super(options);
    this.state = {};
  }

  addNewTodo(event) {
    event.preventDefault();
    this.props.addNewTodo({
      title: this.state.todoTitle
    });
    this.setState({
      todoTitle: ''
    })
  }

  handleTodoTitleChange(event) {
    this.setState({
      todoTitle: event.target.value
    })
  }

  renderItems() {
    return this.props.todos.map(todo => {
      return (
        <li key={todo.title}>{todo.title}</li>
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

        <form onSubmit={this.addNewTodo.bind(this)}>
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
