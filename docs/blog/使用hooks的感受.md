---
title: 使用React Hook一周的感受
---

## React Hook

### 发展

React Hook 正式发布的版本是在 React `16.8.0`，所以使用 Hook 需要更新 React 版本到`16.8.0+`

### 语法对比

使用 Hook 就表示完全抛开了`class`的语法形式，一系列继承自`React.Component`的生命周期函数也都无法使用了，不过组件化的思想并未改变，只是定义组件的方式是使用 JavaScript 函数形式，语法上来说配合 Hook 更为简洁。

```typescript
import React, { Component } from 'react';

class App extends Component {
  render() {
    return <h1>Hello, World</h1>;
  }
}

import React from 'react';

const App = () => {
  return <h1>Hello, World</h1>;
};
```

其他方面的语法对比的话，代码组织方式发生了很大改变，我这里说的是代码组织方式，而不是设计一个组件的思想，一个组件仍然会包含自己的`state`，外界传递的`props`，仍然会包含`mount`，`update`，`unmount`等生命周期，也就是开发过程仍然需要仔细区分这些要去怎么设计，放在组件的什么位置去执行，只不过在`class`组件中，具有严格的声明周期函数，可以说是自动帮我们划分了代码逻辑，而函数组件和 Hook 的组合更加的灵活，没有了生命周期的限制，有时候不正确的设计组件，可能会发生错误。

### 资料-待读

[Hooks FAQ](https://zh-hans.reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes)

[a-complete-guide-to-useeffect](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)
