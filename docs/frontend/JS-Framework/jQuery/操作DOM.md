# 操作 DOM
参考：[jQuery API Documentation](https://api.jquery.com/)

浏览器根据一种跨平台约定，即 **文档对象模型 DOM（document object model）**，将 HTML （及其它标示语言）中代表对象的标记（每个 HTML 标签对应于 DOM 中的一个元素）转换为树状结构中相应的 DOM 元素，并在页面上显示出来，JavaScript 或 jQuery 正是与 DOM 对象中的元素进行交互。

jQuery 对象有许多内置的方法用于操作元素，如添加子元素、为元素添加或修改属性、设置样式，也可以修改和添加元素的内容等。

:warning: JavaScript 或 jQuery 是与浏览器依据 HTML 文件生成的 DOM 对象进行交互（也称为操作 DOM，而不是 HTML 文档源码。

## 操作元素

### 添加子元素
方法 `source.append(target)` 为在匹配的 `source` 对象内部增添 `target` 子元素，且作为**最后一个子元素**追加到父元素容器的最后；方法 `source.prepend(target)` 向匹配的 `source` 对象内部增添 `target` 子元素，并作为**第一个子元素**追加（放置父元素容器的最开始）

:bulb: 相应的的方法 `target.appendTo(source)` 和 `target.prependTo(source)` 将目标 `target` 元素添加到匹配 `source` 源对象处。

```js
// 为无序列表添加一项，并置于最后
$("ul").append("<li>this is the last sub-item</li>");
// 为无序列表添加一项，并置于开头
$("ul").prepend("<li>this is the first sub-item</li>");

// 另一种方法，实现相同的功能
$("<li>this is the last sub-item</li>").appendTo($("ul"));
$("<li>this is the first sub-item</li>").prependTo($("ul"));
```

### 添加兄弟元素
方法 `source.before(target)` 和 `source.after(target)` 分别将目标 `target` 插入到匹配 `source` 对象前或后作为兄弟元素

:bulb: 相应的方法 `target.insertBefore(source)` 和 `target.insertAfter(source)` 将目标 `target` 元素作为兄弟元素插入到匹配 `source` 源对象之前或之后

:bulb: 使用 `insertBefore(source)`、`insertAfter(source)`、`appendTo(source)` 或 `prependTo(source)` 方法时，可以传递 DOM 对象（即使用 jQuery 函数 `$(selector)` 获得的对象），也可以直接传递选择器 Selector（内置函数会基于选择器寻找匹配的 DOM 对象）。

:bulb: 使用 `append(target)`、`prepend(target)`、`before(target)` 或 `after(target)` 方法可以传递回调函数，进行运算以添加更复杂的元素。

```js
$("div").before(function() {
    return "<div class="new-box">new box</div>"
});
```

:warning: 此外目标 `target` 不仅可以是新建的 HTML 元素，也可以是页面已存在的元素，这时就相当于页面的元素进行移动（如果 `source` 是多个对象，就会对已存在的元素进行拷贝）。

### 替换元素
方法 `source.replaceWith(target)` 可以将 `target` 目标元素替换 `source` 源元素；相应的方法是 `target.replaceAll(source)`

```js
$(".red-box, .blue-box").replaceWith("<div class='green-box'>More Green</div>");

// 与以上作用相同
$("<div class='green-box'>More Green</div>").replaceAll(".red-box, .blue-box")
```

:bulb: 方法 `source.replaceWith(target)` 支持传递回调函数，进行更复杂的设置。

:bulb: 类似地，目标元素可以是页面已存在的元素，当替换 `source` 对象只是一个，则直接移动页面已有元素；如果有多个 `source` 对象，就会将已存在的页面 `target` 元素进行拷贝。

### 移除元素
方法 `.remove()` 移除匹配的元素。

此外方法 `.detach()` 也可移除匹配的元素，与 `.remove()` 的区别在于该方法并不会保留与元素绑定的事件 `event` 等数据，而 方法`.detach()` 会把绑定在元素的事件等数据都整体保留，这对于后期将元素重新添加会页面重用时很必要。

```js
let detachedListItem = $("li").detach();

// 将移除的列表项重新插入回页面中，此时与列表项绑定的事件仍生效
$("body").append(detachedListItem);
```

:bulb: 方法 `.empty()` 将元素内部的内容移除（包括后代元素）。

## 操作内容与属性

### 读取和添加元素
方法 `.html()` 返回匹配的第一个 DOM 对象对应的 HTML 源码（包括其中的后代元素及其内容）。

如果将新的内容以字符串形式（允许包括 HTML 标签）传递给该方法，就可以修改该元素的内容（同时**覆盖**掉其中所有内容），类似于 `.append()` 和 `prepend()` 方法（但这两种方法是向父元素追加子元素，并不会覆盖原有内容）。

```html
<!-- html -->
<div class="demo-container">
  <div class="demo-box">Demonstration Box</div>
</div>
```

```js
// jQuery
$( "div.demo-container" ).html( "<p>All new content. <em>You bet!</em></p>" );
```

:hammer:

```html
<div class="demo-container">
  <p>All new content. <em>You bet!</em></p>
</div>
```

:bulb: 当匹配有多个元素，只会返回第一个元素的内容。

:bulb: 可以使用 `$(selector).html($(selector).html + "more content")` 格式向元素中添加内容。

```js
$("p:first").html($("p:first").html() + "This was just appended.")
});
```

:bulb: 方法 `.empty()` 将元素内部的内容移除（包括后代元素）。

### 读取和添加文本内容
`.text()` 返回元素内所有文本内容（会忽略掉所有内部的后代元素标签，当其中包含的内容仍保留），相当于返回一个纯文本。如果向方法传递字符串，就可以修改匹配元素的文本内容（同时覆盖/删除原有的所有内容，包括后代元素）

:warning: 该方法不可以用于添加元素标签，当增添的文本中包含**标签会被自动转义为相应的字符**

:bulb: 方法 `.empty()` 将元素内部的内容移除（包括后代元素）。

### 操作属性和特性
HTML 元素具有特性 `attribute`，如 `<img>` 具有 `alt` 和 `src` 特性。通过方法 `.attr("attribute-name")` 读取对象的特定特性值，如果传递第二个参数就设置新的特性值，如 `$("a").attr("href", "url")` 为锚标签设置新的 URL。

而 HTML 元素的属性 `property`，如 `<input type="checkbox"/>` 可能具有 `checked` 属性表示该复选框被选中。通过方法 `.prop()` 判断元素是否具有该属性值，**返回一个布尔值**。

:warning: 这些方法只能返回**第一个**匹配元素的特性值 `attribute` 或属性值 `property`，或修改/增添第一个匹配元素的特性值。

对于表单，如 `<input>`、`<select>` 和 `<textarea>` 等元素会有值 `value` 这一属性，可以通过方法 `.val()` 读取表单的值，如果传递第二个参数可以对值进行更改，如 `$("input:text").val("change the text")`

### 添加和删除类属性
**添加类属性**
使用方法 `.addClass("class-name")` 为匹配元素添加类属性。如果需要同时添加多个类属性，使用空格分隔。

```js
$("p").addClass("large emphasize");
```

:bulb: 除了直接传递字符串作为添加的属性名，还可以传递回调函数，以返回更复杂的类属性名

```js
// 为页面所有的标题标签依次添加类属性
$(":header").addClass(function(index) {
    $(this).addClass("header-" + index);
});
```

**删除类属性**
使用方法 `.removeClass("class-name")` 将匹配元素已有的特定类属性移除，

:bulb: 通过链式调用方法 `.removeClass()` 和 方法 `.addClass()` 可以方便地实现类属性更换，以实现样式「切换」。

`toggleClass()`基于匹配的每个元素的当前类属性，自动删除（或添加）一个类属性，即该元素原来存在该值就会删除该类属性值，如果原来类属性值没有该值就会添加该值。相当于进行类属性的「切换」。

```html
<div class="tumble">Some text.</div>
```

```js
// 添加类名 bounce
$( "div.tumble" ).toggleClass( "bounce" )
```

:hammer:

```html
<div class="tumble bounce">Some text.</div>
```

```js
// 删除类名 bounce
$( "div.tumble" ).toggleClass( "bounce" )
```

:hammer:

```html
<div class="tumble">Some text.</div>
```

### 添加样式
`.css()` 返回匹配的第一个元素的特定样式的属性值，或为匹配集合元素增添样式

**返回样式参数**
`.css(propertyName)` 返回匹配集合中第一个元素特定样式的参数

**添加/修改样式**
`.css(propertyName, value)` 为匹配元素修改或添加特定的样式

如果向方法传递一个**样式属性组成的数组**可查询对应的多个样式参数，返回一个有相应样式和属性值作为键值对组成的对象

```js
let properties = $("p").css(["font-size", "line-height", "color"]);
```

相应的，该方法支持同时设置多个样式，传递一个**由样式和属性值组成键值对的对象**

:bulb: 如果需要查询高或宽样式，可以使用方法 `.height()` 或 `width()` 返回数值（不包括单位）

:warning: 使用 JavaScript 或 jQuery 修改元素的样式属性是以添加**内联样式**的形式实现的，应该谨慎使用

### 添加和删除自定义数据
HTML 元素支持 [`data-*` 自定义数据属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/data-*)，用以将数据（可以是任何 JavaScript 支持的数据类型，如字符串、对象等）与元素进行「绑定」，方便脚本读取和操作。

使用方法 `.data("key")` 读取匹配元素的特定数据属性值（如果 `"key"` 缺省默认返回该元素的所有自定义数据，其形式是以键值对组成的对象），如果传递第二个参数可以修改该数据属性值；使用方法 `.removeData("key")` 移除

```html
<!-- html -->
<p data-mydata="Some data here">text</p>
```

```js
// 使用 jQuery 读取段落中「绑定」的数据
$("p").data("mydata");   // Some data here
```

```js
// 将所图片源数据与 img 元素「绑定」
let imageSrc = [
    "images/Sample1.jpg",
    "images/Sample2.jpg",
    "images/Sample3.jpg"
];

$("img").data("imagesList" , imageSrc);
```