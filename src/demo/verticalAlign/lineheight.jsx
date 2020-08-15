import React, { Component } from 'react';
import { Card, Radio } from 'antd';

export default class Comp extends Component {
  state = {
    lineHeight: 'normal',
  };

  handleChange = e => {
    this.setState({
      lineHeight: e.target.value,
    });
  };

  render() {
    const title = (
      <Radio.Group onChange={this.handleChange} value={this.state.lineHeight}>
        <Radio value={'normal'}>line-height:normal</Radio>
        <Radio value={1}>line-height:1</Radio>
        <Radio value={1.2}>line-height:1.2</Radio>
      </Radio.Group>
    );

    return (
      <Card title={title}>
        <div>
          <span
            style={{
              display: 'inline-block',
              background: 'green',
              lineHeight: this.state.lineHeight,
              fontSize: 20,
              color: 'red',
            }}
          >
            xxx
          </span>
        </div>
      </Card>
    );
  }
}

export class Comp2 extends Component {
  state = {
    lineHeight: 1,
  };

  handleChange = e => {
    this.setState({
      lineHeight: e.target.value,
    });
  };

  render() {
    const title = (
      <Radio.Group onChange={this.handleChange} value={this.state.lineHeight}>
        <Radio value={1}>line-height:1</Radio>
        <Radio value={10}>line-height:10</Radio>
      </Radio.Group>
    );

    return (
      <Card title={title}>
        <div>
          <span
            style={{
              background: 'green',
              lineHeight: this.state.lineHeight,
              fontSize: 20,
              color: 'red',
            }}
          >
            xxx
          </span>
        </div>
      </Card>
    );
  }
}

export class Comp3 extends Component {
  state = {
    lineHeight: 1,
  };

  handleChange = e => {
    this.setState({
      lineHeight: e.target.value,
    });
  };

  render() {
    const title = (
      <Radio.Group onChange={this.handleChange} value={this.state.lineHeight}>
        <Radio value={1}>line-height:1</Radio>
        <Radio value={10}>line-height:10</Radio>
      </Radio.Group>
    );

    return (
      <Card title={title}>
        <div>
          <span
            style={{
              display: 'inline-block',
              background: 'green',
              lineHeight: this.state.lineHeight,
              fontSize: 20,
              color: 'red',
            }}
          >
            xxx
          </span>
        </div>
      </Card>
    );
  }
}

export class Comp4 extends Component {
  render() {
    return (
      <p>
        测试
        <span style={{ lineHeight: 1, fontSize: 16 }}>测试</span>
        <span style={{ lineHeight: 2, fontSize: 18 }}>测试</span>
        <span style={{ lineHeight: 3, fontSize: 20 }}>测试</span>
        xxx
      </p>
    );
  }
}
