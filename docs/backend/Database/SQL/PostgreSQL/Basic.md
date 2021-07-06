---
show: true
cover: postgresql.png
collection: PostgreSQL
summary: PostgreSQL 基础
tags:
  - PostgreSQL
---

# PostgreSQL 基础
Structured Query Language, SQL /ˈsiːkwəl/ 结构化查询语言是用于与关系型数据库进行交互的编程语言。使用该语言编写成脚本文件后缀名为 `.sql`。

## 表格属性
一般在 PostgreSQL 中以表格形式存储的数据，表格具有一定的属性维持其结构化：

* 表名：数据库中表名是唯一的
* 列 column：表中一个字段，且界定了该列的数据类型（该列的每一行的数据的类型需要相同）
* 行 row：每条数据按行存储
* 主键 primary key：表中每行数据的唯一标识，如订单 id，员工 id

## 常用语句
sql 脚本由各种语句 clause 构成筛选条件，用以选择特定的数据，主要语句分为两类：

* 数据定义语言 Data Definition Language，一般操作表格元信息，用于创建、删除、修改、索引等
    * `CREATE`/`DROP DATABASE` 创建/删除新数据库
    * `ALTER DATABASE` 修改数据库
    * `CREATE`/ `DROP TABLE` 创建/删除新表
    * `ALTER TABLE` 变更数据库表
    * `CREATE`/ `DROP INDEX` 创建/删除索引（搜索键）

* 数据操纵语言 Data Manipulation Language，一般操作表格数据，用于查询、插入、更新、删除数据等
    * `SELECT` 从数据库表中获取数据
    * `UPDATE` 更新数据库表中的数据
    * `DELETE` 从数据库表中删除数据
    * `INSERT INTO` 向数据库表中插入数据

* 其他语句：判断、排序、分组、链接、函数处理等

### 数据定义语言
#### CREATE DATABASE
语句 `CREATE DATABASE database_name` 创建数据库 `database_name`

```sql
CREATE DATABASE c03_sql_stydy;
```

#### DROP DATABASE
语句 `DROP DATABASE database_name` 删除数据库 `database_name`

```sql
DROP DATABASE c03_sql_stydy;
```

#### ALTER DATABASE
修改数据库元信息

```sql
-- 将数据库名字修改从 c03_sqlstudy 为 c03_sqlstudy_gai
ALTER DATABASE c03_sqlstudy RENAME TO c03_sqlstudy_gai;

-- 修改数据库所有者
ALTER DATABASE c03_sqlstudy OWNER TO u1;
```

:warning: 不能修改当前激活的数据库元信息，如果需要修改当前数据库要先使用 psql 命令 `\c database_name` 切换到其他数据库

#### CREATE TABLE
创建表格时需要设置表格的字段（列），并规定每个字段的[数据类型](./Data-Type.md)，字段之间用逗号 `,` 分隔，这些设置使用括号 `()` 内包括。

```sql
-- 创建一个表格，表名为 company
-- 包括4个字段，每个字段都设置了数据类型
-- 第一个字段作为 PRIMARY KEY 即数据库表的主键约束
CREATE TABLE company(
    No int PRIMARY KEY,
    name text,
    age int,
    address text
);
```

:bulb: 设置字段时可以添加约束条件，常见的约束有

* `PRIMARY KEY` 主键约束，1 个表中只有 1 个主键，该字段的数据每一行都是唯一的，而且不能有 `NULL` 值（主键是数据的唯一标识符，即每行数据该字段的值都不同）
* `UNIQUE` 唯一约束，防止两个记录在 1 个特定的列具有相同的值
* `NOT NULL` 非空约束，该列不能有 `NULL` 值
* `CHECK` 自定义条件约束，如果判断条件为 false 则该值不写入表格

```sql
CREATE TABLE company2(
    No int PRIMARY KEY,
    name text NOT NULL UNIQUE,
    age int NOT NULL UNIQUE,
    -- 限制字段 salary 的数据的值大于 0
    salary numeric CHECK(salary>0)
);
```

#### DROP TABLE
语句 `DROP TABLE table_name` 删除表格 `table_name`

```sql
DROP TABLE company2
```

#### ALTER TABLE
语句 `ALTER TABLE` 用于变更表格的属性，如表格的字段、修改字段的约束、修改字段的数据类型等。

