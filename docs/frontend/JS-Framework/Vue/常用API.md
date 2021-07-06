# 常用API
参考：
* [API](https://cn.vuejs.org/v2/api/)
* [Vue 出一個電商網站](https://www.udemy.com/course/vue-hexschool/)

## mixin
混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能（也可以在 Vue 实例中使用 mixin）。

可复用的代码（一般时组件的属性）包含在一个对象中，然后在组件中使用属性 `mixins`（一个数组，其中每个元素表示一个 mixin，因此一个组件可以使用多个混入 mixin）引入这些混入对象。

:bulb: 当组件和混入对象含有同名选项时，如数据对象中存在同名属性，会在内部会进行递归「合并」，并在发生冲突时以组件数据优先。

```js
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

## extends
为了可以在组件中复用部分代码/功能，和 mixins 类似，使用 Vue API 提供的方法 `Vue.extend()` 声明需要用于拓展/复用的部分（选项对象的属性），再在组件中使用属性 `extends` 引入可复用的内容。

:bulb: 对于选项对象中只能有单一值的属性，如果在组件和拓展中均有定义，就会被组件的属性覆盖；如果可以有多个值（属性值为数组）则组件和拓展中的值混合。

```js
// 复用的代码
var newExtend = Vue.extend({
  data: function () {
    return {
      data: {},
      extendData: '這段文字是 extend 得到'
    }
  },
  template: '#row-component',
  mounted: function () {
    console.log('Extend:', this)
  }
})

// 组件 childOne
var childOne = {
  props: ['item'],
  extends: newExtend,   // 引入复用的代码
}

// 组件 childTwo
var childTwo = {
  props: ['item'],
  // 该属性与拓展的同名属性混合
  data: function() {
    return {
      childTwo: '元件 2',   // 组件添加的数据
      extendData: '這段文字是 元件 得到',   // 覆盖掉拓展中的值
      }
  },
  template: '#row-component-two',   // 覆盖掉拓展中的值
  extends: newExtend,   // 引入复用的代码
  // 与拓展同名属性混合（依次执行函数）
  mounted: function() {
    console.log('childTwo')
  }
}
```

:bulb: 也允许只在组件内使用属性 `extends` 声明扩展另一个组件或是一个简单的选项对象或构造函数，而无需先在基础（扩展的内容上）使用 `Vue.extend`，这主要是为了便于扩展单文件组件。

```js
var CompA = { ... }

// 在没有调用 `Vue.extend` 时候继承 CompA
var CompB = {
  extends: CompA,
  ...
}
```

## filter
Vue.js 允许你自定义过滤器，可被用于一些常见的文本格式化。

过滤器可以用在两个地方，双花括号 `{{ }}` 插值和 `v-bind` 表达式（后者从 2.1.0+ 开始支持）。过滤器应该被添加在 JavaScript 表达式的**尾部**，**由「管道」符号 `|` 指示**，过滤器前方的值会作为 `filter` 函数的输入参数，处理返回的值就会替代原来的值显示在页面上。

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```

在组件的选项对象属性 `filters` 设定本地的过滤器，其属性值是一个对象，其中属性的值就是过滤器函数，这些过滤器只能在相应的组件中使用；也可以使用 Vue API `Vue.filter()` 中（在 Vue 实体上）定义全局过滤器，这样在挂载了该 Vue 实例的 DOM 中都可以使用这些过滤器。

本地过滤器
```js
// ...
// 组件
filters: {
  // 过滤器 capitalize 将传递进来的字符串首字母大写，并返回该字符串
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

全局过滤器
```js
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  // ...
})
```

:warning: 当全局过滤器和局部过滤器重名时，会采用局部过滤器。

:bulb: 可以设置多个过滤器对一个数据依次进行相应的处理，输出的最终结果会替代原有的值显示在页面上。

```html
<div id="app">
  <ul>
    <!-- 依次使用两个过滤器，为数值添加千分号，而且在数值前添加美元符号 -->
    <li v-for="item in data">{{ item.name }} - {{ item.icash | currency | dollarSign}}</li>
  </ul>
</div>

<script>
// 过滤器 currency
Vue.filter('currency', function(n) {
  return n.toFixed(2).replace(/./g, function (c, i, a) {
    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  });
})

// 过滤器 dollarSign
Vue.filter('dollarSign', function(n) {
  return `$ ${n}`;
})

