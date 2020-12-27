import React, { useEffect } from 'react';
import { Card, Radio } from 'antd';

const App = () => {
  const [rf, setRF] = React.useState();
  const [fontSize, setFontSize] = React.useState(0.5);
  const [computedValue, setComputedValue] = React.useState('');

  useEffect(() => {
    if (window.getComputedStyle) {
      setComputedValue(
        window
          .getComputedStyle(document.getElementById('font1'), null)
          .getPropertyValue('font-size'),
      );
    }
  }, [fontSize]);

  useEffect(() => {
    if (window.getComputedStyle) {
      setRF(
        window.getComputedStyle(document.getElementsByTagName('html')[0], null)
          .fontSize,
      );
    }
  }, []);

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
      <span
        id="font1"
        style={{
          fontSize: `${fontSize}rem`,
        }}
      >
        xxxxxxxxxxxx
      </span>
      <div>html font-size：{rf}</div>
      <div>
        Computed font-size：
        {computedValue}
      </div>
    </Card>
  );
};

export default App;
