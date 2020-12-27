import React from 'react';
import { Card } from 'antd';

export default function App() {
  return (
    <Card>
      <div
        style={{
          position: 'relative',
          width: 400,
          height: 400,
          margin: 20,
          padding: 20,
          border: '20px solid #000',
          background: 'green',
        }}
      >
        <h1
          style={{
            position: 'absolute',
            left: 'auto',
            background: 'red',
            margin: 10,
            padding: 10,
            border: '10px solid #000',
          }}
        >
          hello world
        </h1>
      </div>
    </Card>
  );
}
