---
title: 和文本有关的CSS属性
---

## CSS 规范

> [CSS Text Module Level 3 (csswg.org)](https://drafts.csswg.org/css-text-3/#word-break-property)

## text-overflow

`text-overflow`，指定如何处理行内溢出容器元素的文本。

需要注意的是`text-overflow`并不会强制文本溢出容器，需要设置`overflow`和`white-space`属性才能做到约束文本溢出，例如：

```css
overflow: hidden;
white-space: nowrap;
```

### clip

`text-overflow:clip`是初始值，·`clip`本身是修剪的意思，也就是正常换行处理。

### ellipsis

以三点`...`(U+2026)表示被修剪掉的文本，如果没有足够的空间显示省略号，则会对其进行裁剪。

### `<string>`👇

`<string>`表示一串自定义显示在修建文本处的字符串。

### fade👇

修剪掉的文本具有淡出效果

### demo

<code src="@/demo/Text/TextOverflow" inline/>

## white-space

`white-space`属性用来处理文本中的空白。通常用于处理一段文本是否进行换行。

### 空格

在 HTML 中，能识别的空格有以下五种：

- `U+0009`：以 tab 键入的制表符
- `U+000A`：Line Feed，换行符，主要用于 Unix 系统，例如 Mac OS，Linux 等；通常来说非 Unix 系统，例如 Windows，换行采取的是双输入：回车+换行，也就是``CRLF`的形式
- `U+000C`：Form Feed，换页符，CTRL+ENTER 键入
- `U+000D`：Carriage Return，回车键入
- `U+0020`：Space，空格键入

根据 [HTML 规范](https://www.w3.org/TR/CSS2/text.html#white-space-prop)的描述，HTML 文档中新的一行以`U+000D`（CR），`U+000A`（LF），或者`U+000D`+`U+000A`（CRLF）的形式开启，其中`U+000A`（LF）必须被识别为换行符，

### normal

`white-space: normal`是初始值，连续的空白符会被合并，换行符会被当作空白符来处理。

### npwrap

连续的空白符会被**合并**，但文本内的换行无效。

### pre

连续的空白符会被**保留**。在遇到换行符或者[`br`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/br)元素时才会换行

### pre-wrap

连续的空白符会被**保留**。在遇到换行符或者[`br`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/br)元素，或者需要为了填充「行框盒子([line boxes](https://www.w3.org/TR/CSS2/visuren.html#inline-formatting))」时才会换行。

### pre-line

连续的空白符会被**合并**，在遇到换行符或者[`br`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/br)元素，或者需要为了填充「行框盒子([line boxes](https://www.w3.org/TR/CSS2/visuren.html#inline-formatting))」时才会换行。

### break-spaces

连续的空白符会被保留。在遇到换行符或者[`br`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/br)元素，或者需要为了填充「行框盒子([line boxes](https://www.w3.org/TR/CSS2/visuren.html#inline-formatting))」时才会换行。

- 任何保留的空白序列总是占用空间，包括在行尾，这样保留的空间占用空间而不会挂起，从而影响行内盒子的尺寸
- 每个保留的空格字符后都存在换行机会，包括空格字符之间

### demo

<code src="@/demo/Text/WhiteSpace" inline/>

## word-break

`word-break`设置是否在文本溢出内容框的任何地方出现换行符，也就是控制是否允许在单词内换行。

### normal

`word-break:normal`是默认值，也就是不会随意对单词进行换行，可能会发生溢出。

### break-all

对于非 CJK（Chinese，Japanese，Korean）文本可在任意字符间进行换行。

### keep-all

CJK 文本不进行换行，非 CJK 文本表现同`word-break:normal`

### break-word

已经废弃的 API，效果是`word-break: normal` 和 `overflow-wrap: anywhere` 的合，不论 [`overflow-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-wrap)的值是多少。

### demo

<code src="@/demo/Text/WordBreak" inline/>

## overflow-wrap/word-wrap

`overflow-wrap`和`word-wrap`是一样的属性，word-wrap 属性原本属于微软的一个私有属性，在 CSS3 现在的文本规范草案中已经被重名为 [`overflow-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-wrap) 。 稳定的谷歌 Chrome 和 Opera 浏览器版本支持这种新语法。

### normal

`overflow-wrap:normal`，不会对长的整个单词进行换行处理，可能发生溢出。

### break-word

表示如果行内没有多余的地方容纳该单词到结尾，则那些正常的不能被分割的单词会被强制分割换行。

### anywhere

为了防止溢出，或者一整个长单词，或者一串 URL，可能会在任意地方截断并换行处理。

### demo

<code src="@/demo/Text/OverflowWrap" inline/>

## line-break

`line-break`设置在使用标点符号和符号时如何中断中文，日文或韩文（CJK）文本的行。

### auto

`line-break:auto`，默认值。

### loose

`line-break:loose`，使用限制最少的换行规则来中断文本。通常用于短线，例如报纸。

### normal

使用最常见的换行规则来中断文本。

### strict

使用最严格的换行规则来中断文本。

### anywhere

任何字符后面都可能进行换行。

### demo

<code src="@/demo/Text/LineBreak" inline/>

## letter-spacing

`letter-spacing`设置文本字符之间的水平间距。字母间距的正值会导致字符散开得更远，而字母间距的负值会使字符更靠近一起。

### normal

`letter-spacing:normal`，默认值，由浏览器以及用户定义的电脑字体决定。

### length

`<length>`是长度单位的统称，可指定在[CSS - length | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/CSS/length)中的不同单位值。

## word-spacing

`word-spacing`设置单词之间和标签之间的间隔长度。

### normal

`word-spacing:normal`，默认值，由浏览器以及用户定义的电脑字体决定。

### length

`<length>`是长度单位的统称，可指定在[CSS - length | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/CSS/length)中的不同单位值。
