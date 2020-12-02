import React, { useState } from 'react';
import { Card, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { Property } from 'csstype';

export default () => {
  const [lineBreak, setLineBreak] = useState<Property.LineBreak>('auto');

  const onChange = (e: RadioChangeEvent) => {
    setLineBreak(e.target.value);
  };

  return (
    <Card
      title={
        <Radio.Group defaultValue="auto" onChange={onChange}>
          <Radio value="auto">normal</Radio>
          <Radio value="loose">loose</Radio>
          <Radio value="normal">normal</Radio>
          <Radio value="strict">strict</Radio>
          <Radio value="anywhere">anywhere</Radio>
        </Radio.Group>
      }
    >
      <div
        style={{
          lineBreak,
          width: 400,
          background: '#deb887',
        }}
      >
        そこは湖のほとりで木々が輝いていた。その景色に、美しいなぁと思わずつぶやいた。xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      </div>
    </Card>
  );
};
