import React from 'react';
import { Card, Slider } from 'antd';

export default function App() {
  const [left, setLeft] = React.useState(0);

  return (
    <Card
      title={
        <Slider
          defaultValue={0}
          min={-20}
          max={50}
          onChange={value => setLeft(value)}
        />
      }
    >
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
            left,
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
