---
title: CSS Modules解决方案
---

## CSS Modules

### CSS 开发难题

从开发的角度看，CSS 命名是一个很大的难题，因为 CSS 通过嵌入在 HTML 页面中发挥作用，没有任何作用于的限制，上文写的`class`就会被下文的同名`class`给覆盖掉。开发的时候，如果没有详细的 CSS 代码规范，还很容易出现**命名混乱**的问题。

在目前前端组件化的思想下，一个页面可能会被拆分为不同的模块，组件进行单独开发，最后不同的模块组件再组合在一起渲染成一个 HTML 页面，这时候最需要注意的是**命名冲突**的问题，你写的`class`可能会被其它人的`class`覆盖掉，或者你覆盖它的。

个人收集的有[NEC](http://nec.netease.com/standard/css-sort.html)和[BEM](http://getbem.com/introduction/)这些比较通用的 CSS 规范

### 什么是 CSS Modules

根据[CSS Module](https://github.com/css-modules/css-modules)的介绍，一个 CSS Module 就是一个 CSS 文件，在当前文件中的`class`，`animation`会被限制在当前模块作用域内。所有在`url()`和`@import url()`设置的路径也会是相当于 CSS Module 文件所在路径。

如果在 JS 中`import`一个 CSS Module 文件，CSS Module 会`export`一个对象，保存着当前 JS 模块内部`class`命名和产生的全局名称的映射关系。

```css
/* style.css */
.btn {
}

.user-login {
}
```

```jsx | pure
import styles from './style.css';

export default class extends Component {
  render() {
    return (
      <div className={styles['user-login']}>
        <button className={styles.btn}>按钮</button>
      </div>
    );
  }
}
```

### 命名要求

CSS `class`的命名建议使用驼峰命名形式，但是 CSS 命名广泛采用的是烤肉串形式也可以，对于烤肉串形式的`class`名称需要上面示例那样的方括号`[]`去访问。常见的命名格式：

- camelCase：也就是驼峰格式，第一个单词的首字母需要小写，其余单词首字母大写，例如

```css
.userLogin {
}
```

- PascalCase：帕斯卡命名格式，所有单词首字母必须大写，例如

```css
.UserLogin {
}
```

- snake*case：（蛇形）要求使用下划线`*`连接所有单词，要大写就全部大写，要小写就全部小写，例如

```css
.user_login {
}
```

- kebab-case：（烤肉串形式）要求使用连字符`-`连接所有单词，一般来说**在 CSS 里广泛使用的是这种形式**，例如

```css
.user-login {
}
```

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

`babel-plugin-react-css-modules`能在解析 CSS 模块的时候，自动将`styleName`转换成`className`。相比`react-css-modules`，用法更简单，体积更小，性能也更好。

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
