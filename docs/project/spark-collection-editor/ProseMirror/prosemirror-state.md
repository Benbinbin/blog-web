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

  属性值的数据类型是 `node` 对象

* `selection` 属性：当前选中的内容

  属性值的数据类型是 `selection` 对象

* `storedMarks` 属性：一系列**预设**的样式标记 marks，以应用到下一次输入的文本中。例如预先开启了粗体的标记，再输入文本就直接显示为粗体的。

  属性值的数据类型是一个由一系列 `mark` 对象构成的数组，但如果没有预设的样式标记时则为 `null`

* `schema` 属性：用于设置编辑器可以容纳哪些格式的内容

  属性值的数据类型是 `schema` 对象

* `plugins` 属性：包含了编辑器当前状态 state 所激活的插件

  属性值数据类型是一个由一系列 `plugin` 插件构成的数组

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

  属性值的类型是 `number` 数值

* `setTime(time)` 方法：更新该事务的时间戳

  其入参的数据类型是 `number`

  其返回值是该事务对象 `transaction`

* `storeMarks` 属性：存储该事务对于文本内容的样式标记所进行修改

  属性值的类型是一个由一系列 `mark` 对象构成的数组，但也可能由于这一次的事务并没有对文本内容的样式标记进行修改，所以没有该属性

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

  属性值的数据类型是 `selection` 对象

* `setSelection(selection)` 方法：更新选中的内容。它会覆盖原有的映射行为，决定应用事务后编辑器的选中的内容

  其入参是 `selection` 对象

  其返回值是该事务对象 `transaction`

* `selectionSet` 属性：表示该事务中是否手动设置选中内容

  属性值的数据类型是布尔值

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

* `Selection.fromJSON(doc, json)` 方法：反序列化一个给定的 `json` 对象，以构建一个 `selection` 选区

  其第一个参数 `doc` 是一个 `node` 对象，第二个参数 `json` 是一个 JSON 对象中哪个字段对应

  :bulb: ProseMirror 内置的 `TextSelection` 文本选区子类，`NodeSelection` 节点选区子类均有预设的静态方法 `subClass.fromJSON()` 而对于自定义的选区子类，该静态方法需要自己来定义，且必须设置。

  其返回值是一个 `selection` 选区对象

* `Selection.jsonID(id, selectionClass)` 方法：为了可以应用上一个方法（通过反序列化一个给定的 `json` 对象构建一个选区），对于自定义的选区子类，必须要使用该方法注册一个 `id` 以避免与其他模块冲突。

  其第一个参数 `id` 是一个字符串，需要有区分度（不容易与其他模块的类名称冲突）；第二个参数是自定义的选区子类

  其返回值是该自定义的选区子类

:package: 以上提到了一些方法中，其所接收的参数涉及一种称为 **`SelectionRange` 类的实例对象**，它表示一个文档中的选区范围，通过 `new SelectionRange($from, $to)` 实例化获取一个选区范围对象，其中入参 `$from` 和 `$to` 都是 `resolvedPos` 对象，分别表示选区范围的下界和上界。该对象具有以下两个属性：

  * `$from` 属性：其值的数据类型是 `resolvedPos` 对象，它表示该选区范围的下界

  * `$to` 属性：其值的数据类型是 `resolvedPos` 对象，它表示该选区范围的上界

### 选区对象
选区对象 selection 包含多个字段/属性：

* `ranges` 属性：该选区所覆盖的范围

  属性值的数据类型是一个仅由一个元素构成的元素，该元素是一个 `selectionRange` 对象

* `$anchor` 属性：该选区的锚点，即当选区变化时，不移动的一侧

  属性值的数据类型是 `resolvedPos` 对象

* `$head` 属性：该选区的动点，即当选区变化时，移动的一侧

  属性值的数据类型是 `resolvedPos` 对象

* `anchor` 属性：该选区的锚点的位置

  属性值的数据类型是 `number` 数值

* `head` 属性：该选区的动点的位置

  属性值的数据类型是 `number` 数值

* `$from` 属性：该选区的下界（一般是左侧）

  属性值的数据类型是 `resolvedPos` 对象

* `$to` 属性：该选区的上界（一般是右侧）

  属性值的数据类型是 `resolvedPos` 对象

* `from` 属性：该选区所覆盖范围的下界的位置

  属性值的数据类型是 `number` 数值

* `to` 属性：该选区所覆盖范围的上界的位置

  属性值的数据类型是 `number` 数值

* `empty` 属性：表示选区是否包含内容

  属性值的数据类型是布尔值

* `eq(selection)` 方法：查看当前选区与给定的选区 `selection` 是否相等

  其返回值是布尔值

