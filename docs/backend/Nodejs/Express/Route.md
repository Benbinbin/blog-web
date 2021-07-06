---
tags:
  - nodejs
  - express
---
# Express 路由

参考：
* [基本路由](http://expressjs.com/zh-cn/starter/basic-routing.html)
* [路由](http://expressjs.com/zh-cn/guide/routing.html)
* [Router](http://expressjs.com/zh-cn/4x/api.html#router) | Express 4.x - API 参考
* [網址規則](https://www.jianguoyun.com/p/DYeMblkQjNDGBxj6vuID)

路由用于确定应用程序如何响应对特定端点（路径）的请求，包含一个 URI（或路径）和一个特定的 HTTP 请求方法（GET、POST 等）。

每个路由可以具有一个或多个处理程序函数，这些函数在路由匹配时执行。

```js
app.METHOD(PATH, HANDLER)
```

其中：

- `app` 是 `express` 的实例。
- `METHOD` 是 [HTTP 请求方法](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)。
- `PATH` 是服务器上的路径。
- `HANDLER` 是在路由匹配时执行的函数。

```js
// 对 /user 路由的 PUT 请求进行响应
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});
```

## 部分路径 params
如果希望使用路由 URL 部分路径，可以在 `path` 中使用路由参数 Route parameters `:param` 以捕获 URL 相应位置的值，并在处理程序函数（回调函数）请求对象 `req` 中使用属性 `params` 来访问，它是一个包含 **路由 URL 路径参数** 的对象：

* 请求 URL：`http://localhost:3000/users/34/books/8989`
* 路由匹配路径：`/users/:userId/books/:bookId`
* 回调函数的 `req` 参数 `params`：`req.params: { "userId": "34", "bookId": "8989" }`

返回客户端请求路径中的 `userId` 值

```js
app.get('/users/:userId', function (req, res) {
  res.send(req.params.userId)
})
```

## 查询参数 query
在路由 URL 中可能存在查询参数，即 URL 中在 `?` 后的参数，可以有多个查询参数以 `&` 分隔。如果希望使用路由 URL 的查询参数，在处理程序函数（回调函数）请求对象 `req` 中使用属性 `query` 来访问，它是一个包含 **路由 URL 查询参数** 的对象

```js
app.get('/user/:name/', function (req, res) {
  let name = req.params.name;
  let limit = req.query.limit;
  res.send(name +' want to get ' + limit)
});
```

浏览器输入 URL

```
http://127.0.0.1:3000/user/Ben?limit=5
```

页面输出

```html
Ben want to get 5
```

## 模块化管理
如果网站需要配置大量路由，可以使用 Express 内置方法 `express.Router()` 管理实现模块化。

如对于用户 `user` 路径下有多个子路由，可以使用 `user.js` 来管理这些路由处理程序

```js
// 📁 routers/user.js
const express = require('express');
// 使用 express.Router() 管理路由
const router = express.Router();

// 路由处理程序的 path 都是针对父目录 /user 而言的
router.get('/edit-profile', function(req, res) {
  res.send('profile');
});

router.get('/photo', function(req, res) {
  res.send('photo');
});

// 导出路由处理程序
module.exports = router;
```

```js
// 📁 app.js
const express = require('express');
const app = express();

// 引入相关路由处理程序
const user = require('./routers/user');

// 设置中间件函数「捕获」URL 含有 user 路径的请求，并调用 user 进行次级路由的匹配处理
app.use('/user', user);

let port = process.env.PORT || 3000;
app.listen(port);
```