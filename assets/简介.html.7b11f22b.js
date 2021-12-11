import{c as e}from"./app.43fe0c63.js";import{_ as r}from"./plugin-vue_export-helper.21dcd24c.js";var o="/blog-web/assets/20201014152723488_2060.979de35e.png",a="/blog-web/assets/20201014152822433_6278.342bbaf7.png";const t={},n=e('<h1 id="\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#\u7B80\u4ECB" aria-hidden="true">#</a> \u7B80\u4ECB</h1><p>\u4E3B\u8981\u53C2\u8003 <a href="https://github.com/sxei/chrome-plugin-demo" target="_blank" rel="noopener noreferrer">\u300AChrome\u63D2\u4EF6\u5F00\u53D1\u5168\u653B\u7565\u300B</a> \u5E76\u7FFB\u8BD1\u81EA <a href="https://shiffman.net/" target="_blank" rel="noopener noreferrer">Daniel Shiffman</a> \u7684\u6559\u7A0B <a href="https://shiffman.net/a2z/chrome-ext/" target="_blank" rel="noopener noreferrer">Chrome Extensions (and Bookmarklet)</a></p><p>Chrome \u63D2\u4EF6\u662F\u4E00\u4E2A\u4F7F\u7528\u901A\u7528\u7684 Web \u6280\u672F\u5F00\u53D1\u7684\u7528\u4EE5\u589E\u5F3A\u6D4F\u89C8\u5668\u529F\u80FD\u7684\u8F6F\u4EF6\uFF0C\u4F60\u53EF\u4EE5\u6DFB\u52A0\u4EA4\u4E92\u5143\u7D20\uFF0C\u6253\u5F00\u6216\u5173\u95ED\u9875\u9762\u6807\u7B7E\uFF0C\u4E0E\u5730\u5740\u680F\u8FDB\u884C\u4EA4\u4E92\uFF0C\u4FEE\u6539\u8BE5\u6FC0\u6D3B\u9875\u9762\u7684\u5185\u5BB9\u7B49\u3002\u5B83\u5176\u5B9E\u5C31\u662F\u4E00\u4E2A\u7531 HTML\u3001CSS\u3001JS\u3001\u56FE\u7247\u7B49\u8D44\u6E90\u7EC4\u6210\u7684\u4E00\u4E2A<code>.crx</code> \u540E\u7F00\u7684\u538B\u7F29\u5305\uFF08\u5728\u5F00\u53D1\u8005\u6A21\u5F0F\u4E0B\u6D4F\u89C8\u5668\u4E5F\u53EF\u4EE5\u8F7D\u5165\u672A\u6253\u5305\u7684\u63D2\u4EF6\uFF09\u3002</p><p>\u{1F4A1} \u5B9E\u9645\u4E0A<a href="https://developer.chrome.com/extensions/api_index" target="_blank" rel="noopener noreferrer">Chrome \u63D2\u4EF6\u4F7F\u7528\u7684\u63A5\u53E3</a>\u662F\u57FA\u4E8E <a href="https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions" target="_blank" rel="noopener noreferrer">WebExtensions APIs</a> \u4E00\u79CD\u5F00\u53D1\u6269\u5C55\u7684<a href="https://hacks.mozilla.org/2017/06/cross-browser-extensions-available-now-in-firefox/" target="_blank" rel="noopener noreferrer">\u8DE8\u6D4F\u89C8\u5668</a>\u7CFB\u7EDF\uFF0C\u8BE5\u7CFB\u7EDF\u4E0EOpera \u548C W3C \u8349\u6848\u793E\u533A\u7EC4\u7EC7\u6240\u652F\u6301\u7684\u6269\u5C55 API \u5728\u5F88\u5927\u7A0B\u5EA6\u4E0A\u517C\u5BB9\uFF0C\u56E0\u6B64\u5927\u591A\u6570\u60C5\u51B5\u4E0B\u4E3A\u8FD9\u4E9B\u6D4F\u89C8\u5668\u7F16\u5199\u7684\u6269\u5C55\u53EA\u9700\u5C11\u8BB8\u4FEE\u6539\u5373\u53EF\u5728 Firefox \u6216 Microsoft Edge \u4E2D\u8FD0\u884C\u3002\u800C\u4E14\u8FD8\u53EF\u4EE5\u8FD0\u884C\u5728\u6240\u6709 webkit \u5185\u6838\u7684\u56FD\u4EA7\u6D4F\u89C8\u5668\uFF0C\u6BD4\u5982360\u6781\u901F\u6D4F\u89C8\u5668\u3001360\u5B89\u5168\u6D4F\u89C8\u5668\u3001\u641C\u72D7\u6D4F\u89C8\u5668\u3001QQ\u6D4F\u89C8\u5668\u7B49\u3002</p><h2 id="\u5B89\u88C5\u63D2\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5\u63D2\u4EF6" aria-hidden="true">#</a> \u5B89\u88C5\u63D2\u4EF6</h2><ol><li>\u6253\u5F00 Chrome \u6D4F\u89C8\u5668\uFF08\u6216\u8FD0\u884C\u5728\u6240\u6709 webkit \u5185\u6838\u7684\u56FD\u4EA7\u6D4F\u89C8\u5668\uFF09\uFF0C\u5207\u6362\u5230\u63D2\u4EF6\u7BA1\u7406\u9875\u9762\uFF0C\u53EF\u4EE5\u76F4\u63A5\u5728 Chrome \u6D4F\u89C8\u5668\u7684\u5730\u5740\u680F\u8F93\u5165 <code>chrome://extensions</code></li></ol><p><img src="'+o+'" alt="\u6269\u5C55\u7A0B\u5E8F"></p><ol start="2"><li>\u6FC0\u6D3B\u9875\u9762\u53F3\u4E0A\u89D2\u7684 <strong>\u5F00\u53D1\u8005\u6A21\u5F0F</strong></li></ol><p><img src="'+a+'" alt="\u6253\u5F00\u5F00\u53D1\u8005\u6A21\u5F0F"></p><ol start="3"><li>\u70B9\u51FB <strong>\u52A0\u8F7D\u5DF2\u89E3\u538B\u7684\u6269\u5C55\u7A0B\u5E8F</strong>\uFF0C\u5E76\u9009\u62E9\u9879\u76EE\u6240\u5728\u7684\u6587\u4EF6\u5939\u4EE5\u5B89\u88C5\u63D2\u4EF6\u3002\u5BF9\u4E8E\u5DF2\u53D1\u5E03\u7684 Chrome \u63D2\u4EF6\u53EF\u4EE5\u5728 <a href="https://chrome.google.com/webstore/category/extensions" target="_blank" rel="noopener noreferrer">Chrome \u7F51\u4E0A\u5E94\u7528\u5E97</a> \u641C\u7D22\u5E76\u5B89\u88C5</li></ol><h2 id="\u57FA\u672C\u6982\u5FF5" tabindex="-1"><a class="header-anchor" href="#\u57FA\u672C\u6982\u5FF5" aria-hidden="true">#</a> \u57FA\u672C\u6982\u5FF5</h2><ul><li><code>manifest.json</code> \u6240\u6709 Chrome Extensions \u90FD\u9700\u8981\u6709\u4E00\u4E2A <code>manifest.json</code> \u6587\u4EF6\uFF0C\u8BE5\u6587\u4EF6\u5305\u542B\u4E86\u63D2\u4EF6\u7684\u5143\u4FE1\u606F metadata\uFF0C\u8FDB\u884C\u76F8\u5173\u914D\u7F6E\u8BBE\u7F6E\u3001\u6240\u9700\u6743\u9650\u3001\u4F7F\u7528\u7684\u8D44\u6E90\u7B49\u3002</li><li>Content Scripts \u4E00\u4E9B JavaScript \u6587\u6863\uFF08\u4E5F\u53EF\u4EE5\u662F CSS \u6587\u6863\uFF09\uFF0C\u8FD9\u4E9B\u6587\u6863\u91CC\u7684\u4EE3\u7801\u4F1A\u5728\u9875\u9762\u52A0\u8F7D\u5B8C\u6210\u540E\u518D\u6267\u884C\uFF0C\u53EF\u4EE5\u64CD\u4F5C\u5F53\u524D\u7F51\u9875\u9875\u9762\u7684 DOM\u3002<strong>\u8FD9\u4E9B\u6587\u6863\u9700\u8981\u5728 <code>manifest.json</code> \u8FDB\u884C\u5F15\u7528</strong>\u3002</li><li>Background \u8FD0\u884C\u5728\u6D4F\u89C8\u5668\u540E\u53F0\u7684\u4E00\u4E9B JavaScript \u6587\u6863\uFF0C\u4ED6\u7684\u751F\u547D\u5468\u671F\u968F\u7740\u6D4F\u89C8\u5668\u7684\u6253\u5F00\u800C\u6253\u5F00\uFF0C\u968F\u7740\u6D4F\u89C8\u5668\u7684\u5173\u95ED\u800C\u5173\u95ED\u3002\u8FD9\u4E9B\u6587\u6863\u7684\u6743\u9650\u975E\u5E38\u9AD8\uFF0C\u51E0\u4E4E\u53EF\u4EE5\u8C03\u7528\u6240\u6709\u7684 Chrome \u6269\u5C55 API\uFF08\u9664\u4E86 devtools\uFF09\u3002\u8FD9\u4E9B\u6587\u6863\u9700\u8981\u5728 <code>manifest.json</code> \u8FDB\u884C\u5F15\u7528\u3002</li><li>browser actions \u548C page actions \u63D2\u4EF6\u7684\u7528\u6237\u4EA4\u4E92\u5143\u7D20\uFF0C\u4EE5\u56FE\u6807\u7684\u5F62\u5F0F\u6DFB\u52A0\u5728\u6D4F\u89C8\u5668\u4E0A\u3002\u5176\u4E2D browser action \u4F1A\u5728\u6D4F\u89C8\u5668\u7684\u53F3\u4E0A\u89D2\u521B\u5EFA\u4E00\u4E2A\u6309\u94AE\uFF0C\u53EF\u4EE5\u5728 <code>manifest.json</code> \u4E2D\u6307\u5B9A\u6309\u94AE\u7684\u56FE\u6807\u3001\u9F20\u6807\u60AC\u505C\u5728\u56FE\u6807\u65F6\u663E\u793A\u7684\u6587\u5B57\u63D0\u793A\u3001\u70B9\u51FB\u56FE\u6807\u65F6\u5F39\u51FA\u7684\u9875\u9762\u7B49\uFF1B\u800C page action \u4F1A\u5728\u5730\u5740\u680F\uFF08\u4E0E\u5F53\u524D\u9875\u9762\u76F8\u5173\uFF09\u521B\u5EFA\u4E00\u4E2A\u6309\u94AE\uFF08\u65B0\u7248\u7684 Chrome \u66F4\u6539\u4E86\u8FD9\u4E00\u7B56\u7565\uFF0Cpage action \u548C browser action \u521B\u5EFA\u7684\u56FE\u6807\u4E00\u6837\u4E5F\u662F\u653E\u5728\u6D4F\u89C8\u5668\u53F3\u4E0A\u89D2\uFF0C\u53EA\u4E0D\u8FC7\u6CA1\u6709\u5207\u6362\u5230\u6307\u5B9A\u9875\u9762\u65F6\u662F\u7070\u8272\u7684\uFF0C\u6FC0\u6D3B\u624D\u70B9\u4EAE\u4E3A\u5F69\u8272\uFF09\u3002</li><li>popup \u662F\u901A\u8FC7 browser action \u89E6\u53D1\u7684\u4E00\u4E2A\u5F39\u51FA\u6846\uFF08HTML \u9875\u9762\uFF09\uFF0C\u8BE5\u9875\u9762\u53EF\u4EE5\u5F15\u7528\u5176\u4ED6 scripts\uFF0C\u26A0\uFE0F \u7279\u522B\u6CE8\u610F\u7684\u662F\u7531\u4E8E\u5355\u51FB\u56FE\u6807\u6253\u5F00 popup\uFF0C\u7126\u70B9\u79BB\u5F00\u53C8\u7ACB\u5373\u5173\u95ED\uFF0C\u6240\u4EE5 popup \u9875\u9762\u7684\u751F\u547D\u5468\u671F\u4E00\u822C\u5F88\u77ED\u3002</li><li>\u4E0D\u540C\u7684 JavaScript \u6587\u6863\uFF08\u4E00\u822C\u6307 content scripts\u3001background \u8FD0\u884C\u7684 scripts\u3001popup \u9875\u9762\u6240\u5F15\u7528\u7684 scripts\uFF09\u662F\u5728\u4E0D\u540C\u7684\u4F5C\u7528\u57DF\u4E2D\uFF0C\u5B83\u4EEC\u4E4B\u95F4\u901A\u8FC7 Chrome \u63D0\u4F9B\u7684 <a href="https://developer.chrome.com/extensions/api_index" target="_blank" rel="noopener noreferrer">API</a> \u8FDB\u884C\u4E8B\u4EF6\u89E6\u53D1\u548C\u76D1\u542C\u4EE5\u5B9E\u73B0\u6570\u636E\u4F20\u9012\u548C\u6D88\u606F\u901A\u4FE1\u3002</li></ul><h2 id="\u76F8\u5173\u6559\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u76F8\u5173\u6559\u7A0B" aria-hidden="true">#</a> \u76F8\u5173\u6559\u7A0B</h2><ul><li><a href="https://shiffman.net/a2z/chrome-ext/" target="_blank" rel="noopener noreferrer">Chrome Extensions (and Bookmarklet)</a> | Programming from A to Z</li><li><a href="https://github.com/sxei/chrome-plugin-demo" target="_blank" rel="noopener noreferrer">\u300AChrome\u63D2\u4EF6\u5F00\u53D1\u5168\u653B\u7565\u300B</a></li><li><a href="https://www.youtube.com/playlist?list=PLC3y8-rFHvwg2-q6Kvw3Tl_4xhxtIaNlY" target="_blank" rel="noopener noreferrer">Chrome Extension Tutorial</a></li></ul>',14);function i(s,l){return n}var p=r(t,[["render",i]]);export{p as default};
