---
title: useRef用法
---

## 什么是 ref

`ref`是`reference`的缩写，在 React 中表示对组件实例或者 DOM 对象的引用。hook 的设计依然离不开 React 一些基本概念的使用。

## 对比

### class 组件中的 ref

先来回顾一下`class`组件中`ref`的用法，它具有获取子组件实例或者原生 DOM 的作用，下面这个例子同时演示了使用`ref`获取原生 DOM 以及子组件实例的情况。

<code src="@/demo/hooks/useRef/ClassComp" />

### 函数组件中的 ref

函数组件的`ref`和`class`组件类似，但是创建语法以及使用上有很多不同。需要明确的一点是`class`组件从初始化完的以后每次更新都是在同一个实例上，所以其组件实例是不会发生变化的，但是函数组件每次更新都是重新执行一次函数，其内部没有`this`，其本身也没有实例。

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

### 获取 DOM 元素和组件内部成员

函数组件内部也可以通过`ref`获取原生 DOM 元素和组件内部成员，获取原生 DOM 元素这个比较简单，通过`createRef`创建一个`ref`对象并通过`ref`的`props`传递到原生 HTML 元素内部即可。

如果是获取子组件内部方法，可以使用一个`ref`的`props`传递到子组件内部，在子组件内部每次更新以后通过`useEffect`去处理`ref`的同步更新，这个做法比较简单，但是需要注意`useEffect`依赖参数的传递。

<code src="@/demo/hooks/useRef/effectWithRef" />

如果是结合额外的 hook —— `useImperativeHandle`来使用，稍微有点复杂，不过比`useEffect`相对容易控制，首先看一下`useImperativeHandle`这个 hook：

> ```typescript
> function useImperativeHandle<T, R extends T>(
>   ref: Ref<T> | undefined,
>   init: () => R,
>   deps?: DependencyList,
> ): void;
> ```

`Imperative`是急切的意思，`useImperativeHandle`这个 hook 接受三个参数：

- `ref`对象；
- 一个函数，这个函数会**在子组件渲染完以后执行**，返回的值都会挂载在`ref.current`对象上供外界获取；
- `DependencyList`就是类似于`useEffect`等 hook 的处理机制，当`DependencyList`发生变化的时候就调用上面的函数，更新`ref.current`上的属性

使用`useImperativeHandle`结合`useRef`暴露子组件内部成员时，需要注意以下几点：

- 子组件接收的`ref`需要和其他`props`分开，这个`ref`将单独作为`useImperativeHandle`的第一个参数
- 子组件需要通过`React.forwardRef`高阶组件包裹起来，就直接把子组件放在`forwardRef`里面就可以了
- 父组件内部需要判断`ref.current`属性的空值，这个问题的原因是`useImperativeHandle`内部传递的方法会在组件渲染完以后执行

<code src="@/demo/hooks/useRef" />

### 缓存不变值

### 我该如何测量 DOM 节点

> [Hooks FAQ – React (reactjs.org)](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node)
