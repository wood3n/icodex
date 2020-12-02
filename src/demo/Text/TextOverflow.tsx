import React, { useState } from 'react';
import { Card, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { Property } from 'csstype';

export default () => {
  const [textOverflow, setTextOverflow] = useState<Property.TextOverflow>(
    'clip',
  );

  const onChange = (e: RadioChangeEvent) => {
    setTextOverflow(e.target.value);
  };

  return (
    <Card
      title={
        <Radio.Group defaultValue="clip" onChange={onChange}>
          <Radio value="clip">clip</Radio>
          <Radio value="ellipsis">ellipsis</Radio>
        </Radio.Group>
      }
    >
      <div
        style={{
          width: 400,
          whiteSpace: 'nowrap',
          textOverflow,
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
