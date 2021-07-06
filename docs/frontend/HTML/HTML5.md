---
show: true
cover: HTML.png
collection: HTML
collectionOrder: 5
summary: HTML5 新增标签
tags:
  - HTML
---

# HTML5
在 2014 年 HTML5 定稿，推出了不少新增的标签与功能。

## 文档类型声明
`<!DOCTYPE html>` 在 HTML 文档的第一行，声明文件的类型为 html5，告诉浏览器文档是使用哪一个 HTML 版本进行编写的。

:warning: `<!DOCTYPE html>` 并不是 HTML 标签。

:warning: 在以前的 HTML 版本中，需要在文档类型声明中指定所使用的 [DTD 文档类型](https://www.w3school.com.cn/tags/html_ref_dtd.asp)。DTD 是使用 XML 语法构建的模块，指定一系列合法的元素来定义 HTML 标签的规范，即 DTD 规定内标记语言的规则，这样浏览器才可以正确地呈现内容。HTML5 不基于 SGML 所以不需要引用 DTD。

## 新增标签
HTML5 中新增了多种标签

* 结构标签
* 多媒体标签
* Web 应用标签

### 结构标签
结构标签相当于为通用块元素/容器 `<div>` 添加了特定的语义

* `<article>` 标记一篇文章
* `<header>` 标记一个页面或区域的头部
* `<nav>` 标记导航链接
* `<section>` 标记一个区域
* `<aside>` 标记页面内容部分的侧边栏
* `<hgroup>` 标记文件中一个区域的相关信息，一般将标题集包含在内
* `<figure>` 标记一组媒体内容以及标题 `<figcaption>`
* `<footer>` 标记一个页面或一个区域的底部
* `<dialog>` 标记一个对话框（会话框）

### 多媒体标签
* `<video src="source_path">` 标记一个视频
* `<audio src="source_path">` 标记音频内容
* `<canvas>` 标记一张画布
* `<embed src="source_path">` 标记外部的可交互的内容或插件，也可以用于引入 SVG 图片

视频和音频多媒体标签一般可以添加多种属性
* 属性 `autoplay="autoplay"` 可实现自动播放
* 属性 `controls` 可以在页面显示播放控制按钮
* 属性 `width` 和 `height` 设置（视频）多媒体的宽高
* 标签内可以添加内容，以备标签无法识别时作为可替代文字显示出来

:bulb: 空元素 `<source>` 标记媒体资源，可通过属性  `type` 设置多媒体文件格式，以实现正确的转码加载媒体文件。在多媒体标签中可以同时插入多个 `<source>` 标签提供备选的媒体源。

```html
<audio>
    <source src="source_path" type="audio/mpeg"/>
</audio>
```

### 状态标签
* `<meter>` 计量器元素用来可视化显示当前的标量值或分数值（百分比），默认以横向条形「能量槽」显示。一般与元素 `<form>` 相关联以显示某个数值输入框（`<input/>` 元素，`number` 类型）的范围。该元素可以设置多个属性
    * 属性 `value` 设置当前的数值。如果设置了最小值和最大值（分别由 `min` 属性和 `max` 属性定义），它必须介于最小值和最大值之间。如果给定的值不在最小值和最大值之间，它的值就等于它最接近的一端的值。
    * 属性 `min` 和 `max` 设置上下边界值
    * 属性 `low` 和 `hiht` 定义低值区间和高值区间的界限，如果 `value` 落入低值区间 `[min, low]` 或高值区间 `[high, max]` 浏览器会渲染不同的视觉效果，如 Chrome 渲染出红色
    * 属性 `optimum` 设置最优值。
    * 属性 `form` 将该计量器与表单元素关联，只有当计量器元素被用作表单关联的元素时，该属性才应当被使用。

* `<progress/>` 元素用来显示一项任务的完成进度，默认显示为一个进度条。可以设置两个属性
    * 属性 `max` 描述了该进程所表示的任务一共需要完成多少工作
    * 属性 `value` 描述了当前该进度条已完成的工作量，取值范围是 `0` 到 `max`（或 `0` 到 `1` 如果 `max` 没有设置）如果没有 `value` 属性则该进度条的进度为不确定，即无法预计需要多长时间完成任务，会呈现一个进度条动画。

### 下拉表单
元素 `<datalist>` 是数据列表元素，结合表单元素 `<input/>` 可以构建更多功能的下拉表单控件，用以替代 `<select>` 元素。它的子元素 `<option>` 设置多个备选项目。

该新增的下拉表单支持用户输入关键字以匹配已有的备选项，也支持用户输入新的值传输给服务器。

```html
<label for="ice-cream-choice">Choose a flavor:</label>
<input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" />

<datalist id="ice-cream-flavors">
    <option value="Chocolate">
    <option value="Coconut">
    <option value="Mint">
    <option value="Strawberry">
    <option value="Vanilla">
</datalist>
```

:bulb: 表单元素 `<input/>` 属性 `list` 和元素 `<datalist>` 属性 `id` 需要相配对。
:warning: 需要注意的是子元素 `<option>` 作为空元素使用（与其在元素 `<select>` 中用法不同），其属性 `value` 值会直接显示出来，作为下拉菜单的选项。

### 详细信息展现元素
元素 `<details>` 可创建一个挂件，它包含的内容只有切换成展开状态时才会显示。其子元素 `<summary>`可为该部件提供概要描述。

```html
<details>
    <summary>Details</summary>
    Something small enough to escape casual notice.
</details>
```

:bulb: 如果需要元素默认是展开状态，可以为元素添加一个布尔值属性 `open`

### 注释标签
元素 `<ruby>` 为文字添加注释或音标，注音（一般是针对东亚文字）或字符注释默认显示在文字的上方。

```html
<ruby>
  汉 <rp>(</rp><rt>han</rt><rp>)</rp>
  字 <rp>(</rp><rt>zi</rt><rp>)</rp>
</ruby>
```

需要注释的字/词放在元素 `<ruby>` 之中，而注释或注音内容紧跟在后用元素 `<rt>` 包括，而元素 `<rp>` 可以添加浏览器不识别 `<ruby>` 标签才显示的内容，一般是为注音添加括号。

### 标记标签
元素 `<mark>` 标记文本，默认样式是黄色背景。

### 表单输出
元素 `<output>` 表示计算输出或用户操作的结果，一般配合 `oninput` 事件可以实时获得表单输入值的相关计算结果。

:bulb: `oninput` 事件可以实时监听文本框的输入变化

```html
<form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
    <input type="range" name="b" value="50" /> +
    <input type="number" name="a" value="10" /> =
    <output name="result"></output>
</form>
```

:point_right: [在线演示](https://codepen.io/benbinbin/pen/NWqVpmO)

示例使用 `oninput` 事件监听表单实时输入的值，并进行相应的运算，运算结果存储在 `result` 变量中，并使用元素 `<output>` 通过设置属性 `name` 为 `result` 变量相同的值进行匹配输出结果。

## 重定义标签
* `<b>` 只代表内联文本，默认样式是粗体，已无着重语义（推荐使用 `<strong>` 元素）
* `<i>` 只表示内联文本，默认样式是斜体，已无着重语义（推荐使用 `<em>` 元素）
* `<dd>`（原来只是 `dl` 定义列表的子元素，包含定义描述信息）可与 `<details>`、`<dialog>`、`<figure>` 一同使用，定义其包含的文本。
* `<dt>`（原来只是 `dl` 定义列表的子元素，包含定义标题信息）可与 `<details>`、`<dialog>`、`<figure>` 一同使用，汇总细节，替代元素 `<details>` 的子元素 `<summary>` 或替代元素 `<figure>` 的子元素 `<figcaption>`。
* `<hr/>` 不仅表示水平线，还表示章节主题结束，样式与原来（横向线条）相同
* `<menu>` 重新定义用户界面的菜单，配合 `<command>` 或 `<menuitem>` 使用
* `<small>` 表示小字体，如打印注释或法律条款
* `<strong>` 表示重要性但不是强调符号

## 已删除的标签
* 纯表现样式的标签：`<basefont>`、`<big>`、`<center>`、`<font>`、`<s>`、`<strike>`、`<tt>`、`<u>`
* 对可用性产生负面影响的元素：`<frame>`、`<frameset>`、`<noframes>`（应该只是用 `<iframe>`）
* 产生混淆的元素：`<acronym>`、`<apple>`、`<isindex>`、`<dir>`

## 新增属性

### 表单类型
表单元素 `<input/>` 新增了多个类型，即属性 `type` 新增多个属性值，可用于数据基本验证和提供更好的用户体验

:bulb: 属性`pattern` 可设置检查控件 `value` 值的正则表达式，以提供更高级的数据验证方法。

* `email` 输入值为邮件，对于移动端输入时键盘会提供 `@` 符号
* `url` 输入为链接，对于移动端输入时键盘会提供 `@` 符号
* `tel` 输入为电话号码，对于移动端输入时会切换到数字键盘
* `number` 输入数值，只能输入 0~9 及常见的运算符号，且输入框右侧有上下按钮可以调整数值大小
* `range` 输入范围，默认样式是一个滑杆，配合使用属性 `min` 和 `max` 设置可选范围（默认是 1~100）
* `search` 用于搜索域，当输入框有文字输入后，会在最右侧显示一个 `x` 符号，点击即可快速清空输入内容
* `color` 创建一个颜色控件，点击该元素会弹出一个拾色器，允许从中选取颜色
* Data Picker 用以输入时间日期，在移动端会调用相应的弹出框选取日期
    * `Date` 选取日、月、年
    * `Month` 选取月、年
    * ~~`Week` 选取周和年~~（移动端一般不支持）
    * `Time` 选取时间（小时和分钟）
    * ~~`Datetime` 选取时间、日、月、年（UTC 时间）~~（移动端和桌面端一般不支持）
    * `Datetime-local` 选取时间、日、月、年（本地时间）

### 表单交互属性
* 属性 `autocomplete` 可以让表单输入框拥有「自动完成」功能，在表单元素 `<form>` 将该属性设置为 `on` （默认值）时，可以在输入时出现提示值（类似于下拉菜单，弹出历史记录中输入过的内容），点击备选值可以快速填充表单。

    :bulb: 可以针对单个输入框 `<input/>` 设置属性 `autocomplete` 修改其自动填充行为，如对于密码框 `<input type="password"/>` 一般取消自动完成。

* 属性 `autofocus` 设置页面加载时自动聚焦到此表单控件，在表单输入框元素 `<input/>` 设置该属性，在页面加载后光标会自动在表单中等待用户直接输入内容，可以优化用户体验。

* 属性 `multiple` 可以允许输入多个值，适用于 `<input type="file"/>` 和 `<input type="emial"/>` 类型的表单，如允许同时上传多个文件。

* 属性 `placehold` 为输入框提供一种 hint 提示，当输入内容为空时会显示该属性值，以提示用户输入所期待格式的值。适用于元素 `<input/>` 多种 `type` 类型，包括 `text`、`search`、`url`、`tel`、`email`、`password`

* 属性 `required` 是一个布尔值，表示只有当此 `<input/>` 元素有值时整个表单才能提交，否则会在提交表单时提示用户进行填写。该属性适用于输入或选择表单，如元素 `<input/>` 多种类型，包括 `text`、`search`、`url`、`tel`、`email`、`password`、data pickers、`number`、`checkbox`、`radio`、`file` 等。

:bulb: 表单存在一个伪类 `:required` 用以表示元素 `<input>`、`<select>`、`<textarea>` 具有必填属性的状态。

### 链接属性
* 属性 `sizes` 设置图片大小，用于元素 `<link rel="icon" href="image_path.png" type="image/png" sizes="16x16"/>` 外部链接文件为图片，即为网页设置标签栏图标时，使用 `sizes` 设置图标的大小（可以设置多个尺寸并用空格分隔，以提供响应式图片源，但源文件中需要有对应尺寸的图片）。
* 属性 `target` 可以用于元素 `<base>` 中设置整个网页的默认链接打开方式，如 `<base target="_blank"/>` 所有链接默认在新窗口中打开
* 超链接 `<a>` 新增多种属性以优化浏览器
    * 属性 `media` 设置链接跳转页面所在的设备类型，如 `handheld` 表示「手持」设备，`tv` 表示电视设备，浏览器基于该属性可以对网页进行优化更适合相应设备操作
    * 属性 `hreflang` 设置链接跳转页面的语言，如 `hreflang="zh"` 表示设置为中文
    * 属性 `rel="external"` 设置链接为外部链接，为锚标签提供更多的语义

### 脚本属性
元素 `<script>` 新增属性以标注脚本的加载顺序和形式，可以优化网页加载提高用户体验度。

* 属性 `defer` 是一个布尔值，规定当页面结构加载完成后（DOM 文件建立完成，而不是页面渲染完成），脚本才会执行，:warning: 当在元素 `<head>` 中引入的脚本需要操作 DOM 对象时，需要进行该属性的设置以对脚本执行进行延迟。
* 属性 `async` 是一个布尔值，规定脚本一旦可用，则会异步执行脚本（即实现 JavaScript 多线程加载）。

### 有序列表属性
* 属性 `start` 设置有序列表的序号起始值
* 属性 `reserved` 是一个布尔值，设置倒序标记列表项，即列表顺序以降序标记

### ~~离线应用属性（已废弃）~~
~~* 属性 `manifest="cache_file"` 在元素 `<html>` 中进行设置，以定义页面需要下载的文件（在 `cache_file` 中定义的文件列表），轻松地创建 Web 应用的离线版本~~

### 样式属性（不推荐）
属性 `scoped` 用于元素 `<style>` 中进行设置，以实现 HTML 任何地方中内嵌样式。