---
title: PM2 常用配置
tags:
  - nodejs
  - pm2
---

通过 pm2 配置文件对项目运行方式进行定制，包括进程数量、日志文件目录等。

可以手动创建一个 JSON 文档以配置参数

```json
// 📁 pm2.conf.json
{
    "apps": {
        "name": "pm2-test-server",   // 项目/进程名称
        "script": "app.js",   // 项目入口文件，如果使用 Express 搭建的项目就是 bin/www
        "watch": true,    // 监听项目文件变化自动重启，开发环境可以开启
        "ignore_watch": [
            "node_modules",
            "logs"
        ],   // 忽略监听的文件
        "instances": 4,   // 多进程配置
        "error_file": "logs/err.log",   // 错误日志存放的文档
        "out_file": "logs/out.log",   // 输出日志存放的文档
        "log_date_format": "YYYY-MM-DD HH:mm:ss"   // 每一条记录的时间格式
    }
}
```

需要在 pm2 运行命令需要添加相应的配置文件

```json
// 📁 package.json
{
  // ...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "cross-env NODE_ENV=dev nodemon app.js",
    // 按照配置文件来启动项目
    "prd": "cross-env NODE_ENV=production pm2 start pm2.cong.json"
  },
}
```

:bulb: 也可以使用命令 `pm2 ecosystem` 生成一个 [Ecosystem File](https://pm2.keymetrics.io/docs/usage/application-declaration/) 配置模板文件来设置参数。

:bulb: 由于系统限制了每个进程可以使用的内存大小，因此可以通过 pm2 配置多进程来提高服务器的性能。但如果使用多进程来运行项目，会存在无法共享内存的问题，可以通过使用 redis 数据库共享 session 来解决类似的问题。