---
show: true
cover: tips.png
summary: 收录一些前端小技巧，包括新特性，常用代码片段，算法伪码等。
---

# 前端小技巧
:bulb: 由于浏览器未必能支持新特性，使用前请到 [Caniuse](https://caniuse.com/) 相关网站查询不同浏览器对该特性的适用性。

## 性能优化

### 懒加载 loading
参考：[浏览器IMG图片原生懒加载loading=”lazy”实践指南](https://www.zhangxinxu.com/wordpress/2019/09/native-img-loading-lazy/)

CSS 属性 `loading:lazy` 可以将资源标识为非阻塞（非关键）资源，仅在需要时加载它们。延迟加载可以在应用程序的不同时刻发生，但通常会在某些用户交互（例如滚动和导航）发生，并考虑结合设备的网络环情况。

可以将该属性应用在 `<img>` 和 `<iframe>` 标签

```html
<img src="image.jpg" alt="..." loading="lazy">
<iframe src="video-player.html" title="..." loading="lazy"></iframe>
```

## 样式设置

### 高宽比 aspect-ratio

CSS 属性 **`aspect-ratio`**  为容器规定了一个期待的纵横比，例如对于使用 `<iframe>` 标签插入的视频播放器，可以将元素的纵横比设置为 `16:9` 这是主流的在桌面播放的视频的高宽比例。

```html
<iframe style="width: 100%;aspect-ratio: 16/9;" src="https://www.youtube.com/embed/Y50_RSWpWkA?start=3403&end=3441&modestbranding=1&rel=0" allowfullscreen></iframe>
```

### 适应容器 object-fit

CSS 属性 `object-fit` 用于指定可替换元素如何适应到其（高度和宽度确定的）父元素。属性可选值有 5 种：

* `fill` 元素完全填充满容器，可能**被拉伸**以适应内容框。
* `cover` 元素在保持其宽高比的同时填充满容器，可能**被剪裁**以适应内容框
* `contain` 确保元素完整地包含在容器内，保持其宽高比，因此可能**不会填满**容器。
* `none` 元素将保持其原有的尺寸。
* `scale-down` 元素的尺寸与 `none` 或 `contain` 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。

:bulb: **可替换元素**的内容不受当前文档的样式的影响，CSS 只影响它的位置，典型的可替换元素有：

* `<iframe>`
* `<video>`
* `<embed>`
* `<img>`

例如设置图片适应容器的方式为：保存完整内容和高宽比

```css
img {
	object-fit: contain;
}
```

:bulb: 可以使用 CSS 属性 `object-position` 规定可替换元素在其内容框中的位置，使用 1 到 4 个值来定义该元素在它所处的二维平面中的定位。可以使用（相对于容器）相对或绝对偏移。

:bulb: 类似的属性是 `background-size` 和 `background-position` 但是它们只适用于设置背景图，而不是可替换元素。