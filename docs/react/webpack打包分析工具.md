---
title: webpack打包分析工具
---

## webpack-bundle-analyzer

[`webpack-bundle-analyzer`](https://github.com/webpack-contrib/webpack-bundle-analyzer)是一个 plugin 和 CLI 工具，它将 bundle 内容展示为一个便捷的、交互式、可缩放的树状图形式。

```shell
yarn add webpack-bundle-analyzer -D
```

```javascript
module.exports = {
  ...
  plugins: [
    // 仅在生产环境打包时使用
    isProduction && new BundleAnalyzerPlugin()
  ]
}
```

上述默认配置的情况下，在执行完`yarn build`打包以后，就会在系统默认浏览器的`http://127.0.0.1:8888/`自动打开文件依赖分析树状图。

如果不希望每次自动打开依赖分析，可以使用`openAnalyzer`关闭在默认浏览器打开页面，使用`generateStatsFile`在 webpack 指定的`output.path`生成一个`stats.json`文件，也可以通过`statsFilename`控制生成的 JSON 文件名和目录。

```javascript
module.exports = {
  ...
  plugins: [
    // 仅在生产环境打包时使用
    isProduction &&
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        generateStatsFile: true,
        statsFilename: "stats.json",
      }),
  ]
}
```

然后在 npm scripts 中配置打开[`webpack-bundle-analyzer`的 CLI 命令](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-cli)

```shell
"analyze": "webpack-bundle-analyzer --port 8888 ./build/stats.json"
```

然后执行`yarn analyze`就可以在默认浏览器打开生成的 JSON 文件，显示 bundle 分析树状图。

![image-20200906184523080](../images/image-20200906184523080.png)

### 树状图怎么看

对于上面这张树状图，可以了解出以下信息：

- 打包过程生成了 2 个 bundle 文件，对应于图中最外层包裹的 bundle 文件名 —— `1.mian.js`和`main.js`
- `1.mian.js`中的模块全部来自`node_modules`，这对应于上文中我们说的 SplitChunksPlugin 的默认拆分，它将项目中所有从`node_modules`导入的以来单独打包成一个 chunk；除此之外还能层层深入分析 chunk 之间包含了其它哪些模块
- 在整个依赖图中，可以清楚的看到`react-dom.production.min.js`所占的体积最大，所以它占的图的面积最大
- 根据这个就能具体分析项目中具体哪个模块生成的代码需要进行拆分优化

## webpack-manifest-plugin

[`webpack-manifest-plugin`](https://github.com/danethurber/webpack-manifest-plugin)可以根据项目打包生成一个保存所有模块到最终生成的 chunk，或者静态文件之间的映射关系的 JSON 文件。

```shell
yarn add webpack-manifest-plugin -D
```

```javascript
module.exports = {
  // ...
  plugins: [isProduction && new ManifestPlugin()],
};
```

生成的 JSON 文件如下图所示

![image-20200907113859483](../images/image-20200907113859483.png)

## speed-measure-webpack-plugin

[`speed-measure-webpack-plugin`](https://github.com/stephencookdev/speed-measure-webpack-plugin)是一个分析 webpack 打包流程执行时间的插件。

```shell
yarn add speed-measure-webpack-plugin -D
```

```javascript
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin'); //代码打包速度分析工具
const smp = new SpeedMeasurePlugin();

module.exports = function(env) {
  return smp.wrap({
    //...
  });
};
```

这样配置完了以后，就可以在执行`yarn start`或者`yarn build` 的时候在控制台显示出每一步执行 webpack 的 loader 或者 plugin 所耗费的时间，例如：
