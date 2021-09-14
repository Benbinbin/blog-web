# localStorage 和 sessionStorage
Web 存储对象 `localStorage` 和 `sessionStorage` 允许我们在浏览器中保存键/值对。在页面刷新后（对于 `sessionStorage`）甚至浏览器完全重启（对于 `localStorage`）后，数据仍然保留在浏览器中。

:bulb: 与 cookie 不同，Web 存储对象**不会**随每个请求被发送到服务器，一般用于实现临时存储数据（对于 `sessionStorage`）或实现同域不同窗口/标签页之间的数据贡献（对于 `localStorage`）。

两个存储对象的特点和限制：

- `key` 和 `value` 都必须为字符串
- 存储大小限制为 5MB+，具体取决于浏览器
- 它们不会过期（没有定时清除的设定， `sessionStorage` 在关闭标签时清除，`localStorage` 手动删除数据才清除）
- 数据绑定到源（域/端口/协议）

:bulb: `sessionStorage` 对象的使用频率比 `localStorage` 对象低得多。它与 `localStorage` 属性和方法是相同的，但是它有更多的限制。`sessionStorage` 的数据只存在于当前浏览器标签页，即具有相同域的另一个标签页中将会有不同的存储；但是它在同一标签页下的 iframe 之间是共享的（假如它们来自相同的源）。数据在页面刷新后仍然保留，但在关闭/重新打开浏览器标签页后不会被保留。

|                      `localStorage`                       |                            `sessionStorage`                             |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| 在**同源**的**所有标签页和窗口**之间共享数据 | 在当前浏览器**标签页**中可见，包括同源的 iframe            |
| 浏览器重启后数据仍然保留                               | 页面刷新后数据仍然保留（但标签页关闭后数据则不再保留） |

## 添加/修改/删除
两个存储对象都提供相同的方法和属性：

- `setItem(key, value)` 存储键/值对
- `getItem(key)` 按照键获取值
- `removeItem(key)` 删除键及其对应的值
- `clear()` 删除所有数据
- `key(index)` 获取该索引下的键名
- `length` 存储的内容的长度

```js
localStorage.setItem('test', 1);
localStorage.getItem('test');   // 1

sessionStorage.setItem('test', 1);
sessionStorage.getItem('test');   // after refresh: 1
```

遍历所有保存的键值对，可以像遍历数组那样遍历它们

```js
for(let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```
或者使用 for-in 结构遍历对象的键，但需要使用 `hasOwnProperty` 检查来过滤掉原型中的字段

```js
for(let key in localStorage) {
  if (!localStorage.hasOwnProperty(key)) {
    continue; // 跳过像 "setItem"，"getItem" 等这样的键
  }
  alert(`${key}: ${localStorage.getItem(key)}`);
}
```

:bulb: 也可以通过对象属性来访问，将键作为属性，但在这种情况下**不会触发 `storage` 事件**，因此但通常不建议这样做。

```js
// 设置 key
localStorage.test = 2;

// 获取 key
alert( localStorage.test ); // 2

// 删除 key
delete localStorage.test;
```

## Storage 事件
当 `localStorage` 或 `sessionStorage` 中的数据更新（在调用 `setItem`，`removeItem`，`clear` 方法）后，`storage` 事件就会触发

该事件具有以下属性
- `key` 发生更改的数据的 `key`（如果调用的是 `.clear()` 方法，则为 `null`）
- `oldValue` 旧值（如果是新增数据，则为 `null`）
- `newValue` 新值（如果是删除数据，则为 `null`）
- `url` 发生数据更新的文档的 url
- `storageArea` 发生数据更新的 `localStorage` 或 `sessionStorage` 对象

该事件会在所有可访问到存储对象的 window 对象上触发（导致当前数据改变的 window 对象除外），因此可以在同源的不同窗口都监听 `storage` 事件，那么每个窗口都会对另一个窗口中发生的更新作出反应，这允许**不同窗口交换消息，实现（同源）窗口的数据同步「响应式」更改**。

```js
// 在其他文档对同一存储进行更新时触发
window.onstorage = event => { // 等同于 window.addEventListener('storage', () => {
  if (event.key != 'now') return;
  alert(event.key + ':' + event.newValue + " at " + event.url);
};

localStorage.setItem('now', Date.now());
```

:bulb: 现代浏览器还支持 [Broadcast channel API](https://developer.mozilla.org/zh/docs/Web/api/Broadcast_Channel_API)，这是用于同源窗口之间通信的特殊 API，它的功能更全，但被支持的情况不好。有一些库基于 `localStorage` 来 polyfill 该 API，使其可以用在任何地方。