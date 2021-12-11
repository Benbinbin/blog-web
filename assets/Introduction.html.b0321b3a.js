import{c as n}from"./app.43fe0c63.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";var a="/blog-web/assets/20201001155442817_6568.992d20fa.png";const p={},e=n('<h1 id="express-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#express-\u7B80\u4ECB" aria-hidden="true">#</a> Express \u7B80\u4ECB</h1><p>\u53C2\u8003\uFF1A<a href="http://expressjs.com/zh-cn/starter/installing.html" target="_blank" rel="noopener noreferrer">Express \u5165\u95E8</a></p><p>Express \u662F\u4E00\u4E2A\u57FA\u4E8E Node.js \u5E73\u53F0\u7684 Web Server \u5F00\u53D1\u6846\u67B6\uFF0C\u8BB8\u591A <a href="https://www.expressjs.com.cn/resources/frameworks.html" target="_blank" rel="noopener noreferrer">\u6D41\u884C\u7684\u5F00\u53D1\u6846\u67B6</a> \u90FD\u57FA\u4E8E Express \u6784\u5EFA\u3002</p><p><img src="'+a+`" alt="Express"></p><h2 id="\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a> \u5B89\u88C5</h2><ol><li>\u9996\u5148\u5047\u5B9A\u4F60\u5DF2\u7ECF\u5B89\u88C5\u4E86 <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js</a>\uFF0C\u63A5\u4E0B\u6765\u4E3A\u4F60\u7684\u5E94\u7528\u521B\u5EFA\u4E00\u4E2A\u76EE\u5F55\uFF0C\u7136\u540E\u8FDB\u5165\u6B64\u76EE\u5F55\u5E76\u5C06\u5176\u4F5C\u4E3A\u5F53\u524D\u5DE5\u4F5C\u76EE\u5F55</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">mkdir</span> myapp
$ <span class="token builtin class-name">cd</span> myapp
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="2"><li>\u901A\u8FC7 <code>npm init</code> \u547D\u4EE4\u4E3A\u4F60\u7684\u5E94\u7528\u521B\u5EFA\u4E00\u4E2A <code>package.json</code> \u6587\u4EF6</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">npm</span> init
<span class="token comment"># \u6B64\u547D\u4EE4\u5C06\u8981\u6C42\u4F60\u8F93\u5165\u51E0\u4E2A\u53C2\u6570\uFF0C\u53EF\u4EE5\u76F4\u63A5\u6309\u56DE\u8F66 Enter \u952E\u63A5\u53D7\u5927\u90E8\u5206\u9ED8\u8BA4\u8BBE\u7F6E\u5373\u53EF\uFF0C\u9664\u4E86\u5E94\u7528\u7684\u5165\u53E3\u6587\u4EF6\uFF0C\u5E94\u8BE5\u660E\u786E\u8BBE\u7F6E</span>
<span class="token comment"># \u53EF\u4EE5\u91C7\u7528\u9ED8\u8BA4\u7684 index.js \u6587\u4EF6\u540D\uFF0C\u6216\u952E\u5165\u6240\u5E0C\u671B\u7684\u540D\u79F0\uFF0C\u5982 app.js</span>
entry point: <span class="token punctuation">(</span>app.js<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="3"><li>\u5C06\u7EC8\u7AEF\u8DEF\u5F84\u5207\u6362\u8FDB <code>myapp</code> \u76EE\u5F55\u4E0B\uFF0C\u5B89\u88C5 Express \u5E76\u5C06\u5176\u4FDD\u5B58\u5230\u4F9D\u8D56\u5217\u8868\u4E2D</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> express --save
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u{1F4A1} \u5982\u679C\u53EA\u662F\u4E34\u65F6\u5B89\u88C5 Express\uFF0C\u4E0D\u60F3\u5C06\u5B83\u6DFB\u52A0\u5230\u4F9D\u8D56\u5217\u8868\u4E2D\uFF0C\u53EF\u6267\u884C\u5982\u4E0B\u547D\u4EE4\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> express --no-save
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u{1F4A1} npm 5.0+ \u7248\u672C\u5728\u9ED8\u8BA4\u60C5\u51B5\u4E0B\u4F1A\u5C06\u5B89\u88C5\u7684\u6A21\u5757\u6DFB\u52A0\u5230 <code>package.json</code> \u6587\u4EF6\u4E2D\u7684 <code>dependencies</code> \u5217\u8868\u4E2D\u3002\u5BF9\u4E8E\u8F83\u8001\u7684 npm \u7248\u672C\uFF0C\u4F60\u5C31\u5FC5\u987B\u6307\u5B9A <code>--save</code> \u53C2\u6570</p><ol start="4"><li>\u6267\u884C\u7A0B\u5E8F</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ node app.js
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="\u5F00\u542F\u670D\u52A1\u5668" tabindex="-1"><a class="header-anchor" href="#\u5F00\u542F\u670D\u52A1\u5668" aria-hidden="true">#</a> \u5F00\u542F\u670D\u52A1\u5668</h2><p>\u4F7F\u7528 Express \u6784\u5EFA\u4E00\u4E2A\u6781\u7B80\u7684\u7684 Web \u5E94\u7528\u7A0B\u5F0F</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;express&#39;</span><span class="token punctuation">)</span>   <span class="token comment">// \u5F15\u5165 express \u6A21\u5757</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>   <span class="token comment">// \u5B9E\u4F8B\u5316</span>
<span class="token keyword">const</span> port <span class="token operator">=</span> <span class="token number">3000</span>   <span class="token comment">// \u8BBE\u7F6E\u76D1\u542C\u7684\u7AEF\u53E3</span>

<span class="token comment">// \u5BF9\u4E8E\u6307\u5411\u6839\u76EE\u5F55 URL\uFF08/\uFF09\u6216\u8DEF\u7531\u7684\u8981\u6C42\uFF0C\u4EE5 &quot;Hello World!&quot; \u56DE\u5E94\uFF1B\u5BF9\u4E8E\u5176\u4ED6\u8DEF\u5F84\u7684\u8BBF\u95EE\u5C31\uFF08\u9ED8\u8BA4\uFF09\u56DE\u5E94 404 \u627E\u4E0D\u5230</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">&#39;Hello World!&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// \u76D1\u542C\u7AEF\u53E3 3000</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span>port<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Example app listening at http://localhost:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>port<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="express-\u5E94\u7528\u7A0B\u5E8F\u751F\u6210\u5668" tabindex="-1"><a class="header-anchor" href="#express-\u5E94\u7528\u7A0B\u5E8F\u751F\u6210\u5668" aria-hidden="true">#</a> Express \u5E94\u7528\u7A0B\u5E8F\u751F\u6210\u5668</h2><p>\u53E6\u4E00\u4E2A\u521B\u5EFA\u5E94\u7528\u7A0B\u5E8F\u7684\u65B9\u6CD5\u662F\u4F7F\u7528\u7A0B\u5E8F\u751F\u6210\u5668\u5DE5\u5177\uFF08CLI \u5DE5\u5177\uFF09express-generator\uFF0C\u5B83\u53EF\u4EE5\u5FEB\u901F\u642D\u5EFA\u4E00\u4E2A Web \u7A0B\u5E8F\u6846\u67B6\u3002</p><ol start="0"><li>\u5168\u5C40\u5B89\u88C5 Express \u751F\u6210\u5668</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> express-generator -g
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol><li>\u5F53\u524D\u5DE5\u4F5C\u76EE\u5F55\u4E2D\u521B\u5EFA\u540D\u4E3A <code>myapp</code> \u7684 Express \u5E94\u7528\u7A0B\u5E8F</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ express --view<span class="token operator">=</span>pug myapp
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>\u{1F4A1} Express \u751F\u6210\u5668\u652F\u6301\u591A\u79CD\u6A21\u677F\u5F15\u64CE\uFF0C\u5982\u679C\u9700\u8981\u4F7F\u7528 EJS \u53EF\u4EE5\u5C06\u53C2\u6570\u8BBE\u7F6E\u4E3A <code>--view=ejs</code> \u6216\u7528\u7B80\u5199\u5F62\u5F0F <code>-e</code></p><ol start="2"><li>\u5C06\u7EC8\u7AEF\u8DEF\u5F84\u5207\u6362\u8FDB <code>myapp</code> \u76EE\u5F55\u4E0B\uFF0C\u5B89\u88C5\u4F9D\u8D56\u9879</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token builtin class-name">cd</span> myapp
$ <span class="token function">npm</span> <span class="token function">install</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="3"><li>\u8FD0\u884C\u6B64\u5E94\u7528\u7A0B\u5E8F</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> start
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol start="4"><li>\u5728\u6D4F\u89C8\u5668\u4E2D\u8F93\u5165 <code>http://localhost:3000/</code> \u4EE5\u8BBF\u95EE\u6B64\u5E94\u7528\u7A0B\u5E8F</li></ol><p>\u751F\u6210\u7684\u5E94\u7528\u7A0B\u5E8F\u5177\u6709\u4EE5\u4E0B\u76EE\u5F55\u7ED3\u6784\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>.
\u251C\u2500\u2500 app.js
\u251C\u2500\u2500 bin
\u2502   \u2514\u2500\u2500 www
\u251C\u2500\u2500 package.json
\u251C\u2500\u2500 public
\u2502   \u251C\u2500\u2500 images
\u2502   \u251C\u2500\u2500 javascripts
\u2502   \u2514\u2500\u2500 stylesheets
\u2502       \u2514\u2500\u2500 style.css
\u251C\u2500\u2500 routes
\u2502   \u251C\u2500\u2500 index.js
\u2502   \u2514\u2500\u2500 users.js
\u2514\u2500\u2500 views
    \u251C\u2500\u2500 error.pug
    \u251C\u2500\u2500 index.pug
    \u2514\u2500\u2500 layout.pug

7 directories, 9 files
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>\u76F8\u5173\u6587\u4EF6\u529F\u80FD\uFF1A</p><ul><li><code>./bin/www</code> \u521B\u5EFA HTTP \u670D\u52A1</li><li><code>./public</code> \u5B58\u653E\u9759\u6001\u6587\u4EF6\u7684\u76EE\u5F55\uFF08\u524D\u540E\u7AEF\u5206\u79BB\u4E00\u822C\u4E0D\u4F7F\u7528\u8BE5\u76EE\u5F55\uFF09</li><li><code>./routes</code> \u8DEF\u7531\u76F8\u5173\u7684\u914D\u7F6E</li><li><code>./views</code> HTML \u6A21\u677F\u6587\u4EF6\uFF08\u524D\u540E\u7AEF\u5206\u79BB\u4E00\u822C\u4E0D\u4F7F\u7528\u8BE5\u76EE\u5F55\uFF09</li><li><code>./app.js</code> Express \u5165\u53E3\u6587\u4EF6</li></ul><p>\u5176\u4E2D <code>app.js</code> \u662F Express \u5165\u53E3\u6587\u4EF6\uFF0C\u521D\u59CB\u5316\u540E\u521B\u5EFA\u7684\u5185\u5BB9\u5982\u4E0B</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u{1F4C1} app.js</span>
<span class="token keyword">var</span> createError <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;http-errors&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// \u521B\u5EFA http error \u5BF9\u8C61\uFF0C\u9488\u5BF9 404 \u72B6\u6001</span>
<span class="token keyword">var</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;express&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> cookieParser <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;cookie-parser&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// \u89E3\u6790 cookie \u6A21\u5757</span>
<span class="token keyword">var</span> logger <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;morgan&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// \u751F\u6210\u65E5\u5FD7\u6A21\u5757</span>

<span class="token comment">// \u5F15\u5165\u8DEF\u7531\u5904\u7406\u7A0B\u5E8F</span>
<span class="token keyword">var</span> indexRouter <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./routes/index&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> usersRouter <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./routes/users&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u521D\u59CB\u5316\u4E00\u4E2A express \u5B9E\u4F8B</span>
<span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u521D\u59CB\u5316\u4E00\u4E2A\u89C6\u56FE\u5F15\u64CE\u5B9E\u4F8B</span>
<span class="token comment">// view engine setup</span>
app<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;views&#39;</span><span class="token punctuation">,</span> path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;views&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;view engine&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;jade&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * \u88C5\u5165\u5404\u79CD\u4E2D\u95F4\u4EF6\u51FD\u6570
 */</span>
<span class="token comment">// ------ \u89E3\u6790\u5404\u79CD\u6570\u636E ------</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">logger</span><span class="token punctuation">(</span><span class="token string">&#39;dev&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// \u751F\u6210\u65E5\u5FD7</span>
<span class="token comment">// \u89E3\u6790\u6BCF\u6B21 POST \u8BF7\u6C42\u4F53\u4E2D\u7684\u6570\u636E\uFF0C\u4FBF\u4E8E\u540E\u9762\u901A\u8FC7 req.body \u8BBF\u95EE\u8FD9\u4E9B\u5185\u5BB9</span>
<span class="token comment">// JSON \u683C\u5F0F\u7684\u6570\u636E</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u975E JSON \u683C\u5F0F\u7684\u6570\u636E\uFF0C\u5982\u8868\u5355\u683C\u5F0F\uFF0C\u5373 content-type \u4E3A x-www-form-urlencoded \u683C\u5F0F</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">urlencoded</span><span class="token punctuation">(</span><span class="token punctuation">{</span> extended<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u89E3\u6790\u6BCF\u6B21\u8BF7\u6C42\u7684 cookie\uFF0C\u4FBF\u4E8E\u540E\u9762\u901A\u8FC7 req.cookie \u8BBF\u95EE\u8FD9\u4E9B\u5185\u5BB9</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">cookieParser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u62FC\u63A5\u9759\u6001\u6587\u4EF6\u7684\u8DEF\u5F84\uFF0C\u5F53\u8BBF\u95EE\u9759\u6001\u6587\u4EF6\u65F6\u53EF\u4EE5\u6B63\u786E\u8FD4\u56DE</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;public&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ------ \u6CE8\u518C\u8DEF\u7531 ------</span>
<span class="token comment">// \u5176\u4E2D\u7B2C\u4E00\u4E2A\u53C2\u6570\u662F\u7236\u8DEF\u7531\uFF0C\u800C\u7B2C\u4E8C\u4E2A\u53C2\u6570\uFF08\u6587\u4EF6\uFF09\u4E2D\u7684\u4F1A\u914D\u7F6E\u5B50\u8DEF\u7531</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span> indexRouter<span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">&#39;/users&#39;</span><span class="token punctuation">,</span> usersRouter<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// \u5904\u7406\u672A\u5339\u914D\u8DEF\u7531\u7684\u60C5\u51B5</span>
<span class="token comment">// catch 404 and forward to error handler</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">next</span><span class="token punctuation">(</span><span class="token function">createError</span><span class="token punctuation">(</span><span class="token number">404</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ------ \u5904\u7406\u9519\u8BEF ------</span>
<span class="token comment">// error handler</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// set locals, only providing error in development</span>
  <span class="token comment">// \u9519\u8BEF\u7684\u8BE6\u7EC6\u4FE1\u606F\u53EA\u5728\u5F00\u53D1\u73AF\u5883\uFF0C\u5373 NODE_ENV=dev \u65F6\uFF0C\u624D\u8BBE\u7F6E\u5230\u54CD\u5E94\u4E2D</span>
  res<span class="token punctuation">.</span>locals<span class="token punctuation">.</span>message <span class="token operator">=</span> err<span class="token punctuation">.</span>message<span class="token punctuation">;</span>
  res<span class="token punctuation">.</span>locals<span class="token punctuation">.</span>error <span class="token operator">=</span> req<span class="token punctuation">.</span>app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;env&#39;</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">&#39;dev&#39;</span> <span class="token operator">?</span> err <span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token comment">// render the error page</span>
  res<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span>status <span class="token operator">||</span> <span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  res<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> app<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br></div></div>`,37);function t(o,c){return e}var r=s(p,[["render",t]]);export{r as default};
