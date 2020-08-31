import React, { Component } from 'react';
import { Card, Radio, Divider } from 'antd';

export default class extends Component {
  state = {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'stretch',
  };

  handleChangeDirection = e => {
    this.setState({
      flexDirection: e.target.value,
    });
  };

  handleChangeWrap = e => {
    this.setState({
      flexWrap: e.target.value,
    });
  };

  handleChangeJustify = e => {
    this.setState({
      justifyContent: e.target.value,
    });
  };

  handleChangeAlignItems = e => {
    this.setState({
      alignItems: e.target.value,
    });
  };

  handleChangeAlignContent = e => {
    this.setState({
      alignContent: e.target.value,
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
          onChange={this.handleChangeWrap}
          value={this.state.flexWrap}
        >
          <Radio value="nowrap">flex-wrap: 'nowrap'</Radio>
          <Radio value="wrap">flex-wrap: 'wrap'</Radio>
          <Radio value="wrap-reverse">flex-wrap: 'wrap-reverse'</Radio>
        </Radio.Group>
        <Divider />
        <Radio.Group
          onChange={this.handleChangeJustify}
          value={this.state.justifyContent}
        >
          <Radio value="flex-start">justify-content: 'flex-start'</Radio>
          <Radio value="flex-end">justify-content: 'flex-end'</Radio>
          <Radio value="center">justify-content: 'center'</Radio>
          <Radio value="space-between">justify-content: 'space-between'</Radio>
          <Radio value="space-around">justify-content: 'space-around'</Radio>
        </Radio.Group>
        <Divider />
        <Radio.Group
          onChange={this.handleChangeAlignItems}
          value={this.state.alignItems}
        >
          <Radio value="stretch">align-items: 'stretch'</Radio>
          <Radio value="flex-start">align-items: 'flex-start'</Radio>
          <Radio value="flex-end">align-items: 'flex-end'</Radio>
          <Radio value="center">align-items: 'center'</Radio>
          <Radio value="baseline">align-items: 'baseline'</Radio>
        </Radio.Group>
        <Divider />
        <Radio.Group
          onChange={this.handleChangeAlignContent}
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
            flexDirection: this.state.flexDirection,
            flexWrap: this.state.flexWrap,
            flexDirection: this.state.flexDirection,
            alignItems: this.state.alignItems,
            alignContent: this.state.alignContent,
            width: 1000,
            height: 400,
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
        </div>
      </Card>
    );
  }
}
