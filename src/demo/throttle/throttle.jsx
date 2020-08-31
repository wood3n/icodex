import React, { Component } from 'react';
import { Card } from 'antd';

export default class extends Component {
  state = {
    count: 0,
  };

  componentDidMount() {
    const div = document.getElementById('icodex-scroll2');
    div.addEventListener('scroll', this.handleThrottledScroll);
  }

  handleScroll = () => {
    this.setState({
      count: ++this.state.count,
    });
  };

  handleThrottledScroll = () => {
    if (!this.timerId) {
      this.timerId = setTimeout(() => {
        this.timerId = 0;
        this.setState({
          count: ++this.state.count,
        });
      }, 500);
    }
  };

  render() {
    const title = (
      <div>
        <span>节流后的滚动事件触发次数：{this.state.count}</span>
      </div>
    );

    return (
      <Card title={title}>
        <div id="icodex-scroll2" style={{ height: 300, overflowY: 'scroll' }}>
          <div style={{ height: 2000, background: 'gray' }}></div>
        </div>
      </Card>
    );
  }
}
