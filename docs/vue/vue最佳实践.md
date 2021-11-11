---
title: vue最佳实践
---

## vue 最佳实践

## SFC

## 生命周期

> https://v3.cn.vuejs.org/guide/instance.html#生命周期图示

## 模板语法 api

### {}

“Mustache”语法标签用于绑定`data`方法返回的对象的属性值，当`data`方法返回的对象发生变化时，`{}`内的属性值将会自动更新。

### v-bind | :

`v-bind`用于指定动态更新的 HTML 属性，例如`id`、`class`等，不过这里需要注意的是即使是一个 JS 表达式也必须使用双引号包裹；`v-bind`一般缩写为单冒号的形式`:`

```vue
<div v-bind:id="'list-' + id"></div>
```

### v-if

`v-if`指定一个条件，用于判断是否显示当前 HTML 标签或者 VUE 组件

### v-on | @

### v-for

### v-model

### v-html
