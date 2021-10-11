## Promise/A+

> https://promisesaplus.com/#terminology

### Promise 对象

- 一个对象或者函数，并且带有`then`方法
- 一个当前状态`state`，可以是`pending`、`fulfilled`和`rejected`，且`fulfilled`和`rejected`不可被改变
- 一个`resolve`值`value`，可以是任何 JS 值的形式
- 一个执行`reject`的原因`reason`

### 初始化

Promise 对象在初始化以后，具有以上提到的`value`，`state`以及`reason`等状态值

```js
class APromise {
  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new TypeError('init parameter must be a function');
    }

    this.state = 'pending';
    this.value = null;
    this.reason = null;
  }

  resolve(value) {
    if (this.state === 'pending') {
      this.state = 'fulfilled';
      this.value = value;
    }
  }

  reject(reason) {
    if (this.state === 'pending') {
      this.state = 'rejected';
      this.reason = reason;
    }
  }
}
```

### then 方法的实现

> `newPromise = promise.then(onFulfilled, onRejected)`

`then`方法接收两个参数，且必须都是函数，否则忽略该参数

- `onFulfilled`：当前 Promise 对象的状态变成`fulfilled`以后执行，并且将`value`作为第一个参数，并且只允许执行一次
- `onRejected`：当前 Promise 对象的状态变成`rejected`以后执行，并且将`reason`作为第一个参数，并且只允许执行一次

- `onFulfilled`和`onRejected`必须在当前宏任务执行完以后才能执行，也就是异步的需求
- 同一个 Promise 对象的`then`方法可能调用多次，期望是在 Promise 对象的状态变成`fulfilled`以后，按顺序执行所有注册的`then`里的`onFulfilled`；同理`onRejected`也是
- `then`执行完**返回一个新的 Promise 对象**`newPromise`：
  - 如果`onFulfilled`或者`onRejected`返回新的值`x`，则执行下文的方法`Resolve(newPromise, x)`
  - 如果`onFulfilled`或者`onRejected`执行抛出异常`e`，`promise2`也必须`reject(e)`
  - 如果`onFulfilled`不是函数（未提供），则当`promise`状态变成`fulfilled`的时候，`newPromise`内部状态也要变成`fulfilled`并以`promise`内部的`value`执行`resolve`；同理`onRejected`也是

在上述代码的基础上，添加`then`方法

```js
class APromise {
  constructor(fn) {
    this.state = 'pending';
    this.value = null;
    this.reason = null;

    fn(this.resolve, this.reject);
  }

  then = (onFulfilled, onRejected) => {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;

    return new APromise();
  };

  resolve = value => {
    if (this.state === 'pending') {
    }
    this.value = value;
  };

  reject = reason => {
    this.reason = reason;
  };
}
```

### Resolve(promise, x)

`Resolve(promise, x)`这里是描述`then`执行以后的算法判断，也就是`then`的反复执行过程，这是一个特殊的内部方法，是处理`then`链式执行的算法；

- 如果`promise === x`，直接`reject promise`并返回`TypeError`的错误；
- 如果`x`是一个 Promise 对象，则当前 Promise 对象`promise`的状态必须和`x`同步；
- 如果`x`是一个对象或者函数：
  - 判断其是否具有`then`方法；
  - 如果没有，则`reject`；
  - 如果具有`then`，则使用`x`作为`then`内部的`this`执行`then`，第一个参数传递`resolvePromise`，第二个参数传递`rejectPromise`
    - 当`resolvePromise`被传递参数`y`调用的时候，执行`Resolve(promise, y)`
    - 当`rejectPromise`被传递参数`r`调用的时候，则`promise`也`reject`
    - 如果`resolvePromise`和`rejectPromise`都被调用了，或者被多次调用，首次调用优先执行，后续被忽略；
    - 如果执行`then`抛出异常，当`resolvePromise`或者`rejectPromise`被调用了，则忽略；否则`reject`顶层的`promise`
- 如果`x`不满足上述条件，`promise`直接`fulfilled`

// todo

## Promise 并发控制

Promise 控制并发控制在业务场景或者面试题里非常常见
