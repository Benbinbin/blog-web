import{c as e}from"./app.43fe0c63.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";var n="/blog-web/assets/20190911102330731_30524.97d32403.png",a="/blog-web/assets/20190814151837320_20351.eb3bd309.png",r="/blog-web/assets/20190815084110315_18707.5d7eee23.png",t="/blog-web/assets/20190815084132340_22174.c65c3b67.png";const o={},l=e('<h1 id="css\u6982\u8FF0" tabindex="-1"><a class="header-anchor" href="#css\u6982\u8FF0" aria-hidden="true">#</a> CSS\u6982\u8FF0</h1><p>\u53C2\u8003\uFF1A</p><ul><li>W3C <a href="https://www.w3schools.com/css/" target="_blank" rel="noopener noreferrer">CSS \u6559\u7A0B</a></li><li>Mozilla \u5F00\u53D1\u8005\u793E\u533A <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference" target="_blank" rel="noopener noreferrer">CSS \u53C2\u8003</a></li><li><a href="https://css-tricks.com/almanac/" target="_blank" rel="noopener noreferrer">CSS Almanac</a></li><li><a href="https://css-tricks.com/how-css-selectors-work/" target="_blank" rel="noopener noreferrer">\u5165\u95E8\u6982\u5FF5\uFF1ACSS \u9009\u62E9\u5668\u662F\u5982\u4F55\u5DE5\u4F5C\u7684</a>\uFF08<a href="https://zhuanlan.zhihu.com/p/25739988" target="_blank" rel="noopener noreferrer">\u4E2D\u8BD1\u7248</a>\uFF09</li></ul><p>HTML \u4E0D\u540C\u5143\u7D20\u6709\u5176\u4E0D\u540C<strong>\u9ED8\u8BA4\u6837\u5F0F <code>User-Agent Styles</code></strong>\uFF0C\u901A\u5E38\u5305\u542B\u9ED8\u8BA4\uFF08\u76D2\u6A21\u578B\uFF09\u5927\u5C0F\u3001\u80CC\u666F\u989C\u8272\u7B49\uFF0C\u5982 <code>header</code> \u5143\u7D20\u7684\u5B57\u4F53\u9ED8\u8BA4\u4E3A\u7C97\u4F53\u5927\u53F7\uFF0C\u4EE5\u53CA\u4E0A\u4E0B\u5916\u8FB9\u8DDD\u800C\u6CA1\u6709\u5185\u8FB9\u8DDD\u3002\u6D4F\u89C8\u5668\u91C7\u7528\u9ED8\u8BA4\u6837\u5F0F\u8868\u6765\u786E\u5B9A\u5982\u4F55\u663E\u793A HTML \u5143\u7D20\uFF0C\u4E0D\u540C\u6D4F\u89C8\u5668\u7684\u9ED8\u8BA4\u5F0F\u6837\u89C4\u5219\u53EF\u80FD\u4E0D\u540C\uFF0C\u53EF\u67E5\u770B\u4EE5\u4E0B\u8D44\u6599\uFF1A</p><ul><li><a href="http://trac.webkit.org/browser/trunk/Source/WebCore/css/html.css" target="_blank" rel="noopener noreferrer">WebKit (Chrome \u53CA Safari)</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference" target="_blank" rel="noopener noreferrer">Firefox</a></li><li><a href="http://www.iecss.com/" target="_blank" rel="noopener noreferrer">Internet Explorer</a></li></ul><p><img src="'+n+`" alt="\u5143\u7D20\u9ED8\u8BA4\u6837\u5F0F"></p><p>CSS\uFF08Cascading Style Sheets\uFF09<strong>\u5C42\u53E0\u6837\u5F0F\u8868</strong>\u662F\u7528\u6765\u63CF\u8FF0\u7F51\u7AD9\u4E0A\u5404\u79CD\u5143\u7D20\u7684\u5916\u89C2\uFF0C\u5B9A\u5236\u5404\u79CD\u5143\u7D20\u7684\u6837\u5F0F\u3002CSS \u662F\u4E00\u79CD\u6807\u8BB0\u8BED\u8A00\uFF0C\u7528\u6765\u8868\u73B0 HTML \u6587\u4EF6\u6837\u5F0F\u7684\u8BA1\u7B97\u673A\u8BED\u8A00\uFF0C\u53EF\u4EE5\u5C06\u6837\u5F0F\u8BBE\u7F6E\u653E\u5728\u5355\u72EC\u7684<strong>\u6837\u5F0F\u8868</strong>\u4E2D\uFF0C\u4EC5\u4EC5\u7F16\u8F91\u4E00\u4E2A\u7B80\u5355\u7684 CSS \u6587\u6863\uFF0C\u521B\u5EFA\u4E00\u4E9B\u89C4\u5219\u5B9A\u5236\u5143\u7D20\u4E2D\u7684\u5185\u5BB9\uFF0C\u5C31\u53EF\u540C\u65F6\u6539\u53D8\u7AD9\u70B9\u4E2D\u6240\u6709\u9875\u9762\u7684\u5E03\u5C40\u548C\u5916\u89C2\u3002</p><ul><li><strong>\u5C42\u53E0 cascading</strong>\uFF1A\u8868\u793A\u89C4\u5219\u4E0D\u4EC5\u9002\u7528\u4E8E\u5176\u76F4\u63A5\u5339\u914D\u7684\u5143\u7D20\uFF0C\u4E5F\u9002\u7528\u4E8E\u8FD9\u4E9B\u5143\u7D20\u7684<strong>\u6240\u6709\u5B50\u5143\u7D20</strong>\uFF0C \u82E5\u4E00\u4E2A\u5B50\u5143\u7D20\u6709\u591A\u4E2A\u91CD\u53E0\u7684\u89C4\u5219\uFF0C\u5219\u6700\u540E\u8BBE\u7F6E\u7684\u5177\u4F53\u89C4\u5219\u624D\u4F1A\u751F\u6548\uFF08\u5373\u6309\u7167\u5C31\u8FD1\u539F\u5219\uFF09</li><li><strong>\u6837\u5F0F\u8868 style sheet</strong>\uFF1A\u53EF\u4EE5\u5C06 CSS \u7406\u89E3\u4E3A\u662F\u4E00\u79CD\u67E5\u627E\u66FF\u6362\u5DE5\u5177\uFF08\u6216\u7528 CSS \u672F\u8BED\u6240\u8BF4\u7684<strong>\u5339\u914D</strong>\uFF09\uFF0C\u901A\u8FC7\u8BE5\u8868\u5339\u914D\u5143\u7D20\u7684\u4E00\u4E2A\u7C7B\u6216\u4E00\u4E2A\u6807\u7B7E\uFF0C\u8BBE\u7F6E\u5C5E\u6027\u503C\u3002</li></ul><p>\u26A0\uFE0F \u6837\u5F0F\u5B9A\u4E49\u89C4\u5219\u65F6\u5176<strong>\u4F4D\u7F6E</strong>\u548C\u5E94\u7528\u7684<strong>\u987A\u5E8F</strong>\u5F88\u91CD\u8981\u3002\u53EF\u4EE5\u5728\u4E0D\u540C\u5730\u65B9\u5B9A\u4E49\u6837\u5F0F\uFF08\u4E0B\u5217\u987A\u5E8F\u4E2D\u7684\u4E0B\u4E00\u6761\u5B9A\u4E49\u4F1A\u8986\u76D6\u5176\u4E0A\u4E00\u6761\u5B9A\u4E49\uFF09</p><ul><li><strong>\u6D4F\u89C8\u5668\u7684\u9ED8\u8BA4\u6837\u5F0F</strong>\uFF1A\u4E0D\u540C\u6D4F\u89C8\u5668\u6837\u5F0F\u7A0D\u6709\u4E0D\u540C</li><li><strong>\u5355\u72EC\u6587\u4EF6\u4E2D\u7684\u6837\u5F0F\u8868](D:/Front_end/CSS/\u6837\u5F0F\u8868.md)</strong>\uFF1A\u901A\u8FC7\u6837\u5F0F\u8868\u5C06\u5185\u5BB9\u4E0E\u6837\u5F0F\u8BBE\u7F6E\u5206\u5F00\uFF0C\u5185\u5BB9\u4F7F\u7528 HTML \u8BED\u8A00\u7F16\u5199\uFF0C\u6837\u5F0F\u4F7F\u7528 CSS \u7F16\u5199</li><li><strong>HTML \u4E2D\u7684\u6837\u5F0F\u8868</strong>\uFF1A\u5728 HTML \u6587\u4EF6\u4E2D\u7684 <code>&lt;head&gt;</code> \u6807\u7B7E\u5185\u7684 <code>&lt;style&gt;</code> \u6807\u7B7E\u4E2D\u8BBE\u7F6E\uFF0C\u5728\u5C0F\u578B\u5B9E\u6218\u9879\u76EE\u4E2D\u53EF\u4EE5\u8FD9\u4E48\u505A\uFF0C\u4F46\u662F\u4E0D\u7406\u60F3</li><li><strong>\u4E00\u4E2A\u5143\u7D20\u4E2D\u7684\u5185\u8054\u6837\u5F0F\u8868</strong>\uFF1A\u867D\u7136\u4E5F\u53EF\u4EE5\u505A\uFF0C\u4F46\u5E94\u8BE5\u907F\u514D</li></ul><h2 id="\u6CE8\u91CA" tabindex="-1"><a class="header-anchor" href="#\u6CE8\u91CA" aria-hidden="true">#</a> \u6CE8\u91CA</h2><p>CSS \u6CE8\u91CA\u7684\u5305\u542B\u5728 <code>/* annotation */</code> \u4E4B\u4E2D\uFF0C\u7F16\u8BD1\u5668\u4F1A\u81EA\u52A8\u5FFD\u7565\u6CE8\u91CA\u5185\u5BB9\uFF0C\u4E00\u822C\u4F5C\u8BF4\u660E\u65B9\u4FBF\u5176\u4ED6\u5F00\u53D1\u8005\u4F7F\u7528\u4EE3\u7801\uFF1B\u6216\u5728\u8C03\u8BD5\u65F6\u8FDB\u884C\u4E34\u65F6\u6CE8\u91CA\u6D4B\u8BD5\uFF0C\u4EE5\u5206\u522B\u8FDB\u884C\u4EE3\u7801\u5757\u529F\u80FD\u7684\u6D4B\u8BD5\u3002</p><h3 id="\u5355\u884C\u6CE8\u91CA" tabindex="-1"><a class="header-anchor" href="#\u5355\u884C\u6CE8\u91CA" aria-hidden="true">#</a> \u5355\u884C\u6CE8\u91CA</h3><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token comment">/* \u8FD9\u662F\u5355\u884C\u6CE8\u91CA */</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="\u591A\u884C\u6CE8\u91CA" tabindex="-1"><a class="header-anchor" href="#\u591A\u884C\u6CE8\u91CA" aria-hidden="true">#</a> \u591A\u884C\u6CE8\u91CA</h3><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token comment">/*
\u8FD9\u662F\u591A\u884C\u6CE8\u91CA
\u8FD9\u662F\u591A\u884C\u6CE8\u91CA
\u8FD9\u662F\u591A\u884C\u6CE8\u91CA
*/</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="\u89C4\u5219\u96C6" tabindex="-1"><a class="header-anchor" href="#\u89C4\u5219\u96C6" aria-hidden="true">#</a> \u89C4\u5219\u96C6</h2><p><img src="`+a+'" alt="\u89C4\u5219\u96C6"></p><p>CSS \u7684\u57FA\u672C\u7EC4\u6210\u662F\u89C4\u5219\u96C6 <code>rule set</code>\uFF0C\u89C4\u5219\u96C6\u7531\u4E24\u90E8\u5206\u7EC4\u6210\uFF1A</p><ul><li><strong>\u9009\u62E9\u5668 Selector</strong>\uFF1A\u7B5B\u9009\u51FA\u9700\u8981\u6DFB\u52A0\u6837\u5F0F\u7684 HTML \u5143\u7D20 <img src="'+r+'" alt="selector"></li><li><strong>\u58F0\u660E\u5757 Declaration Block</strong>\uFF1A\u63CF\u8FF0\u60F3\u8981\u6DFB\u52A0\u7684\u6837\u5F0F\uFF0C\u5728\u82B1\u62EC\u53F7 <code>{}</code> \u5185\uFF0C\u683C\u5F0F\u662F <code>\u5C5E\u6027:\u5C5E\u6027\u503C</code>\uFF0C\u4EE5\u5206\u53F7 <code>;</code> \u7ED3\u675F <img src="'+t+`" alt="declaration block"></li></ul><p>\u793A\u4F8B\u8BBE\u7F6E\u7684\u5C5E\u6027\u662F<strong>\u6587\u672C\u5BF9\u9F50\u65B9\u5F0F</strong> <code>text-align</code>\uFF0C\u5C5E\u6027\u503C\u8BBE\u7F6E\u4E3A<strong>\u53F3\u5BF9\u9F50</strong> <code>right</code></p><h2 id="css-\u91CD\u7F6E" tabindex="-1"><a class="header-anchor" href="#css-\u91CD\u7F6E" aria-hidden="true">#</a> CSS \u91CD\u7F6E</h2><p>\u4E3A\u4E86\u4FDD\u6301\u4E0D\u540C\u6D4F\u89C8\u5668\u4E4B\u95F4\u7684\u6837\u5F0F\u7684\u4E00\u81F4\u6027\uFF0C\u4E00\u79CD\u6D41\u884C\u7684\u89E3\u51B3\u65B9\u6848\u662F\u91C7\u7528 <strong>CSS \u91CD\u7F6E</strong>\u7684\u65B9\u5F0F\uFF0C\u5982 <a href="https://necolas.github.io/normalize.css/" target="_blank" rel="noopener noreferrer">normalize.css</a>\uFF0C\u901A\u8FC7\u52A0\u8F7D\u4E00\u4EFD\u6837\u5F0F\u8868 <code>normalize.css</code> \u786E\u4FDD\u7F51\u9875\u7684\u6837\u5F0F\u5728<strong>\u6240\u6709\u7684\u6D4F\u89C8\u5668</strong>\u4E2D\u5F97\u5230\u76F8\u540C\u7684\u8BE0\u91CA</p><ul><li><p>\u65B9\u6CD5\u4E00\uFF1A\u8FD0\u884C\u4EE5\u4E0B\u547D\u4EE4\u884C\u5B89\u88C5</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code>npm install normalize.css
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></li><li><p>\u65B9\u6CD5\u4E8C\uFF1A\u5728 HTML \u6587\u4EF6\u4E2D\u94FE\u63A5\u6837\u5F0F\u8868 <code>normalize.css</code></p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>stylesheet<span class="token punctuation">&quot;</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://necolas.github.io/normalize.css/latest/normalize.css<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>\u76EE\u524D <code>normalize.css</code> \u6587\u4EF6\u7684\u7EBF\u4E0A\u94FE\u63A5\u4E3A <code>https://necolas.github.io/normalize.css/latest/normalize.css</code> \u53EF\u4EE5\u76F4\u63A5\u94FE\u63A5\u8BE5\u6587\u4EF6\uFF0C\u4E5F\u53EF\u4EE5\u4E0B\u8F7D\u5230\u672C\u5730\u518D\u5F15\u7528\u3002\u5F53\u524D <code>normalize.css</code> \u6700\u65B0\u7248\u672C\u4E3A <code>8.0.1</code> \u4E5F\u53EF\u8BBE\u7F6E\u94FE\u63A5\u4E3A <code>http://necolas.github.io/normalize.css/8.0.1/normalize.css</code></p></li></ul><p>\u628A <code>normalize.css</code> \u91CC\u9762\u7684\u6240\u6709\u5185\u5BB9<strong>\u653E\u5728\u81EA\u5DF1\u7684 <code>style.css</code> \u7684\u6700\u4E0A\u9762</strong>\uFF0C\u90A3\u6837\u5982\u679C\u6709\u51B2\u7A81\u7684\u8BDD\uFF0C\u5199\u5728\u540E\u9762\u7684\u5B9A\u5236\u5316\u6837\u5F0F\u4F1A\u8986\u76D6\u6389\u524D\u9762\u7684</p><p>\u53C2\u8003\uFF1A</p><ul><li><a href="https://github.com/necolas/normalize.css/" target="_blank" rel="noopener noreferrer">normalize.css</a></li><li><a href="http://necolas.github.io/normalize.css/" target="_blank" rel="noopener noreferrer"><strong>Normalize.css</strong> A modern, HTML5-ready alternative to CSS resets</a></li><li><a href="https://jerryzou.com/posts/aboutNormalizeCss/" target="_blank" rel="noopener noreferrer">\u6765\uFF0C\u8BA9\u6211\u4EEC\u8C08\u4E00\u8C08 Normalize.css</a></li></ul>`,27);function c(i,p){return l}var u=s(o,[["render",c]]);export{u as default};
