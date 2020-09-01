import React, { Component } from 'react';

export default class extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
          border: '1px solid',
        }}
      >
        <div>
          <img src="/images/dog.png" style={{ height: 100 }} />
        </div>
      </div>
    );
  }
}
