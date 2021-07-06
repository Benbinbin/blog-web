# BigInt
参考

- [MDN 文档对 BigInt 的介绍](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)。
- [ECMA262 规范](https://tc39.es/ecma262/#sec-bigint-objects)。

`BigInt` 是一种特殊的数字类型，它提供了对任意长度整数的支持。创建 bigint 的方式有两种方法：

* 在一个整数字面量后面加 `n`
* 调用 `BigInt` 函数，该函数从字符串、数字等中生成 `bigint`

```js
const bigint = 1234567890123456789012345678901234567890n;

const sameBigint = BigInt("1234567890123456789012345678901234567890");

const bigintFromNumber = BigInt(10); // 与 10n 相同
```

## 数学运算
`BigInt` 大多数情况下可以像常规数字类型一样使用，对 `bigint` 的所有操作，返回的结果也是 `bigint`。但 `BigInt` 类型不支持一元加法（一元加法运算符 `+value` 是用于将 `value` 转换成数字类型的方法）。

为了避免混淆，在 bigint 中不支持一元加法：

:warning: 不可以把 `bigint` 和常规数字类型混合使用，应该使用 `BigInt()` 或者 `Number()` 显式地转换。

```js
alert(1n + 2); // Error: Cannot mix BigInt and other types

let bigint = 1n;
let number = 2;

// 将 number 转换为 bigint
alert(bigint + BigInt(number)); // 3

// 将 bigint 转换为 number
alert(Number(bigint) + number); // 3
```

:warning: 应该谨慎进行 `number` 类型转换，因为当 `bigint` 太大而数字类型无法容纳时会截断多余的位。

## 比较运算符
使用比较运算符 `<` 和 `>` 可以对 `bigint` 和 `number` 类型的数字进行比较；但由于 `number` 和 `bigint` 属于不同类型，它们可能在进行 `==` 比较时相等，但在进行 `===`（严格相等）比较时不相等。

```js
alert( 2n > 1n ); // true

alert( 1 == 1n ); // true

alert( 1 === 1n ); // false
```

## 布尔运算
`bigint` 进行布尔运算的行为类似于 `number`，bigint `0n` 为 `false`，其他值为 `true`

```js
alert( 1n || 2 ); // 1（1n 被认为是 true）

alert( 0n || 2 ); // 2（0n 被认为是 false）
```

## Polyfill
Polyfilling bigint 比较棘手，原因是许多 JavaScript 运算符，比如 `+` 和 `-` 等，在对待 bigint 的行为上与常规 number 相比有所不同。如 `bigint` 的除法总是返回 bigint（如果需要，会进行舍入）。

想要模拟这种行为，polyfill 需要分析代码，并用其函数替换所有此类运算符。但是这样做很麻烦，并且会耗费很多性能。不过 [JSBI](https://github.com/GoogleChromeLabs/jsbi) 库的开发者提出了另一种解决方案，该库使用自己的方法实现了大的数字，可以使用它们替代原生的 `bigint`

| 运算 | 原生 `BigInt` | JSBI |
| --- | --- | --- |
| 从 Number 创建 | `a = BigInt(789)` | `a = JSBI.BigInt(789)` |
| 加法 | `c = a + b` | `c = JSBI.add(a, b)` |
| 减法 | `c = a - b` | `c = JSBI.subtract(a, b)` |
| … | … | … |

这个方法建议我们在写代码时使用 JSBI 替代原生的 `bigint`，由于 JSBI 在内部像使用 `bigint` 一样使用 `number`，并最大程度按照规范进行模拟。对于不支持 bigint 的引擎，我们可以「按原样」使用此类 JSBI 代码；对于那些支持 `bigint` 的引擎，使用 polyfill（Babel 插件）将 JSBI 调用转换为原生的 `bigint`。