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
            marginTop: '-50px',
            marginLeft: '-50px',
            height: 100,
            width: 100,
            background: 'gray',
          }}
        ></div>
      </div>
    );
  }
}
