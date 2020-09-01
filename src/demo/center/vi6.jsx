import React, { Component } from 'react';

export default class vi6 extends Component {
  render() {
    return (
      <div style={{ position: 'relative', height: 200, border: '1px solid' }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          垂直居中
        </div>
      </div>
    );
  }
}
