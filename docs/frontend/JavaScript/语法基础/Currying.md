# Currying
**柯里化 Currying** 是一种函数的高阶技术，被用于许多编程语言中，它是指将 `f(a,b,c)` 转换为可以被以 `f(a)(b)(c)` 的形式进行调用。

:bulb: 柯里化的核心技术是使用包装器并返回函数以保存词法环境，再最后再将参数「合并」传递给原始函数。

```js
// curry(f) 执行柯里化转换
function curry(f) {
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// 用法
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);
alert( curriedSum(1)(2) ); // 3
```

上述实例中原函数接受两个参数，因此使用了两个包装器 wrapper。函数 `curry(func)` 返回的是第一个包装器 `function(a)`，当函数像 `curriedSum(1)` 这样调用时，**它的参数会被保存在词法环境中**；然后第一个包装器调用时返回第二个包装器 `function(b)`，因此 `curriedSum(1)(2)` 这个包装器被以 `2` 为参数调用第二个包装器，最后它将所有参数传递给原始的 `sum` 函数。

JavaScript 实现柯里化通常都**保持该函数可以被正常调用**，只在参数数量不足时才进行柯里化返回偏应用函数 partially applied function/偏函数 partial。

```js
// func 是要转换的函数
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function pass(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};

// 用例
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6，仍然可以被正常调用
alert( curriedSum(1)(2,3) ); // 6，对第一个参数的柯里化
alert( curriedSum(1)(2)(3) ); // 6，全柯里化
```

柯里化函数 `curried` 基于条件有两个分支

1. 如果传入的 `args` 长度与原始函数所定义的参数（`func.length`）相同或者更长，那么直接将参数调用传递给原始函数并执行即可。
2. 如果传递的参数少于原始函数定义所需的数量，则返回一个偏函数（包装器 `pass`），而它将重新应用 `curried` 以将之前传入的参数与新的参数合并，然后在这个递归中再次判断，可能获得一个新的偏函数（如果参数不足的话）或者调用原始函数最终的结果。

结合上述实例看看代码的具体流程，对于原始函数 `sum(a, b, c)`  它声明时有三个参数，所以 `sum.length = 3`，对于调用 `curried(1)(2)(3)`：

1. 第一个调用 `curried(1)` 将 `1` 保存在词法环境中，然后返回一个包装器 `pass`。
2. 包装器 `pass` 被调用，参数为 `(2)`，它会获取之前的参数 `(1)`，将它与得到的 `(2)` 连在一起，并一起调用 `curried(1, 2)`，但由于参数数量仍小于 3，`curry` 函数依然会返回 `pass`。
3. 包装器 `pass` 再次被调用，参数为 `(3)`，在接下来的调用中 `pass(3)` 会获取之前的参数 (`1`, `2`) 并将 `3` 与之合并，执行调用 `curried(1, 2, 3)`，由于有 3 个参数，它们被传入最原始的函数中。

:bulb: 在 JavaScript 的 lodash 库中提供函数 [_.curry](https://lodash.com/docs#curry) 实现柯里化，该包装器允许函数被正常调用或者以偏函数 partial 的方式调用：

```js
function sum(a, b) {
  return a + b;
}

let curriedSum = _.curry(sum); // 使用来自 lodash 库的 _.curry

alert( curriedSum(1, 2) ); // 3，仍可正常调用
alert( curriedSum(1)(2) ); // 3，以偏函数的方式调用
```

柯里化的实际作用类似于为函数参数设置默认值，可以通过更简短的偏函数作为开端进行调用。

```js
// 用于格式化和输出信息的日志（logging）函数
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}

// 使用 loadsh 库柯里化函数
log = _.curry(log);

// 柯里化之后，log 仍正常运行
log(new Date(), "DEBUG", "some debug");

// 柯里化允许以偏函数的形式调用函数
let logNow = log(new Date());   // logNow 是带有固定第一个参数（日期为当前时间）的日志的偏函数
logNow("INFO", "message");   // [HH:mm] INFO message


let debugNow = logNow("DEBUG");   // 更进一步带有固定第一、第二个参数的日志的偏函数
debugNow("message");   // [HH:mm] DEBUG message
```

:warning: 柯里化要求函数具有固定数量的参数，使用 `rest` 参数的函数，如 `f(...args)`，不能以这种方式进行柯里化。