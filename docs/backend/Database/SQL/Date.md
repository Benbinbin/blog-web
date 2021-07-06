---
show: true
cover: SQL.png
collection: SQL
summary: SQL 日期
tags:
  - SQL
---

# SQL 日期

在 SQL 中日期存储为年、月、日、小时、分钟、秒 `YYYY-MM-DD HH:MM:SS` 的格式，如此详细的级别保存信息即有好处又存在不足之处。精细的数据颗粒度可以提供非常准确的信息；但是也让信息分组变得很难（基于原始日期数据对表格的行进行聚合变得无意义）。[SQL 内置许多函数](https://www.postgresql.org/docs/9.1/functions-datetime.html)可以帮助我们改善日期数据的处理体验。

## DATE_TRUNC
[日期函数 `DATE_TRUNC`](https://mode.com/blog/date-trunc-sql-timestamp-function-count-on/) 能够按需将日期精度截取到日期时间列的特定部分，然后余下的时间列就会使用默认值覆盖（如日期会统一使用 `01`，时刻统一使用 `00`），它返回的一般是完整的日期时间数据

日期函数 `DATE_TRUNC(‘[interval]’, time_column)` 接收的第一个（可选）参数 `interval` 指定日期截取的部分，如 `'day'` 指定时间精度截取到日，第二个参数是表格中数据类型为日期的字段。

常用的时间戳参数

- second
- minute
- hour
- day
- month
- year

```sql
-- 以月份为单位观测客户 Walmart，在铜版纸的消费上哪一个月最多
SELECT DATE_TRUNC('month', o.occurred_at) ord_date, SUM(o.gloss_amt_usd) tot_spent
FROM orders o
JOIN accounts a
ON a.id = o.account_id
WHERE a.name = 'Walmart'
GROUP BY 1
ORDER BY 2 DESC
LIMIT 1;
```

## DATE_PART
日期函数 `DATE_PART` 可以用来获取日期的特定部分，它返回的是日期时间数据的部分值。

![DATE_PART](./images/20200607115501036_18498.png)

日期函数 `DATE_PART([interval], time_column)` 接收的第一个（可选）参数 `interval` 指定需要获取的时间部分，如 `'month'` 或 `'dow'` 获取月份或星期（day of week 返回 0~6 中任一值，其中 `0` 表示星期日）的那一部分的数据。

```sql
-- 以年为单位观测销量数据
SELECT DATE_PART('year', occurred_at) ord_year,  SUM(total_amt_usd) total_spent
FROM orders
GROUP BY 1
ORDER BY 2 DESC;
```