---
title: 相对路径和绝对路径
---

## 绝对路径

absolute path，绝对路径，表示从根目录指定文件或目录的位置，绝对路径的表示形式总是以斜杠`/`开头，指向当前所在目录所在的系统盘的根目录。

## 相对路径

relative path，相对路径，表示从当前目录出发寻找的同级目录或者上层目录，通常以`./`或者`.//`开头

- `.`，表示当前目录
- `..`，表示上层目录
- 如果前面不加任何点，仍然表示当前目录

```shell
D://
├─ other.js
├─ web
	├─ dist
    ├─ favicon.ico
    ├─ index.html
    └─ static
      ├─ css
      │	├─ main.css
      ├─ js
      │	├─ main.js
      └─ images
        └─ picture.jpg
```

以这样一个目录结构为例：

在 html 页面存在以下路径表示形式：

- `<script src="/other.js"></script>`
- `<link rel="icon" href="favicon.ico">`或者`<link rel="icon" href="./favicon.ico">`

- `<link rel="stylesheet" href="static/css/main.css">`
- `<img src="static/images/picture.jpg">`

在 CSS 中存在以下图片引入路径：

- `background-image: url("../images/picture.jpg")`

## node 中的路径解析规则

### path.resolve

### path.join

### require.resolve
