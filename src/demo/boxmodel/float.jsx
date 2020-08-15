import React, { Component } from 'react';
import { Card, Checkbox } from 'antd';

export default class Comp1 extends Component {
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
      <Checkbox value={this.state.checked} onChange={this.handleChange}>
        overflow:"hidden/auto" | display:"flow-root"
      </Checkbox>
    );

    return (
      <Card title={title}>
        <div
          style={{
            overflow: this.state.checked ? 'hidden' : 'visible',
            background: 'gray',
            padding: 20,
          }}
        >
          text text text text text text
          <img style={{ float: 'left', width: 100 }} src="/images/redfat.png" />
        </div>
      </Card>
    );
  }
}
