import React, { Component } from 'react';
import { Typography } from 'antd';
import './styles.css';

export default class extends Component {
  render() {
    const { Title } = Typography;

    return (
      <div className="icodex-layout">
        <div className="layout-content">
          <img src="/images/redfat.png" />
          <Title>icodex</Title>
          <Title level={2}>Front-end development cookbook</Title>
        </div>
      </div>
    );
  }
}
