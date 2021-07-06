# 字符串
字符串是一串字符集合，它是由零个或多个 16 位 Unicode 字符组成的字符序列，并用引号（单引号、双引号、反引号）括起来。使用字符串来表示句子、名称、地址等数据。

:bulb: 反引号允许通过 `${…}` 将任何表达式嵌入到字符串中，同时允许创建跨行字符串（如果我们使用单引号或双引号来实现字符串跨行的话，则会出现错误）。

```js
let guestList = `Guests:
 * John
 * Pete
 * Mary
`;

alert(guestList); // 客人清单，多行
```

:warning: JavaScript 并没有一种有别于字符串类型的字符数据类型，所以字符只是长度为 1 的字符串。字符串的内部格式始终是 UTF-16，它不依赖于页面编码。

## 索引
使用索引访问字符串中的特定位置的字符。字符索引从 `0` 开始计算，即第一个字符位于位置 `0` 处，而最后一个字符位于 `n-1`处（`n` 表示字符串中的字符总数）。

```js
let name = "James";
name[0];   // "J"
```

:bulb: 可使用字符串内置方法 `charAt(i)` 基于索引访问单个字符，区别在于如果没有找到字符 `[]` 返回 `undefined`，而 `charAt` 返回一个空字符串。

```j
let str = `Hello`;

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // ''（空字符串）
```
:bulb: 可以使用 for-of 结构遍历字符

```j
for (let char of "Hello") {
  alert(char); // H,e,l,l,o（char 变为 "H"，然后是 "e"，然后是 "l" 等）
}
```

## 转义字符
采用反斜杠字符 `\` 作为开始的特殊的字符，告诉 JavaScript 这些字符有特殊的含义（以忽略原来的字符串作用，如引号原来表示字符串的始或终），反斜杠字符 `\` 被称为**转义字符**。一般用以标注使用了某些无法显式的命令，如换行或制表符等。

```js
alert( 'I\'m the Walrus!' ); // I'm the Walrus!
```

:warning: 注意反斜杠 `\` 在 JavaScript 中用于正确读取字符串，然后消失。内存中的字符串没有 `\`。

常用特殊字符

|                     转义代码                     |                                                                      字符含义                                                                       |
| :------------------------------------------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
|                    `\\`	                     | `\` (反斜杠)                                                                                                                                        |
|                       `\"`                       | `"` (双引号)                                                                                                                                        |
|                       `\'`                       | `'` (单引号)                                                                                                                                        |
|                       `\n`                       | newline 换行                                                                                                                                        |
|                       `\t`                       | tab 制表符                                                                                                                                          |
|                     `\xXX`                      | 具有给定十六进制 Unicode `XX` 的 Unicode 字符，如 `'\x7A'` 和 `'z'` 相同。                                                          |
|                    `\uXXXX`                     | 以 UTF-16 编码的十六进制代码 `XXXX` 的 unicode 字符，例如 `\u00A9` 是版权符号的 unicode。它必须正好是 4 个十六进制数字。 |
| `\u{X…XXXXXX}`（1 到 6 个十六进制字符） | 具有给定 UTF-32 编码的 unicode 符号。一些罕见的字符用两个 unicode 符号编码，占用 4 个字节。这样我们就可以插入长代码了。   |

## 比较字符串
* 使用比较运算符 `==` 或 `!=` 查看两个字符串是否相同（区分大小写）
* 使用比较运算符 `>` 或 `<` 等，比较两个字符串中依据字符顺序的**字母在 ASCII 表格中的数字值**，小写字母在 ASCII 表格中的数字值比大写字母的要大

字符比较是通过比较相应的数字代码，越大的代码意味着字符越大，如 `a` 代码为 `97` 大于 `Z` 代码为 `90`

根据 ASCII 表格可以知道一些规律
- 所有小写字母追随在大写字母之后，因为它们的代码更大。
- 一些像 `Ö` 的字母与主要字母表不同，它的代码比任何从 `a` 到 `z` 的代码都要大。

:bulb: 由于所有的字符串都使用 UTF-16 编码。即每个字符都有对应的数字代码，可以使用方法 `str.codePointAt(pos)` 获取字符对应的代码，或使用方法 `String.fromCodePoint(num)` 传递数字返回相应的字符。

```js
// 不同的字母有不同的代码
alert( "z".codePointAt(0) ); // 122
alert( "Z".codePointAt(0) ); // 90

