---
show: true
cover: JavaScript.png
collection: JavaScript
tags:
  - JavaScript
  - browser
---

# BOM
BOM browser object model 浏览器对象模型，是提供给开发者访问浏览器功能的一个接口。

## window
BOM 提供了多种对象，其中核心的是 `window` 对象，它即是浏览器的一个实例（JavaScript 访问浏览器窗口的一个接口），又是 ECMAScript 规定的 Global 对象/全局对象。

在函数以外使用关键字 `var` 声明的变量相当于在全局对象 `window` 上声明了属性，类似地声明的全局函数相当于在 `window` 上声明方法。

```js
var username = 'Ben';

// 上下两个代码作用等价

window.username = 'Ben';
```

`window` 对象的常用方法（调用时可以省略 `window.`）

* 警告框 `window.alert(message)` 显示消息和一个 `确认` 按钮的警告框
* 确认框 `window.confirm(message)` 显示消息和一个带有 `确定` 和 `取消` 按钮的对话框。点击 `确定` 按钮返回 `true`；点击 `取消` 按钮返回 `false`
* 输入框 `window.prompt(text, [defaultText])` 显示一个输入框，其中参数 `text` 是提示语，（可选）参数 `defaultText` 是输入框中默认填入的文本，并带有 `确认` 和 `取消` 按钮。点击 `确认` 按钮返回用户输入的文本；点击 `取消` 返回 `null`

:bulb: 弹出框文本换行需要使用字符实体 `\n`（而不是 HTML 标签 `<br/>`）

* `window.open(pageURL, name, parameters)` 打开一个新的浏览器窗口或查找一个已命名的窗口
    参数说明：
    * `pageURL` 子窗口的路径
    * `name` 子窗口的句柄（新窗口的名称，可以通过该变量对子窗口进行引用）
    * `parameters` 窗口参数，控制窗口的外形等，各参数用逗号 `,` 分隔

    ```js
    window.onload = function() {
        // 打开 newWindow.html 网页文件，其中限制宽高为 400x200，定位在浏览器的 (0,0）
        // 不需要滚动条和菜单栏
        window.open("newWindow.html", "newWindow", "width=400, height=200, left=0, top=0, toolbar=no, menubar=no, scrollbars=no, location=no, status=no");
    }
    ```

* `window.close()` 关闭当前窗口
* `window.setTimeout(callback, time)` 超时调用。在指定的毫秒数后调用函数或计算表达式。:bulb: 该方法返回一个 ID 值，作为超时调用的唯一标识符，可以通过该值使用方法 `clearTimeout(id_fo_setimeout)` 取消超时调用。
* `window.setInterval(callback, time)` 间歇调用。每隔指定的时间（以毫秒计算）周期性地执行一次代码，:bulb: 该方法返回一个 ID 值，作为超时调用的唯一标识符，可以通过该值使用方法 `clearInterval(id_fo_setinterval)` 取消超时调用。
* `window.innerWidth` 返回浏览器窗口文档显示区的宽
* `window.innerHeight` 返回浏览器窗口文档显示区的高

## location
对象 `location` 提供了与当前窗口中加载的页面有关的信息，还提供了一些导航的功能，而且它既是 `window` 对象的属性，也是 `document` 对象属性。

`location` 对象的常用属性和方法

* `location.href`（与 `window.location.href` 相同）返回当前加载页面的完整 URL
* `location.hash` 返回 URL 中的 hash（`#` 号后跟着的零个或多个字符），如果 URL 不包含则返回空字符串

    ```html
    <html>
      <head>
        <style>
          .box1{
           height: 400px;
           background: #ccc;
          }

          .box2 {
            height: 600px;
            background: #666;
          }
        </style>
      </head>

      <body>
        <div class="box1" id="top"></div>
        <div class="box2"></div>
        <input type=" button"id="btn" value="返回顶部" />

        <script>
          // 点击按钮修改 URL
          // 为 URL 添加 hash
          // 实现滚动到页面顶部（第一个 <div> 元素处）
          var btn=document.getElementById("btn");
          btn.onclick=function() {
            location.hash="#top";
          }
        </script>

      </body>
    </html>
    ```

* `location.host` 返回服务器名称和端口号（如果有）
* `location.hostname` 返回不带端口号的服务器名称
* `location.pathname` 返回 URL 中的目录和（或）文件名
* `location.port` 返回 URL 中指定的端口号，如果没有，返回空字符串
* `location.protocol` 返回页面使用的协议
* `location.search` 返回 URL 的查询字符串（以问号开头）

:bulb: 通过赋值设置上述 `location` 的一些属性可以改变 URL 从而改变浏览器的位置，会在浏览器中生成相应记录。如果不希望在浏览器中生成历史记录，可以使用方法 `location.replace(url)` 重新定向 URL

```js
location.href = 'index.html';

// 上述代码与下面代码作用相同
window.location = 'index.html';
```

* `location.reload()` 重新加载当前显示的页面，有可能从缓存中加载；如果希望从服务器中重新加载传递参数 `true`

## history
对象 `history` 保存用户在浏览器中访问页面的历史记录，该对象将用户浏览过的网页 URL 存于列表中，以实现页面前进、后退等导航功能。

`history` 对象常用的方法

* `history.back()` 回到历史记录的上一步，相当于 `history.go(-1)`
* `history.forward()` 回到历史记录的下一步，相当于 `history.go(1)`
* `history.go(n)` 回到历史记录（列表）中特定的页面，如果 `n` 是负数表示返回到第 `n` 个页面，`n` 是正数表示向前到第 `n` 个页面

## screen
对象 `screen` 包含有关客户端显示屏幕的信息。

* `screen.availWidth` 返回可用的屏幕宽度，即屏幕中除了任务栏之外的空间
* `screen.availHeight` 返回可用的屏幕高度

## navigator
对象 `navigator` 提供用户浏览器及操作系统的信息。

* `navigator.userAgent` 识别浏览器名称、版本、引擎以及操作系统等信息的内容
* `navigator.appCodeName` 返回浏览器的名称
* `navigator.appName` 返回完整的浏览器名称