import React, { Component } from 'react';
import { throttle, debounce } from 'lodash';

export default class extends Component {
  constructor(props) {
    super(props);
    this.debouncedHandleInput = this.debounced(this.handleInput, 1000, true);
  }

  state = {
    text: '',
  };

  debounced = (fn, timeout, immediate) => {
    let timerId;
    return function() {
      if (immediate && !timerId) {
        fn.call(this, ...arguments);
      }
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fn.call(this, ...arguments);
        timerId = null;
      }, timeout);
    };
  };

  handleInput = e => {
    this.setState({
      text: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <input
          onInput={e => {
            e.persist();
            this.debouncedHandleInput(e);
          }}
        />
        <p>{this.state.text}</p>
      </div>
    );
  }
}
