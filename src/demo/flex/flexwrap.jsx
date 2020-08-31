import React, { Component } from 'react';
import { Card, Radio } from 'antd';

export default class extends Component {
  state = {
    flexWrap: 'nowrap',
  };

  handleChange = e => {
    this.setState({
      flexWrap: e.target.value,
    });
  };

  render() {
    const title = (
      <Radio.Group onChange={this.handleChange} value={this.state.flexWrap}>
        <Radio value="nowrap">flex-wrap: 'nowrap'</Radio>
        <Radio value="wrap">flex-wrap: 'wrap'</Radio>
        <Radio value="wrap-reverse">flex-wrap: 'wrap-reverse'</Radio>
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
          style={{
            display: 'flex',
            flexWrap: this.state.flexWrap,
            width: 500,
            border: '1px solid',
          }}
        >
          <div style={style}>item 1</div>
          <div style={style}>item 2</div>
          <div style={style}>item 3</div>
          <div style={style}>item 4</div>
          <div style={style}>item 5</div>
          <div style={style}>item 6</div>
          <div style={style}>item 7</div>
          <div style={style}>item 8</div>
        </div>
      </Card>
    );
  }
}
