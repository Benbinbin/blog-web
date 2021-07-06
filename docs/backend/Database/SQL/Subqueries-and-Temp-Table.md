---
show: true
cover: SQL.png
collection: sql
summary: SQL 子查询和临时表格
tags:
  - SQL
---

# 子查询和临时表格
子查询和表格表达式都是用来通过创建的一个表格，然后再编写一个查询来与这个新建的表格进行互动，因为有时候要回答的问题无法通过直接处理数据库中的现有表格获得答案。

## 子查询
子查询 Subqueries，也称为 Inner Queries 或 嵌套查询 Nested Queries，是指当我们所需的数据不能直接使用现有表格获取，而需要创建新的表格再次查询才可以获得所，就表明我们需要使用某种**子查询**。

将子查询编写在外层查询的语句 `FROM` 中，需要使用括号 `()` 包括而且要设置别名，SQL 会先独立运行内层查询，其查询结果作为外层查询的基础。

```sql
-- 查询每个渠道每天的平均事件次数
-- 内层查询获得的表格将提供每个渠道每天的事件次数
-- 外层查询对这些值求平均
SELECT channel, AVG(count) avg_per_day
FROM (SELECT w.channel channel, DATE_TRUNC('day', w.occurred_at) by_day, COUNT(*)
      FROM web_events w
      GROUP BY w.channel, by_day) sub
GROUP BY channel;
```

:bulb: 在编写子查询时，查询很容易就看起来很复杂，为了脚本便于阅读，应该基于层级进行代码缩进，将内部查询的代码进行相同的缩进。

```sql
SELECT *
FROM (SELECT DATE_TRUNC('day',occurred_at) AS day, channel, COUNT(*) as events
      FROM web_events
      GROUP BY 1, 2
      ORDER BY 3 DESC) sub
GROUP BY channel
ORDER BY 2 DESC;
```

:bulb: 在你写的第一个子查询中，你编写了一个子查询来创建表格，然后可以在 **FROM** 语句中查询该表格。但是，如果只返回一个值，则可以在逻辑语句中使用该值，如 `WHERE`、`HAVING`，甚至 `SELECT`，该值可以嵌套在 `CASE` 语句的 WHEN-THEN 结构中，作为筛选条件。如果我们返回了整个列，则需要使用 `IN` 来执行逻辑参数。:warning: 但在条件语句中编写子查询时，不能包含别名（这是因为该子查询会被当做单个值（或者对于 IN 情况是一组值）而不是一个表格，如果我们要返回整个表格，则必须为该表格使用别名，并对整个表格执行其他逻辑）。

```sql
-- 使用子查询的结果来查找仅与第一个订单的发生年月相同的订单
SELECT *
FROM orders o
WHERE DATE_TRUNC('month', o.occurred_at) =
	(SELECT DATE_TRUNC('month', MIN(occurred_at))
    FROM orders)
```

## 临时表格
语句 `WITH` 是用公用表表达式 CTE，common table expression 创建（临时/公用）表格供其他查询使用，与子查询的目的完全一样，每个 CTE 都需要设置别名（它们通过别名来被使用），但可以在外层其他地方进行声明，使得 sql 脚本结构逻辑更容易看懂。

:warning: 需要在查询的开头定义所有的 CTE，然后在脚本其他地方就可以使用这些 CTE。

```sql
-- 使用子查询
SELECT channel, AVG(events) AS average_events
FROM (SELECT DATE_TRUNC('day',occurred_at) AS day,
channel, COUNT(*) as events
FROM web_events
GROUP BY 1,2) sub
GROUP BY channel
ORDER BY 2 DESC;

-- 使用 WITH 语句创建公用表 events
-- 表格的别名设置在 WITH 语句后
WITH events AS (
SELECT DATE_TRUNC('day',occurred_at) AS day,
channel, COUNT(*) as events
FROM web_events
GROUP BY 1,2)

SELECT channel, AVG(events) AS average_events
FROM events
GROUP BY channel
ORDER BY 2 DESC;
```

:bulb: 如果需要同时创建多个公用表，可以使用一个 `WITH` 关键字，并在 CTE 之间用逗号 `,` 分隔（最后一个不需要添加），而且每个新表格都需要设置别名