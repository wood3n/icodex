---
title: webpack优化代码生成（2）
---

## 优化 babel-loader

### @babel/plugin-transform-runtime

Babel 会使用一些非常小的辅助性的代码插入到需要编译的源代码中，有时候这些代码是重复的，会增加代码体积。通过[`@babel/plugin-transform-runtime`](https://babel.docschina.org/docs/en/babel-plugin-transform-runtime/)这个 plugin 可以禁用 Babel 自动对每个文件的 runtime 注入；然后通过安装`@babel/runtime`将 Babel 的辅助代码作为一个独立的依赖模块来引入，这样就可以避免编译后的代码中重复出现辅助性的代码，减小代码体积。

```shell
yarn add @babel/plugin-transform-runtime -D

yarn add @babel/runtime
```

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
    ],
  },
};
```

这个插件的另一个用途是为开发代码创建一个沙箱的环境。如果在项目中使用了[`core-js`](https://github.com/zloirock/core-js)或者[`@babel/polyfill`](https://babel.docschina.org/docs/en/babel-polyfill)这些 polyfill 库，这些库一般可以提供 polyfill 来让项目可以使用高版本的语法，例如：

```javascript
import 'core-js/features/array/from'; //需要在入口entry的顶层导入这些polyfill
import 'core-js/features/array/flat';
import 'core-js/features/set';
import 'core-js/features/promise';

Array.from(new Set([1, 2, 3, 2, 1]));
[1, [2, 3], [4, [5]]].flat(2);
Promise.resolve(32).then(x => console.log(x));
```

但是使用这些高版本语法的前提是需要在顶层范围引入 polifill；这样的`import`会污染全局作用域，对于一些 JS 库的开发项目来说，这种污染可能会出现问题。`@babel/plugin-transform-runtime`可以 alias 机制重命名导入的 polifill 库，默认`@babel/plugin-transform-runtime`的`corejs`配置项是`false`，可以指定对应的`core_js`的版本，根据指定的`core_js`的版本，还需要安装对应的库：

| `corejs` 版本 | 需要额外安装的库                              |
| ------------- | --------------------------------------------- |
| `false`       | 不用`corejs`，只需要`yarn add @babel/runtime` |
| `2`           | `yarn add @babel/runtime-corejs2`             |
| `3`           | `yarn add @babel/runtime-corejs3`             |

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                corejs: 2,
              },
            ],
          ],
        },
      },
    ],
  },
};
```

这样`@babel/plugin-transform-runtime`就会在编译的时候为`import`的 polyfill 的代码添加前缀来避免污染全局作用域

```javascript
var sym = Symbol();

var promise = Promise.resolve();

var check = arr.includes('yeah!');

console.log(arr[Symbol.iterator]());
```

会被编译成：

```javascript
import _getIterator from '@babel/runtime-corejs3/core-js/get-iterator';
import _includesInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/includes';
import _Promise from '@babel/runtime-corejs3/core-js-stable/promise';
import _Symbol from '@babel/runtime-corejs3/core-js-stable/symbol';

var sym = _Symbol();

var promise = _Promise.resolve();

var check = _includesInstanceProperty(arr).call(arr, 'yeah!');

console.log(_getIterator(arr));
```
