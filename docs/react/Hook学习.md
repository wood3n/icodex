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

`useEffect`的第一个参数必须是一个函数；第二个参数可选，是一个数组，内部包含一系列参数，只有这些参数发生变化的时候，指定给`useEffect`的函数才会执行。

如果不传递第二个参数，在浏览器完成布局与绘制**之后**，传给 `useEffect` 的函数会延迟调用。通过传递不同的参数，可以让`useEffect`模拟`class`组件内部的`componentDidMount`，`componentDidUpdate`以及`componentWillUnmount`这些生命周期函数。

#### 模拟 componentDidMount

指定`useEffect`的第二个参数为一个空数组`[]`，可以限制`useEffect`中传递的函数只在组件第一次渲染完成以后执行，因为`useEffect`第二个参数是依赖更新的参数，传递`[]`就表示任何时候都没有依赖值发生变化，所以就保证了只在组件渲染完成以后执行。

这样就可以将函数用于获取数据，或者直接操作 DOM 了。

```typescript
useEffect(() => {
  // 拉取数据
  // 获取DOM等
}, []);
```

#### 模拟 componentWillUnmount

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

#### 性能优化

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

### useMemo

> ```typescript
> type DependencyList = ReadonlyArray<any>;
>
> function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T;
>
> eg：
> function computeExpensiveValue(a, b){
>   return computedValue;
> }
>
> const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
> ```

`useMemo`具有两个必传参数，第一个参数是一个函数，该函数需要返回一个值，并且该值也作为`useMemo`的返回值；第二个参数是依赖项数组，标识仅在某个依赖项改变时才重新计算 memoized 值。

`useMemo`和`useEffect`的区别如下：

- `useMemo`会在组件加载完成**之前**执行，也就是函数的`return`前执行
- `useMemo`第二个参数必传，如果传入一个空数组，那么`useMemo`只会在函数组件加载前执行一次；如果传入依赖项的参数，那么`useMemo`会在首次渲染前执行一次，以后只会在每次依赖参数变化时才去执行计算，这点和`useEffect`倒是很相似
- `useMemo`旨在缓存一些耗费性能的计算函数过程，传入的函数始终会接收最新的`state`或者`props`，并且其返回值也会作为执行`useMemo`的返回值，所以`useMemo`相当于`shouldComponentUpdate`，在过去的`class`组件中，`shouldComponentUpdate`接收两个参数，最新的`props`和最新的`state`，然后内部根据计算判断返回`true`或者`false`来通知组件是否需要更新

```typescript
shouldComponentUpdate(nextProps,nextState){
  // 对比当前state和协议阶段更新的state值
  if(nextState.Number == this.state.Number){
    return false
  }
}
```

现在`useMemo`也可以做`shouldComponentUpdate`的事，在组件下一阶段更新渲染前计算依赖参数的变化情况，然后返回计算值，如果将计算值作为组件的参数，计算值只要不变化，组件就不会再次更新渲染

```typescript
import React, { useState, useMemo } from 'react';

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  const memorizedCount = useMemo(() => {
    return 0;
  }, [count]);

  return (
    <div>
      <p>You clicked {memorizedCount} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

export default Counter;
```

例如上面的`useMemo`始终返回的是`0`，点击按钮，`state`依旧更新，但是组件依赖的值是计算出来的`memorizedCount`，所以组件始终不会更新。

### useCallback

> ```typescript
> type DependencyList = ReadonlyArray<any>;
>
> function useCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList): T;
>
> eg：
> const memoizedCallback = useCallback(
>   () => {
>     doSomething(a, b);
>   },
>   [a, b],
> );
> ```

`useCallback`和`useMemo`思想基本是一致的，用于函数计算的优化，唯一区别就是：

- `useCallback`对函数进行缓存，所以`useCallback`传入函数本身，然后返回函数；而`useMemo`对值进行缓存，虽然传入函数，但是返回值；`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`

```typescript
const undoList = useMemo(() => {
  return listData.filter(item => !item.done);
}, [listData]);

const undoList = useCallback(() => {
  return listData.filter(item => !item.done);
}, [listData]);
```

