# Pug
jade，现称为 [pug](https://pugjs.org/)，是一种 HTML 模板语言，可以在项目中作为 HTML 页面的框架，复用以生成大量类似的网页。

文件后缀为 `.jade` 或 `.pug` 通过编译，如 Gulp 插件 [gulp-jade](https://www.npmjs.com/package/gulp-jade)，生成相应的  HTML 文档。

## 基本语法
jade 基本语法就是通过**缩进**来构成文档树结构（而不是开始标签与结束标签），每一个缩进表示一个内嵌层级，因此编写 jade 时需要严格遵循缩进排版，如不能一次缩进两次,否则则会造成解析编译错误。

:bulb: 可以使用在线工具 [HTML2Jade](http://html2jade.org/) 将 HTML 转换为 jade

属性设置在元素后，以括号 `()` 包含，多个属性以逗号 `,` 分隔。对于类属性还可以使用类的字面值 `.classname` 语法来定义；对于元素的 ID 属性还可以使用 ID 的字面值 `#idname` 语法来定义

```pug
ul
  li
    // 元素的属性在括号中
    a(href="#") link
  li
    a(href="#") link
  li
    a(href="#") link

// 可以将嵌套的元素写在同一行，使用冒号 : 分隔
h1: a(href="#"): span 链接

// 元素的类属性可以使用类的字面值 .classname 语法来定义，如果省略了元素就默认使用块元素 div
.container
  form(action="")
    label(for="email") 请输入 Email
    // 元素的 ID 属性可以使用 #idname 语法来定义
    // 元素多个属性可以用空格或逗号分隔
    input#email.input-sm(type="text" class="form-control")
```

模板语法另一个重要特点是它们支持嵌入 JavaScript，可以生成更复杂的模板

使用 `- var variable_name` 在模板中声明变量

## 版型分离
可以使用 包含 `include`、继承 `block` 和 `extends` 两种方式实现网页版型和内容的分离，便于模板的复用；对于需要重复使用的部分（模板）代码，可以使用 混入 `mixin` 来定义，以使页面代码更简洁。

包含 `include` 功能允许您把另外的文件内容插入进来，只需在关键字 `include` 后添加 jade 文件的路径即可将外部的文档内容插入当前位置

```pug
// 📁 index.pug
// 基本版型
doctype html
html
  include includes/head.pug
  body
    h1 我的网站
    p 欢迎来到我这简陋得不能再简陋的网站。
    include includes/foot.pug
```

```pug
// 📁 includes/head.pug
// 外部文件
head
  title 我的网站
  script(src='/javascripts/jquery.js')
  script(src='/javascripts/app.js')
```

```pug
// 📁 includes/foot.pug
// 外部文件
footer#footer
  p Copyright (c) foobar
```

:hammer: 编译后

```html
<!DOCTYPE html>
<html>

<head>
  <title>我的网站</title>
  <script src="/javascripts/jquery.js"></script>
  <script src="/javascripts/app.js"></script>
</head>

<body>
  <h1>我的网站</h1>
  <p>欢迎来到我这简陋得不能再简陋的网站。</p>
  <footer id="footer">
    <p>Copyright (c) foobar</p>
  </footer>
</body>

</html>
```

在关键字 `extends` 后添加  jade 文件的路径以继承（作为父类）模板的代码，模板中一般都定义了（多个） 块 `block` 作为占位符，子类使用相同的 `block` 标识符插入不同的内容进行页面定制化。

```pug
// 📁 layout.pug
// 模板
<!DOCTYPE html>
html
  head
    title 我的站点
    block scripts
      // 指定默认值，可覆盖
      script(src='/jquery.js')
  body
    block content
```

```pug
// 📁 page-a.pug
// 基于模板创建一个页面
extends layout.pug

block scripts
  script(src='/jquery.js')
  script(src='/pets.js')

block content
  h1 new tile
```

:hammer: 编译后

```html
<!DOCTYPE html>
<html>

<head>
  <title>我的站点</title>
  <script src="/jquery.js"></script>
  <script src="/pets.js"></script>
</head>

<body>
  <h1>new tile</h1>
</body>

</html>
```

混入 Mixin 是一种允许在模板中重复使用的一整个代码块。

```pug
//- 定义
mixin pet(name)
  li.pet= name

//- 使用
ul
  // 接受传递参数
  +pet('猫')
  +pet('狗')
  +pet('猪')
```

:hammer: 编译后

```html
<ul>
  <li class="pet">猫</li>
  <li class="pet">狗</li>
  <li class="pet">猪</li>
</ul>
```


## 数据汇入
由于模板语言支持 JavaScript，因此可以定义变量存储数据，并汇入模板中实行定制化的页面。

Pug 提供了[若干种操作符](https://www.pugjs.cn/language/interpolation.html)以满足您不同的嵌入需求，常用的方法是 `#{code}` 其中代码会被求值、转义，最终嵌入到模板的渲染输出中。

```pug
- var author = "enlore";

p #{author} 笔下源于真情的创作。

```

:hammer: 编译后

```html
<p>enlore 笔下源于真情的创作。</p>
```

## 迭代
jade 支持在模板中迭代数组和对象生成一些列类似的元素

```pug
ul
  each item in [1, 2, 3, 4, 5]
    li #{item}
```

:hammer: 编译后

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
```