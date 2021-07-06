---
show: true
cover: Chrome.png
collection: browser extension
collectionOrder: 5
summary: content scripts 是在页面加载后运行的 JavaScript 文档（或 CSS 样式表），它可以操作页面的 DOM。
tags:
  - browser extension
---

# Content-Script
content scripts 是在页面加载后运行的 JavaScript 文档（或 CSS 样式表），它可以操作页面的 DOM。

需要在 `manifest.json` 中进行配置

```json
// 📁 manifest.json
{
  "manifest_version": 2,
  "name": "My Extension",
  "version": "1.0.0",
  "content_scripts": [
    {
      "js": ["content.js"]
    }
  ]
}
```

如果需要匹配特定页面 URL 才执行 content scripts 可以设置  `matches` 属性，并使用正则表达式设置匹配 URL 的规则。

```json
// 📁 manifest.json
// ...
  "content_scripts": [
    {
      "matches": [   // 匹配所有 github 网页
        "http://github.com/*",
        "https://github.com/*",
        "http://*.github.com/*",
        "https://*.github.com/*"
      ],
      "js": ["content.js"]
    }
  ]
```
