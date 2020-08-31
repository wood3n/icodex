import React, { Component } from 'react';
import { Button } from 'antd';

export default class extends Component {
  state = {
    end: false,
    loading: false,
  };

  startAnimation = () => {
    let top = 300;
    let left = 0;
    let animationId = 0;
    const animationCall = stamp => {
      console.log(stamp);
      const redfat = document.getElementById('redfat');
      if (top === 300 && left > 0) {
        window.cancelAnimationFrame(animationId);
        this.setState({
          end: true,
          loading: false,
        });
      } else {
        if (left >= 450) {
          //下落
          top++;
          left += 4;
        } else {
          top--;
          left += 3;
        }

        redfat.style.top = top + 'px';
        redfat.style.left = left + 'px';
        animationId = window.requestAnimationFrame(animationCall);
      }
    };

    animationCall();
  };

  resetAnimation = () => {
    const redfat = document.getElementById('redfat');
    redfat.style.top = 300 + 'px';
    redfat.style.left = 0 + 'px';
    this.setState({
      end: false,
      loading: false,
    });
  };

  handleAnimation = () => {
    this.setState({
      loading: true,
    });
    this.startAnimation();
  };

  render() {
    return (
      <div style={{ height: 500, width: 1000 }}>
        <img
          id="redfat"
          style={{ position: 'relative', left: 0, top: 300, height: 60 }}
          src="/images/redfat.png"
        />
        <p style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            onClick={
              this.state.end ? this.resetAnimation : this.handleAnimation
            }
            loading={this.state.loading}
          >
            {this.state.end ? '重置' : '发射'}
          </Button>
        </p>
      </div>
    );
  }
}
