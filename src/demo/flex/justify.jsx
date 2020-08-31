import React, { Component } from 'react';
import { Card, Radio, Divider } from 'antd';

export default class extends Component {
  state = {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  };

  handleChange = e => {
    this.setState({
      justifyContent: e.target.value,
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
          value={this.state.justifyContent}
        >
          <Radio value="flex-start">justify-content: 'flex-start'</Radio>
          <Radio value="flex-end">justify-content: 'flex-end'</Radio>
          <Radio value="center">justify-content: 'center'</Radio>
          <Radio value="space-between">justify-content: 'space-between'</Radio>
          <Radio value="space-around">justify-content: 'space-around'</Radio>
        </Radio.Group>
      </>
    );

    const style = {
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
            flexDirection: this.state.flexDirection,
            justifyContent: this.state.justifyContent,
            // width: 500,
            height: 400,
            border: '1px solid',
          }}
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
