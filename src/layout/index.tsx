import React, { Component } from 'react';
import { Typography, Button } from 'antd';
import CreateIcon from '@material-ui/icons/Create';
import GitHubIcon from '@material-ui/icons/GitHub';
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
          <Title level={3}>
            <a href="/blog" className="layout-link">
              <span className="layout-icon">
                <CreateIcon />
              </span>
              <span>Blog</span>
            </a>
            <a
              className="layout-link"
              href="https://github.com/wood3n/icodex"
              target="_blank"
            >
              <span className="layout-icon">
                <GitHubIcon />
              </span>
              <span>GitHub</span>
            </a>
          </Title>
        </div>
      </div>
    );
  }
}