* 添加新字段 `ALTER TABLE table_name ADD column_name datatype` 需要同时设置新增列的数据的类型
* 删除字段 `ALTER TABLE table_name DROP COLUMN column_name`
* 修改字段名称 `ALTER TABLE table_name RENAME COLUMN column_name TO new_column_name`
* 修改字段的数据类型 `ALTER TABLE table_name ALTER COLUMN column_name TYPE datatype;` 需结合语句 `ALTER COLUMN` 指定变更的字段，语句 `TYPE` 指定数据类型

* 设置字段约束，需结合语句 `ADD CONSTRAINT`
    * 设置主键约束 `ALTER TABLE table_name ADD CONSTRAINT MyPrimaryKey PRIMARY KEY (column1, column2...)`，其中 `MyPrimaryKey` 称为主键索引，作为表格的主键「别名」，默认值是 `tableName_pkey`，可以设置任意值；需要使用语句 `PRIMARY KEY`，:bulb: 主键在每个表格中只能设置 1 个，但是**它可以由不同字段组合而成**，只要这些组合值是唯一（即对于每一行数据而言，这个组合值都是不重复的）
    * 添加唯一约束 `ALTER TABLE table_name ADD CONSTRAINT MyUniqueConstraint UNIQUE (column1, column2...)`，其中 `MyUniqueConstraint` 作为约束名；需要使用语句 `UNIQUE`
    * 添加自定义约束 `ALTER TABLE table_name ADD CONSTRAINT MyUniqueConstraint CHECK (CONDITION)` 其中约束名为 `MyUniqueConstraint`；需要使用语句 `CHECK`

* 删除字段约束 `ALTER TABLE table_name DROP CONSTRAINT constraint_name`，需要结合语句 `DROP`

:bulb: 设置非空约束所使用的语句不太一样 `ALTER TABLE table_name ALTER COLUMN column_name SET NOT NULL`，取消非空约束则使用 `ALTER TABLE table_name ALTER COLUMN column_name DROP NOT NULL`

```sql
-- 添加新列
ALTER TABLE company ADD gender text;
-- 删除列
ALTER TABLE company DROP COLUMN gender;

-- 修改列的数据类型
ALTER TABLE company ALTER COLUMN No TYPE numeric;

-- 设置约束
-- 设置列为非空
ALTER TABLE company ALTER COLUMN age SET NOT NULL;
-- 删除非空设置
ALTER TABLE company ALTER COLUMN age DROP NOT NULL;

-- 添加主键primary key，这里可以是多个列，主键名称这里为'pkey'
ALTER TABLE company ADD CONSTRAINT pkey PRIMARY KEY (No,name);
-- 添加 UNIQUE 约束，这里添加约束名为 'ukey'
ALTER TABLE company ADD CONSTRAINT ukey UNIQUE (name);
-- 添加CHECK约束，这里约束名为'agecheck'，约束条件为 age>0
ALTER TABLE company ADD CONSTRAINT agecheck CHECK (age > 0);

-- 删除约束条件
ALTER TABLE company DROP CONSTRAINT pkey;  -- 删除主键 pkey
ALTER TABLE company DROP CONSTRAINT ukey;  -- 删除UNIQUE约束 ukey
ALTER TABLE company DROP CONSTRAINT agecheck;   -- 删除CHECK约束 agecheck
```
### 数据操纵语言

#### SELECT
语句 `SELECT` 用于查询数据，结合语句 `FROM` 以指明数据来源的表格。

* 查询表格的指定的单列/多列数据 `SELECT column1, column2, columnN FROM table_name`
* 查询表格的所有列数据 `SELECT * FROM table_name`

```sql
-- 读取表格 student 的所有列的数据
SELECT * FROM student;

-- 读取表格 student 两列，分别为 no 列 和 studentname 列
SELECT no,studentname FROM student;
```

* 结合语句 `LIMIT` 限制展示的数据条数
* 结合语句 `OFFSET` 设置读取数据时（从头开始）偏移数量

```sql
-- 显示 4 条数据
SELECT * FROM student LIMIT 4;

-- 从第2条开始显示4条数据
SELECT * FROM student LIMIT 4 OFFSET 2;
```

