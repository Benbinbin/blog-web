import{c as n}from"./app.43fe0c63.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},p=n(`<h1 id="content-script" tabindex="-1"><a class="header-anchor" href="#content-script" aria-hidden="true">#</a> Content-Script</h1><p>content scripts \u662F\u5728\u9875\u9762\u52A0\u8F7D\u540E\u8FD0\u884C\u7684 JavaScript \u6587\u6863\uFF08\u6216 CSS \u6837\u5F0F\u8868\uFF09\uFF0C\u5B83\u53EF\u4EE5\u64CD\u4F5C\u9875\u9762\u7684 DOM\u3002</p><p>\u9700\u8981\u5728 <code>manifest.json</code> \u4E2D\u8FDB\u884C\u914D\u7F6E</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token comment">// \u{1F4C1} manifest.json</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;manifest_version&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;My Extension&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0.0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;content_scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;js&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;content.js&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>\u5982\u679C\u9700\u8981\u5339\u914D\u7279\u5B9A\u9875\u9762 URL \u624D\u6267\u884C content scripts \u53EF\u4EE5\u8BBE\u7F6E <code>matches</code> \u5C5E\u6027\uFF0C\u5E76\u4F7F\u7528\u6B63\u5219\u8868\u8FBE\u5F0F\u8BBE\u7F6E\u5339\u914D URL \u7684\u89C4\u5219\u3002</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token comment">// \u{1F4C1} manifest.json</span>
<span class="token comment">// ...</span>
  <span class="token property">&quot;content_scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;matches&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>   <span class="token comment">// \u5339\u914D\u6240\u6709 github \u7F51\u9875</span>
        <span class="token string">&quot;http://github.com/*&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;https://github.com/*&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;http://*.github.com/*&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;https://*.github.com/*&quot;</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;js&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;content.js&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div>`,6);function t(e,o){return p}var u=s(a,[["render",t]]);export{u as default};
