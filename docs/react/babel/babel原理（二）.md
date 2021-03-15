---
title: babel原理（二）
---

## @babel/preset-env

`@babel/preset-env`是目前`babel`提供的最重要的`plugin`预设，它的目的是允许项目使用最新的 ES 语法而又不用对`babel`进行`plugin`配置。

`@babel/preset-env`依托以下开源项目：

- [`browserslist`](https://github.com/browserslist/browserslist)：通用的目标浏览器兼容性配置项
- [`compat-table`](https://kangax.github.io/compat-table/es6/)：ES6+语法浏览器兼容性表格

## browserslist

由于`@babel/preset-env`需要依靠`browserslist`使用，所以先了解一下`browserslist`的配置

### 配置

- 支持直接在`package.json`的`browserslist`字段中配置；优先级最高

```json
  "browserslist": [
    "defaults",
    "not IE 11",
    "maintained node versions"
  ]
```

- 同时也支持使用配置文件`.browserslistrc`；优先级次之

```json
# Browsers that we support

defaults
not IE 11
maintained node versions
```

- 支持不同项目环境下的不同配置，常用`development`和`production`来区分，例如

```javascript
module.exports = {
  development: ['last 1 version'],
  production: ['last 1 version', '> 1%', 'ie 10'],
};
```

### 规则

此外`browserslist`还有以下配置项说明：

- `defaults`：也就是`> 0.5%, last 2 versions, Firefox ESR, not dead`
- `> 5%`：`>`，`>=`, `<` 或 `<=` 这些符号表示基于全球浏览器使用率统计数据进行的选择，例如`> 5%`也就是考虑浏览器市场份额至少在全球`5%`以上
- `cover 99.5%`：浏览器的市场覆盖率达到`99.5%`
- `dead`：浏览器官方更新已经停滞`24`个月以上，例如`IE 10`, `IE_Mob 11`
- `last 2 versions`：永远支持浏览器最新的两个迭代版本，可以指定对应的浏览器，例如`last 2 Chrome versions`
- `node 10`：nodejs `10.x`版本
- 特定浏览器:

  - `iOS 7`
  - `Firefox > 20`
  - `ie 6-8`
  - `Firefox ESR`：firefox 拓展包
  - `PhantomJS 2.1`：safari 特定版本

- 特定 JS 语法特性

  - `supports es6-module`：支持 ES6 module，其他可用的语法特性可以从[`caniuse-lite/data/features`](https://github.com/ben-eb/caniuse-lite/tree/master/data/features)获取

- 特定时间发布的浏览器版本
  - `since 2015`
  - `last 2 years`
- 支持测试版本的浏览器
  - `unreleased versions`

### 配置项组合

`browserslist`的配置项支持使用以下形式的符号或者单词进行组合，它们之间的关系类似于集合

| 符号     | 描述                                                                 | 适用范围                               | 示例                                                     |
| -------- | -------------------------------------------------------------------- | -------------------------------------- | -------------------------------------------------------- |
| `or`/`,` | ![image-20210314183739858](../../images/image-20210314183739858.png) |                                        | `> .5% or last 2 versions`<br />`> .5%, last 2 versions` |
| `and`    | ![image-20210314183803168](../../images/image-20210314183803168.png) |                                        | `> .5% and last 2 versions`                              |
| `not`    | ![image-20210314183822010](../../images/image-20210314183822010.png) | 可用于任意规则，但是不能用于配置项开头 | `> .5% and not last 2 versions`                          |

### 浏览器列表

以下浏览器都被`browserlist`支持，并且配置时大小写不敏感

- `Android` ：安卓 webview
- `Baidu`
- `BlackBerry` or `bb`
- `Chrome`
- `ChromeAndroid` or `and_chr`：chrome 安卓
- `Edge`
- `Electron`
- `Explorer` or `ie`
- `ExplorerMobile` or `ie_mob`
- `Firefox` or `ff`
- `FirefoxAndroid` or `and_ff`
- `iOS` or `ios_saf`
- `Node`
- `Opera`
- `OperaMini` or `op_mini`
- `OperaMobile` or `op_mob`
- `QQAndroid` or `and_qq`
- `Safari`
- `Samsung`
- `UCAndroid` or `and_uc`
- `kaios`

### 最佳实践

- 可以直接使用`defaults`配置，它代表的是指定市场份额大于`0.5%`并且支持最新两个迭代版本的浏览器
- 建议指定浏览器版本，这样可以使软件本身更好地适应当地的浏览器市场，例如`last 2 Chrome versions`

## 使用

`@babel/preset-env`使用非常简单，在安装以后，在`babel`的配置文件，或者`webpack`等构建工具的配置项中写入如下配置即可：

```javascript
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry"
      }
    ]
  ]
}
```

## 配置项

### 与 browserlist 的集成

默认情况下`@babel/preset-env`会按照`browserlist`配置的规则获取其配置，即获取`package.json`或者`.browserslistrc`的配置，但是如果直接在`@babel/preset-env`中配置`targets`或者`ignoreBrowserslistConfig`则会优先使用。

### targets

指定`browserlist`；

注意：如果不指定`targets`，`@babel/preset-env`不会默认采用`browserlist`的`defaults`配置，而是将所有 ES6+ 的代码都编译成 ES5 的兼容性版本，这将大大增加代码打包的体积，所以一定要指定`targets`配置项。

```json
{
  "presets": [["@babel/preset-env", { "targets": "defaults" }]]
}
```

#### targets.node

指定兼容的 nodejs 版本，可以设置成`current`

#### targets.safari

指定 Safari 的版本

#### targets.browsers

和`targets`直接配置一样，指定`browserlist`，并且会被`targets`覆盖掉

#### targets.esmodules

指定是否支持 ES Modules 语法（`import`，`export`）

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "esmodules": true
        }
      }
    ]
  ]
}
```

### bugfixes

> `boolean`，默认`false`，要求`@babel v7.9+`

性能优化的配置，开启以后`@babel/preset-env`或者`babel`的`plugin`会根据`targets`配置项来选择编译时使用的 ES 语法特性，可能会显著减少代码打包体积。

`bugfixes`主要是为了解决代码降级时带来的困扰，具体见[这里](https://babeljs.io/blog/2020/03/16/7.9.0#babelpreset-envs-bugfixes-option-11083httpsgithubcombabelbabelpull11083)。

`bugfixes`和`targets.esmodules`配合使用效果更好；`babel 8`后默认开启这项配置。

### modules

> `"amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false`，默认`"auto"`

