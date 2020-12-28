import React, { useState, useEffect } from 'react';
import { Card, Radio } from 'antd';

export default function App() {
  const [border, setBorder] = useState('none');

  return (
    <Card
      title={
        <Radio.Group
          defaultValue="none"
          onChange={e => setBorder(e.target.value)}
        >
          <Radio value="none">none</Radio>
          <Radio value="hidden">hidden</Radio>
          <Radio value="dotted">dotted</Radio>
          <Radio value="dashed">dashed</Radio>
          <Radio value="solid">solid</Radio>
          <Radio value="double">double</Radio>
          <Radio value="groove">groove</Radio>
          <Radio value="ridge">ridge</Radio>
          <Radio value="inset">inset</Radio>
          <Radio value="outset">outset</Radio>
        </Radio.Group>
      }
    >
      <div
        id="parent1"
        style={{
          width: 200,
          height: 200,
          padding: 20,
          border: `10px ${border}`,
          background: 'green',
        }}
      >
        hello world!
      </div>
    </Card>
  );
}
