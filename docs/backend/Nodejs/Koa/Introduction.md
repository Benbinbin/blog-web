---
tags:
  - nodejs
  - koa
---

# Koa 简介

参考：
* [Koa Guide](https://github.com/koajs/koa/blob/master/docs/guide.md)
* [Koa 中文网](https://www.koajs.com.cn/)

[Koa](https://koajs.com/) 是基于 Node.js 开发的 web 开发框架，原生支持 async/await（express 中间件是异步回调，需要大量使用回调函数来构建项目）。

Koa 应用程序是一个包含一组中间件函数的对象，它是按照类似堆栈的方式组织和执行的。 Koa 类似于你可能遇到过的许多其他中间件系统，然而一个关键的设计点是在其低级中间件层中提供高级「语法糖」。 这提高了互操作性，稳健性，并使书写中间件更加愉快。

## 安装
:bulb: Koa 依赖 node v7.6.0 或 ES2015及更高版本和 async 方法支持。如果要在 node < 7.6 版本的 Koa 中使用 `async` 方法，推荐使用 [babel's require hook](https://www.babeljs.cn/docs/usage/babel-register/)。

```bash
npm i koa
```

## 开启服务器
使用 Koa 构建一个极简的的 Web 应用程式

```js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

## Koa 应用程序生成器
使用程序生成器工具（CLI 工具）[koa-generator](https://www.npmjs.com/package/koa-generator) 快速搭建一个 Web 程序框架。

0. 全局安装 Koa 生成器

```bash
npm install koa-generator -g
```

1. 在当前工作目录中创建名为 myapp 的 Koa2 应用程序

```bash
Koa2 myapp
```

2. 将终端路径切换进 myapp 目录下，安装依赖项

```bash
$ cd myapp
$ npm install
```

3. 运行此应用程序

```bash
npm start
```

4. 在浏览器中输入 `http://localhost:3000/` 以访问此应用程序（默认监听 3000 端口）

使用脚手架创建的项目中相关文件功能：

- `./bin/www` 创建 HTTP 服务
- `./public` 存放静态文件的目录（前后端分离一般不使用该目录）
- `./routes` 路由相关的配置
- `./views` HTML 模板文件（前后端分离一般不使用该目录）
- `./app.js` Koa2 入口文件

其中 `app.js` 是 Koa2 入口文件，初始化后创建的内容如下

```js
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// 路由
const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']   // 可以处理的 post 数据格式
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)   // 计算处理请求的耗时
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
```

:bulb: Koa2 虽然与 Express 十分类似，但有一些与 Express 的不同点：

* 在 Koa2 的中间件使用 async/await 处理异步请求
* 传递的参数以 `ctx` 整合表示 `req` 和 `res`
* 调用 `next()` 需要使用 `await`，因为下一个中间件也是使用 async/await 格式来执行，返回 `promise`