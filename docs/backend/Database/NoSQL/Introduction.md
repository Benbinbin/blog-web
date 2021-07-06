# NoSQL 简介

参考：[NoSQL 简介](https://www.mongodb.org.cn/tutorial/2.html)

## NoSQL
NoSQL 是 Not Only SQL 的缩写，意即不仅仅是 SQL，一般指使用**非关系型**的数据存储技术。NoSQL一词最早出现于 1998 年，是 Carlo Strozzi 开发的一个轻量、开源、不提供 SQL 功能的关系数据库。

对 NoSQL 最普遍的解释是「非关联型的」，强调 ==Key-Value== Stores 和文档数据库的优点，而不是单纯的反对 RDBMS。

:bulb: NoSQL 遵顼 BASE 原则，而 SQL 遵循 ACID 原则

* BASE 是 NoSQL 数据库通常对可用性及一致性的弱要求原则：
  * Basically Availble  基本可用
  * Soft State 软状态/柔性事务。Soft state 可以理解为「无连接」的状态，而 Hard state 是「面向连接」的
  * Eventual Consistency 最终一致性，也是 ACID 的最终目的

* [ACID 规则](https://www.mongodb.org.cn/tutorial/2.html) 是关系型数据库遵循的原则：
  * A：原子性 Atomicity 是指事务（transaction 和现实世界中的交易很类似）里的所有操作要么全部做完，要么都不做，事务成功的条件是事务里的所有操作都成功，只要有一个操作失败，整个事务就失败，需要回滚。
  * C：一致性 Consistency 是指事务的运行不会改变数据库原本的一致性约束，数据库要一直处于一致的状态。
  * I：独立性 Isolation 是指并发的事务之间不会互相影响，如果一个事务要访问的数据正在被另外一个事务修改，只要另外一个事务未提交，它所访问的数据就不受未提交事务的影响。
  * D：持久性 Durability 是指一旦事务提交后，它所做的修改将会永久的保存在数据库上，即使出现宕机也不会丢失。

|          ACID           |                 BASE                  |
| :---------------------: | :-----------------------------------: |
|  原子性(**A**tomicity)  | 基本可用(**B**asically **A**vailable) |
| 一致性(**C**onsistency) |    软状态/柔性事务(**S**oft state)    |
|  隔离性(**I**solation)  | 最终一致性 (**E**ventual consistency) |
|  持久性 (**D**urable)   |                                       |

## NoSQL 数据库分类

* 列存储：按列存储数据的。最大的特点是方便存储结构化和半结构化数据，方便做数据压缩，如 Hbase
* 文档存储：文档存储一般用类似 json 的格式存储，存储的内容是文档型的。这样也就有机会对某些字段建立索引，实现关系数据库的某些功能，如 MongoDB
* key-value 存储：可以通过 key 快速查询到其 value。一般来说，存储不管 value 的格式，照单全收，如 Redis
* 图存储：图形关系的最佳存储，如 FlockDB
* 对象存储：通过类似面向对象语言的语法操作数据库，通过对象的方式存取数据，如 db4o
* xml 数据库：高效的存储 XML 数据，并支持 XML 的内部查询语法，如 XQuery

## MongoDB
[MongoDB](https://www.mongodb.com/) 是由 C++ 语言编写的 NoSQL，是一个基于分布式文件存储的开源数据库系统，旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。

MongoDB 将数据存储为一个文档，其数据结构由键值 `key: value` 对组成，类似于 JSON 对象，字段值 `value` 可以包含其他文档，数组及文档数组等多种数据类型。

:bulb: [Mongoose](https://mongoosejs.com/) 是一个基于 MongoDB 的 **Nodejs 模块**，结合了 NoSQL 和 SQL 的特点为模型提供了一种直接的，**基于 scheme 结构去定义数据模型**。它内置数据验证， 查询构建，业务逻辑钩子等，开箱即用。



