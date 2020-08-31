import React, { Component } from 'react';

export default class extends Component {
  state = {
    text: '',
  };

  debouncedHandleInput = e => {
    e.persist();
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      this.setState({
        text: e.target.value,
      });
    }, 500);
  };

  render() {
    return (
      <div>
        <input onInput={this.debouncedHandleInput} />
        <p>{this.state.text}</p>
      </div>
    );
  }
}
