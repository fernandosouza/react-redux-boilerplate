import React, { Component } from 'react';

class TodoComponent extends Component {
  constructor(opt) {
    super(opt);
  }

  renderDetails() {
    return (
      <div>
        {this.props.todo.title}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderDetails()}
      </div>
    )
  }
}

export default TodoComponent;
