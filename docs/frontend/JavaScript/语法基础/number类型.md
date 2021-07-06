# 数字类型
数字类型的数据包括任何正负整数以及小数，JavaScript 不区分浮点数和整数，数字都以 64 位浮点数形式存储，也称为「双精度」，其中 52 个被使用存储这些数字，其中 11 个存储小数点的位置（它们对于整数为零），1 位用于符号。

## 数值不同进制表示方法
在十进制数值中，支持在数字后附加字母 `e` 来缩短数字，字母后的数字指定零的数量，其正负表示相乘或相除相应的数值。

```js
1.23e6   // 表示 e 前面的数值乘以一个很大的数，这个数由 1 后面跟着大量的 0 构成（0 的数量与 e 后数值相同）
// 1.23e6 = 1.23 * 1000000

1.23e-6  // 表示 e 前面的数值相除一个很大的数，这个数由 1 后面跟着大量的 0 构成（0 的数量与 e 后数值相同）
// 1.23e-6 = 1.23 / 1000000 (=0.00000123)
```

此外对于十六进制、二进制和八进制还有特定的字符标注

* 十六进制的数值用前缀 `0x` 标注（字母 `x` 表示 hex）
* 八进制的数值使用前缀 `0o` 标注（字母 `o` 表示 octal）
* 二进制的数值使用前缀 `0b` 标注（字母 `b` 表示 binary）

```js
alert( 0xff ); // 255

let a = 0b11111111; // binary form of 255
let b = 0o377; // octal form of 255
alert( a == b ); // true, the same number 255 at both sides
```

使用方法 `num.toString(base)` 可以将返回带有给定 `base` 的进制中 `num` 的**字符串表示**。`base` 可以从 `2` 变到 `36`（最大值）。默认情况下它是 `10`。

- **base=16** 用于十六进制颜色，字符编码等，数字可以是 `0..9` 或 `A..F`。
- **base=2** 主要用于调试按位操作，数字可以是 `0` 或 `1`。
- **base=36** （最大值）数字可以是 `0~9` 或 `A~Z` 整个拉丁字母用来表示一个数字，一个常见的用法是基数为 36 的数字系统将一个教程的数字标识符变得较短，如做一个**简短的URL**

```js
let num = 255;
alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111

alert( 123456..toString(36) ); // 2n9c
```

:warning: 想直接在一个数字上调用一个方法，如示例的方法 `.toString()`，那么我们**需要在数字后面放置两个点 `..`** 因为 JavaScript 语法暗示了第一个点之后的小数部分，如果我们再放一个点那么 JavaScript 知道小数部分是空的，现在进入方法。也可以写 `(123456).toString(36)`。

## 数字修约
数值修约 rounding 是指对数字精度进行修改，按照特定规则返回一个相约的数字。

常用修约为整数的内置函数：
* `Math.floor(num)` 向下舍入（取最近的比 `num` 较小的值）
* `Math.ceil(num)` 向上舍入（取最近的比 `num` 较大的值）
* `Math.round(num)` 向最近的整数四舍五入
* `Math.trunc(num)` 删除小数点后的所有内容而不舍入（IE 浏览器不支持）

| `num`  | `Math.floor(num)` | `Math.ceil(num)` | `Math.round(num)` | `Math.trunc(num)` |
| :--------: | :---------------------: | :------------------------: | :--------------------------: | :--------------------------: |
|  `3.1`  |            `3`             |           `4`            |            `3`             |            `3`             |
|  `3.6`  |            `3`             |           `4`            |            `4`             |            `3`             |
| `-1.1` |           `-2`            |           `-1`           |           `-1`            |           `-1`            |
| `-1.6` |           `-2`            |           `-1`           |           `-2`            |           `-1`            |

如果需要（针对小数）舍入到指定的位数，交替使用乘法和除法并结合特定的（整数）修约函数实现；也可以直接使用方法 `num.toFixed(i)` 其中参数 `i` 指定四舍五入到小数点后第`i` 个数字

```js
// 保留两位小数
let num = 1.23456;
alert( Math.round(num * 100) / 100 );    // 1.23456 -> 123.456 -> 123 -> 1.23

let num = 12.34;
alert( num.toFixed(1) ); // "12.3"
```

:warning: 方法 `num.toFixed(i)` 返回一个字符串，如果小数部分比所需要的短，则在结尾添加零。可以使用一元加号 `+` 或 类型转换函数 `Number()` 将其转换为数字。