// 通过数字创建字符
alert( String.fromCodePoint(90) ); // Z
```

:bulb: 如果需要[按照语言使用习惯比较字符串](https://zh.javascript.info/string#zheng-que-de-bi-jiao)时使用方法 `char1.localeCompare(char2)`，否则将按字符代码进行比较。

## 查找子字符串
**方法 `str.indexOf(key, [pos])`** 在字符串 `str` 中寻找关键字/子字符串 `key` ，第二个可选参数指定查找的开始位置 `pos`，如果查找成功返回**第一次匹配成功的位置**；如果没有找到返回 `-1`.

```js
let str = 'Widget with id';
alert( str.indexOf('Widget') ); // 0，因为 'Widget' 一开始就被找到

let str = 'Widget with id';
alert( str.indexOf('id', 2) ) // 12，从第三个位置（索引为2）开始匹配查询
```

:bulb: 结合循环可以获取所有匹配的位置

```js
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // 这是我们要查找的目标

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Found at ${foundPos}` );
  pos = foundPos + 1; // 继续从下一个位置查找
}
```

类似的**方法 `str.lastIndexOf(substr, position)`** 它从字符串的末尾开始搜索到开头，以相反的顺序列出这些事件。

:warning: 如果需要将 `str.indexOf()` 查询结果作为条件用于条件语句中，应该注意可能返回 `0`（即子字符串在起始位置就匹配到）的情况，因为 `0` 通过类型转换为布尔值是 `false`，直接作为判断条件可能造成错误，应该将返回值与 `-1` 进行对比。:bulb: 还有一个老技巧是 [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT) `~` 运算符，只有当 `n == -1` 时，`~n` 才为零，因此可以 `if ( ~str.indexOf("...") )` 方法来检测匹配情况。:warning: 但由于 `~` 运算符将大数字截断为 32 位，因此这种方法只能检查字符串没有那么长的情况才是可行。

```js
let str = "Widget with id";

if (str.indexOf("Widget") != -1) {
    alert("We found it"); // 现在工作了！
}
```

**方法 `str.includes(key, [pos])`** 根据 `str` 中是否包含 `key` 来返回 `true` 或 `false`，第二个可选参数是开始搜索的起始位置。如果只需要检测匹配情况，但不需要它的位置可以使用该方法。

```js
alert( "Midget".includes("id") ); // true
alert( "Midget".includes("id", 3) ); // false, 从位置 3 开始没有 "id"
```

**方法 `str.startsWith(key)`** 和 **方法`str.endsWith(key)`** 分别用于查询字符串 `str` 是否以关键字 `key` 开始或结束

```js
alert( "Widget".startsWith("Wid") ); // true，"Widget" 以 "Wid" 开始
alert( "Widget".endsWith("get") ); // true，"Widget" 以 "get" 结束
```

## 截取子字符串
**方法 `str.slice(start, [end])`** 提取字符串在 `start` 和 `end`（不包括）之间的部分，并返回一个新的字符串。

```js
str.slice(beginIndex[, endIndex])
```

* `beginIndex` 切片的开始索引，从该索引处开始提取原字符串中的字符。如果值为负数，就通过 `字符串长度 + beginIndex` 计算出实际的开始索引
* `endIndex` 切片的结束索引（不包含该索引对应的字符）。如果省略该参数，会一直提取到字符串末尾

**方法 `str.substring(start, [end])`** 返回字符串在 `start` 和 `end` （不包括）之间的部分，与 `slice` 几乎相同，但**它允许 `start` 大于 `end`，:warning: 但不支持负参数（它们被视为 `0`）**。

```
let str = "stringify";

// 这些对于 substring 是相同的
alert( str.substring(2, 6) ); // "ring"
alert( str.substring(6, 2) ); // "ring"

// ……但对 slice 是不同的：
alert( str.slice(2, 6) ); // "ring"（一样）
alert( str.slice(6, 2) ); // ""（空字符串）
```

**方法 `str.substr(start, [length])`** 返回字符串从 `start` 开始的给定 `length` 的部分，该方法允许我们指定 `length` 而不是结束位置。

