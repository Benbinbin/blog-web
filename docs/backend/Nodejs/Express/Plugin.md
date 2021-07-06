---
tags:
  - nodejs
  - express
---

# Express 插件
## nodemailer
[Nodemailer](https://nodemailer.com/) 是一款开源的 Node.js 应用程序的一个模块，可用于更轻松地发送邮件。

## csurf
[csurf](https://github.com/expressjs/csurf) 是 Express 内建的避免服务器收到跨站请求伪造 CSRF 攻击的中间件。

## dotenv
[dotenv](https://github.com/motdotla/dotenv) 可以将 `.env` 文件中设置的环境变量读取进项目中，并通过 `process.env` 进行调用。

## cross-env
[cross-env](https://www.npmjs.com/package/cross-env) 可以在 npm script 中传递参数

```json
// 📁 package.json
{
  // ...
  "scripts": {
    "dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js",
    "prod": "cross-env NODE_ENV=production nodemon ./bin/www.js"
  }
}
```

然后可以通过 Node.js 中的 `process.env.NODE_ENV` 或  express 中的 `req.app.get('env')` 来获取环境变量

## connect-flash
[connect-flash](https://github.com/jaredhanson/connect-flash) 用于在 session 中存储信息，并在显示给用户后清除，一般结合重定向后呈现一次性信息使用。

## express-validator
[express-validator](https://express-validator.github.io/docs/) 是 Express 的中间件，封装了 [validator.js](https://github.com/chriso/validator.js) 实现多种验证功能。

## session 相关
session 是暂存在服务器中的数据，它在浏览器（客户端）的 Cookie 中只保存相应的 session id，这样可以将临时但敏感的数据存储在服务器端，避免了客户端的数据泄露或被操作。

* [插件 express-session](https://www.npmjs.com/package/express-session)
* [插件 session-file-store](https://www.npmjs.com/package/session-file-store)
