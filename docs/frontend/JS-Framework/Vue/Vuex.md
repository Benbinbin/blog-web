# Vuex
[Vuex](https://vuex.vuejs.org/zh/) 是一个专为 Vue.js 应用程序开发的**状态管理模块**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 使用**单一状态树**，即只用一个对象就包含了全部的应用层级（组件）的状态，它作为「唯一数据源」 [SSOT](https://en.wikipedia.org/wiki/Single_source_of_truth) 而存在，这也意味着每个应用将**仅仅包含一个 store 实例**。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

类似于高级的 event bus，将组件的数据「集中」在 Vuex 模块中，可以十分方便实现组件间数据传递。但是由于它隔离状态管理中的各种概念并通过强制规则维持视图和状态间的独立性，在大型项目中使得代码更结构化且易维护；但它的配置和规则繁琐，对于小型项目使用一般方式管理数据更方便，每个组件数据独立管理，组件间 `props`、`emit` 或 event bus 等方式进行信息传递。

:bulb: Vuex 也集成到 Vue 的官方调试工具 [devtools extension](https://github.com/vuejs/vue-devtools)，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

![Vuex](./images/20200602223405863_25715.png)


## 安装 Vuex
在终端输入以下代码安装 Vuex 模块

```bash
npm install vuex --save
```

:warning: Vuex 依赖 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)。如果你支持的浏览器并没有实现 Promise (比如 IE)，那么你可以使用一个 polyfill 的库，如 [es6-promise](https://github.com/stefanpenner/es6-promise)，也可以通过 CDN 将其引入：

```html
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js"></script>
```

然后在 Webpack 入口 entry 文件 `main.js` 中导入模块，并通过 `Vue.use(Vuex)` 启用它

```js
// 📁 main.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

## 核心概念
Vuex 实例 `new Vuex.Store({})` 是一个仓库 store 基本上就是一个容器，它包含着你的应用中大部分的**状态 (state)**，它和单纯的全局对象有以下两点不同：

* Vuex 的状态存储是**响应式**的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

* **不能**直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交 commit（然后 Vuex 会自动地调用 `mutation` 对象里相应的方法修改 `state` 中的数据）**。这样使得我们可以方便地跟踪每一个状态的变化，如使用 Vue 的官方调试工具 [devtools extension](https://github.com/vuejs/vue-devtools) 查看每一次 `commit` 对应的组件（数据）状态变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用

:warning: 如果 `state` 中存储的数据是对象，需要在组件中使用**深拷贝** `Object.assign({}, state_object_target)` 的方式引入 vuex 仓库的数据

Vuex 实例有几个核心概念

* `state`
* `actions`
* `mutations`
* `getters`

![使用 Vuex 对组件进行状态管理](./images/20200602225020637_19393.png)

## state
`state` 该对象是存储在 Vuex 中的应用/组件的数据，和 Vue 实例中的 `data` 遵循相同的规则，如状态对象必须是[纯粹 plain](https://cn.vuejs.org/v2/api/#data) 的。**由于 Vuex 的状态存储是响应式的，如果组件要从 store 实例中读取状态最简单的方法就是使用计算属性 `computed`，并返回 `state` 中某个状态（属性）**

```vue
// 创建一个 Counter 组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}
```

上述示例代码中每当 Vuex 仓库中 `store.state.count` 变化的时候，都会重新求取计算属性，并且触发相应组件更新相关联的 DOM。

:bulb: 为了避免在每个组件都要导入创建 Vuex 实例的脚本文件，Vuex 通过 `store` 选项提供了一种机制将状态从根组件 `App.vue`「注入」到每一个子组件中

```
// 📁 App.vue
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```

通过在根实例中注册 `store` 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store` 访问到

```
// 📁 子组件 Counter
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

:bulb:使用 Vuex 并不意味着你需要将应用/组件**所有的**状态放入 Vuex。虽然将所有的状态放到 Vuex 会使状态变化更显式和易调试，但也会使代码变得冗长和不直观。如果有些状态严格属于单个组件，最好还是作为组件的局部状态，这些状态在组件的 `data` 数据对象中保存。你应该根据你的应用开发需要进行权衡和确定。

## getters

![getters](./images/20200621224839125_23363.png)

有时候我们需要从 store 中的 state 中派生出一些状态，如对列表进行过滤，Vuex 允许我们在 store 中定义 `getters`（可以认为是 store 的计算属性），getter 接受 `state` 作为第一个参数，然后在其函数内部对其进行操作，最后将运算结果作为返回值。

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    // 对列表进行过滤
    // 接受 state 作为其第一个参数
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

在任何组件中 Getter 会暴露为 `this.$store.getters` 对象的属性，可以通过访问属性的形式调用这些值

```vue
// 组件的计算属性
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodos
  }
}
```

:bulb: 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算；但[当 getter 在通过方法访问](https://vuex.vuejs.org/zh/guide/getters.html#通过方法访问)时，每次都会去进行调用，而不会缓存结果。

## mutations
更改 Vuex 的 store 中的状态（即修改 `state` 对象的属性）的唯一方法是 `commit`（提交）mutation，这是为了方便调试工具 devtool 对应用状态进行跟踪。

:warning: 另一个必要遵守的原则是 **mutation 必须是同步函数**，因为 devtools 会记录每一条 mutation，并捕捉前一状态和后一状态的快照，如果 mutation 中存在异步函数，则使得状态的改变不可追踪了。

Vuex 中的 mutation 非常类似于事件，每个 mutation 都由一个字符串的 **事件类型 type**和 一个 **回调函数  handler**构成。mutation handler 不能直接调用，而应该像是事件注册一样，由 store 的方法 `.commit()` 提交触发。

在 Vuex 的 store 中的对象  `mutations` 中声明各种 mutation，其属性名**一般使用常量，即全大写字母表示**，它类似于 **事件类型 type** ；回调函数 mutation handler 接受 `state` 作为第一个参数，在函数内会修改 `state` 对象中的属性，以更改应用的状态；第二个（可选）参数 `payload` 接收 `commit` 时传递进来的额外数据，在大多数情况下载荷应该是一个对象，这样可以包含多个字段。

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    INCREMENT (state) {
      // 变更状态
      state.count++
    }
  }
})
```