* `map(doc, mapping)` 方法：通过一个 `mapping` 对象将选区映射到新的文档 `doc` 上

  第一个参数 `doc` 是一个 `node` 对象，这个新的文档一般是通过事务的属性 `tr.doc` 来获取的；第二个参数 `mapping` 是一个 `mappable` 对象，将当前的选区进行映射

  其返回值是选区 `selection`

* `content()` 方法：获取该选区的内容，并构建为一个 `slice` 对象

  其返回值是一个 `slice` 对象

* `replace(tr, content)` 方法：用给定的切片内容 `content` 取代给定事务 `tr` 中的选区，如果第二个（可选）参数 `content` 没有指定，则该方法会将给定事务 `tr` 中的选区删除。

  第一个参数 `tr` 是一个事务对象 `transaction`，第二个（可选）参数 `content` 是一个切片对象 `slice`

* `replaceWith(tr, node)` 方法：用给定的节点 `node` 取代给定事务 `tr` 中的选区

  第一参数 `tr` 是一个事务对象 `transaction`，第二个参数 `node` 是一个节点对象

* `toJSON()` 方法：将选区转换为 JSON 对象。

  :bulb: 如果是在自定义选区子类中定义该方法时，需要在返回的 JSON 对象中包含一个 `type` 属性，其值是该自定义选区子类在使用方法 `Selection.jsonID()` 所注册的唯一 ID。例如 ProseMirror 的内置选区子类 `TextSelection` 文本选区，调用其 `toJSON()` 方法获得的 JSON 对象会包含一个 `type` 属性，其值是 `text`，因为该内置选区子类的 ID 为 `Selection.jsonID("text", TextSelection)`

  其返回值是一个 JSON 对象

* `getBookmark()` 方法：获取该选区的标签。

  :bulb: `bookmark` 标签对象是选区的一个「替身」。它可以在不直接访问当前文档内容的情况下存储选区的信息，然后在给定的（通过应用事务，对文档操作得到）新文档中，通过标签就可以将选区进行映射，之后可以在新文档中解析出真正的选区。标签一般用于实现编辑器的历史记录功能，追踪选区的变化和恢复选区。

  :bulb: 默认情况下该方法适用于获取文本选区的标签，而 `NodeSelection` 节点选区子类的实例调用该方法，可以获取节点选区的相应标签，标签类型不同。

  其返回值是一个 `selectionBookmark` 标签对象

* `visible` 属性：控制该类型的选区创建时，是否对用户可见，默认值为 `true`

  属性值的数据类型是布尔值

:electric_plug: 以上提到的一些方法中，其返回的值是一个对象，它需要符合一种**数据约束/接口 `SelectionBookmark`**，它是选区的「替身」，一般用于历史记录中追踪选区的变化和恢复选区。在调用各种类型的选区对象的方法 `selection.getBookmark()` 就会获得该选区所对应的标签对象（在不同类型的选区对应不同类型的标签，例如 ProseMirror 的其中一种内置选区 `textSelection` 文本选区对应的标签对象是 `textBookmark`）。标签对象一般具有以下方法：

  * `map(mapping)` 方法：将该标签所对应的选区执行 `mapping` 所指定的一系列变化，最后返回的依然是标签对象 `selectionBookmark`，但是它所指代的选区已经变化了。

  * `resolve(doc)` 方法：在给定的文档中解析出该标签所对应的选区，即最后返回的是一个选区对象 `selection`。:bulb: 但是在调用该方法时需要在程序中进行一些错误检查。如果标签解析映射**不**到适合的选区，它可能会回退 fall back 调用默认方法，一般是 `TextSelection.between()`

### TextSelection 子类
ProMirror 内置的选区子类 `TextSelection` 文本选区，即该选区需要在 textblock 节点中

通过 `new TextSelection($anchor, $head)` 实例化。其中第一个参数 `$anchor` 表示锚点，它是一个 `resolvedPos` 对象；第二个（可选）参数 `$head` 表示动点，它也是一个 `resolvedPos` 对象，如果 `$head` 省略或与 `$anchor` 相同，则该文本选区就只表示一个常见的光标位置。

该子类除了（通过原型继承）继承 `Selection` 超类的静态属性和方法，此外还具有一些该子类特有的静态方法和属性：

* `TextSelection.create(doc, anchor, head)` 方法：基于给定的位置创建一个文本选区

  第一个参数 `doc` 是一个 `node` 对象；第二个参数 `anchor` 是数值，表示选区的锚点位置；第三个（可选）参数 `head` 是数值，表示选区的动点位置，如果省略则默认与 `anchor` 的值相同，则创建的选区表示光标的位置。

  其返回值是一个 `textSelection` 对象

