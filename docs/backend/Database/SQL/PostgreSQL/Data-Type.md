---
show: true
cover: postgresql.png
collection: PostgreSQL
summary: PostgreSQL 数据类型
tags:
  - PostgreSQL
---

# PostgreSQL 数据类型

创建表格时需要**指定数据类型**，以规范化（限制）字段存储的数据为相同的数据类型，PostgreSQL 内置支持多种[数据类型](http://postgres.cn/docs/11/datatype.html)（[Version 12](https://www.postgresql.org/docs/12/datatype.html)）。
## 数值数据类型
常见的数值数据类型

|                名称                 |                 描述                  | 存储大小 |                                           范围                                           |
| :-----------------------------------: | :-------------------------------------: | :----------: | :----------------------------------------------------------------------------------------: |
| `integer` 或简写为 `int`  |          存储典型的整数          |  4 字节   |                      `-2147483648` 至 `+2147483647`                       |
|            `numeric`            |  存储小数，用户指定的精度   |    变量    | 小数点前最多为 `131072` 个数字；小数点后最多为`16383` 个数字 |
|    `double precision`     | 存储小数，可变精度，不精确 |  8 字节   |                                    15 位数字精度                                     |

## 字符串数据类型
常见的字符串数据类型

|                  名称                   |                             描述                             |
| :-------------------------------------: | :----------------------------------------------------------: |
| `character(size)` 或简写为 `char(size)` | 这里 `size` 是要存储的字符数。固定长度字符串（不可以存储超出长度限制的字符串），如果字符数小于限制，则在右边用空格填充到相等大小的字符。 |
|             `varchr(size)`              | 这里 `size` 是要存储的字符数，可变长度字符串（不会以空格填充） |
|                 `text`                  |                        可变长度字符串                        |

## 日期/时间数据类型
常见的日期/时间数据类型

|              名称               |             描述             | 存储大小 |  最小值   |     最大值     |      解析度      |
| :-------------------------------: | :----------------------------: | :----------: | :---------: | :---------------: | :-----------------: |
|            `date`             |    日期（没有时间）    |  4 字节   | 4713 bc | 5874897 ad | 1微秒/14位数 |
| `time[(p)][不带时区]` |     时间（无日期）      |  8 字节   | 00:00:00 |    24:00:00    | 1微秒/14位数 |
|        `timestamp`         | 日期和时间（无时区） |  8 字节   | 4713 bc  |  294278 ad  | 1微秒/14位数 |
|       `timestamptz`       | 日期和时间（带时区） |  8 字节   | 4713 bc  |         294276 ad          |                     |

:bulb: 传递日期/时间不能包含中文，应该以 `1999-01-08` 或 `19990108` 来传递日期，以 `04:05:06` 来传递时间

```sql
ALTER TABLE company ADD entrytime date;
ALTER TABLE company ADD worktime time;

UPDATE company SET entrytime = '20200612';
UPDATE company SET worktime = '9:20:00';
```

## 布尔类型

|     名称      |                     描述                     | 存储大小 |
| :-------------: | :--------------------------------------------: | :----------: |
| `boolean` | 它指定 `true` 或 `false` 的状态 |  1 字节   |

布尔类型只有两个值 `true` 或 `false`

## 货币类型

|   名称    |    描述    | 存储大小 | 范围 |
| :---------: | :----------: | :----------: | :----: |
| `money` | 货币金额 |  8 字节   |    -9223372036854775808 至 +92233720368547758.07    |