第一个参数可以是负数，如果值为负数，就通过 `字符串长度 + beginIndex` 计算出实际的开始索引。如果参数 `length` 是负数则相当于 `0`，返回空字符串。

```
let str = "stringify";
alert( str.substr(2, 4) ); // 'ring'，从位置 2 开始，获取 4 个字符

let str = "stringify";
alert( str.substr(-4, 2) ); // 'gi'，从第 4 位获取 2 个字符
```

|                    方法                    |                         选择方式                          |         负值参数         |
| :------------------------------------------: | :-----------------------------------------------------------: | :--------------------------: |
|    `str.slice(start, end)`     |       从 `start` 到 `end`（不含 `end`）       |            允许            |
| `str.substring(start, end)` |       从 `start` 到 `end`（不含 `end`）       |      负值代表 `0`      |
| `str.substr(start, length)` | 从 `start` 开始获取长为 `length` 的字符串 | 允许 `start` 为负数 |

## 常用方法
参考：[String - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)

### replace()
方法 `str.replace(key, new_key)` 寻找字符串中与模式（支持正则表达式）匹配的部分，并以进行替换或为将每一个匹配的字符串（片段）都传递给回调函数。返回一个新的字符串，原字符串不会改变。

```javascript
str.replace(regexp|substr, newSubStr|callback_function)
```

* `regexp`一个正则表达式匹配字符串的片段
* `substr` 直接匹配的字符串片段，会被第二个参数替换，:warning: 仅**第一个匹配项**会被替换
* `newSubStr` 用于替换掉第一个参数在原字符串中的匹配部分的字符串
* `callback_function` 一个用来创建新子字符串的函数

```js
let email = "Ben@qq.com";

// 将原字符串 qq 替换为 gmail
let newEmail = email.replace("qq", "gmail");   // Ben@qq.com
```

### split()
方法 `split()` 使用指定的分隔符将一个字符串分割成子字符串，返回一个存储这些子字符串的数组。

:bulb: 如果分隔符为 `""` 空字符串，则将字符串转换为**字符数组**。

```js
let str = 'The lazy dog.';

// 以空格分隔字符串，返回由单词（和标点符号）组成的数组
let words = str.split(' ');
console.log(words);   // Array ["The", "lazy", "dog."]

// 以空字符分隔字符串，返回由字符组成的数组
var chars = str.split('');
console.log(chars);   // Array ["T", "h", "e", " ", "l", "a", "z", "y", " ", "d", "o", "g", "."]
```

:bulb: 方法 `split（seperater, num)` 有第二个参数（可选），该整数参数用以限制数组长度，那么额外的元素会被忽略，一般很少使用。

```js
let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
```

:bulb: 字符串 `str.split()` 与数组方法 `array.join(link)` 像是两个「互逆」运算，后者是将数组中所有元素连接（默认以逗号 `,` 连接）并返回为一个字符串。

### toUpperCase()
方法 `toUpperCase()` 返回**所有字母为大写形式**的字符串，原字符串不变。

:bulb: 如果这个值不是字符串则会被变成字符串

### toLowerCase()
方法 `toLowerCase()` 返回**所有字母为小写形式**的字符串。

### charAt()
方法 `charAt(index)` 返回字符串中指定索引位置的字符。

```js
let name = "James";
name.charAt(0)   // "J"
```

:warning:  如果没有找到字符（索引超出 `字符的长度 - 1`），`charAt()` 返回一个空字符串

类似方法 `charCodeAt()` 返回字符串中指定索引位置的字符的字符编码（UTF-16）。

### match()
[方法 `string.match(regexp)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match) 按住正则表达式的模式在给定字符串上进行检索，并返回结果。

* 如果正则表达式使用 `g` 标志，则将返回与完整正则表达式匹配的所有结果，但不会返回捕获组。
* 如果未使用 `g` 标志，则仅返回第一个完整匹配及其相关的捕获组 `Array`。 在这种情况下，返回的项目将具有如下所述的其他属性：
    - `groups`: 一个捕获组数组 或 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)（如果没有定义命名捕获组）
    - `index`: 匹配的结果的开始位置
    - `input`: 搜索的字符串

### trim()
方法 `string.trim()` 删除字符串两端的空白字符，空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR等）。

## 常用属性

### length
属性 `str.length` 返回字符串的长度。