* `TextSelection.between($anchor, $head, bias)` 方法：基于给定的锚点和动点构建一个文本选区。如果给定的位置不是文本区域，则会在附近进行寻找文本选区。第三个（可选）参数 `bias` 决定优先向哪个方向寻找文本选区，默认向文本的行进方向（一般是右侧）寻找，如果参数 `bias` 为负值，则优先向文本的行进方的反方向（一般是左侧）寻找。

  :bulb: 如果没有找到适用的文本选区，会回退使用超类的静态方法 `Selection.near()` 来寻找选区

  其返回值是一个 `selection` 对象（不一定是 `textSelection` 对象）

该类的实例 `textSelection` 是一个文本选区对象，除了继承 `Selection` 超类的一些属性和方法，还具有一个该子类特有的属性

* `$cursor` 属性：如果该文本选区是一个空的选区（无内容）则返回一个 `resolvePos` 对象表示光标的位置相关信息；否则返回 `null`

   其返回值是一个 `resolvePos` 对象或 `null`

### NodeSelection 子类
ProseMirror 内置的选区子类 `NodeSelection` 节点选区，即该选区需要选中单一的一个 `node` 节点。

该子类的实例 `nodeSelection` 节点选区，从超类 `Selection` 所继承的属性 `from` 和 `to` 分别表示当前选中节点 `node` 的开始和结束位置，而属性 `anchor` 锚点与 `from` 相等，属性 `head` 动点与 `to` 相等。

:bulb: 所有在数据类型约束 schema 中将 `selectable` 属性设置为 `true` 的节点，都可以被选中

通过 `new NodeSelection($pos)` 实例化创建一个节点选区。参数 `$pos` 是一个 `resolvedPos` 对象，会基于在该位置的节点创建一个选区 :warning: 但不能保证入参 `$pos` 所指示的位置就包含一个节点。

该子类除了（通过原型继承）继承 `Selection` 超类的静态属性和方法，此外还具有一些该子类特有的静态方法和属性：

* `NodeSelection.create(doc, from)` 方法：基于给定的位置 `from` 在文档 `doc` 中创建一个节点选区

  第一个参数 `doc` 是一个 `node` 对象，第二个参数 `from` 是数值

  其返回值是一个 `nodeSelection` 节点选区对象

* `NodeSelection.isSelectable(node)` 方法：判断给定的节点 `node` 是否可被选中

  其入参是一个 `node` 对象

  其返回值的数据类型是布尔值

### AllSelection 子类
ProseMirror 内置的选区子类 `AllSelection` 全文档选区，即该子类的实例表示选中整个文档。

:bulb: 构造这个子类，是由于很多时候不能通过实例化 `TextSelection` 子类来表示全文档选区，因为文档中可能含有节点选区

通过 `new AllSelection(doc)` 实例化创建一个全文档选区，参数 `doc` 是一个表示文档的 `node` 对象

## Plugin 类
ProseMirror 支持插件系统来扩展编辑器的功能。

通过 `new Plugin(spec)` 实例化一个插件，其中入参 `spec` 对象包含插件的详细配置信息，需要满足 `PluginSpec` 接口的约束。

