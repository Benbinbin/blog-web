---
show: true
collection: Re-Vue
collectionOrder: 6
summary: 这是看《[想入門，我陪你]Re Vue 重頭說起》视频教程和阅读 Vuex 官方文档时做的笔记，这一篇主要是与 Vuex 相关的知识点，还包括一些需要注意的细节。
cover: re-vue.jpg
---



# Vuex

[Vuex](https://vuex.vuejs.org/zh/) 是一个专为 Vue.js 应用程序开发的**状态管理**模式，它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种**可预测**的方式发生变化。

:clapper: Vuex 的核心概念和工作方式如下图所示

![vuex](./images/vuex.png)

Vuex 是将多个组件**共用的状态（数据）`state`** 提取出来进行管理；而对于（一般是基础组件）组件**独占的状态**，应该使用组件的 `data` 进行管理。为了可以追踪 state 的变化，所以必须==遵循一个原则：更改 Vuex 中的状态 state 的**唯一方法**只允许是通过提交 `commit` mutation 来实现==。

:warning: 这种模式导致组件依赖全局状态单例。

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/wHnKS5LYxZM?start=741&end=3852&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>



## 安装引入

可以使用 CDN 引入

```html
<script src="https://unpkg.com/vuex/dist/vuex.js"></script>
```

也可以通过 npm 安装，然后通过 `Vue.use()` 的方式安装插件

```bash
npm install vuex --save
```

```js
import Vuex from 'vuex'

Vue.use(Vuex)
```

Vuex 的核心就是仓库 store 基本上就是一个容器，它使用**单一状态树**，即每个 Vue 应用中只有一个 `store` 实例（对象），包含全部的应用层级共享的状态 `state` 和修改状态的相关方法。

:bulb: 单状态树和模块化并不冲突

实例化一个仓库，其中存放着组件共享的状态和修改状态的相关方法

```js
const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})
```

:clapper: 为了在 Vue 组件中访问 `this.$store` property，需要为 Vue 实例提供创建好的 `store`。Vuex 提供了一个从根组件向所有子组件，以选项 `store` 的方式「注入」该 store 的机制：

```js
new Vue({
  el: '#app',
  store: store,
})
```

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/J67zuowW_ok?start=968&end=1486&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/J67zuowW_ok?start=1957&end=2089&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

## State

state 是组件共享的的 :clapper: 单一状态树，遵循 single source of truth 唯一数据源原则。

在 store 的选项 `state` 中进行定义，类似于组件的 `data` 选项。

```js
const store = new Vuex.Store({
  // 状态
  state: {
    numbers: [0, 1, 2, 3, 4, 5, 6]
  },
});
```

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/J67zuowW_ok?start=384&end=843&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

:clapper: 在组件中通过 `store.state.stateName` 或 `this.$store.state.stateName` 访问具体的状态（属性）。由于 Vuex 的状态存储是**响应式**的，所以一般将从 store 中读取的状态 state 作为组件**计算属性**，这样每当相应的 state 变化的时候, 相应的计算属性也会重新计算，并且触发更新相关联的 DOM。

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/J67zuowW_ok?start=1743&end=1953&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

通过模块化构建的项目系统中，在多个组件都需要导入各种 state 的属性。:clapper: Vuex 提供的**辅助函数 `mapState`** 更方便地生成计算属性，该函数可以传递对象，也可以传递数组作为参数：

```js
import { mapState } from 'vuex'

// ...
// 为辅助函数 `mapState` 传递对象（键值对有多种方式）
computed: mapState({
  // 直接以 state 的属性的字符串形式作为值，键可以是任意名，这样可以重命名 state 的属性
  countAlias: 'count',
  // 使用箭头函数，以 state 作为传入的参数，返回所需的 state 中一个属性
  count: state => state.count,
  // 使用常规函数，以 state 作为传入的参数，这样能够通过 this 获取当前组件的局部状态（data 属性），返回一个新的混合状态
  countPlusLocalState(state) {
    return state.count + this.localCount
  }
})
```

```js
import { mapState } from 'vuex'

// ...
// 为辅助函数 `mapState` 传递数组（映射的计算属性的名称与 state 的属性名相同）
// 计算属性只包含从 state 映射得到的属性
computed: mapState([
  'count'
])
// 计算属性包含从 state 映射得到的属性，还包含组件中的局部计算属性。
// mapState 函数返回的是一个对象，可以利用对象展开运算符解构 mapState 返回的对象，将它们与组件中的局部计算属性混合
computed: {
  localComputed() {...},
  ...mapState({...})
}
```

:bulb: 存储在 Vuex 中的数据状态 `state`，和 Vue 实例中的 `data` 遵循相同的规则，对象必须是[纯粹 plain](https://vuejs.org/v2/api/#:~:text=The%20object%20must%20be%20plain%3A%20native%20objects%20such%20as%20browser%20API%20objects%20and%20prototype%20properties%20are%20ignored.) 的

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/J67zuowW_ok?start=2269&end=3891&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>



## Getter

:clapper: Getter 是通过 `state` 派生出一些状态，它们定义在 store 的选项 `getters` 中，类似于组件的 `computed` 选项的作用。

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/J67zuowW_ok?start=4111&end=4970&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

:clapper: Getter 函数接受的第一个参数是 **`state` 对象**，（可选）接受 `getters` 作为第二个参数，它是一个包含其他 Getter 的对象，最后**返回一个值或一个函数**。

```js
const store = new Vuex.Store({
  // 状态
  state: {
    numbers: [0, 1, 2, 3, 4, 5, 6]
  },
  // Getter
  getters: {
    oddNumbers(state) {
      return state.numbers.filter((num) => {
        return num % 2
      })
    },
    evenNumbers(state) {
      return state.numbers.filter((num) => {
        return (num % 2) - 1
      })
    }，
    numbersLen: (state, getters) => {
      return getters.oddNumbers.length + getters.evenNumbers.length
    }
  }
});
```

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/J67zuowW_ok?start=4987&end=5469&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

:clapper: 在组件中有两种方式使用 Getter：

* 可以通过 `store.getters.getterName` 以属性的形式访问具体的 Getter
* 也可以通过 `store.getters.getterName(params)` 以调用方法的形式访问具体的 Getter（对应地，在定义该 Getter 时，**其返回值应该是一个函数**）

:bulb: 当 Getter 通过属性的形式访问时，可以认为是 store 的 computed，**有依赖缓存**的功能，即只有当它的依赖值发生了改变才会被重新计算；而 Getter 通过方法的形式调用时，可以认为是 store 的 methods，每次都会去进行调用，而**不会缓存**结果。

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/J67zuowW_ok?start=5525&end=6262&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

:clapper: Vuex 提供的**辅助函数 `mapGetters`** 更方便地将 store 中的 getter 映射到组件的局部计算属性，该函数可以传递对象或字符串数组作为参数：

```js
import { mapGetters } from 'vuex'

// ...
// 为辅助函数 `mapGetters` 传递数组（映射的计算属性的名称与 getters 的属性名相同）
computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
  ...mapGetters([
    'doneTodosCount',
    'anotherGetter',
  ])
}
```

```js
import { mapGetters } from 'vuex'

// ...
// 如果想将重命名 getter 属性，为辅助函数 `mapGetters` 传递对象
computed: {
  ...mapGetters({
    // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
    doneCount: 'doneTodosCount'
  })
}
```

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/J67zuowW_ok?start=6263&end=7494&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>



## Mutation

为了可以追踪 state 的变化，:clapper: 所以需要==遵循一个原则：更改 Vuex 中的状态 state 的**唯一方法**只允许是通过提交 `commit` mutation 来实现==。

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/KS3gA56-LFY?start=400&end=631&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

:clapper: 在 store 的选项 `mutations` 中，以函数的形式定义一个 mutation type（类似于事件类型） 及其 mutation handler（回调函数），在其中修改状态 state。

回调函数接受 `state` 作为第一个参数，（可选）第二个参数，称为载荷 `payload`，接收传递过来的数据。

```js
const store = new Vuex.Store({
  // 状态
  state: {
    count: 1
  },
  mutations: {
    INCREMENT(state) {
      // 变更状态
      state.count++
    }，
    SET_COUNT(state, n) {
      // 变更状态
      state.count = n
    }
  } 
});
```

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/KS3gA56-LFY?start=631&end=631&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

:bulb: ==推荐 mutationType 使用**常量（大写）**，并赋值给变量==，而在定义 mutation handler 时采用**计算型属性名**，:clapper: 这样既可以使在输入变量时 linter 之类的工具发挥作用，也可以避免重复代码

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/KS3gA56-LFY?start=2076&end=2481&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

:clapper: ==在 mutation handler 中的操作**必须是同步的**==，这样 devtools 才会准确地捕抓到每一条 mutation 前一状态和后一状态的快照。

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/KS3gA56-LFY?start=2483&end=2640&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/KS3gA56-LFY?start=2913&end=3013&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

:clapper: 在组件中类似于触发事件一样，去提交 `commit` 一个特定 Mutation 事件类型，这样就会执行相应的 mutation handler 修改 state 的对应属性，传入（可选）第二个参数 `payload`，作为数据传递给 mutation handler

```js
store.commit('SET_COUNT', { count: 10 })
```

:bulb: 也可以使用**对象风格**来提交 Mutation，传递一个包含 `type` 属性的对象，它指定了 muationType，其他属性作为 payload 传递给 handler

```js
store.commit({
  type: 'SET_COUNT',
  count: 10
})
```

:clapper: Vuex 提供的**辅助函数 `mapMutations`** 更方便地将 store 中的 mutation 映射到组件的局部方法中，这样方便后续直接在组件中通过调用相应的方法就实现提交 mutation，该函数可以传递对象或字符串数组作为参数：

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    // 数组形式
    ...mapMutations([
      // 将 this.increment() 映射为 this.$store.commit('increment')
      // 调用方法时支持载荷，将 this.increment(amount) 映射为 this.$store.commit('increment', amount)
      'increment', 
    ]),
    // 对象形式，可重命名 method
    ...mapMutations({
      add: 'increment' // 将 this.add() 映射为 this.$store.commit('increment')
    })
  }
}
```

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/KS3gA56-LFY?start=1140&end=2074&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/KS3gA56-LFY?start=2641&end=2912&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>



## Action

:clapper: Action 类似于 mutation，也是函数，不同在于：**Action 一般用于提交 mutation，而不是直接变更状态**，而且 Action 可以包含**异步操作**；而 Mutation 中只能有同步操作。

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/KS3gA56-LFY?start=3068&end=3711&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

:clapper: 在 store 的选项 `actions` 中以函数的形式定义一个 action type（类似于事件类型）及其 action handler（回调函数），在其中执行异步操作和提交 mutation

回调函数接受 `context` 作为第一个参数，**它与 store 实例具有相同方法和属性的对象**，因此可以通过调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。（可选）第二个参数，称为载荷 `payload`，接收传递过来的数据。

```js
const store = new Vuex.Store({
  // ...
  actions: {
    increment (context, payload) {
      context.commit('INCREMENT', payload)
    }
  }
});
```

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/KS3gA56-LFY?start=3713&end=4001&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

:bulb: Action 中通常存在异步操作，因此**在组件中分发 action 时 Vuex 默认返回一个 Promise**，如果在 action handler 回调函数也返回 Promise `return new Promiser((resolve, reject) => {})`，这样便可以**在组件中监听回调函数的 Promise 执行情况**，进行后续继续执行相应操作：

```js
const store = new Vuex.Store({
  // ...
  actionA ({ commit }) {
    // 定义一个 action 操作，它返回一个 Promise
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
});
```

```js
// 在组件中使用
store.dispatch('actionA').then(() => {
  // ...
})
```

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/KS3gA56-LFY?start=4002&end=5101&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

:clapper: 在组件中类似于分发事件一样，去分发 dispatch 一个特定 Action 事件类型，这样就会执行相应的 action handler，传入（可选）第二个参数作为 `payload`（一般是对象），以传递数据到 action handler

```js
store.dispatch('actionType')
```

Vuex 提供的**辅助函数 `mapActions`** 更方便地将 store 中的 action 映射到组件的局部方法中，这样方便后续直接在组件中通过调用相应的方法就实现分发 action，该函数可以传递对象或字符串数组作为参数：

```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    // 数组形式
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
      'incrementBy' 
    ]),
    // 对象形式
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/KS3gA56-LFY?start=5105&end=5875&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>



