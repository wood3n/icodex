import React, { useState, useEffect } from 'react';
import { Card, Radio } from 'antd';

export default function App() {
  return (
    <div
      id="parent1"
      style={{
        width: 200,
        height: 200,
        padding: 20,
        border: `20px solid #000`,
        borderRadius: '20% / 20%',
        background: 'green',
      }}
    >
      hello world!
    </div>
  );
}
