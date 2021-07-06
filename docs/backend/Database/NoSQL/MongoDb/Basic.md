---
show: true
cover: MongoDB.png
summary: MongoDb 基础命令
tags:
  - mongodb
---

# MongoDb 基础命令

参考：
* [mongo Shell Quick Reference](https://docs.mongodb.com/manual/reference/mongo-shell/)
* [Working with the mongo Shell](https://docs.mongodb.com/manual/mongo/#working-with-the-mongo-shell)
* [MongoDB Cheat Sheet](https://gist.github.com/bradtraversy/f407d642bdc3b31681bc7e56d95485b6)
* :cinema: [MongoDB 入门](https://www.youtube.com/playlist?list=PLliocbKHJNwvYvA3paPKUg86qLKrwuNsd) | 小马技术
* :cinema: [MongoDB Crash Course](https://youtu.be/-56x56UppqQ) | Traversy Media

可以使用 GUI 界面 [MongoDB Compass](https://www.mongodb.com/products/compass) 来操作数据库；但推荐使用命令行界面 [mongo shell](https://docs.mongodb.com/manual/reference/mongo-shell/) 来进行更高效的操作，可使用的详细命令可参考官方文档 [mongo Shell Methods](https://docs.mongodb.com/manual/reference/method/)。

:bulb: 可以使用**链式**来组合不同的命令构成复杂的查询语句，如 `db.posts.find().limit(2).sort({ title: 1 }).pretty()`

* `db.posts.find()` 查询当前数据库 `db` 的集合 `posts` 中所有的文档
* `.limit(2)` 限制最多打印前 2 个文档
* `.sort({ title: 1 })` 输出的文档基于其中的 `title` 域升序排列
* `.pretty()` 以更易于阅读的方式打印文档内容

## 帮助命令
* `help` 列出帮助相关的命令
* `db.help()` 列出 database 可用的方法和帮助信息
* `db.<collection>.help()` 列出集合可用的方法

## 用户
* `show users` 列出当前数据库所有用户

## 数据库
* `show dbs` 查看所有数据库
* `db` 查看当前数据库
* `db.stats()` 查看当前数据库的信息概述
* `use <DatabaseName>` 切换到指定的数据库，如果没有就会以该名创建一个
* `db.dropDatabase()` 删除当前数据库

## 集合
* `show collections` 列出当前数据库的所有集合
* `db.createCollection(CollectionName)` 创建一个新的集合，名为 `CollectionName`
* `db.<CollectionName>.renameCollection(NewCollectionName)` 将集合 `CollectionName` 改名为 `NewCollectionName`
* `db.<CollectionName>.drop()` 删除集合

## 文档
### 插入与更新
* `db.<CollectionName>.insert(<document[s]>)` 向集合插入文档，相当于 `.insertOne()`（或文档组成的数组，相当于 `.insertMany()`）

    ```bash
    db.posts.insert(
    ... {
    ...     title: "我的第一篇博客",
    ...     content: "已经开始写博客了，太激动了。",
    ...     date: Date()
    ... }
    ... );
    ```

    :bulb: 可以使用 JavaScript 语法，如 for 循环实现插入多个文档

    ```bash
    for(var i = 3; i <=10; i++ ) {
    ...     db.posts.insert({
    ...         title: "我的第" + i + "篇博客"
    ...     });
    ... }
    ```

    :bulb: 使用 JavaScript 语法（内置对象）`Date()` 可以获取当前时间

* `db.<CollectionName>.insertOne(<document>)` 向集合插入一个文档
* `db.<CollectionName>.insertMany(<documents>)` 向集合插入多个文档（以对象数组形式传递）
* `db.<CollectionName>.update(<query>, <update>, <setting>)` 更新匹配的文档
    :bulb: 使用特殊的命令来更新字段
    * `$set` 更新或新增字段值，默认以覆写的方式来更新第一个匹配的文档，如果希望更新部分字段，可以使用 `$set` 命令 `db.posts.update({"title":"test"}, {$set: {"rank": 10} })` 更新排名字段为 `10`，其他字段不变
    * `unset` 删除匹配文档的指定字段，如 `db.posts.update({"title":"test"}, {$unset: {"rank": true} })`
    * `$inc` 表示递增 increment，如 `db.posts.update({title:"test"}, {$inc: {rank: 2}})` 将匹配文档的排名字段的值递增 `2`
    * `$mul` 表示相乘 multiple，如 `db.posts.update({title:"test"}, {$mul: {rank: 2}})` 将匹配文档的排名字段的值乘以 `2`
    * `$rename` 重命名字段，如 `db.posts.update({title:"test"}, {$rename: {"rank": "score"}})` 将字段 `rank` 重命名为 `score`

    :bulb: 可以传递一个对象作为第三个参数（可选）进行[更详细的更新行为配置](https://docs.mongodb.com/manual/reference/method/db.collection.update/)
    ```js
    {
         upsert: <boolean>,
         multi: <boolean>,
         writeConcern: <document>,
         collation: <document>,
         arrayFilters: [ <filterdocument1>, ... ],
         hint:  <document|string>        // Available starting in MongoDB 4.2
    }
    ```
    如设置命令 `upsert: true` 在未匹配到文档时，基于 `<update>` 创建一个新文档，即将 update 和 insert 功能结合起来；默认只会更新第一个匹配的文档，可以设置命令 `multi: true` 更新所有匹配的文档。

### 查询
* `db.<CollectionName>.find({key: 'value'})` 查看集合符合条件的文档，如果参数为空对象 `{}` 则返回所有文档
    :bulb: 可以使用 `db.<CollectionName>.find().pretty()` 以更易于阅读的排版方式打印出文档内容
    :bulb: 可以在[设置更复杂的匹配条件](https://docs.mongodb.com/manual/reference/method/db.collection.find/#db.collection.find)
    * 使用 `$gte` 大于等于，`$gt` 大于，`$lte` 小于等于，`$lt` 小于， `$eq` 等于，`$ne` 不等于设置查询范围，如 `db.posts.find({"rank": {$gte: 4}})`  查询排名大于等于 `4` 的文档
    * 使用正则表达式 `/reg/` 设置需要匹配的模式，如 `db.posts.find({"title": /u/})` 查询标题中包含 `u` 的文档
    * 使用 `$or` 或，`$in` 包含，`$exists` 存在（一般针对该域/字段是否存在文档中），如 `db.posts.find({"rank": {$in: [3, 4]} })` 查询排名为 `3` 或 `4` 的文档；`db.posts.find({$or: [{"title": /u/}, {"rank":{$gte:4}}] })`  查询满足两个条件之一的文档；`db.bios.find(death: {$exists: false }})` 查询仍运行的 bios 程序
    * 使用 `$elemMatch` 查询字段值为[对象数组](https://docs.mongodb.com/manual/reference/operator/query/elemMatch/)的嵌套型的数据结构，匹配数组对象中属性值为特定值的文档
    * 使用 `$all` 操作符查询字段值为数组且[包含所有指定的元素](https://docs.mongodb.com/manual/reference/operator/query/all/)，类似于 [`$and` 操作符](https://docs.mongodb.com/manual/reference/operator/query/and/)

    :bulb: 可以传递第二个参数（可选） `db.collection.find(<query>, <projection>)` 设置抽取文档要返回的**部分域/字段）**，需要返回的字段需要显示地设置为 `true` 或 `1` 否则默认不返回（除了 `_id` 字段，它是默认打印的），如 `db.posts.find({}, {title:true, rank:1, _id:0})` 返回所有文档的 `title` 和  `rank` 字段， 但不输出 `_id` 字段（默认会打印）
* `db.<CollectionName>.find().sort({key: 1})` 将查询得到的文档以给定字段升序排列，如果需要降序排列可以设置为 `key: -1`
* `db.<CollectionName>.find().limit(n)`  只输出查询得到的前 `n` 个文档
* `db.<CollectionName>.find().skip()` 跳过查询得到的前 `n` 个文档，结合 `.limit()` 可以实现**分页查询**
* `db.<CollectionName>.findOne({key: 'value'})` 按照条件查询集合第一个匹配的文档

### 索引
给文档建立索引可以便于搜寻，**MongoDB 默认使用软件给每个文档生成的 `_id` 作为索引**。

* `db.<CollectionName>.getIndexes()` 获取集合中文档的所有索引
* `db.<CollectionName>.createIndex({rank:-1})` 添加以排名作为索引，顺序为降序排列，如果需要索引值唯一可以设置参数 `db.<CollectionName>.createIndex({rank:-1}, {unique: true})`
* `db.<CollectionName>.dropIndex({rank: -1})` 删除索引，需要传递与创建索引时相同的名称

:bulb: 基于索引进行搜索

基于字段 `title` 创建索引，格式是文本
```bash
db.posts.createIndex({ title: 'text' })
```

使用[（文本）索引进行搜索](https://docs.mongodb.com/manual/reference/operator/query/text/index.html)
```bash
db.posts.find({
  $text: {
    $search: "\"Post O\""
    }
})
# 返回 title 包含 Post O 的文档

db.posts.find({
  $text: {
    $search: "\"Post T\""
    }
})
# 返回 title 包含 Post T 的文档
```

### 其他
* `db.<CollectionName>.count()` 查看集合所包含的文档数量
* `db.<CollectionName>.distinct(key)` 查看集合指定域/字段的所有（非重复）值，返回一个数组
* `db.<CollectionName>.remove({key: 'value'})` 删除集合匹配的文档，如果参数为空对象 `{}` 则删除集合中所有的文档

## 其他
* `.forEach(function() {})` 循环遍历元素

    ```bash
    db.posts.find().forEach(function(doc) {
      print("Blog Post: " + doc.title)
    })
    ```