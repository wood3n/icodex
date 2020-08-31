import React, { Component } from 'react';
import { Card, Radio, Divider } from 'antd';

export default class extends Component {
  state = {
    flexDirection: 'row',
    alignItems: 'stretch',
  };

  handleChange = e => {
    this.setState({
      alignItems: e.target.value,
    });
  };

  handleChangeDirection = e => {
    this.setState({
      flexDirection: e.target.value,
    });
  };

  render() {
    const title = (
      <>
        <Radio.Group
          onChange={this.handleChangeDirection}
          value={this.state.flexDirection}
        >
          <Radio value="row">flex-direction: 'row'</Radio>
          <Radio value="column">flex-direction: 'column'</Radio>
        </Radio.Group>
        <Divider />
        <Radio.Group onChange={this.handleChange} value={this.state.alignItems}>
          <Radio value="stretch">align-items: 'stretch'</Radio>
          <Radio value="flex-start">align-items: 'flex-start'</Radio>
          <Radio value="flex-end">align-items: 'flex-end'</Radio>
          <Radio value="center">align-items: 'center'</Radio>
          <Radio value="baseline">align-items: 'baseline'</Radio>
        </Radio.Group>
      </>
    );

    const style = {
      margin: 10,
      padding: 10,
      background: 'rgb(68 0 255 / 48%)',
      textAlign: 'center',
    };

    return (
      <Card title={title}>
        <div
          style={{
            display: 'flex',
            flexDirection: this.state.flexDirection,
            alignItems: this.state.alignItems,
            // width: 500,
            height: 400,
            border: '1px solid',
            fontSize: 18,
          }}
        >
          <div style={style}>item 1</div>
          <div style={style}>item 2</div>
          <div style={style}>item 3</div>
          <div style={style}>item 4</div>
          xxxxxxxxxxxxxxxxx
        </div>
      </Card>
    );
  }
}
