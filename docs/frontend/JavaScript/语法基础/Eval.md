# Eval
调用 `eval(“codeString")` 会运行代码字符串，并返回最后一条语句的结果。

```js
let value = eval('let i = 0; ++i');
alert(value); // 1
```

`eval` 内的代码在当前词法环境 lexical environment 中执行，因此它能访问外部（局部）变量；但严格模式下 `eval` 有属于自己的词法环境，因此不能从外部访问在 `eval` 中声明的函数和变量

```js
// 可以访问外部（局部）变量
let a = 1;

function f() {
  let a = 2;
  eval('alert(a)');   // 访问外部变量
  eval("a = 10");   // 更改外部变量
  alert(a);
}

f();
// 2
// 10

// 无法从外部进行访问
eval("let x = 5; function f() {}");
alert(typeof x); // undefined（没有这个变量）
```

很久很久以前，JavaScript 是一种非常弱的语言，很多东西只能通过 `eval` 来完成，但现代编程中已经很少使用 `eval` 了，代码字符串可能会比较长，包含换行符、函数声明和变量等。

:warning: 如果 `eval` 访问外部变量会产生副作用，由于代码压缩工具（在把 JS 投入生产环境前对其进行压缩的工具）将局部变量重命名为更短的变量，如 `a`、`b` 等，以使代码体积更小。这通常是安全的但在使用了 `eval` 的情况下就不一样了，因为局部变量可能会被 `eval` 中的代码访问到，因此压缩工具不会对所有可能会被从 `eval` 中访问的变量进行重命名，这样会导致代码压缩率降低。

有两种方法避免此类问题
* 如果 `eval` 中的代码没有使用外部（局部）变量，请以 `window.eval(...)` 的形式调用 `eval`，该代码便会在全局作用域内执行

    ```js
    let x = 1;
    {
      let x = 5;
      window.eval('alert(x)'); // 1（全局变量）
    }
    ```

* 如果 `eval` 中的代码需要访问局部变量，我们可以[使用 `new Function`](函数.md) 替代 `eval`，并将外部（局部）参数显式传递给函数

    ```js
    let f = new Function('a', 'alert(a)');
    f(5); // 5
    ```