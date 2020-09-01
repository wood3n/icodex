import React, { Component } from 'react';

export default class extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid',
          height: 150,
        }}
      >
        <span>测试垂直居中</span>
      </div>
    );
  }
}
