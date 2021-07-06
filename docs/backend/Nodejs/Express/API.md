---
tags:
  - nodejs
  - express
---

# Express 常用 API
## Response
`res` 对象表示 Express 应用在收到 HTTP 请求后，返回的 HTTP 响应。

:bulb: 虽然响应对象名称可以任意，但在中间件或路由处理程序中一般称为 `res`（并且相应的 HTTP 请求为 `req`），也可以使用 `response`（相应的 HTTP 请求为 `request`）。

### res.redirect()
`res.redirect([statusCode], path)` 重定向到 `path` 指定的 URL，而且一般会指定状态（一个正整数，对应HTTP状态码），如果没有指定则使用默认值 `302`  表示 `"Found"`。

```js
res.redirect('/foo/bar')
res.redirect(301, '/foo/bar')
```

:bulb: 可以使用相对路径 URL

```js
// 从 http://example.com/admin/blog/ 发出请求
// 注意请求的 URL 结尾有斜线 /，则当前目录是 blog
// 重定向到 http://example.com/admin/blog/post/new
res.redirect('post/new')   // 表示基于当前目录 blog/ 的下一级目录

// 从 http://example.com/admin/blog 发出请求
// 注意请求的 URL 结尾没有斜线 /，则当前目录是 admin，而 blog 是 html 文档
// 重定向到 http://example.com/admin/post/new
res.redirect('post/new') // 表示基于当前目录 admin/ 的下一级目录

// 从 http://example.com/admin/blog/ 发出请求
// 或重定向到父级目录 http://example.com/admin
res.redirect('/admin')   // 斜线 / 表示域名下的根目录，可以返回任意级的父目录

// 从 http://example.com/admin/post/new 发出请求
// 重定向到上一级目录 http://example.com/admin/post/
res.redirect('..')

// 也可以使用关键字 back 返回上一个路由地址，如果没有上一个路由记录默认返回根目录 /
res.redirect('back')
```

:bulb: 可以重定向到网站内的页面或其他网站的页面

```js
res.redirect('http://google.com')
```