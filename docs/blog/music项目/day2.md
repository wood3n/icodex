## ipc

`ipc`也就是`interProcess communication`，进程间通信，在`electron`中存在着[主进程和渲染进程](https://www.electronjs.org/docs/tutorial/quick-start#%E4%B8%BB%E8%BF%9B%E7%A8%8B%E5%92%8C%E6%B8%B2%E6%9F%93%E5%99%A8%E8%BF%9B%E7%A8%8B)，主进程也就是启动`electron`窗口的程序，渲染进程也就是一个网页，渲染进程通过 IPC 与主进程**通信**在网在页上执行 GUI 操作，例如缩放、关闭`electron`窗口等。

## 主进程注册事件

要想实现渲染进程和主进程的通信，需要首先通过`ipcMain`在主进程中注册事件，例如注册调用`electron` API的放大事件，可以在`electron`的主脚本文件中创建一个`window`的同时注册，也就是调用`new BrowserWindow`之后。

```javascript
// main.js
const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow() {
  let mainWindow = new BrowserWindow({});
  
  ipcMain.on('maximize', (event, arg) => {
    mainWindow.maximize();
    event.reply('maximize-reply');
  });
}

// 在electron app初始化的时候即创建一个窗口
app.whenReady().then(createWindow);
```

##  渲染进程发送事件

在渲染进程，也就是网页 JS 代码中通过`ipcRenderer`发送事件。

```typescript
const { ipcRenderer } = window.require('electron');

function maximize(afterMaximize?: () => void) {
  ipcRenderer.on('unmaximize-reply', (event, arg) => {
    afterMaximize?.();
  });
  ipcRenderer.send('maximize');
}
```

如果在`typescript`中使用，还需要为`window`编写类型声明

```typescript
declare global {
  interface Window {
    require: (
      module: 'electron'
    ) => {
      ipcRenderer: IpcRenderer;
      remote: Remote;
    };
  }
}
```

## 常用事件的注册

```javascript
// 最大
ipcMain.on('maximize', (event, arg) => {
  console.log(mainWindow.isMaximized());
  mainWindow.maximize();
  event.reply('maximize-reply');
});

// 缩小
ipcMain.on('unmaximize', (event, arg) => {
  mainWindow.unmaximize();
  event.reply('unmaximize-reply');
});

// 最小化
ipcMain.on('minimize', (event, arg) => {
  mainWindow.minimize();
  event.reply('minimize-reply');
});

// 关闭窗口
ipcMain.on('closeApp', (event, arg) => {
  mainWindow.close();
  app.quit();
  event.reply('closeApp-reply');
});

// 当网页渲染完显示窗口
ipcMain.on('page-loaded', (event, arg) => {
  mainWindow.show();
  event.reply('loaded-reply');
});
```

为了防止网页加载过程中先打开`electron`窗口的长时间空白，可以通过事件注册机制在网页加载完成以后向`electron`主线程发送打开窗口的命名，也就是上端代码的`page-loaded`事件。



