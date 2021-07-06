---
show: true
cover: Chrome.png
collection: browser extension
collectionOrder: 6
summary: omnibox 多功能框实际是指浏览器的地址栏，让用户在地址栏输入该关键字时并按 Tab 键触发插件的相应 actions，如提供搜索建议。
tags:
  - browser extension
---

# ominbox
omnibox 多功能框实际是指浏览器的地址栏，我们可以在 `manifest.json` 中设置 `omnibox` 属性，配置一个关键字，让用户在地址栏输入该关键字时并按 `Tab` 键触发插件的相应 actions，如提供搜索建议。

```json
// 📁 manifest.json
// ...
  "omnibox": {
    "keyword": "a2z"   // 只能设置一个关键字
  }
```

```js
// 📁 bakcground.js
// 用户要先在在地址栏输入关键字并按 Tab 键插画该软件的 omnibox

// 注册监听 onInputChanged 事件，当用户在地址栏输入匹配的内容就会显示搜索建议
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
	console.log('inputChanged: ' + text);
	if(!text) return;
	if(text == 'google') {
		suggest([
			{content: text + 'map', description: text + 'map'},
			{content: text + 'gmail', description: text + 'gmail'},
		]);
	}
	else {
		suggest([`
			{content: '必应搜索 ' + text, description: '必应搜索 ' + text},
		]);
	}
});

// 注册监听 onInputEntered 事件，当用户输入在地址栏按下 enter 时触发该 action
chrome.omnibox.onInputEntered.addListener(omniChanged);

function omniChanged(text) {
  // 当用户输入在地址栏按下 enter 时会指向该回调函数
  // 参数 text 是用户在地址栏输入的内容
  // You could open a new tab on a specific page that uses that text
  // or send a message to a content script
  // etc.
}
```