* 结合语句 `DISTINCT` 筛选显示唯一值的数据

```sql
-- 只显示 student 表格字段 age 中的唯一值
SELECT DISTINCT age FROM student;
```

* 结合语句 `ORDER BY` 对数据进行排序，默认按升序展示，可以添加关键字 `DESC` 以降序排序

:bulb: 支持基于多字段排序，字段的排序优先权限为从左到右

```sql
-- 按照年龄排序
SELECT * FROM student ORDER BY age;
-- 按照年龄降序排列
SELECT * FROM student ORDER BY age DESC;

-- 按照多字段排序
SELECT studentname,age,classno FROM student ORDER BY age,classno;
```

#### INSERT
语句 `INSERT` 用于插入数据（行数据）

可以指定插入的数据项填充哪些特定的字段（没有指定的字段就会使用 `NULL` 填充） `INSERT INTO TABLE_NAME (column1, column2,...columnN) VALUES (value1, value2,...valueN)`

:bulb: 支持同时插入多行数据，用逗号 `,` 分隔

```sql
-- 表格 student 有 4 个字段
-- 在表格中插入一行数据，4 个字段都有相应的数据
INSERT INTO student VALUES(9, 'Ben', 18, 6);
-- 只插入3列字段的数据，缺失数据的字段对应的单元格用 NULL 填充
INSERT INTO student(no,studentname,classno) VALUES(10, 'Thomson', 8);
-- 多行插入数据
INSERT INTO student VALUES(11, 'Sam', 21, 8),(12, 'Candy', 17, 6),(13, 'Tom', 27, 6);
```

#### DELETE
语句 `DELETE` 删除数据（行数据），结合语句 `FROM` 指定从哪个表格删除数据

* 删除表格所有数据

```sql
-- 删除表格 student 中所有数据
DELETE FROM student;
```

* 结合语句 `WHERE` 对表格数据进行筛选，删除匹配的数据（行数据）

```sql
-- 删除年龄大于 14 岁的学生数据
DELETE FROM student WHERE age > 14;
```

#### UPDATE
语句 `UPDATE` 更新数据（列数据），一般结合语句 `WHERE` 筛选需要更新的行

```sql
-- 将表格 student 中的所有行的字段 age 更新为 18
UPDATE student SET age = 18;

-- 使用 WHERE 筛选特定行更新其字段 age 为 26
UPDATE student SET age = 26 WHERE studentname = 'Ben';
```

### 数据运算
#### 算术运算符

- 加法 `5+5`
- 减法 `10-5`
- 乘法 `2*3`
- 除法 `10.0/3`
- **取余数** `10%7`
- 幂 `2^3`
- **平方根** `|/25.0`
- **三次方根** `||/27.0`
- 阶乘 `5!`

#### 比较运算符

- 等于 `10 = 20`
- 不等于 `10 != 20`
- 不等于 `10 <> 20`
- 小于 `10 < 20`
- 大于 `10 > 20`
- 小于等于 `10 <= 20`
- 大于等于 `10 >= 20`

#### 数字处理函数

- 取绝对值 `ABS(x)`
- π `PI();`
- 取平方根 `SQRT(x)`
- **四舍五入** `ROUND(x)` 默认修约到个位（整数），可以传递第二个参数设置保留的小数位数，如保留 3 位小数 `ROUND(1.24368, 3)`
- 幂运算函数 `POW(x, n)` 如 2 的 3 次方 `POW(2, 3)` :bulb: 对于底数为自然底数 `e` 的幂运算使用另一个特有的函数 `EXP(n)`
- 对数函数 `LOG10(x)` 返回基数为10的对数，参数需大于零 :bulb: 如果是自然对数则使用 `LOG(x)`
- 三角函数与反三角函数 `SIN(x)`、`ASIN(x)`、`COS(x)`、`ACOS(x)`、`TAN(x)`、`ATAN(x)`
- **符号函数** `SIGN(x);`  返回参数的符号，值为负数、零或正数时分别返回`-1`、`0` 或 `1`
- 弧度与角度相互转换函数
    - 将角度转换为弧度 `RADIANS();`
    - 将弧度转换为角度 `DEGREES()`
