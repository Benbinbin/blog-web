---
show: true
cover: SQL.png
collection: SQL
summary: NULL 是一种数据类型（而不是一个数值，和零或空字符串不同），表示 SQL 中没有数据，它们经常在聚合函数中被忽略了。
tags:
  - SQL
---

# Null
`NULL` 是一种数据类型（而不是一个数值，和零或空字符串不同），**表示 SQL 中没有数据**，它们经常在聚合函数中被忽略了。

一把在以下两种情况可能会产生 `NULL`

* 在执行 `LEFT JOIN` 或 `RIGHT JOIN` 时 `NULL` 经常会发生，由于左侧表格中的某些行在做连接时与右侧表格中的行不匹配，这些行在结果集就会包含一些 `NULL`
* 因为数据库中缺失数据而产生 `NULL`

:bulb: 当我们需要筛选出包含/不包含 `NULL` 的行时，可以在语句 `WHERE` 中**设置条件 `IS NULL` 或 `IS NOT NULL`**（而不能使用 `=` 匹配，因为 `NULL` 在 SQL 中不属于值，它是数据的一个属性）。