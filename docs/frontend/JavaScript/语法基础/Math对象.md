---
show: true
cover: JavaScript.png
collection: JavaScript
tags:
  - JavaScript
---

# Math对象
参考：[Math - JavaScript | MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math)

JavaScript 有一个内置的 `Math` 对象，它包含了一个小型的数学函数和常量库。

## 常用方法
### random()
方法 `Math.random()` 返回从 0 到 1 的随机数（不包括 1）

```
alert( Math.random() ); // 0.1234567894322
```

通过该方法可以生成任意范围 `min` 到 `max` 之间的随机浮点数（不包括 `max`）

```js
// max - min 范围跨度
// min 范围起始值
function random(min, max) {
  return min + Math.random() * (max - min);
}

random(1, 5);   // 2.353313025991703
```

通过该方法可以生成任意范围 `min` 到 `max` 随机整数（不包括 `max`）

:warning: 如果取得的是整数需要注意得调整取值范围的边界。如果使用 `max - min` 作为映射范围，获得边缘值 `min` 和 `max` 的概率比其他值低两倍；为了确保范围内每个整数具有相同的取值范围，其中一种方法是使用 `Math.floor` 来取范围 `max+1 - min` 中的随机数。参考：[从 min 到 max 的随机整数](https://zh.javascript.info/number#cong-min-dao-max-de-sui-ji-zheng-shu)

```js
// 所有间隔的长度相同，从而使最终能够均匀分配。
function randomInteger(min, max) {
  // here rand is from min to (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

alert( randomInteger(1, 3) );

// 通过这种映射方式，所有整数的可被选中的概念（间隔）都相同
// values from 1  ... to 1.9999999999  become 1
// values from 2  ... to 2.9999999999  become 2
// values from 3  ... to 3.9999999999  become 3
```

### max() 和 mix()
方法 `Math.max(a, b, c...)` 或 `Math.min(a, b, c...)` 从任意数量的参数中返回最大 或 最小值。

```
alert( Math.max(3, 5, -10, 0, 1) ); // 5
alert( Math.min(1, 2) ); // 1
```

:warning: 如果输入的参数有非数值，函数返回的就是 `NaN`

### pow()
方法 `Math.pow(n, power)` 返回 `n` 的 power 次幂，即 n^power^

```
alert( Math.pow(2, 10) ); // 2 的 10 次幂 = 1024
```

### abs()
方法 `Math.abs(num)` 返回 `num` 的绝对值。

## 数字修约
数值修约 rounding 是指对数字精度进行修改，按照特定规则返回一个相约的数字。

常用修约为整数的 `Math` 方法

- `Math.floor(num)` 向下舍入（取最近的比 `num` 较小的值）:smile: 地板
- `Math.ceil(num)` 向上舍入（取最近的比 `num` 较大的值）:smile: 天花板
- `Math.round(num)` 向最近的整数四舍五入 :smile: 大约
- `Math.trunc(num)` 删除小数点后的所有内容而不舍入（IE 浏览器不支持）

| `num` | `Math.floor(num)` | `Math.ceil(num)` | `Math.round(num)` | `Math.trunc(num)` |
| --- | --- | --- | --- | --- |
| `3.1` | `3` | `4` | `3` | `3` |
| `3.6` | `3` | `4` | `4` | `3` |
| `-1.1` | `-2` | `-1` | `-1` | `-1` |
| `-1.6` | `-2` | `-1` | `-2` | `-1` |

:bulb: 对于以数值开头的字符串，可以使用方法 `parseInt(str)` 或 `parseFloat(str)` 提取其中的数值（整数或浮点数）部分。

如果需要（针对小数）舍入到指定的位数，交替使用乘法和除法并结合特定的（整数）修约函数实现；也可以直接使用方法 `num.toFixed(i)` 其中参数 `i` 指定四舍五入到小数点后第`i` 个数字

```
// 保留两位小数
let num = 1.23456;
alert( Math.round(num * 100) / 100 );    // 1.23456 -> 123.456 -> 123 -> 1.23

let num = 12.34;
alert( num.toFixed(1) ); // "12.3"

```

:warning: 方法 `num.toFixed(i)` 返回一个字符串，如果小数部分比所需要的短，则在结尾添加零。可以使用一元加号 `+` 或 类型转换函数 `Number()` 将其转换为数字。

:warning: 十进制数字的小数实际上是以二进制形式存储在内存中，在转换时可能出现循环小数（在二进制数字系统中，以 2 作为幂，该转换过程可能会生成无限的二进制小数，系统最多以 64 位存储数字，因此会自动进行四舍五入修约），经常会造成**精度损失**。虽然页面的小数未显式出这种极小的精确度损失，但是要小心损失依然存在。

```
alert( 0.1 + 0.2 );   // 0.30000000000000004
alert( 0.1.toFixed(20) );   // 0.10000000000000000555

```

为了解决这个问题可以借助方法 `num.toFix(i)` 对运算结果进行四舍五入限定位数，或先用乘法将小数（所需的精度）都转换为整数再进行运算（避免精度损失），最后再用相应的除法将其转换为小数。

```
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.30
// 方法 toFixed() 总是返回一个字符串，可以使用一元加号将它强制为一个数字

alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3

```

:warning: 除了小数可能存在精度损失，过大的数字 JavaScript 无法使用 64 位存储时也会出现精度损失。

```
// Hello! I'm a self-increasing number!
alert( 9999999999999999 ); // shows 10000000000000000
```