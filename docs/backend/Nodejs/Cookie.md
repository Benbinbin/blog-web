---
show: true
cover: nodejs.png
collection: Node.js
summary: 使用 Node.js 为前端浏览器设置 Cookie。
tags:
  - Node.js
---

# Cookie
## 浏览器读取与写入
参考：[Cookie.md](D:/Frontend/JavaScript/操作浏览器/Cookie.md)

## 服务器端读取与写入
### 使用 Node.js
* 读取 Client 端发送的请求中的 cookie

```js
const server = http.createServer(function(req, res) {
    // ...
    // 读取请求中的 cookie
    const cookieStr = req.headers.cookie;
    // 解析 cookie，转换为对象添加到 req.cookie 中，以 key: value 的形式表示
    req.cookie = {};
    cookieStr.split(';').forEach(item => {
      if (!item) {
        return
      }
      const arr = item.split('=');
      const key = arr[0].trim();
      const val = arr[1].trim();
      req.cookie[key] = val;
    })
});
```

* 将 cookie 写入到 Server 端的响应中

```js
const server = http.createServer(function(req, res) {
    // ...
    // 将 cookie 写入到响应中
    res.setHeader('Set-Cookie', 'username=Ben;path=/');
});

```

### 使用 Express 和 cookie-parser
需要先安装解析 Cookie 的相关模块

```bash
npm install cookie-parser
```

* 读取 Client 端发送的请求中的 cookie

```js
// ...
req.cookies.yourCookieName;
```

* 将 cookie 写入到 Server 端的响应中


    Express 写入 cookie 并设置[相关参数](http://expressjs.com/en/5x/api.html#res.cookie)

    ```js
    var cookieParser = require('cookie-parser');
    // ...
    app.use(cookieParser());
    res.cookie(name, value, [, options]);
    ```

    常用参数 option 设置：
    * `maxAge` Cookie 的有效期，以毫秒计算
    * `httpOnly` 仅可以通过 http 传输，布尔值
