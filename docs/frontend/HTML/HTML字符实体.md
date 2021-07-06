# HTML字符实体
HTML 字符实体是一类有特定功能的字符。由于部分字符不能在 HTML 文档中表示文本内容，即它们是 HTML 中的保留字符或者是键盘上没有按键（无法打印的字符），如果希望正确地显示预留字符，必须在 HTML 源代码中使用它们对应的字符实体。

## 保留字符

字符 `<`、`>` 和 `&` 等称为保留字符，因为它们在 HTML 语法中有特殊的作用，如 `<` 表示标签的开始，`>` 表示标签的结束。而 `&` 则是表示一个字符实体的开始。这些特殊的字符无法避免被浏览器识别编译，因此无法直接显示在页面。

在网页上显示这三个字符应该使用其对应字符实体：

| 保留字符 | 对应的字符实体 |
| -------- | -------------- |
| `<`      | `&lt;`         |
| `>`      | `&gt;`         |
| `&`      | `&amp;`        |

字符实体以 ampersand `&` 开始，以分号 `;` 结束，在其中插入保留字符对应的特殊编码，如以上列表所示 `lt`、`gt`、`amp` 分别对应于 小于号 less-than、大于号 greater-than、ampersand 的编码。

**在 `misc` 目录中的 `extras.html` 文档的 `<body>` 元素内添加代码：**

```html
<h2>HTML Entities</h2>
<p>There are three reserved characters in HTML: &lt; &gt; and &amp;. You should always use HTML entities for these three characters.</p>
```

HTML 有大量字符实体，可以在[这里](https://dev.w3.org/html5/html-author/charref)查询使用。

## 常用字符
* 空格（&nbsp;）`&nbsp;` 单词 Non-Breaking Space 不断行的空白缩写
* 分隔符（&vert;）`&vert;` 单词 Vertyical 缩写
* 版权符号（&copy; ）`&copy;`
* 已注册符号（&reg;）`&reg;`
* 商标符号（&trade;）`&trade;`