import React, { useState } from 'react';
import { Card, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { Property } from 'csstype';

export default () => {
  const [wordBreak, setWordBreak] = useState<Property.WordBreak>('normal');

  const onChange = (e: RadioChangeEvent) => {
    setWordBreak(e.target.value);
  };

  return (
    <Card
      title={
        <Radio.Group defaultValue="normal" onChange={onChange}>
          <Radio value="normal">normal</Radio>
          <Radio value="break-all">break-all</Radio>
          <Radio value="keep-all">keep-all</Radio>
          <Radio value="break-word">break-word</Radio>
        </Radio.Group>
      }
    >
      <div
        style={{
          wordBreak,
          width: 400,
          background: '#deb887',
        }}
      >
        But ere she from the church-door stepped She smiled and told us why: 'It
        was a wicked woman's curse,'
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      </div>
    </Card>
  );
};