`useMemo`传递的函数返回什么，它本身就返回什么

![image-20201018204350114](../images/image-20201018204350114.png)

`useCallback`本身传递的是函数，**返回的也是函数，所以结果需要二次调用**

![image-20201018204414602](../images/image-20201018204414602.png)

### useRef

> ```typescript
> interface MutableRefObject<T> {
>   current: T;
> }
>
> function useRef<T = undefined>(): MutableRefObject<T | undefined>;
>
> // 对于使用了初始值定义的版本，类型定义如下
> interface RefObject<T> {
>   readonly current: T | null;
> }
>
> function useRef<T>(initialValue: T | null): RefObject<T>;
> ```

`useRef`返回一个可变的`ref`对象，其 `.current` 属性可以被初始化为传入的参数（`initialValue`），返回的`ref`对象在组件的整个生命周期内保持不变，当`ref`对象内容发生变化时，`useRef` 并不会通知组件，**变更 `.current` 属性更不会引发组件重新渲染**。

和`class`组件内部的`ref`具有以下相同的用法：

- 传入原生 HTML 标签定义中，获取原始 DOM，`ref`的`props`类型需要在`useRef`中定义，对于获取原生 DOM，则传入`useRef`的类型基本都来自于在`React`中定义的 DOM target 类型，例如`HTMLInputElement`，这里需要注意以下初始值指定`null`，否则`ref`属性会报错

```typescript
const Input: React.FC = () => {
  // 声明ref
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 判断是否为空
    inputRef.current && inputRef.current.focus();
  }, []);

  return <input ref={inputRef} />;
};
```

这样就可以通过`ref.current`属性获取原生 DOM 对象，不过需要注意`ref.current`判断是否为`null/undefined`，否则直接使用属性可能会报错。

![image-20201018213232057](../images/image-20201018213232057.png)

- 缓存不变值，`useRef`函数本身会返回一个始终不变的`ref`对象，用`ref.current`来缓存值是不错的选择，常见的用法就是用来保存一些函数内部需要的全局变量，例如定时器 Id，或者在上层组件中保存表单值等，不过仍然像开头介绍的那样，即使在组件中改变了`useEffect`返回的`ref.current`属性，组件依赖它的话也不会发生更新

```typescript
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

### useContext

> ```typescript
> interface Context<T> {
>   Provider: Provider<T>;
>   Consumer: Consumer<T>;
>   displayName?: string;
> }
>
> function useContext<T>(context: Context<T>): T;
> ```

`useContext`仍然用于跨组件层级共享值，使用方法和`class`组件的`Context`差不多，步骤如下：

- 使用`React.createContext`创建并导出一个`context`对象，同时需要为其指定一个默认值，这样 TypeScript 可以推断其类型
- 使用`Context.Provider`包裹外层组件，并提供`value`属性作为共享值，这样在`Context.Provider`包裹下的所有子组件都可以获得`context`对象共享的值
- 当其他子组件需要使用共享值时，就直接通过`useContext`获取`context`对象即可，`value`指定的是什么，`useContext`返回的就是什么

`useContext`接收一个`context`对象（`React.createContext` 的返回值）并返回该`context`的当前值

```typescript
export const MyContext = React.createContext({ value: 'test' });

const Parent: React.FC = () => {
  return (
    <MyContext.Provider value={{ value: '测试' }}>
      <Child />
    </MyContext.Provider>
  );
};

const Input = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const myContext = useContext(MyContext);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  return <input ref={inputRef} value={myContext.value} />;
};
```

### useLayoutEffect

> ```typescript
> type EffectCallback = () => void | (() => void | undefined);
>
> type DependencyList = ReadonlyArray<any>;
>
> function useLayoutEffect(effect: EffectCallback, deps?: DependencyList): void;
> ```

`useLayoutEffect`和`useEffect`的语法相同，唯一的区别就是`useEffect`总是在 DOM 渲染完以后执行，但是`useLayoutEffect`会在浏览器执行绘制之前，其内部的更新计划将被**同步刷新**
