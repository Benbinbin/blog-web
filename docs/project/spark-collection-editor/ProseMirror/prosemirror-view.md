---
show: true
summary: ProseMirror is a toolkit for building rich-text editors on the web. It contains many low-level modules to make a highly customized web editor.
tags:
  - editor
  - development log
---

# prosemirror-view 模块
该模块主要用于将编辑器状态对象 state 展示在页面（渲染为 DOM），并处理用户与编辑器的交互事件。

:bulb: 如果使用该模块，请确保在页面中引入了 `style/prosemirror.css` 样式表，以提供必要的外观设置

## EditorView 类
通过实例化 `EditorView` 类可以为编辑器创建一个视图对象 `view`，它的主要功能是对可编辑文档的 editable DOM 节点的行为进行管理

```js
new EditorView(place, props)
```

第一个（可选）参数 `place` 用于指定将编辑器添加到页面的哪个位置。该属性值是一个 DOM 节点，或返回 DOM 节点的一个函数，或一个含有 `mount` 属性（其值是一个 DOM 节点）的对象，该参数指定的 DOM 节点会作为编辑器的容器。如果不指定一个 DOM 节点或该参数的值为 `null`，则编辑器就不会添加到页面上。

第二个参数 `props` 是视图对象的配置参数，用于设置编辑器视图相关的状态和行为。该参数的值是一个对象，它需要符合一种数据约束/接口 `DirectEditorProps`。

