import React, { Component } from 'react';
import { Card, Checkbox } from 'antd';
import styles from './styles.less';

export default class extends Component {
  render() {
    return (
      <>
        <div
          style={{
            // display: 'inline-block',
            width: 100,
            height: 100,
            background: 'red',
            margin: 20,
          }}
        ></div>
        <div
          style={{ width: 100, height: 100, background: 'green', margin: 20 }}
        ></div>
      </>
    );
  }
}

export class Comp2 extends Component {
  render() {
    return (
      <div style={{ background: 'gray', margin: 20 }}>
        <div
          style={{
            // display: 'inline-block',
            width: 100,
            height: 100,
            background: 'red',
            margin: 20,
            padding: 10,
          }}
        ></div>
        <div
          style={{
            width: 100,
            height: 100,
            background: 'green',
            margin: 20,
          }}
        ></div>
      </div>
    );
  }
}

export class Comp3 extends Component {
  render() {
    return (
      <div style={{ background: 'gray', margin: 20, overflow: 'auto' }}>
        <div
          style={{
            // display: 'inline-block',
            width: 100,
            height: 100,
            background: 'red',
            margin: 20,
            padding: 10,
          }}
        ></div>
        <div
          style={{
            width: 100,
            height: 100,
            background: 'green',
            margin: 20,
          }}
        ></div>
      </div>
    );
  }
}

export class Comp4 extends Component {
  render() {
    return (
      <div style={{ background: 'gray', margin: 20, overflow: 'auto' }}>
        <div
          style={{
            // display: 'inline-block',
            width: 100,
            height: 100,
            background: 'red',
            margin: 20,
            padding: 10,
            display: 'inline-block',
          }}
        ></div>
        <div
          style={{
            width: 100,
            height: 100,
            background: 'green',
            margin: 20,
          }}
        ></div>
      </div>
    );
  }
}

export class Comp5 extends Component {
  state = {
    overflow: 'visible',
  };

  handleChange = e => {
    this.setState({
      overflow: e.target.checked ? 'hidden' : 'visible',
    });
  };

  render() {
    const title = (
      <Checkbox value={this.state.overflow} onChange={this.handleChange}>
        overflow:"hidden/auto" | display:"flow-root"
      </Checkbox>
    );

    return (
      <Card title={title}>
        <div
          style={{
            width: 100,
            height: 100,
            background: 'red',
            margin: 20,
          }}
        ></div>
        <div style={{ overflow: this.state.overflow }}>
          <div
            style={{
              width: 100,
              height: 100,
              background: 'green',
              margin: 20,
            }}
          ></div>
        </div>
      </Card>
    );
  }
}

export class Comp6 extends Component {
  render() {
    return (
      <div style={{ background: 'gray', padding: 20 }}>
        <div
          style={{
            width: 100,
            height: 100,
            background: 'red',
          }}
        ></div>
        <div
          style={{
            width: 100,
            height: 100,
            background: 'green',
            marginTop: 40,
          }}
        ></div>
      </div>
    );
  }
}
