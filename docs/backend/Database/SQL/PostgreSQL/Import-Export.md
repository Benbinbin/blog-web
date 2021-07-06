---
show: true
cover: postgresql.png
collection: PostgreSQL
summary: PostgreSQL 数据导入与导出
tags:
  - PostgreSQL
---

# PostgreSQL 数据导入与导出

数据导入和导出是一般是指在数据库 `DATABASE` 之间进行的，也可以从客户端（电脑）导入导出数据。

## 数据导入
使用语句 `COPY` 结合 `FROM` 导入数据，需要指定一个表格 `table_name` 来「容纳」数据

```sql
COPY table_name [ ( column_name [, ...] ) ]
    FROM { 'filename' | PROGRAM 'command' | STDIN }
    [ [ WITH ] ( option [, ...] ) ]
```

:bulb: 需要先创建一个与复制数据结构相同的空表，用以接收数据。

```sql
-- 创建一个空表 data
-- 表格结构（字段和数据类型）需要与源数据结构相同
CREATE TABLE data(
 	房屋编码 int,
 	小区 text,
 	朝向 text,
 	房屋单价 numeric,
 	参考首付 numeric,
 	参考总价 numeric,
 	经度 numeric,
 	纬度 numeric
);
```

* 一般源文件格式使用 `.csv`（一种以逗号分隔数据的文件格式），需要使用语句 `WITH CSV` 指出文件格式
* 如果源数据有表头需要使用关键字 `HEADER` 明确指出源数据的第一行作为表头
* 数据一般使用 utf-8 编码（特别是具有中文时）`ECODING 'utf8'`

:warning: 注意文件路径最好不要有中文

:bulb: 如果拷贝的数据是来源于客户端，需要使用语句 `\COPY`

```sql
\COPY data FROM 'F:\DataVis\assetsData.csv' WITH CSV HEADER ENCODING 'utf8';
```

## 数据导出
使用语句 `COPY` 结合 `TO` 导出数据。类似地，如果需要将数据导出到客户端（电脑）文件中，需要使用语句 `\COPY`

```sql
COPY { table_name [ ( column_name [, ...] ) ] | ( query ) }
    TO { 'filename' | PROGRAM 'command' | STDOUT }
    [ [ WITH ] ( option [, ...] ) ]
```

:bulb: 一般导出的格式为 CSV，而且指定导出的数据有表头 `WITH CSV HEADER`

```sql
\COPY data TO 'F:\DataVis\output.csv' WITH CSV HEADER;
```