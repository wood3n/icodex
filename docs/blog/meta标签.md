---
title: meta标签
---

## head

`head`标签是在 HTML 的根元素`html`里的第一个标签，它的内容如下：

- 允许包含一个`title`标签，表示文档的标题，显示在浏览器的标签栏上；如果时`iframe`则可以允许不包含`title`标签

```
<head>
  <title>My test page</title>
</head>
```

- 最多只能包含一个`base`标签，给页面上所有的 URL 相对地址提供一个基础路径，因此它会影响全局的链接地址。`base`是一个非常危险的标签，容易造成跟 JavaScript 的配合问题
- `meta`标签

```
<base target="_top" href="http://www.example.com/">
```

- `link`标签，规定了当前文档与外部资源的关系，例如标识`favicon`，`css`等静态资源

```
<link rel="icon" href="favicon.ico">

<link rel="stylesheet" href="my-css-file.css">
```

- `style`，即直接指定的`CSS`样式表

```
<head>
  <style>
    h1 {color:red;}
    p {color:blue;}
  </style>
</head>
```

- `script`标签，但是一般不会至于`head`中，如果要放在`head`中一般需要使用`async`来异步加载资源

## link 标签

`link`一般用于指定网页的`favicon`和`css`资源，其具有以下属性：

- `crossorigin`：指定在加载相关资源时是否必须使用 CORS，例如图片加载，它的值可以是以下两种:

  - `"anonymous"`：会发起一个跨域请求(即包含 `Origin:` HTTP 头)，但是不会发送任何客户端信息（`cookie`，`HTTP Authorization`请求头），如果服务端没有设置`Access-Control-Allow-Origin`响应头，则资源会被限制访问
  - `"use-credentials"`：发起跨域请求的同时发送认证信息，如果服务端没有设置`Access-Control-Allow-Origin`响应头，则资源会被限制访问
  - 如果未设置`crossorigin`，那么图片会被禁止在`canvas`等元素中使用

- `rel`：表示外部资源和当前 HTML 文档的关系，它的值可以是[链接类型](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Link_types)中指定的值，例如常见的有：
  - `stylesheet`：`CSS`样式表文件
  - `alternate`备用资源，可以是`CSS`，或者一份`HTML`，例如更换主题的网页可以使用`alternate`备用一份`CSS`
  - `icon`，HTML 文档的`favicon`
  - `preload`：指定预加载资源，可以配合使用 `as` 来指定将要预加载的内容的类型，具体见[哪些类型的内容可以被预加载？](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Preloading_content#哪些类型的内容可以被预加载？)
  - `prefetch`：建议浏览器提前获取链接的资源，因为它很可能会被用户请求
- `href`：外部资源的链接地址，可以是绝对路径或者相对路径
- `type`：指定链接内容的 MIME 类型，最常用的就是`text/html`，`text/css`

```
<link rel="preload" as="font" type="font/woff2" crossorigin="" href="/static/media/ZillaSlab-Bold.subset.0beac26b.woff2">

<link rel="alternate" title="<head>标签里有什么? Metadata-HTML中的元数据" href="https://developer.mozilla.org/zh-CN/docs/learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML" hreflang="zh">
<link rel="alternate" title="What’s in the head? Metadata in HTML" href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML" hreflang="en">

<link href="/static/css/main.d00647ab.chunk.css" rel="stylesheet">
```

## meta 标签

`meta`标签是一组键值对，是一种通用的元信息表示标签，也就是描述当前 HTML 文档的除了`link`，`title`等无法表示的信息。

### name 和 content

`meta`可以由`name`和`content`两个键值对组成，`name`和`content`属性可以一起使用，以键值对的方式给文档提供元数据，其中`name`的值作为元数据的名称，`content` 的值作为元数据的值。

HTML 规范中定义了以下标准的元数据名称，可以指定给`name`：

- `application-name`：网页中所运行的应用程序的名称

- `author`：文档作者的名字。
- `description`：一段简短而精确的、对页面内容的描述。一些浏览器，比如 Firefox 和 Opera，将其用作书签的默认描述。
- `generator`：生成此页面的软件的标识符（identifier）。
- `keywords`：与页面内容相关的关键词，使用逗号分隔。
- `referrer`：控制由当前文档发出的请求的 HTTP [`Referer`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referer) 请求头。
- `theme-color`：页面风格颜色，实际并不会影响页面，但是浏览器可能据此调整页面之外的 UI（如窗口边框或者 tab 的颜色）。`content` 属性应当包含一个有效的 CSS 颜色值（十六进制，渐变色，或者颜色关键字等）

### charset

从 HTML5 开始，为了简化写法，`meta`标签新增了`charset`属性，用来描述 HTML 文档自身的编码格式。添加了 `charset` 属性的 `meta` 标签无需再有 `name`和`content`。指定`charset`的`meta`通常放在`head`的第一个。

```
<meta charset="UTF-8" >
```

### http-equiv

具有 `http-equiv` 属性的 `meta` 标签，表示执行一个命令，这样的 `meta` 标签可以不需要 `name` 属性。例如下面一段代码相当于指定`content-type`这个 HTTP 首部，并且指定了 HTTP 编码方式

```
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
```

除了`content-type`，还有以下几种命令：

- `content-language`指定内容的语言；

- `default-style`指定默认样式表；

- `refresh`刷新；

- `set-cookie`模拟 HTTP 响应头 `set-cookie`，设置 cookie；

- `x-ua-compatible` 模拟 HTTP 头 `x-ua-compatible`，声明 ua 兼容性；

- `content-security-policy` 模拟 HTTP 头 `content-security-policy`，声明内容安全策略

### viewport

`viewport`并未由标准定义，但是移动端开发必须使用，其表示移动端网页物理像素和逻辑像素的缩放逻辑。其属性值是一个很复杂的结构，用逗号分隔的键值对，键值对可以是以下几种：

- `width`：页面宽度，可以取值具体的数字，也可以是 device-width，表示跟设备宽度相等。

- `height`：页面高度，可以取值具体的数字，也可以是 device-height，表示跟设备高度相等。

- `initial-scale`：初始缩放比例。

- `minimum-scale`：最小缩放比例。

- `maximum-scale`：最大缩放比例。

- `user-scalable`：是否允许用户缩放。

对于已经做好了移动端适配的网页，应该把用户缩放功能禁止掉，宽度设为设备宽度，一个标准的指定`viewport`的`meta`如下：

```
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
```

### SEO

`meta`标签另外一个最大的用处就是进行网站的`SEO`（Search engine optimization，搜索引擎优化）。这其中常用的属性为：

- `author`：文档作者的名字。
- `description`：一段简短而精确的、对页面内容的描述。一些浏览器，比如 Firefox 和 Opera，将其用作书签的默认描述。
- `generator`：生成此页面的软件的标识符（identifier）。
- `keywords`：与页面内容相关的关键词，使用逗号分隔。
