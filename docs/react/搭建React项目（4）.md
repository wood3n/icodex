---
title: 搭建React项目（4）
---

## webpack 的输出

### chunk 和 bundle

> [Concepts - Bundle vs Chunk](https://github.com/webpack/webpack.js.org/issues/970#issuecomment-305525560)

经常让人摸不着头脑的是 chunk 和 bundle 这两个概念。

首先，在使用 webpack 打包的站点中，有三种主要的代码类型：

- 开发者编写的程序代码；
- 通过`node_modules`依赖的第三方代码；
- webpack 的运行时代码，用来连接模块化应用程序所需的所有代码，包含模块交互时，连接模块所需的加载和解析逻辑，这部分逻辑包括：已经加载到浏览器中的连接模块逻辑，以及尚未加载模块的延迟加载逻辑。

而 chunk 也属于运行时的概念，webpack 需要根据以上不同的代码类型，查找出所有依赖关系，包括在`node_modules`里的文件，然后合并成 chunk。chunk 有三种类型：

- Entry chunk，包含 webpack 运行时代码；
- Initial chunk，包含由入口`entry`指定的所有模块及其依赖项，整个 chunk 会在 Entry chunk 加载完以后才执行
- Non-initial chunk，包含延迟加载的模块或者异步的代码

bundle 是 webpack 打包最终输出的文件，bundle 是由 chunk 组成的，chunk 就相当于是从 module 到 bundle 转换的中间产物。

## 控制输出文件名

> [webpack - 缓存](https://webpack.docschina.org/guides/caching/#output-filenames)

web 开发中经常遇到的一个问题就是浏览器对资源的缓存，导致发布的新的 JS 文件无法生效；过去解决方式一般是在 JS 的文件名后面添加一串不重复的版本号。在工程化的前端项目里，显然无法通过手动修改文件名来完成替换。

通常 webpack 会为每一个模块分配一个唯一的模块标识符 [`module identifier`](https://webpack.docschina.org/guides/caching/#module-identifiers)，这个 id 是一个 Int 类型的数字，并且通常从`0`开始，依据模块的解析顺序依次递增。

在 webpack 中输出文件的名称受到`webpack.config.js`配置中两个属性的影响：

- [`output.filename`](https://webpack.docschina.org/configuration/output/#outputfilename)：用来指定从`entry`开始打包，输出的最终 bundle 的文件名
- [`output.chunkFilename`](https://webpack.docschina.org/configuration/output/#outputchunkfilename)：用于指定异步导入的模块或者延迟加载的模块生成的 bundle 文件名

webpack 使用了一种称为 **substitution(可替换模板字符串)** 的方式，通过使用内容散列(content hash)替换在`output.filename`或`output.chunkFilename`配置的模板字符串来作为输出 bundle 文件的名称，这样在文件内容修改时，会计算出新的 hash，浏览器会使用新的名称加载文件，从而使缓存无效。

具体可以使用的模板字符串如下：

| 模板字符串      | 含义                                                         |
| --------------- | ------------------------------------------------------------ |
| `[hash]`        | 根据模块 id 生成的 hash                                      |
| `[contenthash]` | 根据文件内容生成的 hash，每个文件资源都不相同                |
| `[chunkhash]`   | 根据每个 chunk 内容生成的 hash                               |
| `[name]`        | module name，如果 module 没有名称，则会使用其 id 作为名称    |
| `[id]`          | module identifier，默认是根据模块引入的顺序，从`0`开始的整数 |
| `[query]`       |                                                              |
| `[function]`    |                                                              |

https://imweb.io/topic/5b6f224a3cb5a02f33c013ba

## clean-webpack-plugin

> [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)
