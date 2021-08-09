---
show: true
cover: Chrome.png
collection: browser extension
collectionOrder: 4
summary: browser actions 和 page actions 可以在浏览器上添加图标，以提供用户交互。
tags:
  - browser extension
---

# actions
browser actions 和 page actions 可以在浏览器上添加图标，以提供用户交互。当用户点击浏览器右上角的插件图标时会触发 `onClicked` 事件，我们可以在 background scripts 监听该事件并作出相应的响应。

```js
// 📁 background.js
// 设置一个 browser action 的监听器，监听 onClicked 事件
chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
  // 当用户点击浏览器右上角的插件图标时会执行该函数
  // 参数 tab 是一个关于当前网页标签的信息的对象
}
```