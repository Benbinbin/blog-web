---
show: true
cover: SQL.png
collection: SQL
summary: SQL 基础
tags:
  - SQL
---

# SQL 基础

Structured Query Language, SQL `/ˈsiːkwəl/` 结构化查询语言是用于与**关系型数据库**进行交互的编程语言。

关系型数据库存储的数据受一定的规范限制以实现特定的结构便于查询

* 数据存储在类似于 Excel 的电子表格中，**每行**表示一条数据，**每列**表示一种属性，如名称、位置、唯一身份等
* 同一列中的所有数据必须为**一致的数据类型**，这是数据库可以快速使用的原因之一

:bulb: 有一种称为 NoSQL 数据库交互语言，表示 Not only SQL（不仅仅是 SQL），它更适用于**基于网络数据的环境**，而不太适用于基于电子表格的数据分析，最常用的 NoSQL 数据库之一是 [MongoDB](https://www.mongodb.com/)。

## 规范
编写 SQL 脚本需要遵循一定的规范

* 大小写：SQL 不区分大小写，但是一般遵循**命令语句大写，而其他内容小写的规范**，这使得脚本更容易阅读
* 空格：在表、列名或变量名中**避免使用空格**（否则会被认为是两个不同的变量），如果由多个单词构成应该使用 `_` 下划线分隔。如果表名或列名称中有空格需要使用 `""` 双引号括住（在其他环境中可能会使用方括号，如 `FROM [Table Name]`）。
    :bulb: 由于 SQL 查询语句会忽略空格，可以根据需要在查询代码中添加空格，使代码便于阅读

    ```sql
    SELECT account_id FROM orders
    -- 等价于这个查询:

    SELECT account_id
    FROM orders
    ```

* 分号：复合查询语句的结尾需要添加 `;` 分号，表示该语句结束

SQL 常用的语句和运算符

| **语句或运算符** |               **使用方法**               |                  **其他详细信息**                   |
| -------------------- | ------------------------------------------- | ------------------------------------------------------- |
| `SELECT`          | SELECT **Col1**, **Col2**, ...           | 提供你需要的列                                       |
| `FROM`             | FROM **Table**                        | 提供列所在的表格                                    |
| `LIMIT`              | LIMIT **10**                             | 限制返回的行数                                       |
| `ORDER BY`          | ORDER BY **Col**                      | 根据列命令表格。与 **DESC** 一起使用。          |
| `WHERE`           | WHERE **Col > 5**                     | 用于过滤结果的一个条件语句                        |
| `LIKE`                | WHERE **Col LIKE '%me%'**          | 仅提取出列文本中具有 'me' 的行                    |
| `IN`                | WHERE **Col IN ('Y', 'N')**             | 仅过滤行对应的列为 'Y' 或 'N'                       |
| `NOT`              | WHERE **Col NOT IN ('Y', "N')**     | **NOT** 经常与 **LIKE** 和 **IN** 一起使用。 |
| `AND`              | WHERE **Col1 > 5 AND Col2 < 3** | 过滤两个或多个条件必须为真的行                   |
| `OR`                | WHERE **Col1 > 5 OR Col2 < 3**    | 过滤一个条件必须为真的行                          |
| `BETWEEN`           | WHERE **Col BETWEEN 3 AND 5** | 一般情况下，语法比使用 **AND** 简单一些       |

:bulb: 虽然 SQL **不区分大小写**（语句无所谓大小写），我们讨论了一些比较好的方法 **关键词的顺序很重要**

## 常用语句
sql 脚本由各种语句 clause 构成筛选条件，用以选择特定的数据。

### CREATE
`CREATE TABLE` 在数据库中创建新表

### DROP
`DROP TABLE` 删除数据库中表

### SELECT-FROM
查询语句用于选择需要读取并显示的数据（一般是选择显示特定表格的特定（多）列），由两部分 `SELECT` 和 `FROM` 组成

* `SELECT` 用于选择需要查询的**列**，可同时选择多列，列名以逗号 `,` 隔开（最后一个列名无需加逗号）
    :bulb: 若选择所有列可使用通配符 `*`
* `FROM` 语句用于指明数据来源，即需要选择的列来源于哪个表格

```sql
-- 选择 orders 表格中的 id、account_id、occurred_at 列
SELECT id, account_id, occurred_at FROM orders

-- 选择 orders 表格中的所有列
SELECT * FROM table_name
```

:bulb: 使用 `SELECT DISTINCT` 使结果仅显示唯一的值（选择显示的字段中，没有两行数据是完全相同的）

### WHERE
`WHERE` 为表格创建子集，后面添加条件语句以**筛选**出满足特定条件的数据子集

在条件语句中常用的运算符

* `>` 大于
* `<` 小于
* `>=` 大于或等于
* `<=` 小于或等于
* `=` 等于
* `!=` 不等于

```sql
SELECT * FROM orders
WHERE gloss_amt_usd >= 1000
LIMI 5
```

运算符 `=` 和 `!=` 除了可应用于数值数据外，也可以用于非值数据（如字符串），:warning: 如果使用文本数据时要使用引号 `''` 或 `""` 将值括起来（推荐使用单引号，特别是原始数据中如果使用了双引号的情况下）

### ORDER BY
`ORDER BY` 语句按一定的顺序排序表

* `ORDER BY` 语句始终在 `SELECT` 和 `FROM` 语句之后
* `ORDER BY` 默认按升序 ascending 排列，即按照数字从大到小、字母从 a 到 z、时间从早到晚等，:bulb: 可以在 `ORDER BY` 语句后添加 `DESC` 按降序排序
* 如果 `ORDER BY` 后添加多个字段/属性，则会按照从左往右的先后优先次序对数据（即表格的行）进行排序

```sql
SELECT id, account_id, total
FROM orders
ORDER BY total_amt_usd DESC
LIMIT 20;
```

### LIMIT
`LIMIT` 语句用于查看表的前几行，后面参数规定了查看的行数，通过限制加载行数可以缩短查询结果的返回时间，更快地预览数据。

```sql
LIMIT int_number
```

:warning: `LIMIT` 命令始终是查询的最后一部分

## 派生列
在选择语句中可以基于现有的列组合（通过算术运算）生成的新列 `SELECT derive_column FROM table_name`，这些列称为派生列

常见运算包括：

* `*` 乘法
* `+` 加法
* `-` 减法
* `/` 除法

```sql
SELECT id,
       account_id,
       -- 派生列
       standard_amt_usd / standard_qty AS unit_price
FROM orders
```

:bulb: 可以为派生列命名，在运算式后使用 `AS` 语句命名

## 逻辑运算符
在 SQL 语句中可以用逻辑运算符结合匹配语句 `WHERE` 构建复杂的命令，一般用于操作文本数据，使用括号 `()` 来规定执行运算的先后顺序

### LIKE 模糊匹配
`LIKE` 运算符用于模糊查找

* `LIKE` 运算符处理文本常与通配符 `%` 一起使用。 **`%` 适配任意数量的字符**，可以产生一组特定的匹配模式（与正则表达式类似）
* 需要用单引号或双引号将传达给 `LIKE` 的文本包括（字符串对于大小写敏感，如 搜索 `'T'` 与搜索 `'t'` 不同）

```sql
SELECT id, name
FROM accounts
-- 筛选出字段 name 以 's' 结尾的数据
WHERE name LIKE '%s'
```

### IN 并行的精确匹配
类似于使用 `WHERE` 和 `=` 的运算进行精确匹配，如果需要基于同一个字段（列）设置多个筛选条件，可用 `IN` 运算符，多个条件之间使用逗号 `,` 分隔。

```sql
SELECT name, primary_poc, sales_rep_id
FROM accounts
-- 筛选出字段 name 是 Walmart、Target、Nordstorm 之一的数据
WHERE name IN ('Walmart', 'Target', 'Nordstrom')
```

### NOT
`NOT` 运算符查找到所有**不符合**特定条件的行，与 `IN` 或 `LIKE` 一起运算，即 `NOT LIKE` 或 ` NOT IN` 返回不符合特定条件（剩余）的数据。

```sql
SELECT name, primary_poc, sales_rep_id
FROM accounts
-- 筛选出字段 name 中除 Walmart、Target 和 Nordstrom 之外的数据
WHERE name NOT IN ('Walmart', 'Target', 'Nordstrom')
```

### AND & BETWEEN
可用于组合所有条件必须为真的运算

#### AND
用于一次考虑多个逻辑子句，筛选出同时满足多个条件的数据

:warning: `AND` 连接的是一个新的完整语句，不能将其看作是部分条件的连接符。

```sql
SELECT *
FROM orders
WHERE standard_qty > 1000 AND poster_qty = 0 AND gloss_qty = 0
```

#### BETWEEN
用 `AND` 连接不同语句时，如果筛选条件是基于相同的字段时，可以使用 `BETWEEN` 更清楚

```sql
SELECT *
FROM table_name
WHERE column >= 6 AND column <= 10

-- 以下筛选效果相同，但语句更简洁
/* ... */
WHERE column BETWEEN 6 AND 10
```

:warning: 对于单纯的日期数据而言（只包含年月日不包含时间的数据，比如 '2016-12-31'），其默认时间为日期当天的 00:00:00（也就是午夜时分），而使用语句 `BETWEEN` 设置时间筛选条件时，它是**不包含端点**的，因此如果需要查询 `2016年` 的数据，则应该使用

```sql
BETWEEN '2016-01-01' AND '2017-01-01'
```

### OR
用 `OR` 组合至少一个条件必须为真的运算，用于一次考虑多个逻辑子句，只需要满足其中一个即可。

```sql
SELECT id, gloss_qty, poster_qty
FROM orders
WHERE gloss_qty > 4000 OR poster_qty > 4000
```

:warning: 使用 OR 连接的也是新的完整的语句。

## 注释
SQL 注释的语法

* 单行注释：使用 `--`（后跟有一个空格）
* 多行注释：使用 `/* */`

```sql
/*
此处为注释....
*/
select * from students;
```
