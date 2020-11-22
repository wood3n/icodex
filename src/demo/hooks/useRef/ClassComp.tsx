import React, { Component, createRef } from 'react';

class Child extends Component<{}> {
  private domRef = createRef<HTMLInputElement>();

  focus = () => {
    this.domRef.current && this.domRef.current.focus();
  };

  render() {
    return <input ref={this.domRef} />;
  }
}

class ClassComp extends Component {
  private childRef = createRef<Child>();

  componentDidMount() {
    this.childRef.current && this.childRef.current.focus();
  }

  render() {
    return <Child ref={this.childRef} />;
  }
}

export default ClassComp;
