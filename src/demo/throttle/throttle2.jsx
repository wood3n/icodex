import React, { Component } from 'react';
import { Card } from 'antd';
import { throttle } from 'lodash';

export default class extends Component {
  state = {
    count: 0,
  };

  componentDidMount() {
    const handleThrottledScroll = this.throttled(this.handleScroll, 500);
    const div = document.getElementById('icodex-scroll3');
    div.addEventListener('scroll', handleThrottledScroll);
  }

  throttled = (fn, delay) => {
    let lastInvokeTime = 0,
      timerId;
    return function() {
      if (!lastInvokeTime) {
        lastInvokeTime = Date.now();
      }
      let timeout = Date.now() - lastInvokeTime;
      if (timeout >= delay) {
        lastInvokeTime = Date.now();
        fn.call(this, ...arguments);
      } else {
        if (timerId) {
          clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
          lastInvokeTime = Date.now();
          timerId = null;
          fn.call(this, ...arguments);
        }, delay);
      }
    };
  };

  handleScroll = () => {
    this.setState({
      count: ++this.state.count,
    });
  };

  render() {
    const title = (
      <div>
        <span>节流后的滚动事件触发次数：{this.state.count}</span>
      </div>
    );

    return (
      <Card title={title}>
        <div id="icodex-scroll3" style={{ height: 300, overflowY: 'scroll' }}>
          <div style={{ height: 2000, background: 'gray' }}></div>
        </div>
      </Card>
    );
  }
}
