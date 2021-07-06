---
show: true
cover: nodejs.png
collection: Node.js
summary: session 是暂存在服务器中的数据，它在浏览器（客户端）的 cookie 中只保存相应的 session id，这样可以将临时但敏感的数据存储在服务器端，避免了客户端的数据泄露或被操作。
tags:
  - Node.js
---

# session
session 是暂存在服务器中的数据，它在浏览器（客户端）的 cookie 中只保存相应的 session id，这样可以将临时但敏感的数据存储在服务器端，避免了客户端的数据泄露或被操作。

:bulb: 一般使用 Redis 等数据库存放 session，然后服务器基于请求的 cookie 中的 session id 来读取相应的实际 session 数据，一般是用户名等信息。

## 使用 Node.js

```js
// 在服务器端使用一个内存的变量临时存储 session 数据（全局变量，所用使用大写）
const SESSION_DATA = {...};

const server = http.createServer(function(req, res) {
  // ...
  // 解析 cookie，并作为对象存放到 req.cookie 中，其中 userid 是 session id

  let userId = req.cookie.userid;
  // 请求中 cookie 是否有 userid（是否已登录）
  if (userId) {
    req.session = SESSION_DATA[userId];  // 基于 userid 读取 session 数据
  } else {
    // 首次登录需要设置 userid
    userId = `${Date.now()}_${Math.random()}`;   // 「手动」基于时间和随机数生成 session id
    // 基于请求中的用户名从数据库获取用户信息，存储在 session 中（绑定对应的 session id）
    SESSION_DATA[userId] = getData(req.userName);
    // 然后把设置好的 userid 作为 cookie 返回给浏览器
    res.setHeader('Set-Cookie', `userid=${userId}; path=/;`);
    res.end(JSON.stringify(otherData));
  }
});
```

## 使用 Express 和 express-session
需要先安装[插件 express-session](https://www.npmjs.com/package/express-session)

```bash
npm install express-session --save
```

:bulb: 该模块的的相关参数配置参考[官方文档](https://github.com/expressjs/session#readme)。

```js
// 引入 express-session 模块
var session = require('express-session');

// 配置 session
// 将 session 作为中间件，会自动生成 session id 作为 cookie 返回
// 并在每次得到请求 req 时都将 session 写入到 req.session 方便后续读取和操作
// 因此该中间件需要在处理路由中间件前进行配置
app.use(session({
  secret: 'keyboard cat',   // 密钥
  resave: true,   // 浏览器重载时，重新将 session 保留回 session store 中
  saveUninitialized: true,
  // 设定 cookie，即 session 在浏览器中的 session id 存储行为
  cookie: {
    path: '/',   // 该域名下 cookie 可访问的路径（默认配置）
    httpOnly: true   // cookie 只能通过 http 请求来设置（默认配置）
    maxAge: 24 * 60 * 60 *1000,   // session id 号码牌在 24 小时后失效
  }
}))

// 写入 session
// 将 session 存储在 req.session 中
router.get('/', function(req, res, next) {
  req.session.username = "Tom";
  res.redirect('/');   // 重定向到原来的页面
});

// 读取 session
// req.session 读取所有 session，或通过 req.session.key 读取特定的键 key 的 session 值
router.get('/', function(req, res, next) {
  res.render('index', {
    userName: req.session.username
   });
});
```

![使用 express-session 自动生成 session id 作为 cookie，即 connect.sid](./images/20200927111100141_28762.png)