在组件中使用 `this.$store.commit(TYPE, [payload])` 提交触发特定类型 `TYPE` 的 mutation，第二个可选参数称为 载荷 `payload`，作为额外的参数传入到 mutation handler；在 store 对象的属性 `actions` 中使用 `context.commit()` 提交触发 mutation。

:warning: 在创建 store 传入 `strict: true` 开启严格模式

```
const store = new Vuex.Store({
  // ...
  strict: true
})

```

在严格模式下如果应用的状态变更不是由 mutation 引起的将会抛出错误，这能保证所有的状态变更都能被调试工具跟踪到。

## actions
Action 相当于组件的 methods，可以在组件中调用 Vuex 的 store 对象中的 action 执行特定的操作。

它类似于 mutation，不同在于：

- Action 需要通过 commit 提交 mutation 变更应用状态，而不能直接操作 `state`
- Action 可以包含任意**异步操作**

Action 函数第一个参数是固定的 `context`，它是与 store 实例具有相同方法和属性的对象，因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 `state`（但不能修改 `state`） 和 `getters`；第二个（可选）参数是 payload 载荷接收传递进来的额外数据

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
    // 提交 mutaion
      context.commit('increment')
    }
  }
})
```

在组件中通过方法 `this.$store.dispatch(actionName, [payload])` 分发 action；在 action 中调用另外的  action 可以使用 `context.dispatch(actionName, [payload])`。

:bulb: 如果需要传递多个额外参数，可以「打包」成一个对象作为载荷，这样可以包含多个字段，而在 store 的 action 中使用对象解构的方法来提取其中的各个属性值。

```vue
// 组件
// 以对象作为载荷形式分发 action，传递多个数据
this.$store.dispatch('addtoCart', { id, qty });
```

```js
const store = new Vuex.Store({
  // ...
  actions: {
    // 第二个参数接收的是对象，使用解构将该对象的每个属性值赋给相应的变量
    addtoCart(context, { id, qty }) {
      // ...
      });
    },
  },
});
```


## 辅助函数
### mapState
当一个组件需要获取多个状态的时候，将这些状态都分别声明为计算属性会有些重复和冗余，为了解决这个问题可以使用 `mapState` 辅助函数帮助我们（[有多种使用方式](https://scrimba.com/p/pnyzgAP/c8Pz7BSK)）生成计算属性。

```vue
// 组件
import { mapState } from 'vuex'

