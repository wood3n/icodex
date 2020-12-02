import React, { useState } from 'react';
import { Card, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { Property } from 'csstype';

export default () => {
  const [whiteSpace, setWhiteSpace] = useState<Property.WhiteSpace>('normal');

  const onChange = (e: RadioChangeEvent) => {
    setWhiteSpace(e.target.value);
  };

  return (
    <Card
      title={
        <Radio.Group defaultValue="normal" onChange={onChange}>
          <Radio value="normal">normal</Radio>
          <Radio value="pre">pre</Radio>
          <Radio value="nowrap">nowrap</Radio>
          <Radio value="pre-wrap">pre-wrap</Radio>
          <Radio value="pre-line">pre-line</Radio>
          <Radio value="break-sapce">break-sapce</Radio>
        </Radio.Group>
      }
    >
      <div
        style={{
          whiteSpace,
          width: 400,
          background: '#deb887',
        }}
      >
        But ere she from the church-door stepped She smiled and told us why: 'It
        was a wicked woman's curse,' Quoth she, 'and what care I?' She smiled,
        and smiled, and passed it off Ere from the door she stept—
      </div>
    </Card>
  );
};
