import React, { useEffect } from 'react';
import { Card, Radio } from 'antd';

const App = () => {
  const [fontSize, setFontSize] = React.useState(0.5);
  const [computedValue, setComputedValue] = React.useState('');

  useEffect(() => {
    if (window.getComputedStyle) {
      setComputedValue(
        window.getComputedStyle(document.getElementById('font'), null).fontSize,
      );
    }
  }, [fontSize]);

  return (
    <Card
      title={
        <Radio.Group
          defaultValue={0.5}
          onChange={e => setFontSize(e.target.value)}
        >
          <Radio value={0.5}>0.5</Radio>
          <Radio value={1}>1</Radio>
          <Radio value={1.5}>1.5</Radio>
        </Radio.Group>
      }
    >
      <div
        style={{
          fontSize: 20,
        }}
      >
        <span
          id="font"
          style={{
            fontSize: `${fontSize}em`,
          }}
        >
          xxxxxxxxxxxx
        </span>
        <div>parent font-size：20px</div>
        <div>
          Computed font-size：
          {computedValue}
        </div>
      </div>
    </Card>
  );
};

export default App;
