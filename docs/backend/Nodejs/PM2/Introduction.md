---
title: PM2 简介
tags:
  - nodejs
  - pm2
---

参考：
* PM2 - [Home](https://pm2.keymetrics.io/)
* [简介](https://wohugb.gitbooks.io/pm2/content/index.html) | PM2

PM2，P(rocess) M(anager) 2，是具有内置负载平衡器的 Node.js/io.js 应用程序的线上进程管理器。
它可以帮助您管理和保持应用程序在线，并简化常见的系统管理任务。

特点：

* **进程守护**，系统崩溃自动重启
* 启动多进程，充分利用 CPU 和内存
* 自带日志记录功能


## 安装
```bash
$ npm install pm2 -g
# 或
$ yarn global add pm2
# 查看版本
$ pm2 --version
```

## 启动
在项目中配置 npm script

```json
{
  // ...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "cross-env NODE_ENV=dev nodemon app.js",
    "prd": "cross-env NODE_ENV=production pm2 start app.js"
  },
}
```

:bulb: 项目需要安装 [cross-env](https://www.npmjs.com/package/cross-env) 或类似的模块，以使用环境变量来区分线上环境和开发环境

线上环境使用 pm2 启动项目后会输出一个信息表，然后在后台运行而将控制台交还给用户，并不占用前台。

也可以通过命令 `pm2 list` 查看当前后台运行的项目的信息表

| id | name | mode |  restart | status | cpu | memory |
| --- | -------- | ------ | --------- | --------- | ----- | ------------ |
| 0  | app    | fork    | 0         | online | 0%  | 31.4mb  |

