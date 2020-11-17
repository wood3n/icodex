---
title: useRef用法
---

## 什么是 ref

`ref`其实就是`reference`的缩写，在 React 中表示对组件实例或者 DOM 对象的引用。hook 的设计依然离不开 React 一些基本概念的用法，并不是说会写 JS 函数就能用好 hook ！

## API

```typescript
interface MutableRefObject<T> {
  current: T;
}

function useRef<T = undefined>(): MutableRefObject<T | undefined>;

// 对于使用了初始值定义的版本，类型定义如下
interface RefObject<T> {
  readonly current: T | null;
}

function useRef<T>(initialValue: T | null): RefObject<T>;
```

## 规则

- `useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（`initialValue`）。

- 返回的 ref 对象在组件的整个生命周期内保持不变，也就是**`useRef` 会在每次渲染时返回同一个 ref 对象**。
- 变更 ref 对象的 `.current` 属性不会引发组件重新渲染。

## 用法

### 获取 DOM 元素

### 获取组件内部成员

### 缓存不变值

###我该如何测量 DOM 节点

> [Hooks FAQ – React (reactjs.org)](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node)
