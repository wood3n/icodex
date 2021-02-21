import React, { useRef } from 'react';
import { Card, Button } from 'antd';

export default function App() {
  const [clientTop, setClientTop] = useState(0);
  const divRef = useRef();

  useEffect(() => {
    if (divRef?.current) {
      setClientTop(divRef.current.clientTop);
    }
  }, []);

  return (
    <Card title={`clientTop: ${clientTop}`}>
      <div
        ref={divRef}
        style={{
          height: 300,
          margin: 50,
          padding: '50px 20px',
          border: '50px solid #999',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            width: 300,
            height: 2000,
            margin: 50,
            padding: 50,
            border: '20px solid #000',
            background: '#999',
          }}
        ></div>
      </div>
    </Card>
  );
}
