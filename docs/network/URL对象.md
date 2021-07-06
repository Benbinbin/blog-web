---
show: true
collection: network
tags:
  - network
---

# URL对象
JavaScript 内建的 [URL](https://url.spec.whatwg.org/#api) 类提供了用于创建和解析 URL 的便捷接口。虽然一般 url 字符串就足够了，但有些时候 `URL` 对象真的很有用，几乎可以在任何需要 URL 字符串的地方都能使用 `URL` 对象（作为替代方案），如在方法 `fetch` 或 `XMLHttpRequest` 中使用 `URL` 对象

URL 对象使用 `URL` 构造器创建

```js
new URL(url, [base])
```

参数说明
- **`url`** 完整的 URL，或者仅路径（如果设置了 base）
- **`base`** （可选）如果设置了此参数，且第一个参数 `url` 只有路径，则会根据这个 `base` 生成完整的 URL，该参数允许基于现有 URL 的路径轻松创建一个新的 URL

```js
// 创建两个完全相同的 URL 对象
let url1 = new URL('https://javascript.info/profile/admin');
let url2 = new URL('/profile/admin', 'https://javascript.info');

alert(url1); // https://javascript.info/profile/admin
alert(url2); // https://javascript.info/profile/admin

// 基于已有的 URL 创建新的 URL
let url = new URL('https://javascript.info/profile/admin');
let newUrl = new URL('tester', url);

alert(newUrl); // https://javascript.info/profile/tester
```

`URL` 对象提供多种属性解析 url 以允许我们访问其中不同组件。

![URL 组件](./images/20200513120835614_21868.png)

- 属性 `href` 是完整的 URL，与 `url.toString()` 相同
- 属性 `protocol` 以冒号字符 `:` 结尾
- 属性 `search` 以问号 `?` 开头的一串参数
- `hash` 以哈希字符 `#` 开头
- 属性 `user` 和 `password`  如果存在 HTTP 身份验证，则 url 会有这两个值，如 `http://login:password@site.com`（示意图上没有，很少使用）

```js
let url = new URL('https://javascript.info/url');

alert(url.protocol); // https:
alert(url.host);     // javascript.info
alert(url.pathname); // /url
```

## SearchParams
想要创建一个具有给定搜索参数的 url，如果参数中包含空格，非拉丁字母等，参数就需要被编码。使用 URL 对象属性 `url.searchParams` 提供的方法可以更方便地对搜索参数进行操作，它是 [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) 类型的对象，它是可迭代的，类似于 `Map`，可用循环解构遍历该对象元素以获取所有搜索参数。

它为搜索参数提供了简便的方法：

- **`append(name, value)`** 按照 `name=value` 添加参数
- **`delete(name)`** 移除 `name` 参数
- **`get(name)`** 获取 `name` 参数的值
- **`getAll(name)`** 获取具有相同 `name` 的所有参数的值（如 `?user=John&user=Pete`）
- **`has(name)`** 按照 `name` 检查参数是否存在
- **`set(name, value)`** 类似 append 方法，但 set/replace 会删除其他已有的同名参数
- **`sort()`** 按 name 对参数进行排序，很少使用



```js
let url = new URL('https://google.com/search');

url.searchParams.set('q', 'test me!'); // 添加带有一个空格和一个 ! 的参数

alert(url); // https://google.com/search?q=test+me%21，set 方法自动编码

url.searchParams.set('tbs', 'qdr:y'); // 添加带有一个冒号 : 的参数

// 参数会被自动编码
alert(url); // https://google.com/search?q=test+me%21&tbs=qdr%3Ay

// 遍历搜索参数（被解码）
for(let [name, value] of url.searchParams) {
  alert(`${name}=${value}`); // q=test me!，然后是 tbs=qdr:y
}
```

## 编码
[RFC3986](https://tools.ietf.org/html/rfc3986) 标准定义了 URL 中允许哪些字符，不允许哪些字符。那些不被允许的字符必须被编码，如非拉丁字母和空格，用其 UTF-8 代码代替，前缀为 `%`，如空格用实体 entities `%20` 表示（由于历史原因，空格可以用 `+` 编码，但这是一个例外）。

`URL` 对象会自动对这些字符进行编码，我们仅需提供未编码的参数即可

```js
// 在此示例中使用一些西里尔字符

let url = new URL('https://ru.wikipedia.org/wiki/Тест');

url.searchParams.set('key', 'ъ');
alert(url); //https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A
// url 路径中的 Тест 和 ъ 参数都被编码了
// 每个西里尔字母用 UTF-8 编码的两个字节表示，即两个 %.. 实体
```

；而如果使用字符串作为 URL，则需要手动编码/解码特殊字符。用于（手动）编码/解码 URL 的内建函数：

- [encodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) 编码整个 URL，仅处理 URL 中完全禁止的字符。
- [decodeURI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI) 解码为编码前的状态。
- [encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) 编码 URL 组件，除了处理 URL 完全禁止的字符以外，还编码 URL 组件中特殊的字符，包括 `#`，`$`，`&`，`+`，`,`，`/`，`:`，`;`，`=`，`?` 和 `@` 字符，以免破坏 URL 的格式（由于这些字符在 URL 组件中有特殊的作用）。
- [decodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent) 解码为编码前的状态。

```js
// 对于一个 URL 整体使用 encodeURI 编码
// 在 url 路径中使用西里尔字符
let url = encodeURI('http://site.com/привет');

alert(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82

// 对于 URL 参数，应该使用 encodeURIComponent 编码
let music = encodeURIComponent('Rock&Roll');

let url = `https://google.com/search?q=${music}`;
alert(url); // https://google.com/search?q=Rock%26Roll

/**
* 与 encodeURI 进行比较（不正确）
* let music = encodeURI('Rock&Roll');
* let url = `https://google.com/search?q=${music}`;
* alert(url); // https://google.com/search?q=Rock&Roll，没有对 & 进行编码，因为它对于整个 URL 来说是合法的字符
**/
```
