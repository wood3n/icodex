import React, { useState } from 'react';
import { Card, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { Property } from 'csstype';

export default () => {
  const [overflowWrap, setOverflowWrap] = useState<Property.OverflowWrap>(
    'normal',
  );

  const onChange = (e: RadioChangeEvent) => {
    setOverflowWrap(e.target.value);
  };

  return (
    <Card
      title={
        <Radio.Group defaultValue="normal" onChange={onChange}>
          <Radio value="normal">normal</Radio>
          <Radio value="anywhere">anywhere</Radio>
          <Radio value="break-word">break-word</Radio>
        </Radio.Group>
      }
    >
      <div
        style={{
          overflowWrap,
          width: 400,
          background: '#deb887',
        }}
      >
        But ere she from the church-door stepped She smiled and told us why: 'It
        was a wicked woman's curse,
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      </div>
    </Card>
  );
};
