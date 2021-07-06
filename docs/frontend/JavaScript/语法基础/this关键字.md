# this关键字
参考：
* [深入理解 JavaScript 中的 this 关键字](https://www.cnblogs.com/rainman/archive/2009/05/03/1448392.html)
* [你不懂JS: this 与对象原型](https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/this%20&%20object%20prototypes/ch2.md)
* [方法中的 “this”](https://zh.javascript.info/object-methods#fang-fa-zhong-de-this)

在对象方法/函数中需要访问对象中存储的信息才能完成其工作，为了访问该对象一般在方法中可以使用 `this` 关键字，用以表示调用函数/方法的**对象**（即函数作为一个对象的方法被调用，则关键字 `this` 表示该对象）。

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
    // "this" 指的是“当前的对象”
    alert(this.name);
  }

};

// 当方法被调用时，函数 sayHi() 内的关键字 this 指代调用该方法的对象，即变量 user 所引用的对象
user.sayHi(); // John
```

关键字 `this` 是一个动态值，`this` 的值是在代码运行时计算出来的，即它的值并不取决于方法声明的位置，而取决于一个函数如何被调用（与代码的上下文有关）。一般 `this` 与对象实例进行绑定（点符号 `.` 或中括号 `[]` 前方的对象实例），通过「自引用」的方式将当前目标**对象本身**传递进入该方法内，以在内部访问该对象其他的方法和属性值，实现更多的数据和功能交互。

```js
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

// 在两个对象中使用相同的函数
user.f = sayHi;
admin.f = sayHi;

// 这两个调用有不同的 this 值
// 函数内部的 "this" 是「点符号前面」的那个对象
user.f(); // John（this == user）
admin.f(); // Admin（this == admin）

admin['f'](); // Admin（使用点符号或方括号语法来访问这个方法，都没有关系。）
```

:bulb: 在运行时对 this 求值的这个概念既有优点也有缺点，一方面函数可以被重用于不同的对象；另一方面，更大的灵活性造成了更大的出错的可能。

|                            调用形式                             |                             `this` 指向                              |
| :-----------------------------------------------------------------: | :-----------------------------------------------------------------------: |
|                            普通函数                             | 全局对象 `window`   或（在严格模式下）`undefined` |
|                           对象的方法                           |                                 该对象                                 |
| 构造函数（一般使用伪类模式，即 `new` 关键字） |                            新构造的对象                             |
|                          `call` 方法                          |                      第一个参数指定的对象                       |

:bulb: 在 JavaScript 中函数也属于对象数据类型，因此在一般的函数声明中也可以使用 `this` 关键字，但通常这种调用是程序出错了，如果在一个函数内部有 `this`，通常意味着它是在对象上下文环境中被特定对象调用的。:warning: 在严格模式下普通函数中的 `this` 值为 `undefined`（在非严格模式的情况下，`this` 指代的是全局对象 `window`）；~~若使用关键字 `new` 就可以创建新的函数（对象），此时参数 `this` 指向的是该新对象。~~

:bulb: 当函数作为全局可用的普通函数时（不需要通过点符号调用，可直接通过函数名调用该方法），则该函数被调用时其中关键字 `this` 指代的是全局对象 `<global>`，即 **`this` 指向 window 对象**。

:warning: 对象方法的[内置属性 `function.call(parameters)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call) 可重写该方法的访问规则（即修改 `this` 默认绑定的对象），方法 `.call()` 可接受额外的参数，传递的第一个实参会绑定到 `this` 关键字。

## 箭头函数的 this
一般函数中关键字 `this` 指代的对象取决于函数（或方法）被调用的方式，但箭头函数没有自己的 `this` 而是从周围上下文继承的，即在箭头函数内使用 `this` 指代的对象与外部「正常」函数环境中的 `this` 指代的对象相同

```js
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    // 箭头函数 arrow() 使用的 this 来自于外部的 user.sayHi() 方法
    arrow();
  }
};

user.sayHi(); // Ilya
```

:bulb: 当我们并不想要一个独立的 `this` 而想从外部上下文中获取时，箭头函数很有用

## 使用闭包
由于函数作用域的存在，限制了函数中使用 `this` 所指代的对象。可以使用**闭包**，将 `this` 指代的特定对象先赋给一个（全局）变量，以「跨越」局部作用域，在不同的函数中都可以使用特定的所指对象。

```js
// 构造函数
function IceCream() {
  this.scoops = 0;
}

// 为 IceCream 添加 addScoop 方法
IceCream.prototype.addScoop = function() {
  // 在函数 setTimeout() 中关键字 this 绑定到全局对象
  setTimeout(function() {
    this.scoops++; // this 的值是全局对象，不是 dessert 对象
    // 相当于创建新的 scoops 变量（默认值为 undefined），递增（undefined + 1 结果为 NaN）
  }, 500);
};

const dessert = new IceCream();
dessert.addScoop(); // NaN
```

:bulb: 内置函数 `setTimeout()` 中的 `this` 绑定到全局对象。

改进

```js
// 构造函数
function IceCream() {
  this.scoops = 0;
}

// 为 IceCream 添加 addScoop 方法
IceCream.prototype.addScoop = function() {
  const cone = this;   // 将 this 复制到局部变量 cone
  setTimeout(function() {
    cone.scoops++;   // 引用 cone 变量
    console.log('scoop added!');
  }, 0.5);
};

const dessert = new IceCream();
dessert.addScoop();   // 1
```