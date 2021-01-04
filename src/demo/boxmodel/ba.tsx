import React from 'react';
import { Radio, Card } from 'antd';

const App = () => {
  const [backgroundAttachment, setBackgroundAttachment] = React.useState(
    'scroll',
  );

  return (
    <Card
      title={
        <Radio.Group
          defaultValue="scroll"
          onChange={e => setBackgroundAttachment(e.target.value)}
        >
          <Radio value="scroll">scroll</Radio>
          <Radio value="fixed">fixed</Radio>
          <Radio value="local">local</Radio>
        </Radio.Group>
      }
      bodyStyle={{
        height: 400,
        overflow: 'auto',
      }}
    >
      <div
        style={{
          width: 200,
          height: backgroundAttachment === 'local' ? 200 : 500,
          overflow: 'auto',
          border: '1px solid #000',
          backgroundImage: `url('/images/redfat.png')`,
          backgroundSize: 200,
          backgroundAttachment,
        }}
      >
        {backgroundAttachment === 'local' && (
          <div
            style={{
              background: '#6f40ff85',
              width: 200,
              height: 500,
            }}
          >
            这是子元素
          </div>
        )}
      </div>
    </Card>
  );
};

export default App;
