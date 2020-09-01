import React, { Component } from 'react';
import './styles.less';

export default class extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 200,
          border: '1px solid',
        }}
      >
        <div
          style={{ height: 50, width: 50, margin: 20, background: 'gray' }}
        ></div>
        <div style={{ height: 100, width: 50, background: 'gray' }}></div>
      </div>
    );
  }
}
