import React from 'react';
import { Card, Radio } from 'antd';

const App = () => {
  const [overflow, setOverflow] = React.useState('auto');

  return (
    <Card
      title={
        <Radio.Group
          defaultValue="auto"
          onChange={e => setOverflow(e.target.value)}
        >
          <Radio value="visible">visible</Radio>
          <Radio value="auto">auto</Radio>
          <Radio value="scroll">scroll</Radio>
          <Radio value="hidden">hidden</Radio>
        </Radio.Group>
      }
    >
      <div
        style={{
          width: 100,
          height: 100,
          border: '1px solid #000',
          overflow,
        }}
      >
        Michaelmas term lately over, and the Lord Chancellor sitting in
        Lincoln's Inn Hall. Implacable November weather. As much mud in the
        streets as if the waters had but newly retired from the face of the
        earth.
      </div>
    </Card>
  );
};

export default App;