## Module

Vuex 允许我们将 store 分割成模块 module，每个模块拥有自己的 `state`、`mutations`、`actions`、`getters`，也支持嵌套子模块。

:clapper: 在 store 的选项 `modules` 中注册模块

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const store = new Vuex.Store({
    modules: {
      a: moduleA,
    }
})
```

在组件中可以结合模块名 `store.state.a` 访问相应的模块 `a` 的局部状态

:warning: 模块中的状态 `state` 应该**使用函数形式，并返回一个对象**，包含局部状态的属性。

### 局部状态

在模块中，Mutation 和 Getter 接收的第一个参数是模块里**局部**状态的对象。

```js
const moduleA = {
  state: () => ({
    count: 0
  }),
  mutations: {
    increment (state) {
      // `state` is the local module state
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

如果需要在 Gutter 中访问根节点的状态 root state，则是在第三个参数暴露出来

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

对于模块中的 Action 局部状态是通过 `context.state` 暴露出来，根节点状态是通过 `context.rootState` 暴露出来的：

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

:bulb: 根状态 `rootState` 其实**包含了加载的模组的局部状态**（因此模组中可以 :clapper:「借助」`rootState` 作为中间者，来访问其他各个注册的模组的局部状态）

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/X1bH3vAej4o?start=1790&end=2385&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

### 命名空间

**模块的状态本来就是局部的**，在组件中（或父模块中）需要使用 `store.state.a` 进行访问 `a` 模块的状态。:clapper: 但**模块内部的 `actions`、`mutations `和 `getters `是注册在全局命名空间**，使得多个模块能够对同一 `store.commit('mutationType')` 或 `store.dispatch('actionName')` 作出响应。

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/X1bH3vAej4o?start=771&end=1790&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

:clapper: 如果希望模块具有**更高的封装度和复用性**（它的 Getter、Action、Mutation 不会与全局注册的冲突），可以通过在模块中**添加选项 `namespaced: true`** 的方式，使其成为带命名空间的模块。

```js
const moduleA = {
  namespaced: true,
  // ...
}
```

开启命名空间后，模块的 `getters`、`actions `及 `mutations` 都变成局部的，因此在组件中如果要针对该模块访问 Getter、提交 Mutation、分发 Action，则需要根据该**模块的注册路径**进行相应调用：

* `getters['moduleName/stateName']`
* `dispatch('moduleName/actionType')`
* `commit('moduleName/mutationType')`

当如果在模块内部访问 Getter、提交 Mutation、分发 Action 则不需要添加路径「前缀」，这样的设计也更便于模块的迁移和复用。

而如果要**在带命名空间的模块内**针对全局空间的 action 或提mutation 进行分发和提交，则相应地需要**将 `{ root: true }` 作为第三参数**传给 `dispatch` 或 `commit`

```js
modules: {
  foo: {
    namespaced: true,
    actions: {
      // actions 被局部化了
      // 可以通过 `rootGetters` 访问全局空间的 getters
      someAction ({ dispatch, commit, getters, rootGetters }) {
        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
    }
  }
}
```

如果希望在开启了命名空间的模块内**注册全局**的 Action 或 Mutation，可以为它们添加选项 `root` 并将值设置为 `true`

```js
modules: {
  foo: {
    namespaced: true,
    actions: {
      someAction: {
        root: true,
        handler (namespacedContext, payload) { ... } // -> 'someAction'
      }
    }
  }
}
```

:bulb: 在组件中，使用 `mapState` 或 `mapActions` 等辅助函数进行映射时，可以[添加命名空间模块的路径作为第一个参数](https://vuex.vuejs.org/guide/modules.html#namespacing)，以简化调用代码

```js
// 组件
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo',
    'bar'
  ])
}
```

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/X1bH3vAej4o?start=2397&end=3793&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

### 动态注册模块

:clapper: 在 store 创建之后，仍可以使用 `store.registerModule` 方法注册模块；可以使用 `store.unregisterModule(moduleName)` 来动态卸载模块，:clapper: 但**不**能使用此方法卸载静态模块（即创建 store 时在配置对象中就声明的模块）

```js
const store = new Vuex.Store({ /* 选项 */ })

// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
```

:bulb: 可以通过 `store.hasModule(moduleName)` 方法检查该模块是否已经被注册到 store

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/X1bH3vAej4o?start=2846&end=2869&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/X1bH3vAej4o?start=3794&end=4386&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

:clapper: 在卸载一个 module 时，有可能想保留过去的 state，以便重新注册时再使用原有的局部状态，例如从一个服务端渲染的应用保留 state。

可以在注册模组是设置**选项 `preserveState`** 将局部状态归档，即模块被注册时，它的 `actions`、`mutations `和 `getters` 会被添加到 store 中，但是 `state` 不会。这里假设 store 里原来的 `state` 已经包含了这个 module 的 `state` 并且你不希望将其覆写

```js
store.registerModule('a', module, {
    preserveState: true 
});
```

<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/X1bH3vAej4o?start=4538&end=4723&modestbranding=1&rel=0" allowfullscreen loading="lazy"></iframe>

