import React, { Component } from 'react';

export default class extends Component {
  state = {
    text: '',
  };

  handleInput = e => {
    this.setState({
      text: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <input onInput={this.handleInput} />
        <p>{this.state.text}</p>
      </div>
    );
  }
}
