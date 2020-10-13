---
title: Hook学习
---

## React Hook

React Hook 是应用在函数组件中的一套状态管理函数，如果要使用原生 Hook，首先需要从`react`部分`import`这些原生 Hook API

```typescript
import React, { useState, xxx } from 'react';
```

### useState

> ```typescript
> function useState<S>(
>   initialState: S | (() => S),
> ): [S, Dispatch<SetStateAction<S>>];
> ```

`useState`替代`class`组件内部的`setState`，语法上来说更为简洁，在后续的重新渲染中，`useState` 返回的第一个值将始终是更新后最新的`state`，而第二个值充当`setState`的作用，用于更新`state`。

> ```typescript
> const [state, setState] = useState(initState);
>
> const [state, setState] = useState(() => initState);
>
> // 直接传入新的state值
> setState(newState);
>
> // 传入一个函数，接收旧的state，返回新的state
> setState(prevState => newState);
> ```

这里以一个简单的计数组件来看

```typescript
import React, { useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(prevCount => ++prevCount);
  };

  return (
    <>
      <p>{count}</p>
      <button onClick={handleClick}>add</button>
    </>
  );
};
```

关于`useState`需要注意的点：

#### 永远不要直接修改`state`

类似于在`class`组件中的`setState`，始终保证`state`是`immutable`的，如果`state`是多层嵌套的结构，可能要借助`immutablejs`来方便修改其内部的值。

例如，上面的很容易会像下面这样直接修改`count`的值

```typescript
setCount(++count);
```

由于这里使用`const`声明的，所以这么做首先会直接报错，然后可能会想到改成`let`，改成`let`以后，就不会报错了，组件也能正常工作，然后就掉坑里了 🤣 🤣 🤣。

```typescript
let [count, setCount] = useState(0);
```

#### `useState`是覆盖更新

如果直接往`useState`传递一个新的`state`值，会直接覆盖掉之前的`state`，而不是像`class`组件内部的`setState`那样会自动合并`state`。

在开发过程中，使用`Object`类型的`state`是十分常见的，如果在一个 Hook 的`state`中管理所有组件依赖的值，而每次直接往`useState`传递一个新的`state`值，这就可能导致组件发生不必要的更新。

可以使用 ES 的展开运算符`...`或者其它浅拷贝的方法来合并`state`

```jsx | pure
interface Person {
  name?: string;
  age: number;
}

// 函数组件-hook
export default () => {
  let [person, setPerson] = useState < Person > { name: 'oxygen', age: 23 };

  const handleClick = () => {
    // 直接覆盖
    setPerson({ age: 30 });

    // 使用展开运算符进行合并
    setPerson(prevState => ({ ...prevState, age: 30 }));
  };

  return (
    <>
      <p>姓名：{person.name}</p>
      <p>年龄：{person.age}</p>
      <button onClick={handleClick}>update</button>
    </>
  );
};
```

#### `useState`是异步更新

和`setState`的机制相似，`useState`仍然采用队列更新机制，这意味着有时候无法及时获取最新的`state` —— [何时以及为什么 `setState()` 会批量执行？](https://stackoverflow.com/a/48610973/458193)

### useEffect

> ```typescript
> type EffectCallback = () => void | (() => void | undefined);
>
> type DependencyList = ReadonlyArray<any>;
>
> function useEffect(effect: EffectCallback, deps?: DependencyList): void;
> ```

`useEffect`的第一个参数必须是一个函数；第二个参数可选，是一个数组，内部包含一系列参数，只有这些参数发生变化的时候，指定给`useEffect`的函数才会执行。如果不传递第二个参数，该函数会在组件第一次渲染完成以及以后每次更新以后都执行，传递不同的参数，可以让`useEffect`模拟`class`组件内部的`componentDidMount`，`componentDidUpdate`以及`componentWillUnmount`这些生命周期函数。

#### 模拟 componentDidMount

指定`useEffect`的第二个参数为一个空数组`[]`，可以限制`useEffect`中传递的函数只在组件第一次渲染完成以后执行。这样就可以将函数用于获取数据，或者直接操作 DOM 了。

```typescript
useEffect(() => {
  // 拉取数据
  // 获取DOM等
}, []);
```

#### 模拟 componentWillUnmount

单页面应用的组件设计中最容易发生错误就是内存泄漏，比较常见的有定时器未清除，DOM 事件监听函数未清除，异步请求还未响应组件就已经被卸载了等等。通过指定`useEffect`第一个参数的函数**返回一个清除这些副作用的函数**，可以达到`componentWillUnmount`的目的，这些返回的函数会在组件卸载的时候执行。

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

#### 性能优化

这里说的性能优化，并不是优化组件的性能，而是优化传递到`useEffect`的函数的执行时机，通过传递指定的`state`为第二个参数，可以限制该函数只在通过`useState`返回的函数修改该`state`以后才去执行

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

### useMemo

> ```typescript
> type DependencyList = ReadonlyArray<any>;
>
> function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T;
> ```

`useMemo`具有两个必传参数，第一个参数是一个函数，该函数需要返回一个值，并且该值也作为`useMemo`的返回值；第二个参数是依赖项数组，标识仅在某个依赖项改变时才重新计算 memoized 值。

`useMemo`相当于`shouldComponentUpdate`，也就是用来进行性能优化的点，具体用法如下：