var app = new Vue({
  el: '#app',
  data: {
    data: [
      {
        name: '小明',
        cash: 100,
        icash: 500,
      },
      {
        name: '老媽',
        cash: 10000,
        icash: 100,
      },
    ]
  },
});
</script>
```

## set
一般推荐在 Vue 实例的 `data` 中声明所有顶级响应值（如果是通过 ajax 等方法延后获取的数据，也需要预先在 `data` 中声明接收的变量），因为在声明实体时向 `data` 添加的属性的值是通过 `get`/`set` 来获取/设置的，因此绑定了该数据的视图可以在数据变动时实现响应式的更新。

而以后通过普通赋值，如 `this.data.newProperty = 'hi'`，为 `data` 添加新属性 Vue 是无法探测普通的新增 property/value，即在页面中绑定这些属性后（实际上是不能绑定的这些「静态」数据并显示出来的）不会具有响应式的功能。

如果希望在实例声明后，再向对象添加一个新的 property，并确保这个它同样是响应式的，即绑定属性的视图在数据修改是可以响应式地更新，必须采用 Vue API `$set()`，而不是简单地向对象属性赋值

```js
Vue.set(target, propertyName/index, value)
```

参数说明：

- `{Object | Array} target` 需要新增属性的对象
- `{string | number} propertyName/index` 新增的属性名，字符串
- `{any} value` 新增的数据/属性值

```html
<div id="app">
  <p>添加新数据</p>
  <div v-if="newData.item">{{ newData.item }}</span>
  <button @click="add()">点击按钮添加新数据</button>
</div>

<script>
var app = new Vue({
  el: '#app',
  data: {
    newData: {}
  },
  methods: {
    add: function() {
      // 向数据对象的属性 newData 添加属性 item，属性值是字符串 this is new
      this.$set(this.newData, 'item', 'this is new');
    }
  },
});
</script>
```

:warning: 参数 `target` [不能是 Vue 实例](https://cn.vuejs.org/v2/guide/migration.html#Vue-实例上的-Vue-set-和-Vue-delete-移除)或者 Vue 实例的根数据对象 `data`，而只能是数据对象其中的属性（而且属性值是对象或数组）。

## directive
Vue 指令 Directives 是带有 `v-` 前缀的特殊 HTML 特性 attribute，除了核心功能默认内置的指令（如 `v-model` 和 `v-show` 等），Vue 也允许注册自定义指令，借此允许开发者对普通 DOM 元素进行底层操作。

使用方法 `Vue.directive(name, {})` 注册一个名为 `name` 的全局自定义指令，然后在 HTML 元素的开始标签中添加 `v-name` 以使用该指令。也可以在组件中使用属性 `directives` 声明局部指令，然后在 HTML 组件标签中使用该自定义指令。

```html
// 使用自定义指令
<input v-focus>

<script>
// 注册一个全局自定义指令 v-focus
// 起作用是在页面/Vue 实例加载时「聚焦」到应用了该指令的 DOM 元素
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

// 局部指令
// 组件
// ...
// directives: {
//   focus: {
//     // 指令的定义
//     inserted: function (el) {
//       el.focus()
//     }
//   }
// }
</script>
```

当我们需要通过指令在特定的 Vue 生命周期对 DOM 执行操作，可以使用 Vue 提供的钩子函数

- `bind`：只在指令第一次绑定到元素时调用，可以在此钩子函数中进行初始化设置。
- `inserted`：当被绑定元素插入父节点时调用（仅保证父节点存在，但不一定已被插入文档中）
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有，可以通过比较更新前后的值来忽略不必要的模板更新。
- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新时调用
- `unbind`：只调用一次，指令与元素解绑时调用

使用钩子函数时会传入相应的参数，以操作当前绑定的 DOM 节点对象。不同的勾着函数可以接收的参数类似，:warning: 除了参数 `el` 之外，其它参数都应该是只读的，切勿进行修改。

- 参数 `el`：指令所绑定的 DOM 元素节点。
- 参数`binding`：一个关于指令在绑定 HTML 元素时相关信息的对象，包含以下 property
    - `name`：指令名，不包括 `v-` 前缀
    - `value`：指令的绑定值，如指令以 `v-my-directive="1 + 1"` 的形式应用在 HTML 元素上时，绑定值为 `2`
    - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用
    - `expression`：字符串形式的指令表达式，如指令以 `v-my-directive="1 + 1"` 的形式应用在 HTML 元素上时，表达式为 `"1 + 1"`
    - `arg`：传给指令的（可选）参数，如指令以 `v-my-directive:foo` 的形式应用在 HTML 元素上时，参数为 `"foo"`
    - `modifiers`：一个包含修饰符的对象，如指令以 `v-my-directive.foo.bar` 的形式应用在 HTML 元素上时，修饰符对象为 `{ foo: true, bar: true }`
- 参数`vnode`：Vue 编译生成的[虚拟节点](https://cn.vuejs.org/v2/api/#VNode-接口)，通过该参数可以获取指令所在的 Vue 实例的相关信息，如访问其数据对象
- 参数`oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用

:bulb: 在很多时候可能想自定义指令在生命周期 `bind` 和 `update` 时触发的相同行为，而不关心其它的钩子函数，则可以在声明自定义指令时，其第二个参数对象可以简写为函数形式

```js
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```