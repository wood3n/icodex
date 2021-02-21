import React, { useRef } from 'react';
import { Card, Button } from 'antd';
import './style.css';

export default function App() {
  return (
    <Card
      bodyStyle={{
        padding: 0,
      }}
    >
      <div
        className="test-div"
        style={{
          height: 300,
          padding: '50px 20px',
          border: '50px solid #999',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            width: 2000,
            height: 2000,
            background: '#999',
          }}
        ></div>
      </div>
    </Card>
  );
}
