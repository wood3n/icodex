## DOM事件的捕获和冒泡机制

![image](https://user-images.githubusercontent.com/31716713/129870638-e1cfaf60-c41e-4243-8cb7-d71a88958134.png)

图源 - [w3 - events](https://www.w3.org/TR/2003/NOTE-DOM-Level-3-Events-20031107/events.html)

### 捕获阶段（capture）

根据 w3 规范中的描述，DOM 事件在触发过程是从根元素开始调度，直到到达目标事件元素。在这个过程中会发生捕获，触发，冒泡三个阶段。
捕获阶段中，DOM 事件会从根元素`html`开始，检测其是否具有相同的事件监听机制，例如在内部`div`上设置的`onClick`事件，如果在`html`上也设置了，那么同样会涉及调度。
这个过程会从`html`开始逐层向目标事件元素的祖先元素调度，直到到达目标事件元素。

### 触发阶段

在到达事件设置的目标元素以后，会触发目标元素的监听函数调用。

### 冒泡阶段（bubble）

冒泡阶段则是从目标事件元素开始，按照 DOM 树的结构，从里向外调度的过程，直到回到根元素`html`上。
在现代浏览器中，所有事件的注册都默认会执行冒泡过程。当然了，如果在事件注册时设置禁止冒泡的选项，这个冒泡过程就不会发生。
可以通过事件对象的实例属性[Event.bubbles](https://developer.mozilla.org/en-US/docs/Web/API/Event/bubbles)来判断事件是否处于冒泡阶段。

## 事件注册

事件监听的注册方式具有以下几种方式：

### 元素的事件处理器属性

```javascript
const btn = document.querySelector('button');

btn.onclick = function() {
  const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
}
```
### addEventListener

可以直接在`document`上调用`addEventListener`，当然也可以在具体 DOM 元素上。`addEventListener`具有两种类型 API，主要区别在于方法传递的第三个参数类型

> target.addEventListener(type, listener, options);

- `type`：指定[事件类型](https://developer.mozilla.org/zh-CN/docs/Web/Events)的字符串
- `listener`：设置监听函数
- `options`：一个对象，可以指定以下属性
1. `capture`：默认`false`，表示 listener 是否会在该类型的事件捕获阶段传播到该 EventTarget 时触发；
2. `once`：默认`false`，表示 listener 在添加之后是否最多只调用一次；如果是 `true`， listener 会在其被调用之后自动移除；
3. `passive`：默认`false`，表示 listener 是否永远不会调用 preventDefault()。当设置为`true`时，如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。

根据规范，`passive` 选项的默认值始终为`false`。但是，这引入了移动端在处理某些触摸事件（以及其他）的事件监听器在尝试处理滚动时阻止浏览器的主线程的可能性，从而导致滚动处理期间性能可能大大降低。
为防止出现此问题，某些浏览器（特别是Chrome和Firefox）已将文档级节点`Window`，`Document`和`Document.body`的`touchstart`和`touchmove`事件的`passive`选项的默认值更改为`true`。
这可以防止调用事件监听器，因此在用户滚动时无法阻止页面呈现，提升性能。见 - https://developers.google.com/web/updates/2016/06/passive-event-listeners

4. `signal`：一个[`AbortSignal`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal)对象，如果该对象的`abort()`方法被调用，则当前监听器也会被移除。
`AbortSignal`可以中断事件监听器的响应，同时更有用的一个地方是在中断异步请求上，例如下方的`fetch`请求内部传递`signal`对象，当`abort()`被调用时，`fetch`会直接`reject`一个`AbortError`的异常。

```javascript
var controller = new AbortController();
var signal = controller.signal;

var downloadBtn = document.querySelector('.download');
var abortBtn = document.querySelector('.abort');

downloadBtn.addEventListener('click', fetchVideo);

abortBtn.addEventListener('click', function() {
  controller.abort();
  console.log('Download aborted');
});

function fetchVideo() {
  ...
  fetch(url, {signal}).then(function(response) {
    ...
  }).catch(function(e) {
    reports.textContent = 'Download error: ' + e.message;
  })
}
```

> target.addEventListener(type, listener, useCapture);

- `type`：指定[事件类型](https://developer.mozilla.org/zh-CN/docs/Web/Events)的字符串
- `listener`：设置监听函数
- `useCapture`：默认`false`。当`useCapture=true`时，沿着 DOM 树向上冒泡的事件，不会触发listener，也就是冒泡期间不会触发祖先元素的事件调用；

```javascript
const btn = document.querySelector('button');

function bgChange() {
  const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  document.body.style.backgroundColor = rndCol;
}

btn.addEventListener('click', bgChange);
```
### 注意事项

绝大多数情况下都应该使用`addEventListener`来注册事件，这样做有以下优点：

- `addEventListener`方法提供的事件处理选项更加齐全，例如支持处理捕获和冒泡期间的事件触发机制；
- 可以方便的使用`removeEventListener`移出事件处理程序

但是`addEventListener`本身使用不当也会导致一些问题：

#### this 指向问题

如果在`addEventListener`注册的回调函数中使用`this`，需要注意`this`的指向，好在 ES6 以后的箭头函数可以很方便的将`this`的指向总是绑定到 DOM 事件触发的目标元素上。

#### 内存问题

如果是单一的事件注册，一般可以直接在`addEventListener`中创建回调函数，但是对于大量元素注册相同事件的时候，就应该单独创建回调函数，将引用地址传递给`addEventListener`。

## 事件委托

事件委托简单来说就是将目标事件元素的监听器设置到其他元素上来达到事件监听的目的。

事件委托比较常见的情景就是大量列表元素`li`注册事件时委托在其父元素`ul`上去注册，这样里用事件冒泡阶段的处理去触发。

```html
<ul id="parent-list">
	<li id="post-1">Item 1</li>
	<li id="post-2">Item 2</li>
	<li id="post-3">Item 3</li>
	<li id="post-4">Item 4</li>
	<li id="post-5">Item 5</li>
	<li id="post-6">Item 6</li>
</ul>
```

```javascript
document.getElementById("parent-list").addEventListener("click", function(e) {
	// 判断事件触发的目标元素类型
	if(e.target && e.target.nodeName == "LI") {
		console.log("List item ", e.target.id.replace("post-", ""), " was clicked!");
	}
});
```
使用事件委托的好处在于以下几点：
- 简化事件注册并节省内存：无需为大量重复的 DOM 元素添加相同的处理函数；
- 更少的代码：添加或移除元素时，无需添加/移除处理程序。
