import React, { useState, useEffect, useRef } from 'react';

interface RefObjct {
  addCount?: () => void;
}

interface Props {
  childRef: React.MutableRefObject<RefObjct | undefined>;
}

const Child = ({ childRef }: Props) => {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    childRef.current.addCount = addCount;
  }, [addCount]);

  return (
    <>
      <p>{count}</p>
    </>
  );
};

const Parent = () => {
  const childRef = useRef<RefObjct>({});

  const add = () => {
    childRef.current && childRef.current?.addCount();
  };

  return (
    <>
      <Child childRef={childRef} />
      <button onClick={add}>count</button>
    </>
  );
};

export default Parent;
