# JavaScript 概述
Bredan Eich 在 1995 年创造 JavaScript 是为了交互式及动态元素更容易被添加到网页上。早期叫 LiveScript 后来改为 JavaScript 以借助 Java 营销，最终纳入了 Ecma 国际组织也称为 EcmaScript，根据版本号或基于推出的年份命名为 ES6 或 ES2017 等。

JavaScript 编程语言称之为脚本，因为它们可以写在 HTML 中，事先不需要特殊的准备，即可在页面加载的时候自动运行（由于浏览器中内嵌了 JavaScript 引擎可以对脚本进行解析和编译），这方面 JavaScript 和 Java 有很大的区别。

JavaScript 最开始是为浏览器设计的一门语言，但是现在也被用于很多其他的环境，如可以在服务端（后端）执行，甚至还能在任意搭载了 JavaScript 引擎的设备中都可以执行。

## JavaScript 作用
JavaScript 的能力很大程度上依赖于它执行的环境。如 Node.js 环境允许 JavaScript 读写任意文件、执行网络请求等，浏览器中的 JavaScript 可以做与网页操作、用户交互和 Web 服务器相关的所有事情。

## JavaScript 兼容性
JavaScript 还是一门还在发展中的语言，经常会添加一些新的功能到[草案列表](https://tc39.github.io/ecma262/)中，然后被加到[规范](http://www.ecma-international.org/publications/standards/Ecma-262.htm)中。

JavaScript 引擎背后的团队可能会决定执行草案中的建议，并推迟已经在规范中的内容，因为它们不太有趣或者难以实现。因此一个 JavaScript 引擎只能实现标准中的一部分是很常见的情况。

需要获得一些关于浏览器及其引擎的兼容性信息可查看：
* [Caniuse](http://caniuse.com) 每个功能都列有一个支持信息表格，如查看哪个引擎支持 [cryptography 现代加密函数](http://caniuse.com/#feat=cryptography)
* [ECMAScript 6 compatibility table](https://kangax.github.io/compat-table) 一份列有语言功能以及引擎是否支持这些功能的表格。

## Polyfill
polyfill 或 polyfiller 一词由 Remy Sharp [发明](https://remysharp.com/2010/10/08/what-is-a-polyfill)，是指一段代码（或插件），用于弥补目前浏览器缺少/尚未支持的功能，在不支持某种功能的浏览器上实现该项功能的代码。

```js
// 为尚未内置支持 startsWith() 方法的浏览器添加该方法
// 将添加的代码放置在条件语句中，先判断浏览器是否具有原生 startsWith 方法（即是否支持 ES6）
// 若浏览器已内置该方法就不必覆盖原生实现；如果不存在此方法，则此 polyfill 将运行添加弥补该方法
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}
```

:bulb: 更新/添加新函数的脚本称为 "polyfill" 它「填补」了缺口，并添加了缺少的实现。

polyfill 不仅仅用来填补缺失的 JavaScript 功能，还有实现浏览器其他功能的 [polyfill](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills)，如 SVG、Canvas、网络存储（本地存储/会话存储）等。

一般使用 [Babel](https://babeljs.io/) 来实现引擎无法支持的一些现代特性，它有两个部分，一是通过「转译」现代 JavaScript 代码为旧标准使浏览器引擎识别，二是同时提供（引擎可识别的）脚本以实现新标准中添加的功能。

Babel 是一个 transpiler 程序，它将现代的 JavaScript 代码转化为以前的标准形式。开发者在自己的电脑上运行它，它以之前的语言标准对代码进行重写，然后将代码传到面向用户的网站（像 [webpack](http://webpack.github.io/) 这样的现代项目构建系统，提供了在每次代码改变时自动运行 transpiler 的方法，因此很容易集成在开发过程中）。

Babel 提供了很多 plyfills，如 [core js](https://github.com/zloirock/core-js)（支持很多，允许只包含需要的功能）和 [polyfill.io](http://polyfill.io/)（根据功能和用户的浏览器，为脚本提供 polyfill 的服务）。