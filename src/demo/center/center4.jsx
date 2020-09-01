import React, { Component } from 'react';

export default class extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          height: 200,
          border: '1px solid',
        }}
      >
        <div style={{ margin: 'auto' }}>
          <img src="/images/dog.png" style={{ height: 100 }} />
        </div>
      </div>
    );
  }
}
