---
title: useEffect
---

## API

> ```typescript
> type EffectCallback = () => void | (() => void | undefined);
>
> type DependencyList = ReadonlyArray<any>;
>
> function useEffect(effect: EffectCallback, deps?: DependencyList): void;
> ```

`useEffect`的第一个参数必须是一个函数；第二个参数可选，是一个数组，内部包含一系列参数，只有这些参数发生变化的时候，指定给`useEffect`的函数才会执行。

## 执行时间

根据 React 官网对`useEffect`的介绍，赋值给 `useEffect` 的函数会在组件渲染到屏幕之后执行，那具体是什么时候呢？这里利用`MutabtionObserver`这个 API 监听以下 DOM 的变化过程。

```tsx
```

## 模拟生命周期

如果不传递第二个参数，在浏览器完成布局与绘制**之后**，传给 `useEffect` 的函数会延迟调用。通过传递不同的参数，可以让`useEffect`模拟`class`组件内部的`componentDidMount`，`componentDidUpdate`以及`componentWillUnmount`这些生命周期函数。

### 模拟 componentDidMount

指定`useEffect`的第二个参数为一个空数组`[]`，可以限制`useEffect`中传递的函数只在组件第一次渲染完成以后执行，因为`useEffect`第二个参数是依赖更新的参数，传递`[]`就表示任何时候都没有依赖值发生变化，所以就保证了只在组件渲染完成以后执行。

这样就可以将函数用于获取数据，或者直接操作 DOM 了。

```typescript
useEffect(() => {
  // 拉取数据
  // 获取DOM等
}, []);
```

### 模拟 componentWillUnmount

通过指定`useEffect`第一个参数的函数**返回一个函数**，可以达到`componentWillUnmount`的目的，返回的函数会在组件卸载前执行。这样就可以利用`useEffect`做一些清除组件副作用的操作，例如**清除定时器，清除 DOM 监听事件，清除数据请求的过程**等。

```typescript
let timerId: any;
let value = 0;
const App = () => {
  useEffect(() => {
    timerId = setInterval(() => {
      console.log(value++);
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(timerId); // 返回一个函数，会在组件卸载前执行
    };
  });

  return <h1>Hello world!</h1>;
};
```

### 性能优化

通过传递指定的`state`为第二个参数，可以限制该函数只在通过`useState`返回的函数修改该`state`以后才去执行

```typescript
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    //...
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

##
