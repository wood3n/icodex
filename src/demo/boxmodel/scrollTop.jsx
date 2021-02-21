import React, { useRef } from 'react';
import { Card, Button } from 'antd';

export default function App() {
  const divRef = useRef();

  const scroll = () => {
    if (divRef?.current) {
      divRef.current.scrollTop = 100;
    }
  };

  return (
    <Card title={<Button onClick={scroll}>scrollTop = 100</Button>}>
      <div
        ref={divRef}
        style={{
          height: 300,
          margin: 50,
          padding: '50px 20px',
          border: '50px solid #999',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            width: 300,
            height: 2000,
            margin: 50,
            padding: 50,
            border: '20px solid #000',
            background: '#999',
          }}
        ></div>
      </div>
    </Card>
  );
}