- **最大值** `MAX()`
- **最小值** `MIN()`
- **计数** `COUNT()`
- **均值** `AVG()`
- **求和** `SUM()`
- **标准差** `STDDEV()`
- 生成数组 `ARRAY_AGG(column_name) FROM table_name;` 将表格特定字段的数据转换为数组形式，数组以花括号 `{}` 包括，是另一种数据结构（与数据表格不同）

### 字符串操作
- 字符串连接，使用符号 `'A'||'B'` 或函数 `CONCAT(10,'a','hello',20.0);`（可同时连接多个字符串）
- 转换成小写 `LOWER('str')`
- 转换成大写 `UPPER('str')`
- 每个单词的首字母大写 `INITCAP('str'`
- 替换字符串 `SELECT REPLACE(str, target, replace);` 在字符串 `str` 中匹配 `target` 子字符串，并将其替换为 `replace` 字符串
- 返回给定子字符串在字符串的位置 `POSITION(subStr IN str)` 在字符串 `str` 中查询子字符串 `subStr` 索引位置 :bulb: 索引从 1 开始
- 截取字符串 `SUBSTRING(str FROM 3 FOR 10)` 从 `FROM` 位置开始，截取长度为 `FOR`
- 删除字符串的头尾部空格 `TRIM('  asd ')`   该函数默认删除空格，但可以传递第二个参数以指定删除的字符，如 `TRIM('aaahelloworldaaa', 'a')`。默认为 `BOTH` 模式 `TRIM(BOTH '   asd  ')`，即删除字符串两端的空格，但可以设置不同模式，仅删除其中一侧的空格
	- 删除头部空格 `TRIM(LEADING '  asd ')`
	- 删除尾部空格 `TRIM(TRAILING '  asd ')`

- 返回字符串中字符的个数 `LENGTH('str')` 如果字符串包含空格也算作字符
- 返回字符串前 `n` 个字符 `LEFT(str, n);` 如果 `n` 为负数时返回除最后 `|n|` 个字符以外的所有字符
- 返回字符串后 `n` 个字符 `RIGHT(str, n)` 如果 `n` 为负数时返回除最前 `|n|` 个字符意外的所有字符

:warning: 在 SQL 中第一个位置的索引是 1，而很多编程语言的索引是从 0 开始。

