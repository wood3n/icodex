---
title: utility
---

## 防抖

```javascript
const debounced = (fn, timeout, immediate) => {
  let timerId;
  return function(...args) {
    // 判断是否第一次执行，这一步必须要下面的timerId = null来配合
    if (immediate && !timerId) {
      fn(...args);
    }

    // 清除上一次的定时任务
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn(...args);
      // 清除最后的定时器Id
      timerId = null;
    }, timeout);
  };
};
```

## 节流

```javascript
const throttled = (fn, delay) => {
  let lastInvokeTime = 0,
    timerId;
  return function(...args) {
    // 保证立即执行一次
    let timeout = Date.now() - lastInvokeTime;
    if (timeout >= delay) {
      lastInvokeTime = Date.now();
      fn(...args);
    } else {
      // 这部分是保证最后执行一次
      if (timerId) {
        clearTimeout(timerId);
      }

      timerId = setTimeout(() => {
        lastInvokeTime = Date.now();
        timerId = null;
        fn(...args);
      }, delay);
    }
  };
};
```

## New

```javascript
function create(Constructor) {
  const obj = Object.create(Constructor.prototype);

  Constructor.apply(obj, [...arguments].slice(1));

  return obj;
}
```

## Partial 函数(偏函数)

**根据已有的函数创建一个指定了部分参数的函数**

```javascript
function partial(fn, ...args) {
  return function(...restArgs) {
    return fn.apply(this, [...args, ...restArgs]);
  };
}
```

## curry 函数（柯里化）

函数柯里化是自动实现偏函数的应用，偏函数只负责创建**一个**新的函数，它不会判断初始指定的参数有多少个，没指定的部分会全部返回，在新函数的下一次调用就会用上，并返回新函数的调用结果，而柯里化的函数则会判断已经传入的参数的个数，**如果给定的参数少于其正确数目的参数，则返回处理其余参数的函数**；当函数获得最终参数时，就调用它返回结果。

```javascript
function curry(fn) {
  return function curried(...args) {
    // 提供的参数个数等于原始函数的参数个数，则直接返回函数执行的结果
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    // 否则返回提供剩余参数的函数
    return function(...restArgs) {
      return curried(...args, ...restArgs);
    };
  };
}
```

## 复合函数（compose function）

复合函数是高阶函数的一种，将一系列函数组合起来，然后返回一个新的函数。当调用新函数的时候，原来组合的函数会按照顺序执行，并且前一个函数返回的结果作为后面一个函数的参数，最后一个执行的函数的结果就是最终的结果。
应用上来说，`compose`函数可以提高代码的可读性，最常见的就是`redux`内部的`compose`函数来实现组合中间件的执行，也被称为洋葱模型的实现。
注意这里的执行顺序，并不是按照组合函数的数组元素顺序来的，根据洋葱模型的机制，函数是从内到外执行。

### compose function

```javascript
function compose(...fns) {
  return fns.reduce((a, b) => (...args) => a(b(...args)));
}

function compose(...fns) {
  return value => fns.reduceRight((acc, fn) => fn(acc), value);
}
```

```javascript
const inc = n => n + 1;

const double = n => n * 2;

// 注意执行顺序
compose(double, inc) === double(inc());
console.log(compose(double, inc)(2)); // 6

compose(inc, double) === inc(double());
console.log(compose(inc, double)(2)); // 5
```

### Promise 串行

其实 Promise 串行可以直接使用`async`和`await`来组织代码顺序

```javascript
function chainPromise(promises, ...args) {
  return promises.reduce(
    (promiseChains, promise) => promiseChains.then(promise),
    Promise.resolve(...args),
  );
}
```

```javascript
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5);
  });
}

// promise function 2
function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2);
  });
}

// promise function 3
function p3(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4);
  });
}

chainPromise([p1, p2, p3], 10); // 400
```

## URL 解析

> [url - How can I get query string values in JavaScript? - Stack Overflow](https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript)

`URL`的参数部分解析在过去其实是比较常见的业务场景，有很多种方法实现：

### [原生`URL`接口](https://developer.mozilla.org/en-US/docs/Web/API/URL)

