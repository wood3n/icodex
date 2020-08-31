import React, { Component } from 'react';
import { Card, Radio, Divider } from 'antd';

export default class extends Component {
  state = {
    flexDirection: 'row',
    alignContent: 'stretch',
  };

  handleChange = e => {
    this.setState({
      alignContent: e.target.value,
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
        <Radio.Group
          onChange={this.handleChange}
          value={this.state.alignContent}
        >
          <Radio value="stretch">align-content: 'stretch'</Radio>
          <Radio value="flex-start">align-content: 'flex-start'</Radio>
          <Radio value="flex-end">align-content: 'flex-end'</Radio>
          <Radio value="center">align-content: 'center'</Radio>
          <Radio value="space-between">align-content: 'space-between'</Radio>
          <Radio value="space-around">align-content: 'space-around'</Radio>
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
            flexWrap: 'wrap',
            flexDirection: this.state.flexDirection,
            alignContent: this.state.alignContent,
            width: 500,
            height: 500,
            border: '1px solid',
            fontSize: 18,
          }}
        >
          <div style={style}>item</div>
          <div style={style}>item</div>
          <div style={style}>item</div>
          <div style={style}>item</div>
          <div style={style}>item</div>
          <div style={style}>item</div>
          <div style={style}>item</div>
          <div style={style}>item</div>
          <div style={style}>item</div>
          <div style={style}>item</div>
          <div style={style}>item</div>
          <div style={style}>item</div>
          <div style={style}>item</div>
          <div style={style}>item</div>
          <div style={style}>item</div>
          <div style={style}>item</div>
        </div>
      </Card>
    );
  }
}
