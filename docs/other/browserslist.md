---
title: browserslist
---

## browserslist 是什么

[`browserslist`](https://github.com/browserslist/browserslist)是一个开源工具，它可以在不同前端开发工具间共享目标浏览器或者目标 nodejs 版本配置，例如常见的 Babel，Autoprefixer，ESLint 等需要进行代码检查，甚至编译的工具，简单来说就是兼容性配置，为了支持特定浏览器。

## browserslist 配置

通常是在项目的`package.json`文件中设置`browserslist`字段，不过也具有其他方式，查找`browserslist`配置过程按下面的顺序进行：

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
