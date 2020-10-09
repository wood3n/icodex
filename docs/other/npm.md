## samantic versioner

> [npm 版本号语义](https://docs.npmjs.com/misc/semver.html)

npm package 的版本号最多只有三位，用`.`连接起来；

- 第一位表示主版本号，一般表示大的功能更新迭代
- 第二位表示更新向后兼容的新功能，重构等
- 最后一位更新通常表示修复 bug

![image-20200701184919910](../images/image-20200701184919910.png)

`~version`：近似等于版本

```json
~1.2.3   >=1.2.3 <1.3.0
~1.2	 >=1.2.0 <1.3.0			1.2.x
~1								1.x
```

`^version`：根据 npm 版本号最多只有三位的情况，允许在最左侧同一非 0 版本号的范围内匹配

```json
^1.2.3 	>=1.2.3 <2.0.0				//最左侧非0版本号就是第一个
^0.2.3  >=0.2.3 <0.3.0				//最左侧非0版本号是第二个
^0.0.3 	>=0.0.3 <0.0.4
```

其它还能用大于小于这些符号`>version`等，分别就表示大于小于版本号的匹配。

`-beta.2`：有时候会在版本号的后面带上`beta`的测试版本符号。

## npm install

`npm install`本身支持多种形式的命名，一般来说常用的有：

```shell
npm install (with no args, in package dir)
npm install [<@scope>/]<name>
npm install [<@scope>/]<name>@<tag>
npm install [<@scope>/]<name>@<version>
npm install [<@scope>/]<name>@<version range>
npm install <git-host>:<git-user>/<repo-name>
npm install <git repo url>
npm install <tarball file>
npm install <tarball url>
npm install <folder>

//简写
npm i
npm add
```

### `npm install`

不带任何参数的`npm install`命令默认用于整体安装所有在`package.json`中依赖包到本地项目的`node_modules`文件夹。

如果带有`--production`后缀，`npm install --production`不会安装`devDependencies`下的依赖。

如果带有`-g`或`--global`是安装全局依赖。

### `npm install <folder>`

安装到具体文件夹，如果和当前项目根目录一致，那么会提升到`node_modules`文件夹中

```javascript
npm install ./src
```

### `npm install <tarball file>`

安装本地压缩包文件，压缩包必须满足以下要求：

- 使用`.tar`，`.tar.gz`或者`.tgz`作为后缀
- 包必须位于`.tar`文件内部的子文件夹中，例如`package/`
- 包必须包含`package.json`文件

```shell
npm install ./package.tgz
```

### `npm install <tarball url>`

从远程服务器下载并安装压缩包，路径必须以`http://`或者`https://`开头

```shell
npm install https://github.com/indexzero/forever/tarball/v0.5.6
```

### `git`

`npm install <git repo url>`和`npm install <git-host>:<git-user>/<repo-name>`两个可以通过 git 将仓库代码克隆下来放在本地

### `npm install [<@scope>/]<name>`

默认情况下，安装依赖会添加到`package.json`的`dependencies`中，可以通过以下后缀控制：

- `-p`，`--save-prod`：默认行为，即安装依赖会添加到`package.json`的`dependencies`中
- `-D`，`--save-dev`：安装依赖会添加到`package.json`的`devDependencies`中
- `-O`，`--save-optional`：安装依赖会添加到`package.json`的`optionalDependencies`中
- `--no-save`：安装依赖不会添加到`package.json`的`dependencies`中

### @version

`@latest`安装最新的稳定版本的 package

```shell
npm install @myorg/mypackage@latest
```

`@next`安装最新的未发行版本的 package

```shell
npm install @myorg/mypackage@next
```

`@[version]`可以限定 package 的版本

```shell
npm install sax@0.1.1
```

`@[version range]`安装在版本范围内的 package

```shell
npm install sax@">=0.1.0 <0.2.0"
```

## install 命令的机制

> [参考 —— npm install 原理分析](https://cloud.tencent.com/developer/article/1555982)

使用`npm i --timing=true --loglevel=verbose`或者`yarn install --verbose`可以观察 install 命令的安装过程，大致经过以下步骤

### 检查配置文件

npm 会检查`.npmrc`文件，yarn 会检查`.yarnrc`配置文件，`rc`表示 runtime configuration 的意思，配置文件保存着 npm 的一些[基本配置](https://docs.npmjs.com/using-npm/config.html)，例如：

- `cache`：设置 npm 保存缓存的本地目录，可以使用`yarn cache dir`或者`npm config get cache`获取本地默认的缓存目录
- `cache-max`：设置缓存最长时间，默认是永久
- `package-lock`：设置在 install package 的时候是否忽略`package-lock.json`文件
- `registry`：设置 npm 源地址，默认是`https://registry.npmjs.org/`

### 检查 lock 文件

检查项目的根目录是否存在[`package-lock.json`](https://docs.npmjs.com/configuring-npm/package-lock-json.html)文件，`package-lock.json`会保存项目实际需要安装的依赖的具体信息，以保证在不同机器，团队协作开发，或者 CI/CD 的情况下安装的都是一样版本的 package，以`yarn.lock`中的`@babel/core`为例，大致有以下信息：

- `name`：package 的名称，`yarn.lock`直接以 package 的名称作为键名来匹配
- `version`：安装到本地`node_modules`中的 package 的版本
- `resolved`：package 的下载地址

![image-20200918113832780](../images/image-20200918113832780.png)

### 获取依赖信息

从`package.json`中的`dependencies`和`devDependencies`获取所有依赖名称和它们的语义化版本信息。

如果存在 lock 文件，会检查其内部的版本信息和`package.json`里的版本是否存在冲突，即是否满足`package.json`内部的版本范围。

- 如果不存在冲突，会使用 lock 文件中的`resolved`字段，去本地缓存目录获取 package，例如上文提到的`@babel/core`这个 package，对应保存的目录名是`resolved`属性的 URL 的 hash 部分。缓存目录保存的是 package 的压缩版本，会拷贝到项目目录进行解压。

![image-20200918113711499](../images/image-20200918113711499.png)

- 如果存在冲突，就去 [npm registry](https://registry.npmjs.org) 注册源（这玩意就是一个数据库，保存着同名 package 下的所有版本信息）查找具体版本的 package。例如`@babel/core`可以通过`https://registry.npmjs.org/@babel/core`查找其所有版本信息，在`package.json`中显示的是`^7.11.1`，那么会去查找`<8.0.0`版本的最新的 package，最终确定是`7.11.6`。

如果不存在 lock 文件，就直接去`npm registry`地址查询 package 的信息，npm registry 获取到具体的 package 的信息中会包含 package 的压缩包地址`dist.tarball`和`dist.shasum` hash 值等。

![image-20200917232302686](../images/image-20200917232302686.png)

### 构建抽象依赖树

从`package.json`中的`dependencies`和`devDependencies`中获取到的只是最顶层的依赖项，它们各自内部还可能包含自己的依赖关系，然后子依赖还可能存在子依赖，这样就会形成一个树状的依赖关系图。

如果单纯根据这个树状的依赖项将各自模块的依赖都单独存放，有可能不同的模块保存着相同的依赖包，这样会导致`node_modules`文件夹有很多重复的文件，占用存储。

所以构建抽象依赖树的过程会**扁平化处理模块间的依赖**，不管是顶层依赖还是子依赖，都会判断优先放在项目的`node_modules`文件夹中，当下次查询到相同版本范围内的依赖项时就跳过下载该 package 的过程，如果版本不符合，就会放置在那个模块的目录的`node_modules`文件夹中。

### 安装依赖

构建完抽象依赖树后会从缓存查询每个 package 是否存在，如果存在即拷贝，不存在就根据`dist.tarball`下载下来，然后复制一份到缓存目录中，最后解压到对应依赖项的`node_modules`文件夹中。

由于是首次安装，不会存在本地缓存，那么就会根据这个地址下载 package 到项目目录的`node_modules`文件夹中，然后继续查找该模块的依赖，比方说`@babel/core`这个 package，它还依赖于其他 package，而其他 package 也可能还依赖于更深层次的 package，最终就会形成一个树状的依赖关系，这样需要递归查找直到找不到依赖项为止。

### 生成 lock 文件

`package-lock.json`文件会在使用`npm`修改`node_modules`树，或者`package.json`文件以后自动产生的，如果使用`yarn`对应的是一个`yarn.lock`文件。

## package.json

[`package.json`](https://docs.npmjs.com/files/package.json)是一个 JSON 格式的配置文件

### name

package 的名称，用于和`version`属性在一起唯一标识一个 package。如果不打算发布 package 到 npm，可以不配置`name`属性。

`name`的命名具有以下规则：

- 小于等于 214 个字符
- 不能以点`.`或者下划线`_`开头
- 不能包含大写字母
- 不能包含任何不安全的 URL 字符

`name`命名有以下建议：

- 不要使用与核心 Node 模块相同的名称
- 不要在名称中添加`js`或者`node`
- 这个名称可能会作为参数传递给`require()`或者`import`，简洁一点比较好
- 可以使用`@[scope]`限定 package 所属的组织，例如`@babel/core`

### version

package 的版本号，使用 npm 可以解析的语义化方式 —— [npm-semver](https://docs.npmjs.com/misc/semver)，注意一点，每次发布新的 package 的时候一定要修改`version`，可以使用`npm install semver`来管理。

如果不打算发布 package 到 npm，可以不配置`version`属性。

### description

package 的描述字符串，可以帮助在 npm 官网搜索。

### keywords

字符串数组，可以帮助在 npm 官网搜索。

### homepage

项目的 URL 地址，例如 github 仓库地址

### bugs

package 使用过程中出现问题的联系方式，例如 email 地址，或者 github 的 issue 地址

```json
{
  "url": "https://github.com/owner/project/issues",
  "email": "project@hostname.com"
}
```

### license

开源项目一般都会指定证书声明，例如：

```json
{ "license" : "BSD-3-Clause" }

{ "license": "UNLICENSED" }
```

### files

一个字符串数组，包含安装 package 的时候，应该包含的额外的目录或者文件

### main

字符串路径，指定程序的主入口文件路径，例如 package 的`name`是`foo`，那么使用`require("foo")`就是查找`main`指定的文件路径返回的对象

### browser

如果 package 需要在浏览器环境运行，使用`browser`替代`main`较好，提示该 package 只能用在浏览器中，不能用在 NodeJS 模块中

### repository

开源项目可以指定`repository`属性，表示代码仓库的地址，例如：

```json
"repository": {
  "type" : "svn",
  "url" : "https://v8.googlecode.com/svn/trunk/"
}
```

### scripts

`scripts`属性是一个对象，里边指定了项目的生命周期个各个环节需要执行的命令。key 是生命周期中的事件，value 是要执行的命令，例如常见的`install`，`start`，`build`

### dependencies

使用`npm install xxx`或者`npm install xxx --save/-D`会将安装的依赖项写入`dependencies`属性中。

`dependencies`是一个对象，指定项目使用的依赖项从 package `name`到版本范围映射。key 是 package 的名称，value 是 package 的语义化版本信息，见上文。

### devDependencies

使用`npm install -D xxx`命令安装的开发包依赖项会被放到`devDependencies`下面，这里的依赖项通常保存仅在开发环境下使用的 package，例如 babel 编译器，以及 webpack 的 loader，plugin 等，这些依赖项在正式使用 package 的用户来说是不需要的，因为它们已经完成了自己的工作，放在`devDependencies`下面就能保证用户使用 package 的时候不会去下载这些依赖项。

如果在开发环境指定`npm install -P`则不会安装`devDependencies`下的依赖。

### peerDependencies

`peer`本身是同等的意思，在 npm 早期的`npm@1.x`以及`npm@2.x`版本中，npm 是没有针对项目内部重复以来进行优化的，例如一个 webpack plugin 的 package，例如`html-webpack-plugin`，它的开发本身需要依赖于`webpack`，而一个使用`webpack`进行构建的项目也会安装`webpack`，这样就形成了重复的依赖关系。

```shell
node_modules/
  |
  +- webpack/
  +- html-webpack-plugin
  		/node_modules/
  		|
  		+- webpack/
```

**使用`peerDependencies`将`webpack`作为核心依赖库，就可以避免相同的依赖被重复安装，做到`node_modules`树扁平化处理**。

在`npm@1.x`以及`npm@2.x`版本中，如果用户没有显式依赖核心库，则按照插件`peerDependencies`中声明的版本会被自动安装到项目根目录的`node_modules`中。

在`npm@3.x`以后，npm 对`node_modules`树进行扁平化优化，在构建依赖树的时候，首先选择将所有顶层依赖以及它们各自内部的子依赖安装到项目根目录的`node_modules`中，然后后续遇到相同的模块依赖，如果符合版本范围就不再继续安装，如果不符合才将其放到对应模块的`node_modules`中。这样`peerDependencies`的依赖项也不会自动安装了，如果没有手动安装，npm 会提示进行手动安装。

### bundledDependencies

在`bundledDependencies`中定义的依赖项会在发布 package 的时候被打包一起发布，这样在用户使用的时候就不用再下载这些依赖项了。

### optionalDependencies

`optionalDependencies`表示可选的依赖项，也就是用不用得到无所谓，如果在 npm 安装 package 的时候报错，也不会影响其他 package 的安装。

### typings/types

`typings`/`types`属性用于指定该项目的 TypeScript 类型声明文件位置，当使用 TypeScript 时，如果在项目中使用到了第三方库，那么 TypeScript 需要根据类型声明文件才能获得对应的代码补全、接口提示等功能。

```json
{
  "typings": "lib/index.d.ts"
}
```
