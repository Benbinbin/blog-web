---
tags:
  - nodejs
  - express
---

# Express 简介
参考：[Express 入门](http://expressjs.com/zh-cn/starter/installing.html)

Express 是一个基于 Node.js 平台的 Web Server 开发框架，许多 [流行的开发框架](https://www.expressjs.com.cn/resources/frameworks.html) 都基于 Express 构建。

![Express](./images/20201001155442817_6568.png)

## 安装
1. 首先假定你已经安装了 [Node.js](https://nodejs.org/)，接下来为你的应用创建一个目录，然后进入此目录并将其作为当前工作目录

```bash
$ mkdir myapp
$ cd myapp
```

2. 通过 `npm init` 命令为你的应用创建一个 `package.json` 文件

```bash
$ npm init
# 此命令将要求你输入几个参数，可以直接按回车 Enter 键接受大部分默认设置即可，除了应用的入口文件，应该明确设置
# 可以采用默认的 index.js 文件名，或键入所希望的名称，如 app.js
entry point: (app.js)
```

3.  将终端路径切换进 `myapp` 目录下，安装 Express 并将其保存到依赖列表中

```bash
$ npm install express --save
```

:bulb: 如果只是临时安装 Express，不想将它添加到依赖列表中，可执行如下命令：

```bash
$ npm install express --no-save
```

:bulb: npm 5.0+ 版本在默认情况下会将安装的模块添加到 `package.json` 文件中的 `dependencies` 列表中。对于较老的 npm 版本，你就必须指定 `--save` 参数

4. 执行程序

```bash
$ node app.js
```

## 开启服务器
使用 Express 构建一个极简的的 Web 应用程式

```js
const express = require('express')   // 引入 express 模块
const app = express()   // 实例化
const port = 3000   // 设置监听的端口

// 对于指向根目录 URL（/）或路由的要求，以 "Hello World!" 回应；对于其他路径的访问就（默认）回应 404 找不到
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 监听端口 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

## Express 应用程序生成器
另一个创建应用程序的方法是使用程序生成器工具（CLI 工具）express-generator，它可以快速搭建一个 Web 程序框架。

0. 全局安装 Express 生成器

```bash
$ npm install express-generator -g
```

1. 当前工作目录中创建名为 `myapp` 的 Express 应用程序

```bash
$ express --view=pug myapp
```

:bulb: Express 生成器支持多种模板引擎，如果需要使用 EJS 可以将参数设置为 `--view=ejs` 或用简写形式 `-e`

2. 将终端路径切换进 `myapp` 目录下，安装依赖项

```bash
$ cd myapp
$ npm install
```

3. 运行此应用程序

```bash
npm start
```

4. 在浏览器中输入 `http://localhost:3000/` 以访问此应用程序

生成的应用程序具有以下目录结构：

```
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug

7 directories, 9 files
```

相关文件功能：
* `./bin/www` 创建 HTTP 服务
* `./public` 存放静态文件的目录（前后端分离一般不使用该目录）
* `./routes` 路由相关的配置
* `./views` HTML 模板文件（前后端分离一般不使用该目录）
* `./app.js` Express 入口文件

其中 `app.js` 是 Express 入口文件，初始化后创建的内容如下

```js
// 📁 app.js
var createError = require('http-errors');   // 创建 http error 对象，针对 404 状态
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');   // 解析 cookie 模块
var logger = require('morgan');   // 生成日志模块

// 引入路由处理程序
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// 初始化一个 express 实例
var app = express();

// 初始化一个视图引擎实例
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/**
 * 装入各种中间件函数
 */
// ------ 解析各种数据 ------
app.use(logger('dev'));   // 生成日志
// 解析每次 POST 请求体中的数据，便于后面通过 req.body 访问这些内容
// JSON 格式的数据
app.use(express.json());
// 非 JSON 格式的数据，如表单格式，即 content-type 为 x-www-form-urlencoded 格式
app.use(express.urlencoded({ extended: false }));
// 解析每次请求的 cookie，便于后面通过 req.cookie 访问这些内容
app.use(cookieParser());
// 拼接静态文件的路径，当访问静态文件时可以正确返回
app.use(express.static(path.join(__dirname, 'public')));

// ------ 注册路由 ------
// 其中第一个参数是父路由，而第二个参数（文件）中的会配置子路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
// 处理未匹配路由的情况
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// ------ 处理错误 ------
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // 错误的详细信息只在开发环境，即 NODE_ENV=dev 时，才设置到响应中
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```