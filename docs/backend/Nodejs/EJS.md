# EJS
EJS，Embedded JavaScript templating 嵌入式 JavaScript 模板引擎，是一套简单的模板语言，利用普通的 JavaScript 代码生成 HTML 页面。

利用 NPM 安装 EJS

```bash
$ npm install ejs
```

:bulb: 或安装基于 ejs 扩展制作的另一个模块 [ejs-locals](https://www.npmjs.com/package/ejs-locals)

```js
npm intall ejs-locals --save
```

将模板字符串（使用 `<% %>` 作为模板标签）和一些数据作为参数传递给 EJS，如 `render` 方法，然后 HTML 就编译出来了

```js
let ejs = require('ejs');
let people = ['geddy', 'neil', 'alex'],
let html = ejs.render('<%= people.join(", "); %>', {people: people});
// append html to page
```

## 模板标签
EJS 基本模板标签是 `<% %>` 还有多种具有扩展功能的模板标签，具有不同含义

- `<%` 脚本标签，用于流程控制，无输出，对于多行的 JavaScript 代码，如 if-else 条件结构语句，每一行都需要使用 `<% %>` 包括
- `<%_` 删除其前面的空格符
- `<%=` 输出数据到模板，作为字符串输出（即 HTML 标签会被**转义**为字符串）
- `<%-` 输出**非转义**的数据到模板（即 HTML 标签可以起作用）
- `<%#` 注释标签，不执行、不输出内容
- `<%%` 输出字符串 `<%`
- `%>` 一般结束标签
- `-%>` 删除紧随其后的换行符
- `_%>` 将结束标签后面的空格符删除

## 包含
通过 `include` 指令将相对于模板路径中的模板片段包含进来。

如存在 `./views/users.ejs` 和 `./views/user/show.ejs` 两个模板文件，可以通过 `<%- include('user/show'); %>` 代码包含后者

```ejs
<ul>
  <% users.forEach(function(user){ %>
    <%- include('user/show', {user: user}); %>
  <% }); %>
</ul>
```

:bulb: 使用能够输出原始内容的标签 `<%-` 用于 include 指令，避免对输出的 HTML 代码做转义处理。

:bulb: EJS 并未对模块化/块 blocks 提供专门的支持，但可以使用 `include` 指令实现网页布局，提高代码利用率，降低维护成本。也可以使用 ejs 的扩展版本 [ejs-locals](https://www.npmjs.com/package/ejs-locals) 作为模板引擎，它支持 layout/view 布局。

```ejs
// 📁 views/layout.ejs
<%# layout template %>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EJS</title>
</head>

<body>
  <%- body %>
</body>

</html>
```

```ejs
// 📁 views/index.ejs
<%# use layout %>
<% layout('layout') %>
<h1><%= title %></h1>
<p><%= message %> </p>
<% if(show) { %>
    <p>show if true</p>
<% } %>
<ul>
  <% for( let i = 0; i < courses.length; i++ ) { %>
  <li><%- courses[i] %> </li>
  <% } %>
</ul>
```