---
title: DOM接口的继承关系
---

![DOMexntneds](../../images/DOMexntneds.png)

## Event

`Event`，提供事件接口，所有的 DOM 事件都会直接或者间接继承该接口，例如`InputEvent`，`MouseEvent`等；当事件触发的时候，事件会被分配到`EventTarget`上。

![image-20200902202405801](../../images/image-20200902202405801.png)

## EventTarget

`EventTarget`就是事件触发的对象，例如实现`Element`接口的 DOM 元素都可以作为`EventTarget`，`EventTarget`提供了两个重要的事件监听的方法。

### addEventListener

> `target.addEventListener(type, listener, options)`
>
> `type`：事件类型的字符串
>
> `listener`：触发事件时执行的函数或者一个实现了 [`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener) 接口的对象
>
> `options`：一些可选参数

- `type`能够表示的事件类型见 —— [事件参考](https://developer.mozilla.org/zh-CN/docs/Web/Events)

- `listener`最常见的是用一个函数传进去，

## DOM 节点层次
