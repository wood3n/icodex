---
title: useContext数据流管控
---

## Context

`Context`在 React 是一个专门用来管控全局数据流的方式，它就是一个组件，`react-redux`就是`Context`实现的。

在最初的`Context`中存在以下概念：

- `Provider`：容器组件，其只接收一个`value`的`props`，其内部包裹的子组件都可以获取到`value`的更新并选择订阅
- `Consumer`：`Consumer`内部必须且其实就是一个函数组件，该函数组件的`props`就是`Provider`提供的`value`，因此函数组件可以根据`value`的变化来更新 UI

## useContext 简介

> ```typescript
> interface Context<T> {
>   Provider: Provider<T>;
>   Consumer: Consumer<T>;
>   displayName?: string;
> }
>
> function useContext<T>(context: Context<T>): T;
> ```

`useContext`属于 React hooks 对`Context`概念的简洁实现，其接受`Context`对象本身作为参数，返回`Context`中所有共享的值。

在以往的`class`组件中，如果要获取共享的数据流，必须由`Consumer`包裹并返回新的子组件，这种方式看起来让人困惑，例如：

```jsx | pure
const ThemeContext = React.createContext('light');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };
  }

  render() {
    // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
    // 而外部的组件使用默认的 theme 值
    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar />
        </ThemeContext.Provider>
      </Page>
    );
  }
}

function Toolbar() {
  // Theme Toggler 按钮不仅仅只获取 theme 值，它也从 context 中获取到一个 toggleTheme 函数
  return (
    <ThemeContext.Consumer>
      {theme => <span>{theme}</span>}
    </ThemeContext.Consumer>
  );
}
```

如果用`useContext`实现则非常简洁，只需要三步：

- 使用`React.createContext`创建`Context`对象
- 使用`Context.Provider`包裹组件本身
- 使用`useContext`获取`Context`对象内部的`state`

```jsx | pure
const ThemeContext = React.createContext('light');

const App = () => {
  const [theme, setTheme] = useState('light');

  return (
    <Page>
      <ThemeContext.Provider value={theme}>
        <Toolbar />
      </ThemeContext.Provider>
    </Page>
  );
};

function Toolbar() {
  const theme = useContext(ThemeContext);

  return (
    <ThemeContext.Consumer>
      <span>{theme}</span>
    </ThemeContext.Consumer>
  );
}
```

## 使用 useContext 共享 state

React hooks 一个最大的特点就是十分便捷得实现`state`共享，在过去`class`组件中要获取组件内部的`state`是十分不容易的事情，可能要使用`ref`，`HOC`，`render props`这些方法：

- `ref`本身看起来很方便，但是也十分不易于管理，组件实例所有的方法都将暴露在`ref.current`内部；并且`ref`在高阶组件内部需要使用`forwardRef`转发，否则高阶组件内部子组件将获取不到`ref`
- `HOC`高阶函数组件看起来比较高级，但是多个 HOC 嵌套导致的结果是不知道组件内部的`props`来自于哪个函数了，不利于维护。
- `render props`就是将`state`作为参数通过接收的`props`的一个函数`props`传递出去的方式，写法繁琐，逻辑看起来真的比较绕。

通过自定义 hooks 可以完全将 UI 组件内部的`state`剥离出来，但是这也存在一个问题，每次`state`更新实际是重新执行一次函数调用，其内部的`state`将会丢失，那么这时候就可以通过`useContext`和自定义 hook 结合来共享`state`。

<iframe src="https://codesandbox.io/embed/buzouqiehuan-antd4100-forked-h9c4y?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="步骤切换 - antd@4.10.0 (forked)"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## useContext 和 useReducer

使用`useContext`和`useReducer`结合可以打造秒杀`redux`的数据流，十分简洁

<iframe src="https://codesandbox.io/embed/buzouqiehuan-antd4100-forked-hje8o?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="步骤切换 - antd@4.10.0 (forked)"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
