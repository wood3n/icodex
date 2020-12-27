import React, { useEffect } from 'react';
import { Card, Radio } from 'antd';

const App = () => {
  const [width, setWidth] = React.useState(3);
  const [computedValue, setComputedValue] = React.useState('');

  useEffect(() => {
    if (window.getComputedStyle) {
      setComputedValue(
        window.getComputedStyle(document.getElementById('div'), null).width,
      );
    }
  }, [width]);

  return (
    <Card
      title={
        <Radio.Group defaultValue={3} onChange={e => setWidth(e.target.value)}>
          <Radio value={3}>3</Radio>
          <Radio value={4}>4</Radio>
          <Radio value={5}>5</Radio>
        </Radio.Group>
      }
    >
      <div
        id="div"
        style={{
          fontSize: 20,
          width: `${width}em`,
          background: 'green',
        }}
      >
        <div
          style={{
            whiteSpace: 'nowrap',
          }}
        >
          font-size：20px
        </div>
        <div
          style={{
            whiteSpace: 'nowrap',
          }}
        >
          Computed width：
          {computedValue}
        </div>
      </div>
    </Card>
  );
};

export default App;
