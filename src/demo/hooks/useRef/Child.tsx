import React, { useState, useImperativeHandle, forwardRef } from 'react';

export interface RefObject {
  addCount: () => void;
}

const Child = forwardRef(({}, ref) => {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount(count + 1);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        addCount,
      };
    },
    [addCount],
  );

  return (
    <>
      <p>{count}</p>
    </>
  );
});

export default Child;

const Func = () => {
  return (
    <button
      onClick={() => {
        //...
      }}
    >
      按钮
    </button>
  );
};
