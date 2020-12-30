import React, { useState, useEffect } from 'react';
import { Card, Radio } from 'antd';

export default function App() {
  const [borderRadius, setBorderRadius] = useState('40px');

  return (
    <Card
      title={
        <Radio.Group
          defaultValue="40px"
          onChange={e => setBorderRadius(e.target.value)}
        >
          <Radio value="40px">40px</Radio>
          <Radio value="40px 20px">40px 20px</Radio>
          <Radio value="40px 20px 10px">40px 20px 10px</Radio>
          <Radio value="40px 20px 10px 10px">40px 20px 10px 10px</Radio>
          <Radio value="40px / 20px">40px / 20px</Radio>
        </Radio.Group>
      }
    >
      <div
        id="parent1"
        style={{
          width: 200,
          height: 200,
          padding: 20,
          border: `20px solid #000`,
          borderRadius,
          background: 'green',
        }}
      >
        hello world!
      </div>
    </Card>
  );
}
