---
show: true
cover: MySQL.png
summary: 使用 Node.js 操作 MySQL
tags:
  - mysql
---

# Node.js 操作 MySQL

1. 安装连接 MySQL 所需的模块 [mysql2](https://www.npmjs.com/package/mysql2)
```bash
npm install --save mysql2
```

:warning: 旧的模块 [mysql](https://www.npmjs.com/package/mysql) 由于不支持 MySQL 8 新的加密方式，使用该模块连接会产生[错误](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server/50131831#answer-56509065)。

```bash
Client does not support authentication protocol requested by server; consider upgrading MySQL client
```

2. 创建连接，执行查询语句

```js
// 导入模块
const mysql = require('mysql2');

// 创建连接对象，基于 MySQL 信息设置相应的配置参数
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123',
  port: '3306'
  database: 'test'
});

// 连接
connect.connect();

// 执行 sql 语句查询数据
const sql = 'select * from users';

connect.query(sql, (err, result) => {
  if(err) {
    console.error(err);
    return
  }
  console.log(result);
})

// 回调函数可以设置（可选）第三个参数，包含与结果相关的一些元信息
connection.query(
  'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);

// 查询语句可以使用占位符，具体的值可以使用数组来传递
connection.query(
  'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
  ['Page', 45],
  function(err, results) {
    console.log(results);
  }
);

// 关闭连接
connect.end();
```

:bulb: 连接数据库是异步操作，应该使用 `promise` 进行封装。