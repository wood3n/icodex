import React, { Component } from 'react';
import { Card, Radio } from 'antd';

export default class extends Component {
  state = {
    display: 'block',
  };

  handleChange = e => {
    this.setState({
      display: e.target.value,
    });
  };

  render() {
    const title = (
      <Radio.Group onChange={this.handleChange} value={this.state.display}>
        <Radio value="block">display: 'block'</Radio>
        <Radio value="flex">display: 'flex'</Radio>
      </Radio.Group>
    );

    const style = {
      height: 50,
      margin: 10,
      padding: 10,
      background: 'rgb(68 0 255 / 48%)',
      textAlign: 'center',
      fontSize: 18,
    };

    return (
      <Card title={title}>
        <div style={{ display: this.state.display }}>
          <div style={style}>item 1</div>
          <div style={style}>item 2</div>
          <div style={style}>item 3</div>
          <div style={style}>item 4</div>
        </div>
      </Card>
    );
  }
}