### 数据类型转换
函数 `CAST(expression AS target_type)` [将数据转换为指定的数据类型](https://www.postgresqltutorial.com/postgresql-cast/)，如将字符串转换为数值或日期（但字符串的值应该是 sql 可理解的）`CAST(date_column AS DATE)` :bulb: 可以使用简写方式 `date_column::DATE`

### 条件过滤
语句 `WHERE` 用于设置过滤条件筛选数据 `SELECT column1, column2, columnN FROM table_name WHERE [search_condition]`

筛选的条件语句可以使用多种操作符构造

* `=` 等于
* `<>` 不等于 或 `!=` 不等于
* `>` 大于
* `<` 小于
* `>=` 大于等于
* `<=` 小于等于
* `!<` 不小于
* `!>` 不大于

```sql
-- 筛选表格 student 字段 age 大于14岁的数据
SELECT * FROM student WHERE age>14;
```

还可以使用各种逻辑运算符构造复杂的组合条件

* 结合语句 `AND` 构造同时需要同时满足的多个条件
* 结合语句 `OR` 构建只需满足任意其一的条件

```sql
-- 语句 AND 表示且，筛选出需要同时满足多个条件的数据
SELECT * FROM student WHERE age>14 AND classno <3;
-- 语句 OR 表示或，筛选出只要满足任意条件即可的数据
SELECT * FROM student WHERE classno = 2 OR classno = 4;
```

* 针对含有/不含有空值 `NULL` 的数据项可以使用 `IS NULL` 或 `IS NOT NULL` 进行筛选

```sql
-- 是否为空值
SELECT * FROM student WHERE age IS NOT NULL;
SELECT * FROM student WHERE age IS NULL;
```

* 语句 `IN` 用来制定多个可匹配值（离散值），只要满足其中一个条件即成立，相当于逻辑运算符 `OR`

```sql
-- 从表格 student 中筛选出班级为 3，4，5 的数据
SELECT * FROM student WHERE classno IN (3,4,5);
```

* 语句 `BETWEEN` 指定可匹配的值的范围（连续值）

```sql
-- 从表格 student 中筛选出班级范围从 2 到 5 的数据
SELECT * FROM student WHERE classno BETWEEN 2 AND 5;
```

* 语句 `NOT` 筛选出满足否定条件的数据

```sql
-- 筛选出年龄小于或等于 14 岁的数据
SELECT * FROM student WHERE NOT age>14;
```

* 模糊匹配十分常用，可以结合语句 `LIKE` 和通配符设置模糊匹配条件
    * 通配符 `%` 表示任意字符，出现任意次数包括 0次、1次、多次，但空值 `NULL` 不能匹配
    * 通配符 `_` 表示任意字符，但只出现1次

```sql
-- 匹配名字以 B 开头的数据
SELECT * FROM student WHERE studentname LIKE 'B%';

-- 匹配名字以 B 开头，且总共有 3 个字符的数据
SELECT * FROM student WHERE studentname LIKE 'B__';
```

### 数据分组
语句 `GROUP BY` 基于特定字段总不同值对数据项进行分组，然后可以得到关于不同组别的统计信息，如 `COUNT` 计数、`AVG` 均值、`MAX`/`MIN` 最大值/最小值等。

:bulb: 注意语句的顺序 `WHERE` -> `GROUP BY` -> `HAVING` -> `ORDER BY`

```sql
SELECT column-list FROM table_name
    WHERE [ conditions ]
    GROUP BY column1, column2
    HAVING [ conditions ]
    ORDER BY column1, column2;
```

:bulb: 语句 `WHERE` 和语句 `HAVING` 相似，都是对数据进行条件过滤，但是语句 `WHERE` 语句只能对分组前的字段进行分组（由于语句 `WHERE` 作用与分组前）；而语句 `HAVING` 更「强大」，它不仅可以对「原始」字段进行筛选，还可以对分组后构成的新字段进行过滤（由于语句 `HAVING` 主要用于过滤分组）:thumbsup: 推荐在分组中都使用语句 `HAVING` 进行数据项的过滤

```sql
-- 按照 classno 字段对表格 student 数据进行分组，并汇总各班的学生数量（汇总结果作为表格的新的字段）
SELECT classno, COUNT(studentname) FROM student GROUP BY classno;

-- 按照 classno 对表格 student 数据进行分组，并汇总各班的学生数量，汇总结果以（默认）降序排列展示
SELECT classno, COUNT(studentname) FROM student GROUP BY classno ORDER BY classno;

-- 使用 WHERE 过滤数据再进行分组
SELECT classno,COUNT(studentname) FROM student
	WHERE classno > 2
	GROUP BY classno; -- WHERE 作用与分组前，这里先筛选 classno>2 的数据，再分组
	-- 注意，这里如果书写：WHERE COUNT(studentname) > 1 就会报错

-- 使用 HAVING 过滤分组
SELECT classno,COUNT(studentname) FROM student
	GROUP BY classno
	HAVING COUNT(studentname) > 1; -- HAVING 主要用于过滤分组，且是在分组后进行过滤
	-- 所以一般对于分组的条件过滤都用 HAVING
```

### 数据连接
数据连接是基于特定字段将两个表格的数据进行匹配连接，即列的整合。

可以使用语句 `WHERE`进行简单连接

```sql
-- 通过 WHERE 构建匹配逻辑
SELECT * FROM company3, department WHERE company3.no = department.id;
```

一般使用语句 `JOIN` 实现多种连接方式：

* `INNER JOIN` 内连接（交集）
* `LEFT OUTER JOIN` 左连接（基于左表）
* `RIGHT OUTER JOIN` 右连接（基于右表）
* `FULL OUTER JOIN` 全连接（并集）
* `CROSS JOIN` 交叉连接

:bulb: 以下演示连接方式时使用的两个表格

```sql
-- 表格 employees
CREATE TABLE employees(
	id int PRIMARY KEY,
	name text,
	age int CHECK(age > 0),
	address text,
	salary numeric CHECK(salary > 0)
	);

INSERT INTO employees VALUES
    (1, '王大', 25, 'beijing', 10000),
    (2, '张三', 25, 'beijing', 10000),
    (3, '李四', 21, 'beijing', 15000),
    (4, '李二', 28, 'shenzhen', 10000),
    (5, '王五', 24, 'shanghai', 20000),
    (6, '杨三', 19, 'shanghai', 15000),
    (7, '张四', 22, 'shenzhen', 20000),
    (8, '杨四', 20, 'beijing', 10000);

-- 表格 department
CREATE TABLE department(id int,dept text,fac_id int);

INSERT INTO department VALUES
    (1, 'IT', 1),
    (2, 'Engineering', 2),
    (3, 'HR', 7),
    (10, 'Market', 10);
```

```bash
# 两个表格的数据

# 表格 employees
 id | name | age | address  | salary
----+------+-----+----------+--------
  1 | 王大 |  25 | beijing  |  10000
  2 | 张三 |  25 | beijing  |  10000
  3 | 李四 |  21 | beijing  |  15000
  4 | 李二 |  28 | shenzhen |  10000
  5 | 王五 |  24 | shanghai |  20000
  6 | 杨三 |  19 | shanghai |  15000
  7 | 张四 |  22 | shenzhen |  20000
  8 | 杨四 |  20 | beijing  |  10000
(8 行记录)

# 表格 deparment
 id |    dept     | fac_id
----+-------------+--------
  1 | IT          |      1
  2 | Engineering |      2
  3 | HR          |      7
 10 | Market      |     10
(4 行记录)
```

:bulb: 除了可以连接两个表，技术上可以实现连接任意数量的表格，只需要将组合后得到的新的表格再与其他表格进行组合就可以（或者使用嵌套方式）。

```sql
-- 创建表格3
-- 表格 education
CREATE TABLE education(name text, edu text);
INSERT INTO education VALUES
    ('王大', '本科'),
    ('张三', '本科'),
    ('李四', '硕士'),
    ('李二', '本科'),
    ('王五', 'PHD'),
    ('杨三', '硕士'),
    ('张四', 'PHD'),
    ('杨四', '本科');

SELECT employees.id, employees.name, education.edu, employees.salary, department.dept
	FROM (employees INNER JOIN education ON employees.name = education.name) -- 注意嵌套写法
	FULL OUTER JOIN department ON employees.id = department.id;
```

:hammer:

```bash
 id | name | edu  | salary |    dept
----+------+------+--------+-------------
  1 | 王大 | 本科 |  10000 | IT
  2 | 张三 | 本科 |  10000 | Engineering
  3 | 李四 | 硕士 |  15000 | HR
    |      |      |        | Market
  6 | 杨三 | 硕士 |  15000 |
  5 | 王五 | PHD  |  20000 |
  8 | 杨四 | 本科 |  10000 |
  7 | 张四 | PHD  |  20000 |
  4 | 李二 | 本科 |  10000 |
(9 行记录)
```

:bulb: 连接时可以使用逻辑运算符 `AND` 或 `OR` 基于多个字段设置连接条件。

```sql
SELECT employees.id, employees.name, department.dept
    FROM employees INNER JOIN department
    ON employees.id = department.id
    AND employees.id = department.fac_id;
```

:hammer:

```bash
 id | name |    dept
----+------+-------------
  1 | 王大 | IT
  2 | 张三 | Engineering
(2 行记录)
```

#### INNER JOIN
一般将两个表格「连接」使用 `INNER JOIN` 内连接的方式，即只取指定字段中有相同值的数据项组合成一张表格，相当于取表格的交集数据。

```sql
-- 基于两个表格的 id 字段连接表格，取两个字段中值相同的数据项（交集）组成新的表格
-- 显示连接后表格的字段 employees.id, employees.name, department.dept
SELECT employees.id, employees.name, department.dept
    -- 连接左表为 employees，右表为 department
    FROM employees INNER JOIN department
    -- 连接基于两个表格的 id 字段
    ON employees.id = department.id;
```

:hammer:

```bash
 id | name |    dept
----+------+-------------
  1 | 王大 | IT
  2 | 张三 | Engineering
  3 | 李四 | HR
(3 行记录)
```

#### FULL OUTER JOIN
如果需要保留两个表格完整的数据可以使用 `FULL OUTER JOIN` 全连接，即指定字段中有相同值的数据项组合，未匹配的数据组合时产生的缺失值的单元格用 `NULL` 填充成一张表格，相当于取表格的并集数据。

```sql
SELECT employees.id, employees.name, department.dept
    FROM employees FULL OUTER JOIN department
    ON employees.id = department.id;
```

:hammer:

```sql
 id | name |    dept
----+------+-------------
  1 | 王大 | IT
  2 | 张三 | Engineering
  3 | 李四 | HR
    |      | Market
  5 | 王五 |
  8 | 杨四 |
  6 | 杨三 |
  4 | 李二 |
  7 | 张四 |
(9 行记录)
```

#### LEFT OUTER JOIN
左连接 `LEFT OUTER JOIN` 是基于左表（即使用语句 `FROM` 指定的表格）的外连接，即保留左表的所有数据项，从右表中寻找相应的字段值匹配的数据项进行组合，如果左表中未能匹配的数据项在合并表中产生了缺失值单元格使用 `NULL` 填充。

```sql
SELECT employees.id,employees.name,department.dept
    FROM employees LEFT OUTER JOIN department
    ON employees.id = department.id;
```

:hammer:

```bash
 id | name |    dept
----+------+-------------
  1 | 王大 | IT
  2 | 张三 | Engineering
  3 | 李四 | HR
  5 | 王五 |
  8 | 杨四 |
  6 | 杨三 |
  4 | 李二 |
  7 | 张四 |
(8 行记录)
```

#### RIGHT OUTER JOIN
右连接 `RIGHT OUTER JOIN` 作用与左连接一样，但是它是基于右表（即使用语句 `JOIN` 指定的表格）的外连接，即保留右表的所有数据项，从左表中寻找相应的字段值匹配的数据项进行组合，如果右表中未能匹配的数据项在合并表中产生了缺失值单元格使用 `NULL` 填充。

```sql
SELECT employees.id, employees.name, department.dept
    FROM employees LEFT OUTER JOIN department
    ON employees.id = department.id;
```

:hammer:

```bash
 id | name |    dept
----+------+-------------
  1 | 王大 | IT
  2 | 张三 | Engineering
  3 | 李四 | HR
    |      | Market
(4 行记录)
```

#### CROSS JOIN
交叉连接 `CROSS JOIN` 通过笛卡尔积的方式组合两个表格，即检索出/组合得到的行的数目为第一个表（左表）中的行数乘以第二个表（右表）中的行数，相当于将左表的**每个数据项**都按照右表复制一份。

```sql
SELECT employees.id, employees.name, department.dept
    FROM employees CROSS JOIN department
    ORDER BY employees.id;
```

:hammer:

```bash
 id | name |    dept
----+------+-------------
  1 | 王大 | IT
  1 | 王大 | Engineering
  1 | 王大 | HR
  1 | 王大 | Market
  2 | 张三 | IT
  2 | 张三 | Engineering
  2 | 张三 | HR
  2 | 张三 | Market
  3 | 李四 | IT
  3 | 李四 | Engineering
  3 | 李四 | HR
  3 | 李四 | Market
  4 | 李二 | IT
  4 | 李二 | Engineering
  4 | 李二 | HR
  4 | 李二 | Market
  5 | 王五 | IT
  5 | 王五 | Engineering
  5 | 王五 | HR
  5 | 王五 | Market
  6 | 杨三 | IT
  6 | 杨三 | Engineering
  6 | 杨三 | HR
  6 | 杨三 | Market
  7 | 张四 | IT
  7 | 张四 | Engineering
  7 | 张四 | HR
  7 | 张四 | Market
  8 | 杨四 | IT
  8 | 杨四 | Engineering
  8 | 杨四 | HR
  8 | 杨四 | Market
(32 行记录)
```

### 数据合并
使用语句 `UNION` 进行数据合并。数据合并是指表格的数据进行「叠加」合并，即行的整合，因此需要合并的两个表格具有相同的列结构，即列数相同（列名可以不同，会基于第一个表格的列名为准）。

```sql
-- 组合两个或多个 SELECT 语句的结果，而不返回任何重复的行
SELECT column1 [, column2 ]	FROM table1 [, table2 ]	[WHERE condition]
UNION
SELECT column1 [, column2 ] FROM table1 [, table2 ] [WHERE condition]
```
以下演示数据合并使用的表格

```bash
# 表格 t1
 id | value1
----+--------
  1 | a
  2 | b
  3 | c
(3 行记录)

# 表格 t2，有一条数据项与表格 t1 相同
 id | value2
----+--------
  1 | a
  4 | A
  5 | B
  6 | C
(4 行记录)
```

```sql
-- 合并表格 t1 和 表格 t2，即将两个表格按行与行整合
SELECT * FROM t1
UNION
SELECT * FROM t2;
```

:hammer:

```bash
# 返回的组合表去除了重复数据
# 因此字段 value1 中值为 a 的数据项只有一个
 id | value1
----+--------
  6 | C
  2 | b
  5 | B
  3 | c
  1 | a
  4 | A
(6 行记录)
```

:bulb: 数据合并时默认去除重复数据，如果希望保留所有数据（包括重复项）可以设置关键字 `ALL`

```sql
SELECT * FROM t1
UNION ALL
SELECT * FROM t2;
```

:hammer:

```bash
 id | value1
----+--------
  1 | a
  2 | b
  3 | c
  1 | a
  4 | A
  5 | B
  6 | C
(7 行记录)
```

### 别名
使用语句 `AS` 可以创建表别名或字段别名，表别名一般使用单个小写字母，使得在其他语句中调用表格的字段时可以编写更少的代码，提高编程效率；字段别名可以作为显示结果中的表头名称，使输出的表格更具语义方便理解。

```sql
-- 列/字段别名
-- alias_name: 它指定分配给列的临时名称
SELECT column_name AS alias_name FROM table_name [conditions...];

-- 表别名
-- alias_name：它指定分配给表的临时名称
SELECT column1, column2.... FROM table_name AS alias_name [conditions...];
```

:bulb: 一般可以省略语句 `AS`，直接在表/字段名称后设置别名，并用空格分隔。

### 动态表复制
使用语句 `SELECT` 查询获得的表格是临时创建的，并未保存在数据库中。如果需要保存查询获得的数据，可以使用语句 `CREATE TABLE ... AS` 结合查询语句 `SELECT`动态地基于查询结果创建表格。

```sql
CREATE TABLE new_table_name AS
    SELECT column_name FROM table_name [conditions...];
```

:warning: 基于查询结果「复制」得到的动态表**并不会**拷贝原始表格具有的约束、注释和序列，它只是复制数据。如果拷贝表格的约束可以使用语句 `LIKE`，但它只是基于特定原始表格创建一个具有相同约束（结构）的**空表格**，并没有拷贝数据

```sql
CREATE TABLE new_table_name (LIKE table_name);
```

### 临时表格
可能原始数据构成表格并不适用于直接进行数据分析，需要使用包含语句 `WITH` 的表达式 CTE，common table expression 创建临时公用表/通用表。

```sql
-- 每个 CTE 都需要设置别名 name_for_summary_data（它们通过别名来被使用）。
WITH name_for_summary_data AS (
   SELECT column_name FROM table_name [codition...])

SELECT columns
FROM name_for_summary_data [codition...]
```

:warning: 需要在查询的开头定义所有的 CTE，然后在脚本其他地方就可以多次复用这些临时表格。

```sql
-- 先筛选出 companyname 为 c1 数据并构建临时表 t
-- 临时表 t 并不会存储于数据库中
WITH t AS (
    SELECT companyname, city, client FROM w1
    WHERE companyname = 'c1')

-- 再基于临时表 t 进行数据处理
SELECT SUM(client) FROM t; -- 等价于 SELECT SUM(client) FROM w1 WHERE companyname = 'c1';
```

可以将临时表格作为数据「中转站」对表格数据进行拆分

```sql
WITH t AS (
	DELETE FROM w1 WHERE client < 2000   -- 将表格 w1 中客户数小于 200 的数据项删除
	RETURNING * )                        -- 并使用 RETURNING 子句返回数据，存放在临时表格 t 中

-- 创建空表 w2 用于接收临时表格的数据
-- 其结构需要与 w1 相同
CREATE TAbLE w2(id int PRIMARY KEY, companyname text, city text, client int);

-- 将临时表格的数据插入新建的表格 w2 中
-- 实现了按条件将数据从表格 w1 移动到表格 w2 中
INSERT INTO w2(SELECT * FROM t);
```