import React, { Component } from 'react';

export default class extends Component {
  render() {
    return (
      <div style={{ position: 'relative', height: 200, border: '1px solid' }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            background: 'gray',
          }}
        >
          <img src="/images/dog.png" style={{ height: 100 }} />
        </div>
      </div>
    );
  }
}
