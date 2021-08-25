---
title: utility
---


## 防抖

```javascript
const debounced = (fn, timeout, immediate) => {
  let timerId;
  return function() {
    // 判断是否第一次执行，这一步必须要下面的timerId = null来配合
    const args = [...arguments];
    const self = this;
    if (immediate && !timerId) {
      fn.apply(self, args);
    }

    // 清除上一次的定时任务
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn.apply(self, args);
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
  return function() {
    // 保证立即执行一次
    let timeout = Date.now() - lastInvokeTime;
    const args = [...arguments];
    const self = this;
    if (timeout >= delay) {
      lastInvokeTime = Date.now();
      fn.apply(self, args);
    } else {
      // 这部分是保证最后执行一次
      if (timerId) {
        clearTimeout(timerId);
      }

      timerId = setTimeout(() => {
        lastInvokeTime = Date.now();
        timerId = null;
        fn.apply(self, args);
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

## 深拷贝

```javascript
function cloneDeep(source, hash = new WeakMap()) {
  if (source !== null && typeof source === 'object') {
    //时间类型
    if (Object.prototype.toString.call(source) === '[object Date]') {
      //转时间戳再转回Date
      return new Date(source.valueOf());
    }

    /*这个地方我一开始有误区，以为根据递归，这里键值就是循环引用的对象，所以我发现直接返回source的拷贝结果也一样，之前还见过部分博客就是写的直接返回source，其实不行，因为WeakMap的键实际是对象的指针，直接返回键则还是以前对象的引用，这样拷贝完的对象和源对象内部同名属性持有的还是同一引用，还是会相互影响
     */
    if (hash.has(source)) {
      return hash.get(source);
    }

    //数组和对象
    var result = Array.isArray(source) ? [] : {};

    //这里set一个新对象作为值，然后新对象会经过下面递归的过程填充属性，所以上面的get拿到的是新的对象
    hash.set(source, result);

    Reflect.ownKeys(source).forEach(function(propertyName) {
      if (
        source[propertyName] !== null &&
        typeof source[propertyName] === 'object'
      ) {
        result[propertyName] = cloneDeep(source[propertyName], hash);
      } else {
        result[propertyName] = source[propertyName];
      }
    });

    return result;
  }

  return source;
}
```

## Partial函数(偏函数)

**根据已有的函数创建一个指定了部分参数的函数**

```javascript
function partial(fn) {
  if (typeof fn !== 'function') {
    throw new Error();
  }
  if (arguments.length > 1) {
    // 获取已经指定的参数
    const args = [...arguments].slice(1);
    // 返回处理剩余参数的新函数
    return function() {
      return fn.apply(this, [...arguments, ...args]);
    };
  }
  // 如果没有指定参数，直接返回原函数
  return fn;
}
```

## curry函数（柯里化）

函数柯里化是自动实现偏函数的应用，偏函数只负责创建**一个**新的函数，它不会判断初始指定的参数有多少个，没指定的部分会全部返回，在新函数的下一次调用就会用上，并返回新函数的调用结果，而柯里化的函数则会判断已经传入的参数的个数，如果给定的参数少于其正确数目的参数，则返回处理其余参数的函数；当函数获得最终参数时，就调用它返回结果。

```javascript
function curry(fn, arity = fn.length) {
  if (typeof fn !== 'function') {
    throw new Error();
  }

  return function() {
    if (arguments.length < arity) {
      return curry(fn.bind(this, ...arguments), arity - arguments.length);
    } else {
      return fn.apply(this, [...arguments]);
    }
  };
}
```

## URL解析

> [url - How can I get query string values in JavaScript? - Stack Overflow](https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript)

`URL`的参数部分解析在过去其实是比较常见的业务场景，有很多种方法实现：

### [原生`URL`接口](https://developer.mozilla.org/en-US/docs/Web/API/URL)

```javascript
// https://some.site/?id=123
const parsedUrl = new URL(window.location.href);
console.log(parsedUrl.searchParams.get("id")); // "123"
```

### [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

专门用来操作 URL 查询字符串部分的接口，海量实例方法

```javascript
const paramsString = "q=URLUtils.searchParams&topic=api";

searchParams.get("topic") === "api"; // true
searchParams.getAll("topic"); // ["api"]
searchParams.get("foo") === null; // true
```

### write

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
function ajax({
  method,
  url,
  async = true
}){
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
  
    xhr.onreadystatechange = function(){
      // 完成状态
      if(xhr.readyState == XMLHttpRequest.DONE ?? 4){
        // 判断请求结果
        if(xhr.status >= 200 & xhr.status < 400) {
          resolve(xhr.response);
        } else {
          reject(xhr.response)
        }
      }
    }

    xhr.send();
  })
}
```
