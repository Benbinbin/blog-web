---
tags:
  - nodejs
  - express
---

# Express 静态文件

为了提供诸如图像、CSS 文件和 JavaScript 文件之类的静态文件，请使用 **Express 中的 `express.static` 内置中间件函数**，将包含**静态资源的目录**的名称，如 `public`，传递给中间件函数，然后程序就可以基于该目录和给定的路由 URL 寻找目标静态文件；否则无法正确读取资源。

:bulb: 该中间件函数在 Web 程序开始就应该安装，以便后面的路由处理程序可以直接提供这些文件。

```js
app.use(express.static('public'));
```

现在，可以访问位于 `public` 目录中的文件，直接在地址栏输入相应的 URL，或在网页中的 `<script>`、`<img>`、`<link>` 等标签中导入。

```
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
```

:warning: Express 相对于静态目录查找文件，因此**静态目录**的名称**不是**此 URL 的一部分。

:bulb: 要使用多个静态资源目录，请多次调用 `express.static` 中间件函数，Express 以您使用 `express.static` 中间件函数设置静态目录的顺序来查找文件。

```js
app.use(express.static('public'));
app.use(express.static('files'));
```

:bulb: 要为 `express.static` 函数提供的文件创建虚拟路径前缀（**路径并不实际存在于文件系统中**），请为静态目录[指定安装路径](http://expressjs.com/zh-cn/4x/api.html#app.use)

```js
app.use('/static', express.static('public'));
```

现在，可以访问具有 `/static` 路径前缀的 `public` 目录中的文件

```
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
```

:warning: 以上向 `express.static` 函数提供的静态资源的目录是相对于启动 `node` 进程的路径（相对路径），但更推荐的做法是提供**绝对路径**，因为您可能从另一个目录运行 Express 应用程序，那么使用绝对路径就会更安全

```js
var path = require('path');

// ...

app.use(express.static(__dirname + '/public'));
```