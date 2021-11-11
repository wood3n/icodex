import React, { useState } from 'react';

interface Props {
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 滑块组件
 */
const Slider: React.FC<Props> = () => {
  const [left, setLeft] = useState(0);
  const [moving, setMoving] = useState(false);

  const handleChange: React.MouseEventHandler<HTMLDivElement> = e => {
    console.log(e);
    if (moving) {
      setLeft(e.pageX);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          width: '100%',
          height: 4,
          background: '#e1e1e1',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left,
          marginTop: 6,
          background: '#69c0ff',
          display: 'inline-block',
          width: 16,
          height: 16,
          borderRadius: '50%',
          cursor: 'pointer',
        }}
        onMouseDown={() => setMoving(true)}
        onMouseMove={handleChange}
        onMouseUp={() => {
          if (moving) {
            setMoving(false);
          }
        }}
      />
    </div>
  );
};

export default Slider;