指定将 ES Modules 编译的目标模块语法版本，其中`cjs`也就是`commonjs`的简称。当指定为`false`的时候将会保留 ES Modules 语法。

### include

指定编译时将使用的`plugin`

### exclude

指定编译时不会使用的`plugin`

### corejs

> `babel 7.4+`，默认`“2.0”`

指定`core-js`的版本，或者使用对象形式的配置，其中`proposals`表示为尚未实现的 TC39 提案语法指定 polyfill。

默认情况下，`@babel/preset-env`只会注入稳定的 ES 语法 polyfill，不会采用`proposals`。如果开启`proposals`，则会同时注入指定`version`下支持的`proposals` polyfill。

```javascript
{
  corejs: {
		version: '2.0',
     proposals: false
  }
}
```

### useBuiltIns

> `"usage"` | `"entry"` | `false`，默认`false`

指定`@babel/preset-env`处理 polyfill 的行为，因为`@babel/polyfill`在 7.4 版本以后就废弃了，所以通过`useBuiltIns`配合`core-js`使用来自定义 polyfill 的使用。

- `useBuiltIns:"entry"`：根据`targets`设定导入需要的 polyfill

```javascript
import 'core-js/es/array';

// after transform
import 'core-js/modules/es.array.unscopables.flat';
import 'core-js/modules/es.array.unscopables.flat-map';
```

- `useBuiltIns:'usage'`：仅导入代码中使用到的 polyfill
- 无论是`entry`还是`usage`，使用以后对 `babel` 编译速度提升，代码构建体积都有显著优化
