---
title: useRef
---

## 什么是 ref

`ref`是`reference`的缩写，在 React 中表示对组件实例或者 DOM 对象的引用。hook 的设计依然离不开 React 一些基本概念的使用。

### class 组件中的 ref

先来回顾一下`class`组件中`ref`的用法，它具有获取子组件实例或者原生 DOM 的作用，下面这个例子同时演示了使用`ref`获取原生 DOM 以及子组件实例的情况。

<code src="@/demo/hooks/useRef/ClassComp" />

## useRef

### API

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

### 规则

- `useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（`initialValue`）。

- **返回的 `ref`对象在组件的整个生命周期内保持不变**，也就是**`useRef` 会在每次渲染时返回同一个 ref 对象**。
- 变更 `ref` 对象的 `.current` 属性不会引发组件重新渲染。

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

使用`ref`来获取组件内部的方法这种做法一般不推荐使用，因为程序易读性会变得很差。

`ref`一个更常的用法是用来充当`this`，因为`useRef`创建的`ref`对象在函数组件整个生命周期中都不会自动变化，所以常见的就是缓存定时器的`id`，或者 DOM 对象等

```javascript
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  // ...
}
```

### 我该如何测量 DOM 节点

> [Hooks FAQ – React (reactjs.org)](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node)

## ref 的传递

### class 组件传递 ref

`class`组件在传递`ref`上没有特殊的`props`声明，如最上面`class`组件传递`ref`的例子。

### 函数组件传递 ref

函数组件没有`ref`，因为函数组件不存在实例引用这种概念。在函数组件之间传递`ref`通常结合`useImperativeHandle`和`forwardRef`一起使用。

`useImperativeHandle`定义如下，其接受三个参数

```typescript
function useImperativeHandle<T, R extends T>(
  ref: Ref<T> | undefined,
  init: () => R,
  deps?: DependencyList,
): void;
```

- `ref`对象；
- 一个函数，这个函数会**在子组件渲染完以后执行**，返回的值都会挂载在`ref.current`对象上供外界获取；
- `DependencyList`是一个元组，类似于`useEffect`等 hook 的更新处理机制，当`DependencyList`发生变化的时候就调用上面的函数，更新`ref.current`上的属性

`forwardRef`的 API 如下，它是一个高阶组件函数，接收函数组件或者`class`组件作为参数，返回`ref`传递的新组件

```typescript
interface ForwardRefRenderFunction<T, P = {}> {
  (props: PropsWithChildren<P>, ref: ForwardedRef<T>): ReactElement | null;
  displayName?: string;
  defaultProps?: never;
  propTypes?: never;
}

function forwardRef<T, P = {}>(
  render: ForwardRefRenderFunction<T, P>,
): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
```

在`typescript`中使用`forwardRef`的时候，函数组件看起来是下面这种结构：

```typescript
// 定义ref对象的类型
interface RefType {}

// 定义函数组件的props类型
interface Props {}

// ref需要单独从props中拎出来
const Component = React.forwardRef<RefType, PropsType>((props, ref) => {
  return someComponent;
});
```

<code src="@/demo/hooks/useRef" />
