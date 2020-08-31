import React, { Component } from 'react';
import { Card, Radio } from 'antd';

export default class extends Component {
  state = {
    flexDirection: 'row',
  };

  handleChange = e => {
    this.setState({
      flexDirection: e.target.value,
    });
  };

  render() {
    const title = (
      <Radio.Group
        onChange={this.handleChange}
        value={this.state.flexDirection}
      >
        <Radio value="row">flex-direction: 'row'</Radio>
        <Radio value="row-reverse">flex-direction: 'row-reverse'</Radio>
        <Radio value="column">flex-direction: 'column'</Radio>
        <Radio value="column-reverse">flex-direction: 'column-reverse'</Radio>
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
        <div
          style={{ display: 'flex', flexDirection: this.state.flexDirection }}
        >
          <div style={style}>item 1</div>
          <div style={style}>item 2</div>
          <div style={style}>item 3</div>
          <div style={style}>item 4</div>
        </div>
      </Card>
    );
  }
}