export default {
  // ...
  // 有多种方式使用 mapState 辅助函数构建组件的计算属性
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    // 计算属性重命名为 countAlias
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态（需要使用组件的数据对象 data 中有 localCount），必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

:bulb: 如果使用辅助函数 `mapState` 构造的计算属性需要与局部计算属性混合使用，由于 `mapState` 函数返回的是一个对象，我们就需要使用对象展开运算符将该对象的属性都解构。

```vue
// 组件
import { mapState } from 'vuex'

export default {
  // ...
  computed: {
  // 组件的局部计算属性
    localComputed () { /* ... */ },
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState({
      // ...
    })
  }
}
```

:bulb: 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组

```vue
// 组件
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState([
    // 映射 this.count 为 store.state.count
    'count'
  ])
}
```

### mapGetters
辅助函数 `mapGetters` 仅仅是将 store 中的 getter 映射到组件中，作为其局部计算属性

```vue
// 组件
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
  // 在函数 mapGetters 中传递一个数组，其元素是需要读取的 store 中的 getter
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

:bulb: 如果你想将一个 getter 属性另取一个名字，使用对象形式：

```
...mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

### mapMutations
可以使用 `mapMutations` 辅助函数将组件实例相应的方法映射为 `store.commit`，便于在组件中调用（需要在根节点注入 `store`，参考 [state 一节中将 store 从根组件 `App.vue`「注入」到每一个子组件中](#state)）

```vue
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

### mapActions
使用 `mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch` 调用（需要先在根节点注入 `store`），函数接收

```vue
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

## 项目结构
Vuex 并不限制代码结构，但是它规定了一些需要遵守的规则：

* 应用层级的状态应该集中到单个 store 对象中。
* 提交 **mutation** 是更改状态的唯一方法，并且这个过程是同步的。
* 异步逻辑都应该封装到 **action** 里面。
* 如果你的 store 文件太大，只需将 `actions`、`mutations` 和 `getters` 分割到单独的文件 `*.js` 并存放在目录 `modules` 下。

```
# 项目结构示例

├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```

## module
由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块。

通过 store 的属性 `modules` 将各个模块「汇总」到仓库中

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  // ...
  // 将其他模块「导入」到根节点中
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

### 局部状态
使用模块重构 store 对象后会出现层级关系，在模块内的 mutation、getter、action 等函数使用的中的 `state` 是指模块的局部状态，如果希望使用根节点的状态则需要使用另外的参数。

对于模块内部的 mutation 和 getter，接收的第一个参数是**模块的局部状态对象**。

```js
const moduleA = {
  state: () => ({
    count: 0
  }),
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```

对于模块内部的 action，局部状态通过 `context.state` 暴露出来，**根节点状态则为 `context.rootState`**

```js
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

对于模块内部的 getter，**根节点状态会作为第三个参数暴露出来**（第二个参数是其他的 getter）

```js
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```

### 命名空间
默认情况下模块内部的 action、mutation 和 getter 是注册在**全局命名空间**的，即多个模块能够调用其他模块中声明的 action、mutation、getter，并对其他其他模块的触发的操作作出响应。

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名，启用了命名空间的 getter 和 action 会收到局部化的 `getter`，`dispatch` 和 `commit`，这样即时在不同模块中命名了相同名称的 getter、action 或 mutation 也不怕会出现冲突。

```js
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,
      // 模块内容
      // 访问或调用命名模块的属性时，会自动根据模块注册的路径调整命名
      state: () => ({ ... }),
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },
  }
});
```

:bulb: 如果你希望在命名模块中使用全局 state 和 getter，`rootState` 和 `rootGetters` 会作为第三和第四参数传入 getter，也会通过 `context` 对象的属性传入 action。若需要在命名空间内分发全局的 action 或提交 mutation，将 `{ root: true }` 作为第三参数传给 `dispatch` 或 `commit` 即可。

```js
modules: {
  foo: {
    namespaced: true,

    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```