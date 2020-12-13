import React from 'react';
import { Card } from 'antd';

export default () => {
  return (
    <Card title="line-clamp属性值">
      <div
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          lineBreak: 'anywhere',
          width: 400,
          background: '#deb887',
        }}
      >
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      </div>
    </Card>
  );
};
