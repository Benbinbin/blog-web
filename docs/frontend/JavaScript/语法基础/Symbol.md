# Symbol
在 ES6 中原生数据类型新增了 **`Symbol` 唯一标识符**，是一种创建后值不可变的数据类型，常用于作为对象的属性名（以标识唯一属性）。

```js
// id 是 symbol 的一个实例化对象
let id = Symbol();
```

使用内置函数 `Symbol(["description"])` 创建标识符，其中 `"description"` 字符串是可选的作为标识符的补充**描述**，:warning: 可选填的描述只是一个标签，不影响任何东西。

:warning: JavaScript 中的大多数据类型都支持隐式转换为字符串，但 Symbol 不会被自动转换为字符串，这是一种防止混乱的「语言保护」，因为字符串和 Symbol 有本质上的不同。可使用方法 `.toString()` 将 Symbol 整体转换为字符串，也可以使用属性 `.description` 获取其描述内容。

```js
let id = Symbol("id");
alert(id.toString()); // Symbol(id)

let id = Symbol("id");
alert(id.description); // id
```

:warning: 如果要在对象字面量 `{}` 中使用 Symbol（如声明对象时使用 Symbol 或 存储 Symbol 值的对象），或在访问由 Symbol 作为属性名的对象属性时，需要使用方括号 `[]` 把它括起来，这是因为要标明以该变量的值（即 Symbol）作为键，而不是以字符串作为键

## 唯一性
Symbol 保证是唯一的，即使我们创建了许多具有相同描述的 Symbol，它们的值也是不同。

```js
// 创建标识符
const sym1 = Symbol('banana');
const sym2 = Symbol('banana');
// 无论描述是什么，每次都创建新的标识符，因此以上创建的 sym1 和 sym2 是两个不同的标识符
console.log(sym1 === sym2); // false

// 使用普通字符串作为属性名，属性名相同将会出现覆盖问题
const bowl = {
  apple: { color: 'red', weight: 136.078 },
  banana: { color: 'yellow', weight: 183.151 },
  // 覆盖以上相同名称的属性
  banana: { color: 'yellow', weight: 176.845 }
};
console.log(bowl); // Object {apple: Object, banana: Object} 仅有一个 banana 属性

// 使用 Symbol 作为对象的属性名，即使描述相同并不会出现覆盖
const bowl = {
  [Symbol('apple')]: { color: 'red', weight: 136.078 },
  [Symbol('banana')]: { color: 'yellow', weight: 183.15 },
  [Symbol('banana')]: { color: 'yellow', weight: 176.845 }
};
// 使用标识符作为属性名，每一个属性都是唯一的，即第一个 banana 属性不会被第二个 banana 属性覆盖
console.log(bowl); // Object {Symbol(apple): Object, Symbol(banana): Object, Symbol(banana): Object}
```

## 「隐藏」属性
使用 Symbol 唯一标识符作为对象的属性名，可以为对象创建「隐藏」属性（无法轻易访问或被重写），因为这些属性名是唯一的因此不会与原有的属性名存在冲突。

```js
// 原始对象
let user = { name: "John" };
```
```hs
// 在一处脚本使用字符串 "id" 作为属性名为对象创建新属性
user.id = "Our id value";
```
```js
// 在另一处脚本使用相同的的字符串 "id" 创建一个属性
user.id = "Their id value"   // 砰！无意中被另一个脚本重写了 id！
```

标识符之间不会有冲突，因为 Symbol 总是不同的，即使它们有相同的描述。
```js
// 原始对象
let person = { // 属于另一个代码
  name: "Ben"
};
```
```js
// 在一处脚本使用 Symbol 作为属性名为对象创建新属性
let id = Symbol("id");
person[id] = 1;
```
```js
// 在另一处脚本使用 Symbol 创建另一个属性
let id = Symbol("id");
person[id] = "Their id value";
```

:bulb: Symbol 不是 100% 隐藏的。有一个内置方法 [Object.getOwnPropertySymbols(obj)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols) 允许我们获取所有的 Symbol。还有一个名为 [Reflect.ownKeys(obj)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys) 的方法可以返回一个对象的 **所有** 键，包括 Symbol。

## 全局 Symbol
一般所有的 Symbol 都是不同的，即使它们有相同的描述。但如果需要有相同「名字」的 Symbol 具有相同的实体，可以通过 **全局 Symbol 注册表** 实现。

使用函数 `Symbol.for(key)`从注册表中读取（不存在则创建）Symbol。该函数会检查全局注册表，如果有一个描述为 `key` 的 Symbol 则返回该 Symbol，否则将创建一个新 Symbol，并通过给定的 `key` 将其存储在注册表中。注册表内的 Symbol 被称为 **全局 Symbol**，它们是全局范围内的 Symbol，可以在代码中基于 `key` 随处访问。

```js
// 从全局注册表中读取
let id = Symbol.for("id"); // 如果该 Symbol 不存在，则创建它

// 再次读取（可能是在代码中的另一个位置）
let idAgain = Symbol.for("id");

// 相同的 Symbol
alert( id === idAgain ); // true
```

:bulb: 函数 `Symbol.keyFor(sym)` 具有方向作用，即通过给定的 Symbol 查询返回全局 Symbol 的一个名字。如果 Symbol 不是全局的，它将无法找到它并返回 `undefined`。

```js
let globalSymbol = Symbol.for("name");   // 使用 Symbol.for() 函数创建一个全局 Symbol
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name，全局 Symbol
alert( Symbol.keyFor(localSymbol) ); // undefined，非全局

alert( localSymbol.description ); // name
```

:bulb: JavaScript 内部有很多「系统」Symbol，可以使用它们来微调对象的各个方面：
* `Symbol.hasInstance`
* `Symbol.isConcatSpreadable`
* `Symbol.iterator`
* `Symbol.toPrimitive` 设置[对象原始值的转换](https://zh.javascript.info/object-toprimitive)
……

## Symbol 在 for-in 中会被跳过
Symbol 属性不参与 for-in 循环。

```js
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

for (let key in user) alert(key);   // name, age

// 使用 Symbol 任务直接访问
alert( "Direct: " + user[id] );   // Direct: 123
```

:bulb: `Object.keys(user)` 也会忽略它们。这是「隐藏符号属性」原则的一部分，如果另一个脚本或库遍历我们的对象，它不会意外地访问到符号属性。

相反 `Object.assign` 复制对象的属性时，会将由字符串和 symbol 作为属性名的所有属性都复制到新对象中

```js
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```