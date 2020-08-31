---
title: CSS Modules解决方案
---

## CSS 存在的问题

## CSS Modules

### 什么是 CSS Modules

### 使用 CSS Modules

## React CSS Modules

> [React CSS Modules](https://github.com/gajus/react-css-modules#react-css-modules)

React CSS Modules 其实和 CSS Module 差不多，从 React CSS Modules 介绍文档里来看，CSS Module 存在以下问题：

- CSS 中的`class`名称必须要用驼峰命名形式；
- 在 React 中使用时，必须以`styles`对象的形式导入 CSS；且`className`也必须用对象属性的形式；
- 模块 CSS 和全局 CSS 混合在一起会很难维护
- 引用未定义 CSS 模块没有任何警告信息

`react-css-modules`可以解决以上问题，本质上来说`react-css-modules`是一个高阶组件，它使用`styleName`替代 React 中的`className`，并且在 webpack 打包的时候，利用`styleName`去找样式对象中的 CSS 模块，并把这些模块的属性再填充到`className`中，个人看法，比原始 CSS Module 还麻烦一点。

```jsx | pure
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './table.css';

class Table extends React.Component {
  render() {
    return (
      <div styleName="table">
        <div styleName="row">
          <div styleName="cell">A0</div>
          <div styleName="cell">B0</div>
        </div>
      </div>
    );
  }
}

export default CSSModules(Table, styles);
```

## babel-plugin-react-css-modules

> [babel-plugin-react-css-modules](https://github.com/gajus/babel-plugin-react-css-modules#babel-plugin-react-css-modules)

更简单的来了，`babel-plugin-react-css-modules`能在解析 CSS 模块的时候，自动将`styleName`转换成`className`。相比`react-css-modules`，用法更简单，体积更小，性能也更好。

```jsx | pure
import React from 'react';
import './table.css';

export default class Table extends React.Component {
  render() {
    return (
      <div styleName="table">
        <div styleName="row">
          <div styleName="cell">A0</div>
          <div styleName="cell">B0</div>
        </div>
      </div>
    );
  }
}
```

###
