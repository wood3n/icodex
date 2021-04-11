## 什么是 web components

`web components`是一系列 web 平台的 API，提供封装新的自定义，可复用的`HTML`标签的方式。由于自定义组件或者小部件在 web component 的标准基础上，所以天然具有跨现代浏览器使用的优势。所以这玩意和 React，VUE 等框架一起使用毫无问题！

## 规范

`web components`建立在四个规范标准上。

### W3C 自定义元素

这种就类似于 React 封装组件，只不过自定义`html`标签的方式应用更加自由和广泛，因为它完全依托于浏览器实现，不受第三方框架影响。

### Shadow DOM

Shadow DOM 提供的是对自定义 HTML 元素的封装能力，通过 Shadow DOM 可以将不同的自定义 HTML 元素相互隔离，同时在使用的时候又能单独挂载到 DOM 上。

### ES Modules

基于 ES Modules 模块语法。ES Modules 支持在定义`type = "module"`属性的`script`中直接使用`import`和`export`语法。

### HTML Template

HTML `template` 元素提供了声明在页面加载时未使用但可以稍后在运行时实例化的标记片段。

## 实践

下面通过`web components`创建一个`button`的自定义 HTML 元素，HTML 标签的名称就叫`oxygen-button`。

项目地址：https://github.com/wood3n/web-components
