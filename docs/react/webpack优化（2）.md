---
title: webpack优化代码生成（2）
---

## 优化 babel-loader

`babel-loader`始终是项目处理任务最多的 loader，尤其是 React 开发过程中，有大量的 JSX 需要去解析，编译。从`babel-loader`的配置项入手可以进行一些优化。`babel-loader`使用的插件集合主要是`@babel/preset-env`和`@babel/preset-react`。

## @babel/preset-env

`@babel/preset-env`是一个负责将 JS 代码编译成兼容性更强的低版本 JS 代码的插件集合。

### 配置项

| 配置项                     | 类型                                                   | 默认值                     | 含义                                                                                                                                                                                       |
| -------------------------- | ------------------------------------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `targets`                  | `String|Array|Object`                                  | `{}`                       | 配置浏览器的版本或者 nodejs 的版本                                                                                                                                                         |
| `bugfixes`                 | `Boolean`                                              | `false`                    | 取决于`targets`设定，根据`targets`来编译目标浏览器支持的最新版本的语法；babel 8 版本后会自动启用                                                                                           |
| `spec`                     | `Boolean`                                              | `false`                    | 启用更多规范，会导致编译速度减慢                                                                                                                                                           |
| `loose`                    | `Boolean`                                              | `false`                    | 宽松的编译规则，正常情况下，编译会尽可能遵循 ECMAScript 6 的语义，但是宽松模式会不严格，看起来像是手写的代码，见——[Babel 6: loose mode](https://2ality.com/2015/12/babel6-loose-mode.html) |
| `modules`                  | `"amd"|"umd"|"systemjs"|"commonjs"|"cjs"|"auto"|false` | `"auto"`                   | 将 ES Module 转换为其他类型模块语法的规则                                                                                                                                                  |
| `debug`                    | `Boolean`                                              | `false`                    | 将 preset 使用的 plugin 和 polyfill 输出到控制台，这个配置不会受到 webpack 的`stats`的影响                                                                                                 |
| `include`                  | `Array`                                                | `[]`                       | 自定义采用的插件名称                                                                                                                                                                       |
| `exclude`                  | `Array`                                                | `[]`                       | 排除使用的插件                                                                                                                                                                             |
| `useBuiltIns`              | `"usage"|"entry"|false`                                | `false`                    | 定义如何处理 polyfill                                                                                                                                                                      |
| `corejs`                   | `2|3|{ version: 2|3, proposals: boolean }`             | `2`                        | 仅在`useBuiltIns: usage`或者`useBuiltIns: entry`的时候才生效，定义`core-js`的版本                                                                                                          |
| `forceAllTransforms`       | `Boolean`                                              | `false`                    | 禁用所有编译                                                                                                                                                                               |
| `configPath`               | `String`                                               | Node.js 进程的当前工作目录 | 配置指定了`browserslist`的目录                                                                                                                                                             |
| `ignoreBrowserslistConfig` | `Boolean`                                              | `false`                    | 是否忽略`browserslist`配置                                                                                                                                                                 |
| `browserslistEnv`          | `Object`                                               | `undefined`                | 配置不同开发环境下的`browserslist`                                                                                                                                                         |
| `shippedProposals`         | `Boolean`                                              | `false`                    | 是否启用对浏览器附带的内置/功能提案的支持                                                                                                                                                  |

### 配置 targets

先来看一下，[`browserslist`](https://github.com/browserslist/browserslist)这个开源工具，它可以在不同前端开发工具间共享目标浏览器或者目标 nodejs 版本配置，例如常见的 Babel，Autoprefixer，ESLint 等需要进行代码检查，甚至编译的工具，简单来说就是兼容性配置，为了支持特定浏览器。

Babel 也是靠这个设定最终编译的代码版本，通常是在项目的`package.json`文件中设置`browserslist`字段，查找`browserslist`配置过程按下面的顺序进行：

- 先找`package.json`文件中设置`browserslist`字段
- 在当前目录查找`.browserslistrc`配置文件
- 查找`browserslist`配置文件
- 查找`BROWSERSLIST`环境变量
- 上面都没找到就采用默认配置

具体可选的配置项如下：

- `defaults`：默认配置，等同于`\> 0.5%, last 2 versions, Firefox ESR, not dead`

- `\> 5%`：基于全球使用率统计而选择的浏览器版本范围

  - `\> 5% in US`：可以带上[两个字母的国家代码](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
  - `\> 5% in alt-AS`：亚洲所有国家的浏览器统计，在[`caniuse-lite/data/regions`](https://github.com/ben-eb/caniuse-lite/tree/master/data/regions)可以找到
  - `\> 5% in my stats`：自定义
  - `\> 5% in browserslist-config-mycompany stats`：
  - `cover 99.5%`：最流行的浏览器，同理也可以像上面那样附加国家代码

- `dead`：24 个月没更新过的浏览器，例如`IE 10`, `IE_Mob 11`, `BlackBerry 10`, `BlackBerry 7`, `Samsung 4` and `OperaMobile 12.1`
- `last 2 versions`：基于每种浏览器最新的两个版本
  - `last 2 Chrome versions`：chrome 最新的两个版本
- `node 10`，`node 10.4`：表示 nodejs 最新的 `10.x.x` 或者 `10.4.x` 版本
  - `current node`：目前正在使用的 node 版本
  - `maintained node versions`：兼容所有 node 版本
- `iOS 7`：注意大小写，直接指定 iOS V7 版本
  - `Firefox > 20`：指定兼容超过某个版本的浏览器
  - `ie 6-8`：指定一定版本范围内的浏览器
  - `Firefox ESR`：使用最新的[Firefox ESR（企业支持版）](https://support.mozilla.org/en-US/kb/switch-to-firefox-extended-support-release-esr)，Firefox ESR 的特点是非常稳定，针对同一个版本不会进行大的功能修改，提供一年左右的安全性更新等支持，这就意味着 Firefox ESR 并不会支持那些较新的 ES 或者 CSS 等新规范内容。
  - `not ie <= 8`：排除版本范围的浏览器，例如 IE 8 以前的版本
- `extends browserslist-config-mycompany`：从`browserslist-config-mycompany`包中查询
- `since 2015`，`last 2 years`：兼容从 2015 年到现在的所有版本
- `supports es6-module`：指定支持特定语法的浏览器，`es6-module`可以替换成其它可以在[`caniuse-lite/data/features`](https://github.com/ben-eb/caniuse-lite/tree/master/data/features)找到的其它值
- `unreleased versions`，`unreleased Chrome versions`：浏览器的 beta 版本

> note：项目一般经常会报`caiuse-lite`版本需要更新的提示，需要经常使用`npx browserslist@latest --update-db`或者 `yarn dlx browserslist@latest --update-db`去更新`caniuse-lite`的版本

也可以根据不同的开发环境配置`browserslist`，例如根据`NODE_ENV`配置：

```json
"browserslist": {
  "production": [
    "last 2 versions",
    "Firefox ESR",
    "> 1%",
    "ie >= 11",
    "not dead"
  ],
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ]
}
```

早期的 babel 还有一个 preset，叫[`babel-preset-latest`](https://babel.docschina.org/docs/en/babel-preset-latest)，这个 preset 的特点是能自动根据 ES 规范的新特性添加对应的 plugin，这样就避免了开发者去单独配置，但是就这样直接添加进去会导致插件越来越多，并且随着时间推移，大部分 ES6 的语法已经被主流浏览器都支持了，没必要再去使用那些插件编译了，这些无用的插件留在 preset 中会导致 babel 的编译流程也越来越慢，于是推荐使用`@babel/preset-env`去替代这个 preset。

`@babel/preset-env`帮助开发者从`preset-latest`进行过渡，**如果不在`@babel/preset-env`中配置`targets`，那么它就会默认把 ES6+的 JS 代码全部编译成 ES5 的形式**。而`@babel/preset-env`并不会去查找`browserslist`的配置，即使是`browserslist`的默认配置，也必须在`targets`中配置，这个设定可能在 Babel 8 重新讨论。

```javascript
{
  "presets": [["@babel/preset-env", { "targets": "defaults" }]]
}
```

`targets`字段同样支持上述的`browserslist`配置形式

```javascript
{
  targets: isDevelopment
		? "last 1 chrome version"
		: "> 1%, last 2 versions, Firefox ESR, ie >= 11, not dead",
}
```

`targets`还支持一些特殊字段的配置：

- `esmodules`：默认是`false`，指定目标浏览器支持 ES Modules 语法，如果设置成`true`，那么`browserslist`的配置会失效
- `node`：`"current" | true`，指定针对当前 node 的版本进行编译
- `safari`：`"tp"`，指定针对 safari 的技术预览版进行编译
- `browsers`：指定一个`browserslist`规则数组，不建议使用，因为未来版本可能会删除

### 配置 bugfixes

默认情况下，`@babel/preset-env`或者其他的 Babel plugin 会对 ES 语法特性进行相关分组，例如`function arguments`包含默认参数，剩余参数等内容，如果开启`bugfixes`，`@babel/preset-env`会根据`targets`设定的兼容范围，选择将不同的分组编译到目标浏览器支持的最接近的最新现代语法，这将导致已编译应用程序的大小显着减小，不仅优化 webpack 的构建速度，而且优化了生成的代码。

### 配置 useBuiltIns

`useBuiltIns`这个配置项在项目需要做兼容性考虑的时候才需要用到，例如 React 16 版本需要依赖`Map`和`Set`这样的数据结构，IE11 以前的浏览器是不支持的，这时候就需要 polyfill 来兼容这些浏览器。目前主流的 polyfill 方案是使用[`corejs`](https://babeljs.io/docs/en/babel-preset-env#corejs)，`@babel/polyfill`已经在 7.4 版本以后被弃用了。

## @babel/plugin-transform-runtime

Babel 会使用一些非常小的辅助性的代码插入到需要编译的源代码中，有时候这些代码是重复的，会增加代码体积。通过[`@babel/plugin-transform-runtime`](https://babel.docschina.org/docs/en/babel-plugin-transform-runtime/)这个 plugin 可以禁用 Babel 自动对每个文件的 runtime 注入；然后通过安装`@babel/runtime`将 Babel 的辅助代码作为一个独立的依赖模块来引入，这样就可以避免编译后的代码中重复出现辅助性的代码，减小代码体积。

```shell
yarn add @babel/plugin-transform-runtime @babel/runtime -D
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
