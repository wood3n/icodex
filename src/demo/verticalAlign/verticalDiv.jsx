import React, { Component } from 'react';
import { Card, Checkbox } from 'antd';
import styles from './styles.less';

export default class extends Component {
  state = {
    checked: false,
  };

  handleChange = e => {
    this.setState({
      checked: e.target.checked,
    });
  };

  render() {
    const title = (
      <Checkbox checked={this.state.checked} onChange={this.handleChange}>
        vertical-align:top
      </Checkbox>
    );

    return (
      <Card title={title}>
        <div style={{ border: '1px solid' }}>
          <div className={styles.red}></div>
          <div
            id="green"
            className={`${styles.green} ${
              this.state.checked ? styles.top : ''
            }`}
          >
            <p>
              hello world <br />
              hello world
            </p>
          </div>
        </div>
      </Card>
    );
  }
}

export class Comp extends Component {
  state = {
    checked: false,
  };

  handleChange = e => {
    this.setState({
      checked: e.target.checked,
    });
  };

  render() {
    const title = (
      <Checkbox checked={this.state.checked} onChange={this.handleChange}>
        vertical-align:middle
      </Checkbox>
    );

    return (
      <Card title={title}>
        <div style={{ background: 'gray' }}>
          <img
            src="/images/redfat.png"
            style={{
              verticalAlign: this.state.checked ? 'middle' : 'baseline',
              height: 100,
              border: '1px solid',
            }}
          />
        </div>
      </Card>
    );
  }
}
