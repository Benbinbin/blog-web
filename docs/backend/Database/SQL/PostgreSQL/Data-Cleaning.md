---
show: true
cover: postgresql.png
collection: PostgreSQL
summary: PostgreSQL 数据清洗
tags:
  - PostgreSQL
---

# PostgreSQL 数据清洗

源数据可能存在缺失、异常值等情况，需要先进行数据清洗，然后才能够进行后续的数据分析。

:warning: 数据清洗不应该在源数据中进行，应该通过 `CREATE TABLE new_table_name AS SELECT * FROM source_table_name` 创建动态表，操作拷贝的数据表。

## 缺失值处理
使用关键字 `IS NULL` 匹配缺失值，以此作为筛选条件可以查询出具有缺失值的数据项

```sql
SELECT * FROM table_name
    WHERE column_name IS NULL
```

可以使用多种方式来处理缺失值，常用的方法如下：

* 删除
* 均值填充
* 众数填充

:bulb: 如果数据分析只是针对表格部分字段，其他字段的缺失值并不影响分析结果，可以不对其他字段进行缺失值处理。

### 删除缺失值
使用语句 `DELETE` 和 `IS NULL` 筛选出含有缺失值的数据项并删除

```sql
DELETE FROM table_name WHERE column_name IS NULL;
```

:bulb: 当数据本身有特殊含义的时候，尽量不填充缺失值，直接删除数据即可，例如一个街镇的人口数等。

### 均值填充
使用函数 `AVG(column_name)` 计算相应字段的均值，并通过语句 `UPDATE table_name SET` 用相应字段的均值填充缺失的单元格

```sql
-- 用均值替换 NULL
UPDATE table_name
    SET column_name = (SELECT AVG(column_name) FROM table_name)
    WHERE column_name IS NULL;
```

### 众数填充
使用函数 `COUNT(column_name)` 对字段的唯一值进行统计，并用函数 `Max()` 求得 `COUNT()` 产生字段的最大值即为**众数**，并通过语句 `UPDATE table_name SET` 用相应字段的众数填充缺失的单元格

```sql
-- 创建一个临时表格 mode 对给定字段进行分组统计
WITH mode AS (
    SELECT column_name, COUNT(column_name) FROM table_name
    GROUP BY column_name);

-- 用众数替换 NULL
UPDATE table_name
    SET column_name = SELECT MAX(column_name) FROM mode
	WHERE column_name IS NULL;
```

:bulb: 众数填充适用离散型的数据，而且该字段的重复值比较多，这样众数才具有代表性；如果数据精度较细，而且是连续型数据，应该使用均值填充。

## 异常值处理
异常值，也称为离群点，是指样本中的个别值，它们的数字明显偏离其余（整体大部分）的观测值。异常值的分析也称为离群点的分析。

异常值由多种原因产生，可能是真实存在的特殊情况之下产生的，也可能是由于数据录入错误产生的。基于分析需求和具体情况可采取不同的处理方法，如删除异常值。

一般基于 $3\sigma$ 原则（拉移达准则）确定异常值，即如果数据服从正态分布，则异常值被定义为一组测定值中与平均值的偏差超过 3 倍的值。

如果数据服从正态分布，则数据分布一般遵循以下规则：

* 数值分布在 $(\mu - \sigma, \mu + \sigma)$ 中的概率为 0.6827
* 数值分布在 $(\mu - 2 \sigma, \mu + 2 \sigma)$ 中的概率为 0.9545
* 数值分布在 $(\mu - 3 \sigma, \mu + 3 \sigma)$ 中的概率为 0.9973

根据该理论，可以基于该条件 $p(\lvert x - \mu \rvert > 3 \sigma) \leqslant 0.003$ 筛选出字段中的异常值，由于它们占据总数据集比例十分小，一般采取处理方法是删除异常值，而不影响整体趋势。

```sql
-- 导入客户端数据
CREATE TABLE outerdata(id int PRIMARY KEY,value numeric);
\COPY outerdata FROM 'F:\DataVis\data.csv' WITH CSV HEADER;

-- 查看均值、标准差
SELECT AVG(value),STDDEV(value) FROM outerdata;

-- 添加列，计算均值
ALTER TABLE outerdata ADD u numeric;
UPDATE outerdata SET u = (SELECT AVG(value) FROM outerdata);
ALTER TABLE outerdata ADD std numeric;

-- 添加列，计算标准差
UPDATE outerdata SET std = (SELECT STDDEV(value) FROM outerdata);
ALTER TABLE outerdata ADD sgm numeric;

-- 添加列，计算 value 与均值的差值
UPDATE outerdata SET sgm = ABS(value - u);

-- 基于 3σ原则 筛选出异常值
SELECT * FROM outerdata WHERE sgm > 3*std;

-- 基于 3σ原则 通过单个 WHERE 做筛选
SELECT * FROM outerdata
	WHERE ABS(value - (SELECT AVG(value) FROM outerdata)) > (SELECT STDDEV(value) FROM outerdata)*3;

-- 删除异常值
DELETE FROM outerdata
	WHERE ABS(value - (SELECT AVG(value) FROM outerdata)) > (SELECT STDDEV(value) FROM outerdata)*3;
```

### 数据标准化
数据标准化 normalization，也称为数据归一化，是指将数据按比例缩放，使之落入一个小的特定区间。在某些比较和评价的指标处理中经常会用到，可以将数据转化为无量纲的纯数值，去除数据的单位限制，便于不同单位或量级的指标能够进行比较和加权。

数据标准化一般使用两种方法，转换得到的值一般反映数据的偏离/波动程度：

* 0-1 标准：基于最大值和最小值，以 $Max - Min$ 作为基底，求出每个数据距离单侧（最大值或最小值）的大小比例

    * 正向标准化 $x =\dfrac{x - Min}{Max - Min}$
    * 负向标准化 $x =\dfrac{Max - x}{Max - Min}$

* Z-score 标准化：基于平均数和标准差，以标准差为单位计算，求出每个数据距离平均数的大小

$$x =\dfrac{x - \mu}{\sigma}$$

```sql
-- 导入客户端数据
CREATE TABLE nordata(id int PRIMARY KEY,value double precision);
\COPY nordata FROM 'F:\DataVis\data.csv' WITH CSV HEADER;

-- 0-1 标准化
-- 将数据的最大最小值记录下来，并通过 Max-Min 作为基数（即 Min=0，Max=1）进行数据的归一化处理
-- x = (x - Min) / (Max - Min) or x = (Max - x) / (Max - Min)

ALTER TABLE nordata ADD value_nor double precision;
UPDATE nordata SET value_nor = (value - (SELECT MIN(value) FROM nordata))/(SELECT MAX(value) - MIN(value) FROM nordata);

-- Z-score 标准化
-- Z分数（z-score）是一个分数与平均数的差再除以标准差的过程，其数学意义是一个给定分数距离平均数多少个标准差
-- Z 值代表着原始分数和母体平均值之间的距离，是以标准差为单位计算。在原始分数低于平均值时Z则为负数，反之则为正数
-- z = (x - μ)/σ，其中 μ 为平均数，σ 为标准差
ALTER TABLE nordata ADD value_z double precision;
UPDATE nordata SET value_z = (value1-(SELECT AVG(value) FROM nordata))/(SELECT STDDEV(value) FROM nordata);
```