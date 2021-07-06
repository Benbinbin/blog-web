---
show: true
cover: postgresql.png
collection: PostgreSQL
summary: PostgreSQL 命令行交互工具：psql
tags:
  - PostgreSQL
---

# psql

参考：
* [https://www.postgresql.org/docs/current/release.html](https://www.postgresql.org/docs/current/release.html)

psql 是 PostgreSQL shell，可以输入 sql 代码并立即执行获得反馈，通过命令行的方式与数据库进行交互。

## 常用操作命令
:warning: 复合的命令可以换行输入，而在最后使用 `;` 以表示命令结束，否则会报错。

### \l 命令
命令 `\l` 列出所有数据库

### \d 命令
以 `\d` 为关键字的命令用于查看当前数据库内数据（一般时表格）的匹配关系

* `\d` 列出当前数据库中的所有表，包括所属数据库的 schema 架构模式，name 表格名称，type 表格类型，owner 表格拥有者
* `\d+` 显示更多信息
* `\d table_name;` 显示名字为 name 的表的相关结构定义
* `\d tableName_pkey;` 显示指定表格的的索引（主键 primary key）信息
* `\d` 使用通配符 `*` 或 `?` 筛选显示名称符合特定模式的表
    * `*` 模糊匹配，不限制字数
    * `?` 模糊匹配，一个字符

显示特定类型的信息

* `\dt` 只显示表
* `\di` 只显示索引
* `\ds` 只显示序列
* `\dv` 只显示视图
* `\df` 只显示函数
* `\dn` 只显示 schema 架构模式
* `\du` 或 `\dg` 显示角色或用户，以及其具有的属性
* `\dp` 或 `\z` 显示表的权限分配


### \encoding 命令
以 `\encoding` 为关键字的命令设置客户端的数据内容编码模式，一般不需要修改（除非输出时出现字符乱码）

* `\encoding gbk;` 一般需要显示中文时需要将客户端设置为 `gbk` 编码模式
* `\encoding utf8;` 如果数据文档是使用 UTF-8 进行编码的，可以将客户端切换为 `utf8` 编码模式，这样就可以避免由于客户端编码模式与服务器编码模式不一致，从数据库读取数据需要转码可能引起的错误
* `CREATE DATABASE test WITH ENCODING 'utf8';` 创建一个库 `test` 并使用 `utf8` 编码


### \pset 命令
以 `\pset` 为关键字的命令设置输出格式，如输出的表格的边框样式

* `\pset border 0;` 输出内容无边框
* `\pset border 1;` 只显示内边框
* `\pset border 2;` 内外都有边框


### \x 命令
以 `\x` 命令切换表格数据按照单行或二维数组显示的状态

* `\x` 当反馈输出的结果为 `Expanded display is on` 表示扩展显示开启，数据按单行模式显示
* `\x` 当反馈输出的结果为 `Expanded display is off` 表示扩展显示关闭，数据按二维数组模式显示


### \c 命令
以 `\c` 为关键字的命令切换数据库/用户

* `\c databaseName;` 切换数据库
* `\c - username;` 在当前数据库中切换用户
* `\c database username;` 切换数据库和用户


### \h 命令
以 `\h` 为关键字的命令显示帮助信息

* `\h` 显示所有 SQL 命令
* `\h *;` 显示全部命令
* `\h 命令名称;` 显示该命令名称的帮助信息

:bulb: shell 通用的终止进程的快捷键是 `Ctrl + C`，一般显示的帮助信息都十分长，当阅读部分的信息可以解决问题后，可以按快捷键 `Ctrl + C` 关闭该进程。

## 用户权及限管理
数据库可能有多个用户管理，可以为每个用户设置不同的使用权限，如创建功能，操作表格功能等。

### 创建与删除用户
* `CREATE ROLE rolename;` 创建角色
* `CREATE USER username;` 创建用户

:bulb: 用户 `USER` 默认是有登录权限的，也可以设置登陆密码；而角色 `ROLE` 没有登陆权限的。

* `DROP ROLE rolename;` 删除角色
* `DROP USER username;` 删除用户
* `\du` 或 `\du userName` 查看所有已创建的用户或名为 userName 的属性
* `\du CREATE ROLE;` 或 `\du CREATE USER;` 查看可设置的管理权限
* `CREATE ROLE role_name WITH optional_permissions;` 在创建用户时设定权限

    ```sql
    -- 创建超级用户
    CREATE ROLE r1 WITH SUPERUSER;
    CREATE USER u1 WITH PASSWORD 'abc';
    ```

:bulb: 常用的权限如下：
- `SUPERUSER` 或 `NOSUPERUSER` 超级用户，:warning: 只有超级用户可以创建超级用户
- `CREATEDB` 或 `NOCREATEDB` 创建出来的用户是否有执行 CREATE DATABASE 的权限
- `CREATEROLE` 或 `NOCREATEROLE` 创建出来的用户是否有创建其他角色的权限
- `LOGIN` 或 `NOLOGIN` 创建出来的用户是否有Login的权限
- `INHERIT` 或 `NOINHERIT` 如果创建的一个用户拥有某一个或某几个角色，若指定 `INHERIT`，则表示该用户自动拥有相应角色的权限
- `CONNECTION LIMIT` 或 `connlimit` 该用户可以使用的并发连接数量，默认值为 `-1`，表示没有限制

### 切换用户
* `\c - username;` 在当前的数据库中切换用户
* `\c database username;` 切换数据库和用户

### 设置用户权限
`GRANT permission_type ON table_name TO role_name;` 给用户 role_name 设置特定的权限类型 permission_type（对于表格 table_name 的操作权限）

```sql
GRANT UPDATE ON room TO u1; -- 给u1对于room表格，赋予UPDATE权限
GRANT ALL ON room TO u1; -- 给u1对于room表格，赋予所有权限
GRANT SELECT ON ALL TABLES IN SCHEMA PUBLIC TO u1; -- 给u1对于postgres数据库所有表格，赋予SELECT权限
```

### 修改用户权限
`ALTER ROLE username WITH attribute_options;` 修改权限的命令格式

```sql
ALTER ROLE r1 WITH CREATEDB;
ALTER ROLE u1 WITH PASSWORD 'aaa';
```

### 撤销权限
`REVOKE permission_type ON table_name FROM user_name;` 撤销用户 user_name 的权限 permission_type（对于表格 table_name 的操作权限）

```sql
REVOKE SELECT ON room FROM u1; -- 撤销u1对room表格 SELECT的权限
```