```javascript
// https://some.site/?id=123
const parsedUrl = new URL(window.location.href);
console.log(parsedUrl.searchParams.get('id')); // "123"
```

### [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

专门用来操作 URL 查询字符串部分的接口，缺点是 IE 浏览器不支持这个接口。

```javascript
const paramsString = 'q=URLUtils.searchParams&topic=api';
const searchParams = new URLSearchParams(paramsString);

searchParams.get('topic') === 'api'; // true
searchParams.getAll('topic'); // ["api"]
searchParams.get('foo') === null; // true
```

### 原生实现

原生 JS 实现，使用`decodeURIComponent`是因为 URL 只允许 ASCII 字符，浏览器会对其余字符进行百分百编码，所以要解码获取正常的参数值

```javascript
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
```

用`split`也可以

```javascript
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
}
```

## ajax

侠义的`ajax`以`XMLHttpRequest`为核心来实现，再加上`Promise`

```javascript
function ajax({ method, url, async = true }) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, async);

    xhr.onreadystatechange = function() {
      // 完成状态
      if (xhr.readyState == XMLHttpRequest.DONE ?? 4) {
        // 判断请求结果
        if ((xhr.status >= 200) & (xhr.status < 400)) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      }
    };

    xhr.send();
  });
}
```

## 数组去重

```javascript
function uniq(target) {
  return [...new Set(target)];
}
```

```javascript
function uniq(target) {
  return target.reduce((result, item) => {
    if (!result.includes(item)) {
      result.push(item);
    }

    return result;
  }, []);
}
```

## 数组拍平

```javascript
function flat(target) {
  return target.flat(Number.POSITIVE_INFINITY);
}
```

```javascript
function flat(target) {
  return target.reduce((result, item) => {
    if (Array.isArray(item) && item.length) {
      return [...result, ...flat(item)];
    }

    return [...result, item];
  }, []);
}
```

## 比较两个对象是否相同

### lodash.isEqual

[lodash.isEqual](https://www.lodashjs.com/docs/lodash.isEqual) 这个方法可用于根据两个对象自有属性中可枚举属性的值是否相等来判断两个对象是否相等。

### assert.deepStrictEqual

`assert.deepStrictEqual`是 NodeJS 内部提供的用于比较两个对象，也是针对对象的自有属性的可枚举属性进行比较。

### 原生实现

在仅考虑对象自有属性的可枚举属性基础之上，思路如下：

- 首先判断两个对象引用地址，可以用`Object.is`或者`===`

- 然后判断两个对象属性长度，属性长度不相等则一定不相等；
- 使用`Object.prototype.toString`判断属性值的准确类型；原始值类型直接使用`===`判断值是否相等，引用类型根据情况区分

```js
function getType(v) {
  return Object.prototype.toString.call(v);
}

function equal(a, b) {
  // 引用地址判断
  if (Object.is(a, b)) {
    return true;
  }

  const kvA = Object.entries(a);
  const kvB = Object.entries(b);
  // 比较属性长度
  if (kvA.length !== kvB.length) {
    return false;
  }

  let result = false;
  for (let [kA, vA] of kvA) {
    // 具有相同属性且属性值类型相同
    if (b.hasOwnProperty(kA) && getType(vA) === getType(b[kA])) {
      // 原始值类型，这里排除Symbol和BigInt
      if (
        [
          '[object Boolean]',
          '[object Number]',
          '[object Undefined]',
          '[object String]',
          '[object Null]',
        ].includes(getType(vA))
      ) {
        result = Object.is(vA, b[kA]);
      }

      // 数组或者对象，递归比较属性值
      if (['[object Array]', '[object Object]'].includes(getType(vA))) {
        result = equal(vA, b[kA]);
      }

      // Date，转成 Number 比较
      if (getType(vA) === '[object Date]') {
        result = +vA === +b[kA];
      }

      // RegExp，转成 string
      if (getType(vA) === '[object RegExp]') {
        result = String(vA) === String(b[kA]);
      }
    } else {
      // 这里遇到不相等的属性值，直接结束循环返回结果
      return false;
    }
  }

  return result;
}
```
