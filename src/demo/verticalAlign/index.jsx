import React, { Component } from 'react';
import { Radio, Card } from 'antd';
import styles from './styles.less';

export default class extends Component {
  state = {
    value1: 'baseline',
    value2: 'top',
  };

  onChange1 = e => {
    this.setState({
      value1: e.target.value,
    });
  };

  onChange2 = e => {
    this.setState({
      value2: e.target.value,
    });
  };

  render() {
    const title1 = (
      <Radio.Group onChange={this.onChange1} value={this.state.value1}>
        <Radio value={'baseline'}>baseline</Radio>
        <Radio value={'sub'}>sub</Radio>
        <Radio value={'super'}>super</Radio>
        <Radio value={'text-top'}>text-top</Radio>
        <Radio value={'text-bottom'}>text-bottom</Radio>
        <Radio value={'middle'}>middle</Radio>
      </Radio.Group>
    );

    const title2 = (
      <Radio.Group onChange={this.onChange2} value={this.state.value2}>
        <Radio value={'top'}>top</Radio>
        <Radio value={'bottom'}>bottom</Radio>
      </Radio.Group>
    );

    return (
      <div>
        <Card title={title1} extra="相对于行内元素的父元素对齐">
          <div style={{ padding: 10, border: '1px solid', fontSize: 20 }}>
            {/* <img className={styles.img} src="/images/redfat.png" /> */}
            <span style={{ fontSize: 30 }}>基准文字xxx</span>
            <span style={{ verticalAlign: this.state.value1 }}>
              对齐文字xxxx
            </span>
          </div>
        </Card>
        <Card title={title2} extra="相对整行垂直对齐">
          <div style={{ padding: 10, border: '1px solid', fontSize: 20 }}>
            <img className={styles.img} src="/images/redfat.png" />
            <span
              style={{
                fontSize: 30,
              }}
            >
              基准文字xxx
            </span>
            <span style={{ verticalAlign: this.state.value2 }}>
              对齐文字xxxx
            </span>
          </div>
        </Card>
      </div>
    );
  }
}
