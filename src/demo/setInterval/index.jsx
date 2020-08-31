import React, { Component } from 'react';
import { Button } from 'antd';

export default class extends Component {
  delayStack = [];
  intervalId = 1;

  _setInterval = (fn, timeout) => {
    let id = this.intervalId;
    let interval = {
      id,
      func: fn,
    };

    this.delayStack.push(interval);

    const _fn = () => {
      if (this.delayStack.find(item => item.id === id)) {
        setTimeout(() => {
          fn();
          _fn();
        }, timeout);
      }
    };

    _fn();

    this.intervalId++;
  };

  _clearInterval = clearId => {
    const index = this.delayStack.findIndex(item => item.id === clearId);
    this.delayStack.splice(index, 1);
  };

  handleStart = () => {
    let n = 1;
    const createP = () => {
      let p = document.createElement('P');
      p.innerText = n;
      document.getElementById('icodex-interval').appendChild(p);
      n++;
    };
    this._setInterval(createP, 1000);
  };

  handleStop = () => {
    this._clearInterval(2);
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.handleStart}>
          开始
        </Button>
        <Button type="primary" onClick={this.handleStop} danger>
          停止
        </Button>
        <div id="icodex-interval"></div>
      </div>
    );
  }
}