:electric_plug: `PluginSpec` 接口需要满足以下数据结构的约束：

  * `props`（可选）属性：其值是一个满足 `EditorProps` 接口约束的对象，包含一些用于配置编辑器视图的属性 view props。

    :electric_plug: `EditorProps` 接口对于数据结构的具体约束，可以参考 prosemirror-view 模块

    :bulb: 如果属性值以函数（最后返回一个符合 `EditorProps` 接口约束的对象）的形式来设置，则函数内的 `this` 指向该插件实例

  * `state`（可选）属性：其值是一个满足 `StateField` 接口约束的对象，该属性是用于设置插件特有的状态，包括状态值的初始化，和如何应用事务 transaction，已经序列化为 JSON 或反序列化从 JSON 中读取状态。

    :electric_plug: `StateField` 接口需要满足以下数据结构的约束：

      * `init(config, instance)` 方法：该方法用于初始化插件的状态值。第一个参数 `config` 是在编辑器初始化时传递给方法 `EditorState.create(obj)` 的对象，即包含了编辑器的配置信息；第二个参数 `instance` 是编辑器的状态实例 `state`

        其返回值可以是任何数据类型，作为插件状态的初始值。

        :warning: 但是这个状态并不「完整」，因为编辑器的插件是依序注册的，所以该状态实例 `state` 并不包含在当前插件之后才注册的插件的信息，所以这是一个**半初始化**的编辑器状态实例

      * `apply(tr, value, oldState, newState)` 方法：该方法用于设置如何将给定的事务 `tr` 应用到插件的状态，以生成一个新的状态。第一个参数 `tr` 是一个 `transaction` 事务对象；第二个参数 `value` 是该插件的当前状态的值；第三个和第四个参数 `oldState` 和 `newState` 分别是应用事务前后的编辑器状态实例 `state`

        其返回值是应用完事务后插件的状态值，与插件状态初始值的数据类型相同。

        :warning: 这里的 `newState` 也是一个**半初始化**的编辑器状态实例

      * `toJSON(value)`（可选）方法：该方法用于设置如何将插件的状态序列化为 JSON 对象，如果不设置该方法，则该插件的状态值无法序列化为 JSON。参数 `value` 是插件的状态值

        其返回值可以是任意类型

      * `fromJSON(config, value, state)`（可选）方法：该方法用于设置如何将 JSON 对象反序列化为插件的状态。第一个参数 `config` 是在编辑器初始化时传递给方法 `EditorState.create(obj)` 的对象，即包含了编辑器的配置信息；第二个参数 `value` 是任意值；第三个参数 `state` 是编辑器的状态实例

        :warning: 这里的 `state` 也是一个**半初始化**的编辑器状态实例

    :bulb: 如果属性值以函数（最后返回一个符合 `StateField` 接口约束的对象）的形式来设置，则函数内的 `this` 指向该插件实例

  * `key`（可选）属性：该插件的标识符，其值是一个 `pluginKey` 对象。编辑器所注册的插件中，它们的标识符是不能重复的，即每一个带有标识符的插件，它们的标识符都应该是唯一的。可以仅通过标识符（而不需要访问插件实例对象）获取相应插件的配置、特有状态。

    :package: 通过 `new PluginKey(name)` 实例化创建一个插件标识符对象。该对象具有以下方法和属性：

      * `get(state)` 方法：从给定的编辑器状态对象 `state` 中获取该标识符所对应的插件。参数 `state` 是编辑器的状态实例。

        其返回值是相应的插件实例 `plugin`（也可能无法找到，则返回 `undefined`）

      * `getState(state)` 方法：从给定的编辑器状态对象 `state` 中获取该标识符所对应的插件的特有状态值。

        其返回值是相应插件的特有状态值（也可能无法找到相应的插件，则返回 `undefined`）

  * `view`（可选）属性：当需要在编辑器上添加可视元素，或与编辑器的视图进行交互时，可以设置该属性。该属性值是一个函数 `fn(editorView)`，入参 `editorView` 是一个编辑器视图对象。当插件的特有的状态与编辑器的视图对象相关时，该函数就会被调用。

    属性值是一个函数，该函数的返回值是一个对象，需要具有以下（可选）属性：

    * `update`（可选）属性：其值是一个函数 `fn(view, preState)` 每当编辑器的视图更新时，会调用该函数。参数 `view` 是编辑器的视图对象 `editorView`；参数 `preState` 是编辑器的状态实例对象 `state`

    * `destroy`（可选）属性：其值是一个函数 `fn()` 当编辑器的视图被销毁时，或当编辑器的状态对象被重新配置而 `plugins` 属性不包含该插件时，该函数被调用。

  * `filterTransaction`（可选）属性：用于筛选控制哪一些事务可以应用到编辑器的状态中。该属性值是一个函数 `fn(transaction, state)`，第一个参数 `transaction` 是一个事务对象，第二个参数 `state` 是编辑器的状态实例对象。该函数会在事务应用到编辑器状态前调用，以筛选控制哪些事务可以起作用。

    属性值是一个函数，如果该函数的返回值是 `false` 则取消该事务，不会应用到编辑器的状态中。

  * `appendTransaction`（可选）属性：该方法可以让插件添加一个事务，到即将应用到编辑器的状态对象中的一系列事务的末尾。该属性值是一个函数 `fn(transactions, oldState, newState)`，第一参数 `transactions` 是一个由一系列即将应用到编辑状态对象的事务构成的数组，第二个参数和第三个参数 `oldState` 和 `newState` 编辑器的状态对象。

    属性值是一个函数，如果该函数的返回值是一个 `transaction` 事务对象，则将其插入到事务队列的末尾。

### 插件对象
插件实例 `plugin` 具有以下属性和方法：

* `props` 属性：该插件对于编辑器视图的配置。

  属性值的数据类型是一个对象，满足 `EditorProps` 接口的约束

  :electric_plug: `EditorProps` 接口对于数据结构的具体约束，可以参考 prosemirror-view 模块

* `spec` 属性：该插件的详细配置信息。

  属性值的数据类型是一个对象，满足 `PluginSpec` 接口的约束

* `getState(state)` 方法：获取该插件的特有的状态（该值是从编辑器的状态对象中抽取的，由于插件的状态也是编辑器状态对象的一部分）。入参 `state` 是编辑器的状态实例对象