:warning: 十进制数字的小数实际上是以二进制形式存储在内存中，在转换时可能出现循环小数（在二进制数字系统中，以 2 作为幂，该转换过程可能会生成无限的二进制小数，系统最多以 64 位存储数字，因此会自动进行四舍五入修约），经常会造成**精度损失**。虽然页面的小数未显式出这种极小的精确度损失，但是要小心损失依然存在。

```js
alert( 0.1 + 0.2 );   // 0.30000000000000004
alert( 0.1.toFixed(20) );   // 0.10000000000000000555
```

为了解决这个问题可以借助方法 `num.toFix(i)` 对运算结果进行四舍五入限定位数，或先用乘法将小数（所需的精度）都转换为整数再进行运算（避免精度损失），最后再用相应的除法将其转换为小数。

```js
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.30
// 方法 toFixed() 总是返回一个字符串，可以使用一元加号将它强制为一个数字

alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
```

:warning: 除了小数可能存在精度损失，过大的数字 JavaScript 无法使用 64 位存储时也会出现精度损失。

```js
// Hello! I'm a self-increasing number!
alert( 9999999999999999 ); // shows 10000000000000000
```

## 两个零
数字内部存在两个零 `0` 和 `-0`，这是因为数字的 64 位存储中有一个位表示一个符号，所以每个数字可以是正数或负数，包括零。在大多数情况下这种区别并不明显，因为操作员可以将它们视为相同。

## 数字特殊值
除了整数和小数，number 类型还有特殊值

* `Infinity` 和 `-Infinity` 表示无穷大和无穷小
* `NaN` 表示计算错误，通常作为数字运算存在错误的返回值

:warning: 值 `NaN` 是独一无二的，它不等于任何东西，包括它本身，因此不能使用类似于 `variable === NaN` 的结构来检测参数是否为 `NaN`（因为无论变量为何值结果都为 `false`），可以使用函数 `isNaN(value)` 来测试参数 `value` 是否为 `NaN`。

:bulb: 有一种特殊的内置方法 [Object.is(value1, value2)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 用于比较两个参数是否严格相等，适用于 `NaN` 比较，即 `Object.is（NaN，NaN)` 返回 `true`。这种比较方式经常用于 JavaScript 规范，内部称为 SameValue 同值相等,当内部算法需要比较两个值完全相同时使用 `Object.is()`

类似的，可以使用函数 `isFinite(value)` 检测参数是否为常规数字，:bulb: 参数会被隐式转换为数字，可以用于验证字符串是否为常规数字，因此字符串为空、空格和 `null` 在会被视为 0。

```js
alert( isFinite("15") ); // true

let num = +prompt("Enter a number", '');
// 结果会是 true，除非你输入无穷大、无穷小或不是数字
alert( isFinite(num) );
```

## 从字符串「读取」数字
使用加号 `+` 或 `Number()` 的数字转换是严格的。如果一个字符串不完全是一个数字，而是**以数字开头**但带有单位的值，则可以使用函数 `parseInt(value)` 和 `parseFloat(value)` 读取字符串中的数字，直到无法读取为止，如果发生错误，则返回收集的数字。函数 `parseInt` 返回一个整数，而 `parseFloat` 将返回一个浮点数

```js
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseFloat('12.3.4') ); // 12.3, the second point stops the reading
alert( parseInt('a123') ); // NaN, the first symbol stops the process
```

:bulb: `parseInt(str, radix)` 的第二个参数指定了「读取」的数字系统的进制，因此还可以解析十六进制数字，二进制数字等字符串。

```js
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, without 0x also works
alert( parseInt('2n9c', 36) ); // 123456
```

## Math 对象
参考：[Math - JavaScript | MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math)

JavaScript 有一个内置的 `Math` 对象，它包含了一个小型的数学函数和常量库。

常用的 `Math` 方法

* `Math.random()` 返回从 0 到 1 的随机数（不包括 1）

    ```js
    alert( Math.random() ); // 0.1234567894322
    ```

* `Math.max(a, b, c...)` 或 `Math.min(a, b, c...)` 从任意数量的参数中返回最大 或 最小值。

    ```js
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

* `Math.pow(n, power)` 返回 `n` 的 power 次幂，即 n^power^

    ```js
    alert( Math.pow(2, 10) ); // 2 的 10 次幂 = 1024
    ```