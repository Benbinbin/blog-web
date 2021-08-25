---
`show: true
cover: Chrome-manifestV3.png
collection: browser extension V3
collectionOrder: 4
summary: 浏览器扩展程序配置清单版本 3 相关介绍
tag:
  - browser extension
---



# Manifest V3

每一个扩展程序都需要有一个**配置清单 `manifest.json` 文档**，它提供了关于扩展程序的基本信息，例如所需的权限、名称、版本等。

**当前配置清单类型最新的版本是 Manifest V3，MV3**，遵循该配置清单版本的扩展程序，会更注重安全和用户的隐私保护，在性能方面也会得到提升，同时开发简易性和功能实现也会更佳。

从 [Chrome 88 版本](https://chromiumdash.appspot.com/schedule)开始支援配置清单为 Manifest V3 版本的扩展程序，Chrome 网上应用店从 2021 年 1 月开始支持分发配置清单为 Manifest V3 版本的扩展程序。

:bulb: 谷歌在 2019 年的 Chrome Dev Summit 中介绍了 Manifest V3，可以查看这个 :clapper: [视频](https://youtu.be/7-ALJiZCI6w)。



## 特点概述

MV3 有多个[新增特性](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/#feature-summary)，常用功能的变动如下：

* 使用 Service workers 替代了后台页面 background pages

  后台脚本运行在 Service workers 环境中，其工作方式是基于监听-响应的模式的，它不会常驻后台可以提升性能；但由于运行环境没有后台页面，因此**无法**使用与 DOM 相关的 API。

* **不**再支持从外部服务器（一般是 CDN）获取代码，如 JavaScript 脚本或 Wasm 文件

  扩展程序只能执行在应用内部的脚本，以提高安全性。如果扩展程序需要依赖外部数据，推荐以配置参数文件的形式进行传递。

* 很多 API 都支持 Promise

  对于异步方法现在可以使用 promise 链或 async/await 进行操作。传统以回调函数的方式处理异步方法，也依然支持（为了兼容性，但是异步方法就不会返回 promise），对于一些场景，例如事件监听，还需要设置回调函数（作为事件处理函数）。

* 统一的 Action API

  全局的图标交互控件 Browser Action 和特定页面的图标交互控件 Page Action 合并为 Action API

:bulb: 未来还会加入更多新的特性：

- [x] 内容脚本 content scripts 支持在运行时才[动态注册并植入](https://developer.chrome.com/docs/extensions/mv3/content_scripts/#programmatic)

- [ ] 提供一个新的 API [获取网页的图标 favicons](https://developer.chrome.com/docs/extensions/reference/tabs/#type-Tab)，以替代 `chrome://favicons`
- [ ] Storage API 提供一个新的 [StorageArea 类型](https://developer.chrome.com/docs/extensions/reference/storage/#type-StorageArea)，以允许将数据存储在内存中，便于 service worker 重启时快速读取



## 文档格式

每一个扩展程序都需要有一个配置清单 `manifest.json` 文档，它提供了关于扩展程序的基本信息，例如所需的权限、名称、版本等。

以下列出了 MV3 版本中常见的配置项，对于每一项的具体作用可以参考[官方文档](https://developer.chrome.com/docs/extensions/mv3/manifest/#overview)：

```json
{
  // 必须
  "manifest_version": 3, // 目前配置清单的最新版本是 3
  "name": "My Extension", // 扩展程序名称
  "version": "versionString", // 扩展程序的版本

  // 推荐
  "action": {...}, // 与 Action 交互控件相关的设置，它是浏览器工具栏上的扩展程序图标相关的一系列配置
  "default_locale": "en", // 默认语言
  "description": "A plain text description", // 扩展程序的描述
  "icons": {...}, // 扩展程序的图标

  // 可选
  "author": ...,
  "automation": ...,
  "background": {
    // Required
    "service_worker": "service-worker.js",
    // Optional
    "module"
  },
  "chrome_settings_overrides": {...},
  "chrome_url_overrides": {...},
  "commands": {...},
  "content_capabilities": ...,
  "content_scripts": [{...}],
  "content_security_policy": {...},
  "converted_from_user_script": ...,
  "current_locale": ...,
  "declarative_net_request": ...,
  "devtools_page": "devtools.html",
  "differential_fingerprint": ...,
  "event_rules": [{...}],
  "externally_connectable": {
    "matches": ["*://*.example.com/*"]
  },
  "file_browser_handlers": [...],
  "file_system_provider_capabilities": {
    "configurable": true,
    "multiple_mounts": true,
    "source": "network"
  },
  "homepage_url": "https://path/to/homepage",
  "host_permissions": [...],
  "import": [{"id": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}],
  "incognito": "spanning, split, or not_allowed",
  "input_components": ...,
  "key": "publicKey",
  "minimum_chrome_version": "versionString",
  "nacl_modules": [...],
  "natively_connectable": ...,
  "oauth2": ...,
  "offline_enabled": true,
  "omnibox": {
    "keyword": "aString"
  },
  "optional_permissions": ["tabs"],
  "options_page": "options.html",
  "options_ui": {
    "chrome_style": true,
    "page": "options.html"
  },
  "permissions": ["tabs"],
  "platforms": ...,
  "replacement_web_app": ...,
  "requirements": {...},
  "sandbox": [...],
  "short_name": "Short Name",
  "storage": {
    "managed_schema": "schema.json"
  },
  "system_indicator": ...,
  "tts_engine": {...},
  "update_url": "https://path/to/updateInfo.xml",
  "version_name": "aString",
  "web_accessible_resources": [...]
}
```



## 迁移指南

以下介绍从 MV2 [迁移](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/)到 MV3 需要注意的一些常见要点：

* 升级配置清单 `manifest.json` 文档

  * 更改版本选项 `manifest_version: 3`

  * 在 MV3 中新增了选项 `host_permissions` 以声明允许扩展程序访问哪些安全的域名

    :bulb: You do not have to declare content script match patterns in `host_permissions` in order to inject content scripts. However, they **are** treated as host permissions requests by the Chrome Web Store review process.

  * 将选项 `page_action` 和 `broser_action` 进行必要的删减，合并为统一的 `action`

* 脚本执行

  * MV3 不允许执行从外部服务器（一般是 CDN）获取的脚本文件，需要更新这部分的代码逻辑，要将依赖的模块脚本预先整合到扩展程序内，如果你需要依赖外部服务器，可以有两个解决方案：

    * 将代码逻辑拆分为配置驱动，将配置文件外置在服务器中
    * [Externalize logic with a remote service](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/#remotely-hosted-code)

  * 植入内容脚本的[方法更改为 `chrome.scripting.executeScript()`](https://developer.chrome.com/docs/extensions/reference/scripting/#method-executeScript)。类似地，植入 CSS 相关方法 `insertCSS()` 和 `removeCSS()` 也从 `chrome.tabs` API 更改为 `chrome.scripting` API

  * 在 MV3 中执行的内容脚本代码，只能是以**脚本文件**（数组）`files: ['content-script.js']` 或是**函数** `func: functionName`（执行环境上下文并不同步传递植入，需要以参数 `args` 的形式传递）的形式呈现，而不能是任意的字符串形式

    ```js
    // Manifest V3
    // background.js
    async function getCurrentTab() {/* ... */}
    let tab = await getCurrentTab();
    
    // file format
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['content-script.js']
    });
    
    // function format
    function showAlert(givenName) {
      alert(`Hello, ${givenName}`);
    }
    
    let name = 'World';
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: showAlert,
      args: [name],
    });
    ```

* 后台脚本在 [service workers](https://developers.google.com/web/fundamentals/primers/service-workers) 环境中执行

  这是 MV3 一个很明显的非兼容式改变，会影响大部分 MV2 版本的扩展程序的升级，需要对原来后台页面 background page 的代码逻辑进行重构。在迁移时，需要记住以下两点：

  * Service workers 是基于事件-响应模式实现功能的，就像之前 MV2 的 event pages，它并不会常驻在后台，只有在相应的事件触发时才重新运行。

  * Service workers 环境中无法访问 DOM，因此无法使用相关的 API

  需要先在配置清单 `manifest.json` 的选项 `background.service_work` 中声明注册需要运行的（单个）后台脚本

  ```json
  {
    // ...
    "background": {
      "service_worker": "background.js"
    },
  }
  ```

  在后台脚本的逻辑代码中，需要**在事件循环的第一轮中完成事件监听的注册**，即将事件监听程序写在后台脚本最顶层的作用域中，而不应该内嵌在其他的逻辑代码中（因为 Service Workers 执行完代码会终止而不会长期驻留，**当有事件需要分派时它才再次运行，如果未能在第一次事件轮询中注册监听器，这就无法响应事件**）。

  ```js
  // background.js
  chrome.storage.local.get(["badgeText"], ({ badgeText }) => {
    chrome.action.setBadgeText({ text: badgeText });
  });
  
  // Listener is registered on startup
  chrome.action.onClicked.addListener(handleActionClick);
  ```

  由于 Service workers 无法常驻后台，因此对于需要持久化的数据，可以使用 [Storage API](https://developer.chrome.com/docs/extensions/reference/storage/) 将其保存，待 Service workers 重启时再从数据库读取。

  ```js
  // background.js
  chrome.runtime.onMessage.addListener(({ type, name }) => {
    if (type === "set-name") {
      chrome.storage.local.set({ name });
    }
  });
  
  chrome.action.onClicked.addListener((tab) => {
    chrome.storage.local.get(["name"], ({ name }) => {
      chrome.tabs.sendMessage(tab.id, { name });
    });
  });
  ```

  由于 Service workers 无法访问 DOM 和相关的 API，所以无法使用方法 `window.setTimeout()` 和 `window.setInterval()`，因为在 Service workers 环境中没有 `window` 这个变量对象。如果后台脚本需要使用调度实现功能，可以使用 [Alarms API](https://developer.chrome.com/docs/extensions/reference/alarms/) 代替。

  ```js
  // background.js
  chrome.alarms.create({ delayInMinutes: 3 });
  
  chrome.alarms.onAlarm.addListener(() => {
    chrome.action.setIcon({
      path: getRandomIconPath(),
    });
  });
  ```

:bulb: 一些已经失效的 API 需要使用其他替代的方法来实现相应的功能

- `chrome.extension.sendRequest()`
- `chrome.extension.onRequest`
- `chrome.extension.onRequestExternal`
- `chrome.extension.lastError`
- `chrome.extension.getURL()`
- `chrome.extension.getExtensionTabs()`
- `chrome.tabs.Tab.selected`
- `chrome.tabs.sendRequest()`
- `chrome.tabs.getSelected()`
- `chrome.tabs.getAllInWindow()`
- `chrome.tabs.onSelectionChanged`
- `chrome.tabs.onActiveChanged`
- `chrome.tabs.onHighlightChanged`

还有一些未在文档中明确声明的已失效的 API

- `chrome.extension.sendMessage()`
- `chrome.extension.connect()`
- `chrome.extension.onConnect`
- `chrome.extension.onMessage`

:bulb: 在实际操作时可以使用**[迁移清单](https://developer.chrome.com/docs/extensions/mv3/mv3-migration-checklist/)**进行对照检查：

* API 检查

  * 在原来的项目中是否设置了域名访问的权限，在 MV3 的配置清单 `manifest.json` 中有一个新增的选项 `host_permissions` 专门设置域名许可

  * 在原来的项目中是否使用了后台页面 background page，在 MV3 需要将后台脚本迁移到 Service workers 中。

    * 需要先在配置清单 `manifest.json` 的选项 `background.service_work` 中声明注册需要运行的（单个）后台脚本
    * 移除原有的 `background.persistent` 选项
    * 需要重构后台脚本代码以适用 Service workers 基于事件-响应的模式
    * 无法使用相关的 API 实现后台页面与内容脚本之间的通讯，如 `chrome.runtime.getBackgroundPage()`, `chrome.extension.getBackgroundPage()`, `chrome.extension.getExtensionTabs()` 和 `chrome.extension.getViews()`，需要使用[信息传递 message passing 相关 API](https://developer.chrome.com/docs/extensions/mv3/messaging/)

  * 在原来的项目的配置清单中是否声明了 `browser_action` 或 `page_action` 交互控件，在 MV3 中它们被统一到 `action`。相应地，在后台脚本 background script 中 `chrome.browserAction` API 和 `chrome.pageAction` API 需要被替换为 `chrome.action` API

  * 在原来的项目中是否使用了 `chrome.webRequest` 进行监听或拦截网络请求，在 MV3 中替换为 [`declarativeNetRequest` API](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration#modifying-network-requests)

  * 在原来的项目中是否使用 `chrome.tabs` API 植入脚本和样式文件，在 MV3 中需要使用 `chrome.scripting` API，

    |          Manifest V2          |            Manifest V3             |
    | :---------------------------: | :--------------------------------: |
    | `chrome.tabs.executeScript()` | `chrome.scripting.executeScript()` |
    |   `chrome.tabs.insertCSS()`   |   `chrome.scripting.insertCSS()`   |
    |   `chrome.tabs.removeCSS()`   |   `chrome.scripting.removeCSS()`   |

  * 在原来的项目中是否需要运行从外部服务器获取的脚本，在 MV3 中不允许执行从外部获取的代码，需要将这些脚本预先整合到扩展程序中。

* 安全性检查

  * 在原来的项目中是否通过内容脚本 content script 进行跨域请求，由于 MV3 的内容脚本 content script 符合同源政策的限制，需要将网络请求迁移到 Service workers 后台脚本中
  * 在原来的项目中是否在配置清单中定制了 `content_security_policy`，在 MV3 中使用 `content_security_policy.extension_pages` 或  `content_security_policy.sandbox` 进行替代，移除与外部域相关的设置，如 `script-src`、`worker-src`、`object-src`、 `style-src`