:electric_plug: `DirectEditorProps` 接口继承了 `EditorProps` 接口对于数据结构的约束，此外还需要满足以下额外的数据结构的约束：

  > :bulb: 该接口的约束适用于配置视图对象，但**不**适用于配置（在 prosemirror-state 模块中定义的，用于编辑器状态中的）[插件](./prosemirror-state.md#plugin-类)）

  * `state` 属性：编辑器当前的状态对象

  * `plugins` 属性：设置应用在视图对象中的插件。

    该属性值是一个由一系列的 `plugin` 插件对象构成的数组。会将这些插件配置中的 `view` 属性和 `props` 属性应用到编辑器的视图中。

    :warning: 如果插件配置中设置了 `state` 属性，或 `filterTransaction` 属性，或 `appendTransaction` 属性，都不能作为视图对象的插件，这些插件只能在编辑器的状态对象中注册应用，否则会报错。

  * `dispatchTransaction` 属性：用以设置当视图对象分发事务时，需要执行的一些额外处理。

    该属性值是一个函数 `fn(tr)` 入参 `tr` 是一个事务对象。在视图对象分发一个事务 dispatch transaction 时，在事务应用到编辑器的状态对象**前**，**该函数会先被执行一次**，参数就是视图对象所分发事务。:warning: 请保证该函数最后执行了 `this.updateState(state)` 方法，其入参 `state` 是应用了事务 `tr` 后产生的新的编辑器状态对象，其中 `this` 指向视图对象。

:electric_plug: `EditorProps` 接口需要满足以下数据结构的约束：

  > :bulb: 该约束适用于配置视图对象，也适用于配置（在 prosemirror-state 模块中定义的，用于编辑器状态中的）[插件](./prosemirror-state.md#plugin-类)

  > :bookmark: 以下不同的 prop 的执行方式不同。
  >
  > 对于以 `handler` 为前缀的属性是用于设置相应事件的处理函数，当事件分发时每次只能有一个处理函数在执行，会先执行在视图对象中设置的相应事件处理函数；然后如果（在 prosemirror-state 模块中定义的，用于编辑器状态中的）插件中也设置了相应的事件处理函数，会根据插件注册的先后顺序，依次执行，**直到其中一个事件处理函数返回 `true` 为止**，表示该事件已处理。
  >
  > 而对于其他 prop 如果在多个插件中都进行了配置，会采用第一个设置值。

  > :bookmark: 以下这些以 `handle` 为前缀的属性，用于设置事件处理函数，应该**在最后返回 `true`** 以表示它们处理了相应的事件。

  * `handleDOMEvents`（可选）属性：用于设置一系列 DOM 事件的处理函数。

    该值是一个对象，其中每个属性都是用于设置不同 DOM 事件的处理函数。属性名是 DOM 事件名称（具体可以设置哪些 DOM 事件，可以查看这个[列表](https://developer.mozilla.org/en-US/docs/Web/API/Event)），属性值就是该事件的处理函数 `fn(view, event)` 第一个参数 `view` 是视图对象；第二个参数 `event` 是当前分发的事件对象。

    这些事件处理函数**最后应该返回一个布尔值**，以表示是否处理了相应的事件。


  > :bookmark: 通过以上属性所设置的事件处理函数，与以下一系列以 `handle` 为前缀的属性不同（虽然它们都是事件处理函数）。
  >
  > 可以理解为上面的方法可以设置的事件处理函数范围更广，而且当相应的事件分发时，通过以上属性所设置的处理函数会**先调用**，（假如还通过以下的属性，设置了相应的事件处理函数）之后才调用 Prosemirror 针对该事件的处理函数。
  >
  > 另一个不同点是，通过以上属性所设置的事件处理函数，并没有针对事件的默认行为进行处理，如果需要阻止事件的默认行为，需要在事件处理函数中设置 `preventDefault`；而接着以下这些以 `handle` 为前缀的属性所设置的事件处理函数，被调用前视图对象会自动先调用 `preventDefault` 以阻止事件触发浏览器的相关默认行为（即让编辑器在接收到用户的交互时，仅通过 Prosemirror 来处理）。

  > :bookmark: 接着以下这些以 `handle` 为前缀的属性，用于设置 Prosemirror 如何处理一些编辑器常见的事件。

  * `handleKeyDown`（可选）属性：设置当编辑器接收到 `keydown` 事件时，Prosemirror 对该事件的处理。

    该属性值是一个函数 `⁠fn(view, event)` 第一个参数 `view` 是视图对象；第二个参数 `event` 是 `keydown` 事件对象。函数最后应该返回一个布尔值。

  * `handleKeyPress`（可选）属性：设置 `keypress` 事件的处理函数。

    该属性值是一个函数 `⁠fn(view, event)` 第一个参数 `view` 是视图对象；第二个参数 `event` 是 `keypress` 事件对象。函数最后应该返回一个布尔值。

  * `handleTextInput`（可选）属性：设置 `input` 事件的处理函数。该函数会在输入内容应用到页面 DOM 节点**之前**先执行。

    该属性值是一个函数 `fn(view, from, to, text)` 第一个参数 `view` 是视图对象；第二、三个参数 `from` 和 `to` 是数值，表示输入文本（字符）在编辑器中的[位置](https://codesandbox.io/s/prosemirror-example-qzhtb)；第四个参数 `text` 是字符串，表示用户输入的文本。

    函数最后应该返回一个布尔值，如果返回 `true` 则 Prosemirror 会阻止 `input` 事件的默认行为。:bulb: 该方法一般用于**拦截输入**，以便根据用户的原始输入内容生成相应的内容，例如自动转换 markdown 语法，自动填充等。

  * `handleClickOn`（可选）属性：设置 `click` 事件的处理函数。

    当编辑器内容中的一个节点被点击时，在 `click` 事件冒泡（从内到外）过程中，经过的节点会依次调用该处理函数 `⁠fn(view, pos, node, nodePos, event, direct)` 各参数的说明如下：

      * 第一个参数 `view` 是视图对象
      * 第二个参数 `number` 是点击位置（光标）在编辑器中的位置
      * 第三个参数 `node` 是事件冒泡过程当前到达的节点对象
      * 第四个参数 `nodePos` 是当前节点在编辑器中的位置
      * 第五个参数 `event` 是 `click` 事件对象
      * 第六个参数 `direct` 是一个布尔值，表示当前节点是否为正好被点击的（即最内层的）节点

    函数最后应该返回一个布尔值。

  * `handlerClick`（可选）属性：也是设置 `click` 事件的处理函数。

    该属性值是一个函数 `fn(view, pos, event)` 各参数的说明如下：

      * 第一个参数 `view` 是视图对象
      * 第二个参数 `pos` 是点击位置（光标）在编辑器中的位置
      * 第三个参数 `event` 是 `click` 事件对象

    :bulb: 与 `handleClickOn` 属性所设置的事件处理函数有点不同，即该属性的事件处理函数是在编辑器被点击后执行一次，且在 `handleClickOn` 属性所设置的事件处理函数调用完之后才执行。

    函数最后应该返回一个布尔值。

  * `handleDoubleClickOn`（可选）属性：设置 `dblclick` 事件的处理函数。

    :bulb: 该处理函数 `fn(view, pos, node, nodePos, event, direct)` 入参和行为与 `handleClickOn` 属性所设置的处理函数类似

  * `handleDoubleClick`（可选）属性：也是设置 `dblclick` 事件的处理函数。

    :bulb: 该处理函数 `fn(view, pos, event)` 入参和行为与 `handleClick` 属性所设置的处理函数类似

  * `handleTripleClickOn`（可选）属性：设置连续三次点击编辑器时的事件处理函数。

    :bulb: 该处理函数 `fn(view, pos, node, nodePos, event, direct)` 入参和行为与 `handleClickOn` 属性所设置的处理函数类似

  * `handleTripleClick`（可选）属性：也是设置连续三次点击编辑器时的事件处理函数。

    :bulb: 该处理函数 `fn(view, pos, event)` 入参和行为与 `handleClick` 属性所设置的处理函数类似

  * `handlePaste`（可选）属性：设置当编辑器接收到粘贴事件时，Prosemirror 对该事件的处理。

    该属性值是一个函数 `fn(view, event, slice)` 各参数的说明如下：

      * 第一个参数 `view` 是视图对象
      * 第二个参数 `event` 是粘贴事件对象
      * 第三参数 `slice` 是经编辑器解析所获得的粘贴内容，其值是一个 `slice` 对象（:package: 具体可以参考 prosemirror-model 模块）。

    函数最后应该返回一个布尔值。

    :bulb: 通过该属性可以自定义编辑器的粘贴行为。如果希望获取（剪切板）粘贴的原始内容，可以通过访问粘贴事件对象 `event.clipboardData.getData()` 来获取

  * `handleDrop`（可选）属性：设置当编辑器接收到 `drop` 事件时，Prosemirror 对该事件的处理。

    该属性值是一个函数 `fn(view, event, slice, move)` 各参数的说明如下：

      * 第一个参数 `view` 是视图对象
      * 第二个参数 `event` 是拖放事件对象
      * 第三参数 `slice` 是经编辑器解析所获得的拖放内容，其值是一个 `slice` 对象（:package: 具体可以参考 prosemirror-model 模块）
      * 第四个参数 `move` 是一个布尔值，以表示拖放的内容是否源于编辑器内，如果值为 `true` 即表示拖拽移动的内容是编辑器当前选区，这样在移动后，原来的内容应该被移除，实现编辑器的内容从一个位置移动到另一个位置的效果。

    函数最后应该返回一个布尔值。

    :bulb: 通过该属性可以自定义编辑器的拖放行为。

  * `handleScrollToSelection`（可选）属性：当视图对象更新完成时，是否将编辑器的选区滚动到视窗中。

    该属性值是一个函数 `fn(view)` 入参 `view` 是视图对象。

    函数最后应该返回一个布尔值，如果为 `true` 就表示执行滚动；如果为 `false` 表示不执行滚动，可能由其他事件处理函数，或事件触发的浏览器的默认行为来进行处理。

  * `createSelectionBetween`（可选）属性：根据给定的锚点和动点，在编辑器中创建一个选区。

    该属性值是一个函数 `⁠fn(view, anchor, head)` 各参数的说明如下：

      * 第一个参数 `view` 是视图对象
      * 第二、三个参数 `anchor` 和 `head` 分别表示选区的锚点和动点，它们的值都是 `resolvedPos` 对象（:package: 具体可以参考 prosemirror-model 模块）

    :bulb: 通过该属性可以自定义编辑器的内容框选行为。

  * `domParser`（可选）属性：设置编辑器的 DOM 解析器。

    当 editable DOM 改变时，编辑器就会使用该解析器读取页面内容，并转换为编辑器可识别的格式。

    该属性值的数据类型是一个 `domParser` 对象（:package: 具体可以参考 prosemirror-model 模块）

    :bulb: 默认采用在编辑器的 schema 中配置的解析器的属性 `domParser.fromSchema` 来读取 DOM（:package: 具体可以参考 prosemirror-model 模块）

  * `transformPastedHTML`（可选）属性：设置编辑器的 HTML 文本转换器。

    该属性值是一个函数 `fn(html)` 入参 `html` 是 HTML 格式的字符串。

    最后函数返回值是一个字符串。

    如果往编辑器粘贴 HTML 格式的文本时，在编辑器解析这些内容**前**，会先调用该转换器，对内容进行前期「清洗」操作。

  * `transformPastedText`（可选）属性：设置编辑器的纯文本转换器。

    该属性值是一个函数 `fn(text, plain)` 第一个参数 `text` 是粘贴的字符串；第二个参数 `plain` 是一个布尔值，如果粘贴的内容是纯文本，该值就为 `true`

    最后函数返回值是一个字符串。

    如果往编辑器粘贴纯文本时，在编辑器使用 `clipboardTextParser` 属性所设置的 parser 解析这些内容**前**，会先调用该转换器，对内容进行前期「清洗」操作。

  * `clipboardParser`（可选）属性：设置编辑器的剪切板解析器。

    该属性值的数据类型是一个 `domParser` 对象（:package: 具体可以参考 prosemirror-model 模块）用于从剪切板读取内容。

    :bulb: 如果不设置该属性，则默认采用 `domParser` 属性所设置的解析器来读取剪切板的内容。

  * `clipboardTextParser`（可选）属性：也是设置编辑器的剪切板解析器，但针对的内容格式是纯文本。

    该属性值是一个函数 `fn(text, $context, plain)` 各参数的说明如下：

      * 第一个参数 `text` 是字符串，剪切板中需要解析的内容
      * 第二个参数 `$context` 是一个 `resolvedPos` 对象（表示光标的位置 :question:）（:package: 具体可以参考 prosemirror-model 模块）
      * 第三个参数 `plain` 是一个布尔值，如果剪切板的内容是纯文本，则该值为 `true`

    该函数的返回值是一个 `slice` 对象（:package: 具体可以参考 prosemirror-model 模块），即将剪切板的纯文本内容解析为编辑器的文档内容片段 `slice`

    :bulb: 该解析器会在 `transformPastedText` 属性所设置的转换器执行完成后，再运行。其默认行为是为纯文本的每个段落包裹进 `<p>` 标签内。然后再调用 `clipboardParser` 属性所设置的 parser 来解析这些 HTML 文本。

  * `transformPasted`（可选）属性：设置一个粘贴内容转换器。

    该属性值是一个函数 `fn(slice)` 入参是一个 `slice` 对象（:package: 具体可以参考 prosemirror-model 模块），经过转换后，最后返回的也是一个 `slice` 对象

    :bulb: 该属性所设置的转换器是在内容应用到编辑器前起作用的。

  * `nodeViews`（可选）属性：用于为一系列 `node` 节点或 `mark` 样式标记设置自定义的渲染展示方式和交互行为方式。

    > :speaker: 这里将 `nodeView` 翻译为**节点视图层**，虽然名称上只含有 `node` 但同样可用于配置 `mark`。

    该值是一个对象，其中每个属性都是用于设置不同的节点视图层。属性名是 `node` 节点名称或 `mark` 样式标记名称，属性值就是该节点或样式标记的构造函数 `fn(node, view, getPos, decorations, innerDecorations)` 各参数的说明如下：

      * 第一个参数 `node` 是该节点对象或样式标记对象
      * 第二个参数 `view` 是编辑器的视图对象
      * 第三个参数 `getPos` 其值有不同的数据类型。如果当前的是节点的构造函数，则该参数的值是一个函数 `fn()` 用以获取该节点在编辑器中的位置，其返回值是一个表示节点位置的数值；如果当前的是样式标记的构造函数，则该参数的值是一个布尔值，表示该样式标记是否应用于行内 inline
      * 第四个参数 `decorations` 是一个由一系列节点或行内装饰器对象 `decoration`（:package: 具体可以参考 prosemirror-model 模块）构成的数组。这一系列的装饰器会在该**节点周围**激活，用于修饰该节点

        :bulb: 有时候并不想将装饰器渲染到页面中，也可以通过它们为节点视图 `nodeView` 提供一些额外的信息。例如在创建插件时，可以通过其配置参数的 `decorations` 属性设置一些额外的信息，然后相应的 `nodeView` 节点视图层可以获取这些信息 :question:

      * 第五个参数 `innerDecorations` 是一个对象，称为**节点内部**的装饰器，可用于修饰节点的内容，它需要符合一种数据约束/接口 `DecorationSource`

        :electric_plug: `DecorationSource` 接口所约束的对象需要具有一个 `map(mapping, node)` 方法，第一个参数 `mapping` 是一个对象（:package: 具体可以参考 prosemirror-transform 模块）；第二个参数 `node` 是一个节点对象（:package: 具体可以参考 prosemirror-model 模块）。

        :bulb: 如果该节点视图层没有内容或没有配置 `contentDOM` 属性，则该参数可以不进行设置

      该函数的返回值是一个 `nodeView` 节点视图层对象，它需要符合一种数据约束/接口 `NodeView`

      > :bookmark: 一般情况下，文档的节点如何渲染到页面，是由编辑器的 schema 配置对象中的 `toDOM` 方法来决定的（:package: 具体可以参考 prosemirror-model 模块），但是如果我们希望（通过插件）更精细地配置节点在页面的展现形式，可以**通过为该节点设置一个 `nodeView` 节点视图层，自定义该节点的渲染与交互模式**。

      :electric_plug: `NodeView` 接口需要满足以下数据结构的约束：

      * `dom`（可选）属性：指定该节点渲染到页面的哪个 DOM 内。

        该属性值是一个 DOM 节点，作为展现该编辑器节点的容器。如果不设置该属性，则 Prosemirror 会默认为该编辑器节点创建一个 DOM 节点。

      * `contentDOM`（可选）属性：指定节点内容渲染到哪个 DOM 内。

        当设置了该属性时，Prosemirror 会将该编辑器节点的子节点渲染到该指定的 DOM 内；如果没有设置该属性，则节点视图层会自己决定是否渲染该编辑器的子节点

        :bulb: 这个属性需要在设置了上一个属性 `dom`，且该编辑器的节点**不**是叶子节点才生效

      :warning: 对于样式标记 `mark` 的节点视图层 `nodeView`，只具有以上 `dom` 和 `contentDOM` 这两个属性，以下所述的 `nodeView` 中的方法都不支持。

      * `update`（可选）属性：控制该节点视图层是否可以更新。

        该属性值是一个函数 `fn(node, decorations, innerDecorations)` 各参数的说明如下：

        * 第一个参数 `node` 是该节点视图层所对应的节点（可以在更新时改变节点类型）
        * 第二参数 `decorations` 是一个由一系列 `decoration` 对象构成的数组，它们是在该节点周围激活的装饰器（在更新时，节点视图层会自动判断是否渲染它们）
        * 第三个参数 `innerDecorations` 是应用于节点内部的装饰器（在更新时，节点视图层会自动判断是否渲染它们）

        该函数的返回值是一个布尔值，如果返回 `true` 表示可以更新该节点视图层；如果返回 `false` 表示不能更新该节点视图层。

        :bulb: 如果该节点视图（没有 :question:)设置了 `contentDOM` 属性（或没有设置 `dom` 属性）则该节点的子节点的更新由 Prosemirror 自动处理

      * `selectNode`（可选）属性：自定义该节点被选中时的渲染展示方式。

        该属性值是一个函数 `fn()` 例如可以在该函数中为节点视图层所对应的 DOM 添加特定的样式，以凸显该节点被选中

      * `deselectNode`（可选）属性：自定义该节点取消选中时渲染展示方式。

        该属性值是一个函数 `fn()`

        :bulb: 一般是配合 `selectNode` 属性使用，用于移除在 `selectNode` 属性中设置的渲染效果。

      * `setSelection`（可选）属性：自定义在节点内选中部分内容时的交互行为。

        该属性值是一个函数 `fn(anchor, head, root)` 第一、二个参数 `anchor` 和 `head` 是数值，分别表示选区相对于该节点的锚点和动点位置；第三个参数 `root` 是该选区所在的 DOM 节点。

        :bulb: 当用户选中 DOM 节点的部分内容时会创建一个 DOM 选区，但通过该属性可以覆盖这个默认行为。

      * `stopEvent`（可选）属性：用以阻止某些事件冒泡，可以拦截该节点视图层所接收到的事件，让它们**不**被编辑器处理。

        该属性值是一个函数 `fn(event)` 入参 `event` 是该节点视图层所接收到的事件对象。

        该函数的返回值是一个布尔值，如果为 `true` 则阻止事件冒泡。

      * `ignoreMutation`（可选）属性：用于设置编辑器是否忽略 DOM 变化。

        该属性值是一个函数 `fn(dom.MutationRecord)` 入参是一个 [DOM 的变化记录](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord)。当 DOM 变化时，或节点视图层内的选区变化时（此时 DOM 的变化记录的 `type` 属性值为 `selection`），会调用该函数。

        该函数的返回值是一个布尔值，如果为 `false` 则编辑器会响应 DOM 变化，重新读取选区，或重新解析发生变化的 DOM 节点；如果为 `true` 则编辑器会忽略 DOM 变化。

      * `destroy`（可选）属性：用于设置当节点视图层（或整个编辑器）销毁时，执行的一些操作。

        该属性值是一个函数 `fn()`

  * `clipboardSerializer`（可选）属性：设置 DOM 的序列化器，当从编辑器的视图复制内容到剪切板时，会调用该序列化器对内容进行序列化，再添加到剪切板中。

    该属性值是一个 `domSerializer` 对象（:package: 具体可以参考 prosemirror-model 模块），会调用其方法 `serializedFragment()` 对所复制的内容片段进行序列化。:bulb: 也可以提供一个具有类似功能的对象来实现 DOM 的序列化

    :bulb: 如果没有设置该属性，则默认采用编辑器在 schema 中设置的 `domSerializer.fromSchema` 方法对 DOM 进行序列化（:package: 具体可以参考 prosemirror-model 模块）

  * `clipboardTextSerializer`（可选）属性：当需要将编辑器视图的选中内容复制到剪切板时，获取选区的纯文本内容。

    该属性值是一个函数 `fn(slice)` 入参是由选区构成的片段对象 `slice`（:package: 具体可以参考 prosemirror-model 模块）

    :bulb: 如果没有设置该属性，则默认采用选区所在的节点的 `textBetween()` 方法获取选区的纯文本

  * `decorations`（可选）属性：为视图设置装饰器集合。

    该属性值是一个函数 `fn(state)` 入参 `state` 是编辑器的状态对象。

    该函数返回值是一个对象，它需要符合一种数据约束/接口 `DecorationSource`

  * `editable`（可选）属性：用于设置编辑器的视图是否可以操作，是否接受用户的交互，修改其内容。

    该属性值是一个函数 `fn(state)` 入参 `state` 是编辑器的状态对象。

    该函数的返回值是一个布尔值，如果为 `false` 则表示编辑器的内容**不**可以通过与视图交互直接修改

  * `attributes`（可选）属性：设置编辑器的 editable DOM 节点的属性。

    该属性值可以是一个对象，各属性名为 DOM 的 attribute 名称，属性值为 attribute 的值；也可以是一个返回一个对象的函数 `fn(state)` 入参 `state` 是编辑器的状态对象。对象中所设置的类名将以追加的方式添加到 DOM 节点上，对于其他的 attribute，则会采用第一个设定的值（例如不同插件设置了同一个 attribute，则优先注册的插件所设定的值会被采用）。

    :bulb: 页面的 editable DOM 节点默认会具有 `ProseMirror` 类名。如果在配置编辑器的视图对象时，属性 `editable` 设置为 `true` 则 editable DOM 节点会具有 `contentEditable` 属性。

  * `scrollThreshold`（可选）属性：设置当光标距离视窗底部为多少像素时，开始让页面/编辑器滚动以让光标置于视窗内。

    该属性值可以是一个数值，也可以是一个对象 `{top, right, bottom, left}` 分别设置当光标在距离视窗的四周为多少像素时开始滚动。

    :bulb: 该阈值的默认值是 `0`，所以在使用键盘的上下键在编辑器中导航时，或编辑时按下 `enter` 键换行时，当光标已经抵达视窗的底部，页面/编辑器就会滚动，让光标始终在视窗内。

  * `scrollMargin`（可选）属性：设置当页面/编辑器滚动以让光标置于视窗内，究竟滚动到何种程度，即光标应该距离视窗的底部或四周多少像素。

    该属性值可以是一个数值，也可以是一个对象 `{top, right, bottom, left}` 分别设置页面/编辑器滚动后，应该让光标距离视窗的四周为多少像素才停止滚动。

    :bulb: 默认值是 `5`，所以滚动结束时，光标默认距离视窗底部 `5` 像素

### 视图对象
