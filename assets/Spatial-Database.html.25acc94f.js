import{c as s}from"./app.43fe0c63.js";import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";var a="/blog-web/assets/20200716170437198_32250.a45dbf03.png";const e={},p=s(`<h1 id="postgis-\u7A7A\u95F4\u6570\u636E\u5E93" tabindex="-1"><a class="header-anchor" href="#postgis-\u7A7A\u95F4\u6570\u636E\u5E93" aria-hidden="true">#</a> PostGIS \u7A7A\u95F4\u6570\u636E\u5E93</h1><p>\u4F7F\u7528 <a href="https://blog.csdn.net/antma/article/details/83580859" target="_blank" rel="noopener noreferrer">PostGIS \u63D2\u4EF6</a>\u521B\u5EFA\u7A7A\u95F4\u6570\u636E\u5E93</p><ol><li>\u5728 psql \u4E2D\u542F\u7528 PostGIS \u63D2\u4EF6\uFF0C\u5E76\u521B\u5EFA postgis \u7A7A\u95F4\u6570\u636E\u5E93<a href="https://postgis.net/install/" target="_blank" rel="noopener noreferrer">\u6A21\u677F</a></li></ol><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token comment">-- \u521B\u5EFA\u4E00\u4E2A\u6570\u636E\u5E93\u4F5C\u4E3A postgis \u6A21\u677F</span>
<span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> gis_template<span class="token punctuation">;</span>
\\c gis_template<span class="token punctuation">;</span>
<span class="token comment">-- \u5728\u8BE5\u6570\u636E\u5E93\u4E2D\u542F\u7528 PostGIS \u521B\u5EFA</span>
<span class="token comment">-- Enable PostGIS (as of 3.0 contains just geometry/geography)</span>
<span class="token keyword">CREATE</span> EXTENSION postgis<span class="token punctuation">;</span>
<span class="token comment">-- enable raster support (for 3+)</span>
<span class="token keyword">CREATE</span> EXTENSION postgis_raster<span class="token punctuation">;</span>
<span class="token comment">-- Enable Topology</span>
<span class="token keyword">CREATE</span> EXTENSION postgis_topology<span class="token punctuation">;</span>
<span class="token comment">-- Enable PostGIS Advanced 3D</span>
<span class="token comment">-- and other geoprocessing algorithms</span>
<span class="token comment">-- sfcgal not available with all distributions</span>
<span class="token keyword">CREATE</span> EXTENSION postgis_sfcgal<span class="token punctuation">;</span>
<span class="token comment">-- fuzzy matching needed for Tiger</span>
<span class="token keyword">CREATE</span> EXTENSION fuzzystrmatch<span class="token punctuation">;</span>
<span class="token comment">-- rule based standardizer</span>
<span class="token keyword">CREATE</span> EXTENSION address_standardizer<span class="token punctuation">;</span>
<span class="token comment">-- example rule data set</span>
<span class="token keyword">CREATE</span> EXTENSION address_standardizer_data_us<span class="token punctuation">;</span>
<span class="token comment">-- Enable US Tiger Geocoder</span>
<span class="token keyword">CREATE</span> EXTENSION postgis_tiger_geocoder<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><ol start="2"><li>\u521B\u5EFA\u7A7A\u95F4\u6570\u636E\u5E93</li></ol><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token comment">-- \u57FA\u4E8E postgis \u6A21\u677F\u521B\u5EFA\u6570\u636E\u5E93</span>
<span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> gis_database <span class="token keyword">WITH</span> TEMPLATE <span class="token operator">=</span> gis_template<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="3"><li>\u5BFC\u5165 Shapefile \u6570\u636E</li></ol><p><img src="`+a+'" alt="\u5BFC\u5165 Shapefile \u6570\u636E"></p><p>\u26A0\uFE0F \u5750\u6807\u7CFB SRID \u9700\u8981\u8BBE\u7F6E\u4E0E\u6570\u636E\u6E90\u76F8\u5E94\u7684\u6570\u503C</p>',9);function t(l,o){return p}var i=n(e,[["render",t]]);export{i as default};
