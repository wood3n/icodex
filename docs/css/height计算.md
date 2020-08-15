---
title: CSS计算高度
---

> [Calculating heights and margins](https://www.w3.org/TR/CSS22/visudet.html#Computing_heights_and_margins)

#### height

`height`这个属性对除了行内，非可替换元素，table columns，column group 这些元素的其它元素生效，默认值是`auto`。并且`height`指定的是内容区域`content`的高度（在标准盒模型中）。

#### 盒模型的高度计算

`content-box`：

```shell
calculated height = height + padding-top + padding-bottom + border-top + border-bottom + margin-top + margin-bottom
```

`border-box`：

```shell
calculated height = height + margin-top + margin-bottom
```

#### 行内，非可替换元素

对于行内，非可替换元素，`height`属性无法生效，其内容区域`content`的高度计算依赖于字体，但是规范未定义如何根据字体进行计算。

对于行内，非可替换元素垂直方向上的`margin`，`padding`，`border`等也不会生效，并且和`line-height`无关，在计算一行线盒的高度时只会用到`line-height`。

如果在一行中使用了不同的字体，规范给出了建议：

- 要能容纳 em-boxes；
- 要能容纳所有字体中最大升部和最大降部

所以这个高度可能大于所涉及的任何字体大小，具体取决于字体的基线对齐方式。

#### 行内可替换元素等

行内可替换元素（例如`<img>`），正常流中的块级可替换元素（例如`<video>`，`canvas`），正常流中的`inline-block`可替换元素，`float`的可替换元素这几种，计算高度和外边距的方式如下：

- 如果`margin-top`和`margin-bottom`值为`auto`，实际值就看作`0`
- 其它的部分，没看懂规范的意思；跟我大致理解是，例如一个`<img>`，其具有分辨率，如果只为其指定宽度，那么高度将根据`width/ratio`来计算

#### 正常流中块级非可替换元素在 overflow 等于 visible 的时候

- 如果`margin-top`和`margin-bottom`值为`auto`，就看作`0`
- 正常流中块级非可替换元素的高度是从内容区域`content`上边缘到以下情况之间的高度：
  - 如果内部建立了行内格式化上下文，就是到最后一行线盒的底部边缘的高度；
  - 如果内部有块级元素，并且外边距和容器没有发生折叠，就是到最后一个子块级元素的`margin-bottom`的底部边缘
