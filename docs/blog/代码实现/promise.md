## Promise/A+

> https://promisesaplus.com/#terminology

### Promise 对象

- 一个对象或者函数，并且带有`then`方法
- 一个当前状态`state`，可以是`pending`、`fulfilled`和`rejected`
- 一个`resolve`值`value`，可以是任何 JS 值的形式
- 一个执行`reject`的原因`reason`

### 初始化

Promise 对象在初始化以后，具有以上提到的`value`，`state`以及`reason`等状态值

### then方法的实现

> Promise.prototype.then(onFulfilled, onRejected)

`then`方法接收两个参数，且必须都是函数，否则忽略该参数

- `onFulfilled`：当前 Promise 对象的状态变成`fulfilled`以后执行，并且将`value`作为第一个参数，并且只允许执行一次
- `onRejected`：当前 Promise 对象的状态变成`rejected`以后执行，并且将`reason`作为第一个参数，并且只允许执行一次

- 最重要的一点：`onFulfilled`和`onRejected`必须在当前宏任务执行完以后才能执行
- 同一个 Promise 对象的`then`方法可能调用多次，期望是在 Promise 对象的状态变成`fulfilled`以后，按顺序执行所有注册的`then`里的`onFulfilled`；同理`onRejected`也是
- `then`执行完返回一个新的 Promise 对象`promise2`：
  - 如果`onFulfilled`或者`onRejected`返回新的值，将这个值作为新的`promise2`内部的`value`，并执行`promise2`内部的`resolve`
  - 如果`onFulfilled`或者`onRejected`执行抛出异常，则`promise2`直接`reject`
  - 如果`onFulfilled`不是函数（未提供），则当上层 Promise 对象状态变成`fulfilled`的时候，`promise2`内部状态也要变成`fulfilled`并以上层 Promise 对象内部的`value`执行`resolve`；同理`onRejected`也是

### resolve 方法的实现

> resolve(value)

- `resolve`接收一个回调值作为参数，作为当前 Promise 对象内部的`value`，如果`value`和当前`Promise`对象一样，则抛出`TypeError`的错误，直接`reject`
- 如果`value`是一个 Promise 对象：
  - 当`value`的状态是`pending`的时候，当前 Promise 对象的状态也会保持`pending`
  - 当`value`的状态变成`fulfilled`的时候，当前 Promise 对象的状态也会以`value`在`resolve`时候的`value`作为`fulfilled`的状态值；同理`rejected`也是

- 如果`value`是一个对象或者函数，判断其是否具有`then`方法；如果具有`then`，则执行`then`，并将`value`绑定到`then`

  内部的`this`，第一个参数传递`resolvePromise`，第二个参数传递`rejectPromise`

- 保证同一个 Promise 对象内部的`resolve`和`reject`只会执行一次
- 如果未指定`value`，则 Promise 对象状态变成`fulfilled`即可
