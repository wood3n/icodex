import React, { Component } from 'react';
import { Card, Checkbox, Divider } from 'antd';

export default class extends Component {
  state = {
    count: 0,
  };

  componentDidMount() {
    const div = document.getElementById('icodex-scroll1');
    div.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    this.setState({
      count: ++this.state.count,
    });
  };

  handleThrottledScroll = () => {
    if (!this.previous) {
      this.previous = Date.now();
    }
    let timeout = Date.now() - this.previous;
    if (timeout >= 500) {
      //记录当前执行的时间
      this.previous = Date.now();
      this.setState({
        count: ++this.state.count,
      });
    }
  };

  handleChange = e => {
    const div = document.getElementById('icodex-scroll1');
    if (e.target.checked) {
      div.removeEventListener('scroll', this.handleScroll);
      div.addEventListener('scroll', this.handleThrottledScroll);
    } else {
      div.removeEventListener('scroll', this.handleThrottledScroll);
      div.addEventListener('scroll', this.handleScroll);
    }
  };

  render() {
    const title = (
      <div>
        <span>滚动事件触发次数：{this.state.count}</span>
        <Divider />
        <Checkbox onChange={this.handleChange}>开启节流(延迟 1s)</Checkbox>
      </div>
    );

    return (
      <Card title={title}>
        <div id="icodex-scroll1" style={{ height: 300, overflowY: 'scroll' }}>
          <div style={{ height: 2000, background: 'gray' }}>测试</div>
        </div>
      </Card>
    );
  }
}
