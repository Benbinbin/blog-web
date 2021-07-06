# DOM 变动观察器
DOM 变动观察器用于观察页面的 DOM 变化情况，如特性，添加/删除的元素，文本内容，并在其发生更改时触发回调。我们可以用它来跟踪代码其他部分引入的更改，以及与第三方脚本集成。

观察器使用内建对象（构造函数） `MutationObserver` 创建，并通过方法 `observe` 设置需要观察的 DOM 节点

```js
// 创建一个带有回调函数的观察器
let observer = new MutationObserver(callback);

// 设置需要观察的 DOM 节点

observer.observe(node, config);
```

参数说明

`config` 是一个具有多种属性的对象，这些属性的值都是布尔值，用于限定要观察的内容，避免不必要的回调调用以节省资源。

- 属性 `childList` 设置是否观察 `node` 的直接子节点的更改
- 属性 `subtree` 设置是否观察  `node` 的所有后代的更改
- 属性 `attributes` 设置是否观察  `node` 的特性（attribute）
- 属性 `attributeFilter` 特性名称数组，设置只观察这些选定的特性的更改
- 属性 `characterData` 设置是否观察 `node.data`（文本内容）的更改
- 属性 `attributeOldValue` 设置是否将特性的旧值和新值都**传递给回调函数**，如果为 `false` 只传新值（需要同时设置选项 `attributes=true`）
- 属性 `characterDataOldValue` 设置是否将 `node.data` 的旧值和新值都**传递给回调函数**，如果为 `false` 只传新值（需要同时设置选项 `characterData=true`）

:bulb: 当设置了相应的属性后，DOM 发生任何更改都会作为第一个参数传递给回调函数，这些改动组成一系列被称为 [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) 的对象，具有多种属性

- 属性 `type` 变动类型，以下类型之一：
    - `"attributes"` 特性被修改了
    - `"characterData"` 数据被修改了，用于文本节点
    - `"childList"` 添加/删除了子元素
- 属性 `target` 更改发生在何处，即 `"attributes"` 所在的元素，或 `"characterData"` 所在的文本节点，或 `"childList"` 变动所在的元素
- `addedNodes/removedNodes` 添加/删除的节点
- `previousSibling/nextSibling` 添加/删除的节点的上一个/下一个兄弟节点
- `attributeName/attributeNamespace` 被更改的特性的名称/命名空间（用于 XML）
- `oldValue` 之前的值，仅适用于特性或文本更改，而且设置了相应选项 `attributeOldValue`/`characterDataOldValue` 为 `true`

```html
<!-- 元素 div 具有特性 contentEditable，该特性使我们可以聚焦和编辑元素 -->
<div contentEditable id="elem">Click and <b>edit</b>, please</div>

<script>
// 为 div 元素设置 DOM 变动观察器
let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords);   // console.log(the changes)
});

// 限定要观察的内容，除了特性之外的所有变动
observer.observe(elem, {
  childList: true,   // 观察直接子节点
  subtree: true,   // 及其更低的后代节点
  characterDataOldValue: true   // 将旧的数据传递给回调
});
</script>
```

如果聚焦到给定的 `<div>` 上然后更改 `<b>edit</b>` 中的文本，控制台会输出 MutationRecord 对象，显示 DOM 修改的相关信息

```js
mutationRecords = [{
  type: "characterData",
  oldValue: "edit",
  target: <text node>,
  // 其他属性为空
}];
```

:bulb: 使用方法 `observer.disconnect()` 可以停止观察。当我们停止观察时，观察器可能尚未处理某些更改，可以调用方法 `observer.takeRecords()` 获取尚未处理的变动记录列表，表中记录的是已经发生，但回调暂未处理的变动。

:warning: 观察器在内部对节点使用弱引用，观察到 DOM 节点这一事实并不能阻止垃圾回收，即如果一个节点被从 DOM 中删除了，并且该节点变得不可访问，那么它就会被垃圾回收。
