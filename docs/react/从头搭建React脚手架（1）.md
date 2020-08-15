---
title: 从头搭建React脚手架（1）
---

###从头搭建 React 脚手架（1）

今天开始尝试从头搭建 React 脚手架

#### 安装 webpack

```shell
npm init

yarn add webpack webpack-cli -D
```

#### 安装 React 必备项

```shell
yarn add react react-dom
```

#### 修改项目目录

添加 src，public 文件夹，然后在 public 文件夹添加 html 页面，`favicon`，一些 logo 等图片文件

```html
<!DOCTYPE html>
<html lang="zh-hans">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="./favicon.ico" />
  </head>
  <body>
    <div>
      <span>myreact-app</span>
      <img src="./redfat.png" />
    </div>
  </body>
</html>
```

#### 修改 webpack 配置

> [webpack - 使用一个配置文件](https://webpack.docschina.org/guides/getting-started/#using-a-configuration)

我就按照 webpack 官网的指南一步一步进行，在项目根目录新建`webpack.config.js`文件，作为 webpack 的配置文件。

- 配置入口文件属性`entry`和输出目录，这里的`path`采用的是 node 内置的 CommonJS 模块引入的，`__dirname`指的是当前模块的目录名，`path.resolve`将`__dirname`和`dist`组合起来也就表示始终输出到项目根目录的 dist 文件夹中

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

- 修改`package.json`的脚本命令，添加一个`build`，同时设置`private:true`并删除`main`项

```shell
{
  "name": "myreact",
  "version": "1.0.0",
  "private": true,
  "description": "myreact-app",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "dependencies": {
    "css-loader": "^4.2.1",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "style-loader": "^1.2.1",
    "webpack": "^4.44.1",
    "webpack-cli": "^3.3.12"
  },
  "devDependencies": {
    "file-loader": "^6.0.0"
  }
}
```

- 添加 CSS loader，让项目可以加载 CSS，因为 webpack 打包查找以来的时候只认识 js，或者 json 文件，其他的文件类型，css，less，jsx，tsx 等这些必须通过 loader 来识别，具体见——[何为 webpack 模块](https://webpack.docschina.org/concepts/modules/)；`webpack.config.js`里的`module`配置项就是专门配置不同类型模块的

```shell
yarn add style-loader css-loader -d
```

- 修改`webpack.config.js`的配置，添加 CSS loader 的配置项

```javascript
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.csss$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  ...
};

```

- 添加图片加载，添加`file-loader`

```

```
