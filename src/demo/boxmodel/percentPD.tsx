import React, { useState, useEffect } from 'react';
import { Card, Radio } from 'antd';

export default function App() {
  const [parentWidth, setParentWidth] = useState(0);
  const [childPadding, setChildPadding] = useState(0);
  const [boxSizing, setBoxSizing] = useState('content-box');

  useEffect(() => {
    if (window.getComputedStyle) {
      setParentWidth(
        window.getComputedStyle(document.getElementById('parent1'), null).width,
      );
      setChildPadding(
        window.getComputedStyle(document.getElementById('child1'), null)
          .padding,
      );
    }
  }, [boxSizing]);

  return (
    <Card
      title={
        <Radio.Group
          defaultValue="content-box"
          onChange={e => setBoxSizing(e.target.value)}
        >
          <Radio value="content-box">content-box</Radio>
          <Radio value="border-box">border-box</Radio>
        </Radio.Group>
      }
    >
      <div
        id="parent1"
        style={{
          boxSizing,
          width: 200,
          height: 200,
          padding: 20,
          border: '20px solid #000',
          background: 'green',
        }}
      >
        <div
          id="child1"
          style={{
            padding: `10%`,
            display: 'inline-block',
            background: 'red',
          }}
        >
          hello world!
        </div>
      </div>
      <div>
        <p>parent computed width: {parentWidth}</p>
        <p>child padding: 10%</p>
        <p style={{ color: 'red' }}>
          child computed padding width: {childPadding}
        </p>
      </div>
    </Card>
  );
}
