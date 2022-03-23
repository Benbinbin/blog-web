---
show: true
summary: ProseMirror is a toolkit for building rich-text editors on the web. It contains many low-level modules to make a highly customized web editor.
tags:
  - editor
  - development log
---

# prosemirror-state 模块
该模块生成了编辑器的状态对象 state object，其包括编辑器所包含的内容、选中的内容、注册的插件等。

:bulb: state 虽然是一个 JavaScript 对象，但它应该是 immutable 持久化的，即其**不**应该直接修改它，而应该基于原有的状态，（通过 apply transaction 应用事务）生成一个新的状态

## EditorState 类
通过实例化 `EditorState` 类可以为编辑器生成一个[状态对象 state](#状态对象)

```js
const state = new EditorState({});
```

该类有一些静态方法和属性：

* `EditorState.create(config)` 方法：基于配置 `config` 创建一个新的状态 state

  参数 `config` 是一个对象，包含以下属性：

    * `schema` 属性：设置编辑器允许容纳的内容格式

    * `doc` 属性：设置编辑器的起始的内容

    * `selection` 属性：设置编辑器的选区

    * `plugins` 属性：设置编辑器所使用的插件

    :warning: 其中 `schema` 或 `doc` 属性必须有两者之一

* `EditorState.fromJSON(config, json, pluginFields)` 方法：基于配置 `config` 和 JSON 文档，创建一个新的状态 state。

  参数 `config` 是一个对象，至少包含 `schema` 属性，以设置编辑器允许容纳的内容格式；一般还会有 `plugins` 属性，它是一个包含一系列插件的数组，这些插件会在初始化编辑器的状态时被调用

  参数 `json` 是需要反序列化的 JSON 文档，它会被转换为编辑器的文本内容

  如果 JSON 文档中包含 plugin 的 state，需要传递第三个参数 `pluginFields`，该对象通过插件的 key 和 JSON 对象的属性名的对应关系，指明 JSON 对象中的哪些字段对应（存储）哪个 plugin 的 state，在反序列 deserialize 过程中可以将 JSON 相应的属性值转换作为 plugin 的 state

  :bulb: 如果设置了 `pluginFields` 参数，则在对应插件的 state 对象中需要设置 `fromJSON` 方法

### 状态对象
编辑器的状态对象 state 包含多个字段/属性：

* `doc` 属性：当前的文档内容

  其值的类型是 `node` 对象

* `selection` 属性：当前选中的内容

  其值的类型是 `selection` 对象

* `storedMarks` 属性：一系列**预设**的样式标记 marks，以应用到下一次输入的文本中。例如预先开启了粗体的标记，再输入文本就直接显示为粗体的。

  其值的类型是一个由一系列 `mark` 对象构成的数组，但如果没有预设的样式标记时则为 `null`

* `schema` 属性：用于设置编辑器可以容纳哪些格式的内容

  其值的类型是 `schema` 对象

* `plugins` 属性：包含了编辑器当前状态 state 所激活的插件

  其值类型是一个由一系列 `plugin` 插件构成的数组

* `apply(tr)` 方法：对当前状态 state 应用一个事务 `tr` 并返回一个新的状态

  其入参是 `tr` 是一个事务对象 `transaction`

  其返回值是一个编辑器的新的状态 `state`

  :bulb: 可以使用 `applyTransaction(rootTr)` 方法应用事务 `rootTr`，其返回更详细的信息 `{state: EditorState, transactions: [Transaction]}` 除了新状态，还可能包括在此过程中通过插件所应用的诸多事务

* `tr` 属性：基于编辑器当前状态创建一个事务 `transaction`

* `reconfigure(config)` 属性：基于编辑器当前状态 state 和新增的配置 `config` 创建一个新的状态。配置对象 `config` 是对编辑器的插件进行调整。在两个状态 state 中都有的属性保持不变；对于配置 `config` 中舍弃的属性会在新的状态中移除；对于配置 `config` 中新增的属性会**调用插件的 `init()` 方法**来设置它们的初始值。

  其入参 `config` 是一个对象，其包含一个属性 `plugins`，该属性值是包含一系列 plugin 对象的数组，新编辑器状态 state 将会应用这些插件

  其返回值是一个编辑器的新的状态 `state`

* `toJSON(pluginFields | string | number)` 方法：将编辑器当前的状态（文档内容）序列化 serialize 为 JSON 格式。

  其入参可以是多种数据格式。如果想序列化 plugin 的 state 需要传入一个 `pluginFields` 对象，该对象指定了序列化得到 JSON 对象中哪个字段对应（存储）哪个 plugin 的状态；或是一个字符串，或是一个数字，对转换过程进行定制化。

  :bulb: 如果想序列化 plugin 的 state 需要同时在相应的 plugin 的属性 `state` 中提供 `toJSON(key)` 方法，其中入参 `key` 是插件的 key

:bulb: 还可以通过注册插件 plugin 来新增状态对象 state 的字段/属性

## Transaction 类
`Transaction` 类继承自 `Transform` 类，它的实例 transaction 称为事务，可以理解为操作编辑器文本内容的多个步骤的一个合集（也包括编辑器的选中内容的变化，或是样式标记的变化）。

可以通过调用状态对象的方法 `state.apply(transaction)` 来将事务 transaction 应用当前的编辑器的状态中，以生成一个新的状态。

:bulb: 通过 `state.tr` 可以基于编辑器当前的状态创建一个事务

:bulb: 另外可以在事务中添加一些**元信息 metadata**，以对该事务操作提供额外的描述。例如用户通过鼠标或触屏设备选中内容时，由 editor view 编辑器的视图所创建的 transaction 事务中，元信息会包含 `pointer` 属性，其值为 `true`；如果用户通过粘贴、剪切、拖放等操作改变编辑器内容时，editor view 编辑器的视图所创建的 transaction 事务中，元信息会包含 `uiEvent` 属性，其值分别为 `paste`、`cut` 或 `drop`

### 事务对象
事务对象 transaction 包含多个字段/属性：

* `time` 属性：该事务创建时的时间戳，和 `Date.now()` 的值相同

  其值的类型是 `number` 数值

* `setTime(time)` 方法：更新该事务的时间戳

  其入参的数据类型是 `number`

  其返回值是该事务对象 `transaction`

* `storeMarks` 属性：存储该事务对于文本内容的样式标记所进行修改

  其值的类型是一个由一系列 `mark` 对象构成的数组，但也可能由于这一次的事务并没有对文本内容的样式标记进行修改，所以没有该属性

* `setStoredMarks(marks)` 方法：设置文本内容的样式标记

  其（可选）入参是一个由一系列 `mark` 对象构成的数组，也可以不传递参数

  其返回值是该事务对象 `transaction`

* `ensureMarks(marks)` 方法：确保该事务中的对样式标记的设置与该方法的入参 `marks` 一致，如果该事务没有对样式标记进行设置，则需要确保光标（选中内容）的样式标记与该方法的入参 `marks` 一致。如果一致则不进行操作；如果不一致就对其进行修改，以保证与入参 `marks` 一致

  其入参是一个由一系列 `mark` 对象构成的数组

  其返回值是该事务对象 `transaction`

* `addStoredMark(mark)` 方法：为该事务添加额外的样式标记

  其入参是一个样式标记 `mark` 对象

* `removeStoredMark(mark | MarkType)` 方法：为事务移除特定的样式标记或特定类型的样式标记

  其入参可以是一个 `mark` 对象，也可以是一个 mark 类型

  其返回值是该事务对象 `transaction`

* `selection` 属性：编辑器（在应用该事务后）选中的内容。它默认是编辑器经过该事务中不同 steps 步骤处理后，原来的选中内容进行 map 映射后的结果。

  :bulb: 可以通过方法 `transaction.setSelection()` 修改这个默认的映射行为。

  其值的类型是 `selection` 对象

* `setSelection(selection)` 方法：更新选中的内容。它会覆盖原有的映射行为，决定应用事务后编辑器的选中的内容

  其入参是 `selection` 对象

  其返回值是该事务对象 `transaction`

* `selectionSet` 属性：表示该事务中是否手动设置选中内容

  其值的类型是布尔值

* `replaceSelection(slice)` 方法：基于传入的参数 `slice` 重设选中内容

  其入参是 `slice` 对象

  其返回值是该事务对象 `transaction`

* `replaceSelectionWith(node, inheritMarks)` 方法：将选中内容替代为给定的 `node` 对象，如果参数 `inheritMarks` 的值为 `true`，且替换插入的是行内 inline 内容，则插入的内容将会继承该位置原来具有的样式标记

  其第一个入参是一个 `node` 对象，第二个（可选）参数 `inheritMarks` 是一个布尔值

  其返回值是该事务对象 `transaction`

* `deleteSelection()` 方法：删除选区

  其返回值是该事务对象 `transaction`

* `insertText(text, from, to)` 方法：用给定的 `text` 文本节点对象的内容，替换 `[from, to]` 范围的内容；如果没有指定范围，就将 `text` 文本节点对象的内容替换 selection 选区的内容

  其第一个入参是 `text` 文本节点对象，第二和第三个（可选）参数 `from` 与 `to` 用于指定范围

  其返回值是该事务对象 `transaction`

* `setMeta(key | Plugin | PluginKey, value)` 方法：设置元信息。

  其第一个参数可以是一个字符串、插件或表示插件的键名，作为新增的元信息的属性名。第二个参数是新增的元信息的值

  其返回值是该事务对象 `transaction`

* `getMeta(key | Plugin | pluginKey)` 方法：获取特定元信息。

  其入参是一个字符串、插件或表示插件的键名

  其返回值是给定键名相应的元信息

* `isGeneric` 属性：表示该事务是否含有元信息。如果不包含任何元信息，则该属性值为 `true`，这样就可以放心对该事务扩展修改（例如与其他的 step 操作步骤进行合并，如果事务有元信息，则它可能是对于某个插件有特殊用途的，不能简单地与其他 step 进行合并）

  其返回值的数据类型是布尔值

* `scrollIntoView` 方法：表示应用该事务后（更新完 state 编辑器状态后），编辑器要将选区滚动到视图窗口中

## Selection 类
`Selection` 类是一个 superclass 超类，即它一般不直接实例化，而是要先被继承，构建出各种子类，**通过实例化子类来构建各种类型的选区**，例如 ProseMirror 内置的 `TextSelection` 文本选区子类，`NodeSelection` 节点选区子类，还可以继承这个超类，自定义其他的选区类型。

在实例化 `Selection` 类时需要传入一些参数，获取一个选区对象

```js
new Selection($anchor, $head, ranges)
```

第一个参数 `$anchor` 是一个 `resolvedPos` 对象，表示选区的锚点（在选区变化时，不移动的一侧，一般是选区的左侧）；第二个参数 `$head` 也是一个 `resolvedPos` 对象，表示选区行进点/动点（在选区变化时，移动的一侧，一般是选区的右侧）；第三个（可选）参数 `ranges` 是一个仅含有一个元素的数组，该元素是一个 `SelectionRange` 对象，如果省略第三个参数，则 ProseMirror 会根据 `$anchor` 和 `$head` 构建出选区范围

该类有一些静态方法和属性：

* `Selection.findFrom($pos, dir, textOnly)` 方法：从给定位置 `$pos` 开始，向一个方向寻找一个可用的光标选区或叶子节点选区；第二个参数 `dir` 的正负值决定寻找的方向，如果是正值就向右侧寻找，如果是负值就向左侧寻找；第三参数是一个布尔值，以判断是否只寻找光标选区。

  :bulb: 该方法是在执行粘贴或其他操作后，不知道应该将光标放到哪个合适的位置时使用的，它会自动寻找一个合适的位置，而不需要用户手动设置光标选区或节点选区。

  第一个参数 `$pos` 是一个 `resolvedPos` 对象，表示从哪个位置开始寻找可用选区；第二个参数 `dir` 是一个数值，用以指示寻找的方向；第三个（可选）参数 `textOnly` 是一个布尔值，表示是否只寻找光标选区。

  其返回值是一个 `selection` 选区对象，如果没有寻找到可用的选区则返回 `null`

* `Selection.near($pos, bias)` 方法：从给定位置 `$pos` 附近寻找一个可用的光标选区或叶子节点选区，默认优先向文本的行进方向（一般是右侧）寻找，如果参数 `bias` 为负值，则优先向文本的行进方的反方向（一般是左侧）寻找。

  第一个参数 `$pos` 是一个 `resolvedPos` 对象，表示从哪个位置开始寻找可用选区；第二个（可选）参数 `bias` 是一个数值，其正负值指示优先寻找的方向。

  其返回值是一个 `selection` 选区对象

* `Selection.atStart(doc)` 方法：在给定文档 `doc` 的开头开始去寻找可用的光标选区或叶子节点选区。

  其入参是一个 `node` 对象，一般是表示编辑器文档的根节点 `doc`

  其返回值是一个 `selection` 选区对象，如果没有寻找到可用的选区，则返回 `allSelection` 对象，它是一个表示整个文档的选区

* `Selection.atEnd(doc)` 方法：在给定文档 `doc` 的结尾开始去寻找可用的光标选区或叶子节点选区。

  其入参是一个 `node` 对象，一般是表示编辑器文档的根节点 `doc`

  其返回值是一个 `selection` 选区对象

* `Selection.fromJSON(doc, json)` 方法：反序列化一个给定的 `json` 对象，构建一个 `selection` 选区

  其第一个参数 `doc` 是一个 `node` 对象，第二个参数 `json` 是一个 JSON 对象中哪个字段对应

  其返回值是一个 `selection` 选区对象

* `Selection.jsonID(id, selectionClass)` 方法：为了可以应用上一个方法（通过反序列化一个给定的 `json` 对象构建一个选区），对于自定义的选区子类，必须要使用该方法注册一个 `id` 以避免与其他模块冲突。

  其第一个参数 `id` 是一个字符串，需要有区分度（不容易与其他模块的类名称冲突）；第二个参数是自定义的选区子类

  其返回值是该自定义的选区子类

