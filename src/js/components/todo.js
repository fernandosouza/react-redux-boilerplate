import React, { Component } from 'react';

class TodoComponent extends Component {
  constructor(opt) {
    super(opt);
    this.state = {};
  }

  renderDetails() {
    return (
      <div>
        {this.props.todo.title}
      </div>
    )
  }

  renderFormEdit() {
    return (
      <form>
        <input type="text" value={this.props.todo.title} />
        <button type="button">Save</button>
      </form>
    )
  }

  render() {
    let content = this.props.edit === true ? this.renderFormEdit() : this.renderDetails();
    return (
      <div>
        {content}
      </div>
    )
  }
}

export default TodoComponent;
