---
show: true
cover: SQL.png
collection: SQL
summary: SQL 聚合数据
tags:
  - SQL
---

# SQL 聚合数据

使用不同的聚合函数可以针对单个字段（列）进行数据聚合分析，这些函数一般用在 `SELECT` 语句中，从而在更整体的范围上观测数据，而不仅仅从每一行的数据去探索。

:warning: **聚合函数只能垂直聚合，即聚合列的值**。如果你想对行进行计算，可以使用[简单算术表达式](https://community.modeanalytics.com/sql/tutorial/sql-operators/#arithmetic-in-sql)。

## COUNT
聚合函数 `COUNT(col_name)` 统计给定字段（单列）的非空值的数量（行数），可以用来快速判断某个字段中是否缺少数据。

:bulb: 如果使用通配符 `*` 则一般返回表格行数（因为表格一般很少存在所有字段都为空 `NULL` 的行）

```sql
SELECT COUNT(accounts.id) AS id_count
FROM accounts;

SELECT COUNT(*)
FROM accounts;
```

## SUM
聚合函数 `SUM(col_name)` 对给定字段的数值求和，该列的数据类型需要时数值，而且将忽略 `NULL` 值

```sql
SELECT SUM(poster_qty) AS post_qty
FROM orders
```

## AVG
聚合函数 `AVG(col_name)` 对给定字段的数值求平均值，即列中所有的值之和除以列中值的数量。该列的数据类型需要时数值，该聚合函数同样会忽略分子和分母中的 `NULL` 值。

```sql
SELECT AVG(standard_qty) mean_standard
FROM orders;
```

## MIN 与 MAX
聚合函数 `MIN(col_name)` 或 `MAX(col_name)` 分别对给定字段里的最小或最大的数值，聚合函数会忽略 `NULL` 值。

```sql
-- 最早的订单
SELECT MIN(occurred_at)
FROM orders;
```

:bulb: 从功能上来说 `MIN` 和 `MAX` 与 `COUNT` 相似，它们都可以用在非数字列上。`MIN` 将返回最小的数字、最早的日期或按字母表排序的最之前的非数字值，具体取决于列类型。`MAX` 则正好相反，返回的是最大的数字、最近的日期，或与“Z”最接近（按字母表顺序排列）的非数字值。

## CASE
语句 `CASE END` 用于创建一个派生列，类似于直接在选择语句通过算术运算创造派生列，CASE 语句也是位于 `SELECT` 语句中，但不同的是结合语句 `WHEN conditional statement THEN value` 可以特定的条件 `conditional statement` 在新建的字段中使用相应的值。

:warning: CASE 语句至少有一对 WHEN-THEN（可以使用多个 WHEN 语句，以便匹配多种情况），在其中使用条件运算符编写条件语句，如 `WHERE`，可以使用 `AND` 和 `OR` 连接多个条件语句；语句 `ELSE` 是可选组成部分，用来包含不符合上述任一 CASE 条件的情况。

```sql
-- 派生列 unit_price 由字段 standard_amt_usd 的值除以字段 standard_qty 的值产生
-- 对字段 standard_qty 的值进行判断，如果为 0 或 NULL 就返回 0，避免除数为 0 引起运算错误
SELECT id, account_id,
    CASE WHEN standard_qty = 0 OR standard_qty IS NULL THEN 0
    ELSE standard_amt_usd/standard_qty END AS unit_price
FROM orders
LIMIT 10;
```

## GROUP BY
聚合语句 `GROUP BY` 可以用来对数据的子集进行聚合，即基于给定字段（列）的值进行分类，然后就可以获得表格的子集，以便在更细的颗粒度上对数据进行分析。

:warning: 当我们使用聚合行数对数据进行分析时，如果在 `SELECT` 语句中有任何一个字段（列）不在聚合函数中，则必须在 `GROUP BY` 条件中，以表示基于该字段先进行分类，再对获得的各个数据子集进行聚合分析。`GROUP BY` 语句始终在语句 `WHERE`（之后） 和 `ORDER BY` 之间。

:bulb: 可以同时基于多个字段（列）进行**分组**，这样就可以获得更精细颗粒度的聚合结果。

```sql
-- 查看在 web_events 表格中每个销售代表使用特定渠道的次数
SELECT s.name, w.channel, COUNT(*) num_events
FROM accounts a
JOIN web_events w
ON a.id = w.account_id
JOIN sales_reps s
ON s.id = a.sales_rep_id
GROUP BY s.name, w.channel
ORDER BY num_events DESC;
```

## DISTINCT
语句 `DISTINCT` 仅返回表格中（多个）特定字段（列）的唯一值的数据，类似于聚类（但并不需要聚类函数返回相应的值）。

```sql
-- 使用 DISTINCT 检查是否有任何客户与多个区域相关联
SELECT DISTINCT a.id, r.id, a.name, r.name
FROM accounts a
JOIN sales_reps s
ON s.id = a.sales_rep_id
JOIN region r
ON r.id = s.region_id;

-- 如果每个客户与多个区域相关联，则上一个查询返回的行数应该比以下查询的多
SELECT DISTINCT id, name
FROM accounts;
```

## HAVING
语句 `HAVING` 是过滤被聚合后的数据，相当于对通过聚合产生的数据执行 `WHERE` 语句再进行筛选。

```sql
-- 查看管理超过 5 个客户的销售代表
SELECT s.name salesman, COUNT(a.name) client_counts
FROM sales_reps s
JOIN accounts a
ON s.id = a.sales_rep_id
GROUP BY salesman
HAVING COUNT(a.name) > 5
ORDER BY client_counts;
```

:warning: 由于语句 `HAVING` 是过滤被聚合后的数据，因此它必须在语句 `GROUP BY` 之后使用。