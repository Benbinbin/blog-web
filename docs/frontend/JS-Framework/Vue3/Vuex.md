---
show: true
collection: Vue 3
collectionOrder: 6
---



# Vuex 4

[Vuex](https://next.vuex.vuejs.org/) 是一个专为 Vue.js 应用程序开发的**状态管理**模式，它将应用中所有组件的**共享状态**抽离到外部，采用集中式存储管理，它使用**单一状态树**，即每个 Vue 应用中**只有一个 `store` 实例**，组件间就会依赖全局状态单例，并以相应的规则保证状态以一种**可预测**的方式发生变化。

Vuex 的核心是仓库 store，基本上就是一个容器，包含全部的应用层级共享的状态 `state` 和修改状态的相关方法。

:bulb: 每个组件仍然可以拥有和管理自己的**私有状态**。

Vuex 的核心概念和工作方式如下图所示，Vuex 中必须遵循一个原则：**更改 Vuex 中的状态 state 的唯一方法只允许是通过提交 `commit` mutation 来实现**。

![Vuex](./images/vuex.png)

:bulb: 本文介绍的是 Vuex 4，或称为 Vuex Next，它适配了 Vue 3，文章内容主要==针对与 Vuex 3 的不同点==。

:bulb: 通过定义和隔离状态管理中的各种概念，并通过强制规则维持视图和状态间的独立性，对于开发大型单页应用，Vuex 可以使得代码将会变得更结构化且易维护；但是这些规则会让代码变得繁琐和冗余，如果只是在开发一个简单的应用，最好不要使用 Vuex，一个简单的 [store 模式](https://v3.cn.vuejs.org/guide/state-management.html#从零打造简单状态管理)就足够您所需了。



## 安装引入

可以使用 CDN 引入最新版本的 Vuex，该模块暴露 `Vuex` 对象，通过==调用其方法 `createStore` 创建仓库实例==

```html
<script src="https://unpkg.com/vuex@4"></script>
```

:bulb: 也可以指定版本

```html
<script src="https://unpkg.com/vuex@4.0.2/dist/vuex.global.js"></script>
```

也可以通过 npm 安装

```bash
npm install vuex@next --save
```

然后导入 Vuex，并==使用方法 `createStore` 创建仓库实例==

记得**通过 `app.use(store)` 的方式安装 Vuex 插件**（其中 `app` 是 Vue 应用实例，`store` 是仓库实例），将仓库实例从根组件中「注入」到所有的子组件里，然后可以在 Vue 的任意组件中通过 `this.$store` 访问仓库实例。

:bulb: 如果使用组合式 API 在选项 `setup` 函数中，==可以使用 `useStore()` 函数来访问仓库实例==。

```js
import { createApp } from 'vue'
import { createStore } from 'vuex'

const app = Vue.createApp({})
// 创建一个新的 store 实例
// 其中存放着组件共享的状态和修改状态的相关方法
const store = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})

// 将 store 实例作为插件进行安装
app.use(store)
```



## State

state 是组件共享的的**单一状态树**，遵循 SSOT，[single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth)， 唯一数据源原则，因为单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

:bulb: 单状态树和模块化并不冲突

在 store 的选项 `state` 中进行定义，类似于组件的 `data` 选项。

```js
const store = createStore({
  // 状态
  state: {
    numbers: [0, 1, 2, 3, 4, 5, 6]
  },
});
```

然后在组件中通过 `this.$store.state.stateName` 访问具体的属性状态。由于 Vuex 的状态存储是**响应式**的，所以一般将从 store 中读取的状态 state 作为组件**计算属性**，这样每当相应的 state 变化的时候, 相应的计算属性也会重新计算，并且触发更新相关联的 DOM。

```js
// 组件 Counter 使用 store 的属性 count
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

Vuex 提供的**辅助函数 `mapState`** 可以更方便地为组件生成计算属性，该函数可以传递**对象**，也可以传递**数组**作为参数：

```js
// 组件
import { mapState } from 'vuex' // 在单独构建的版本中辅助函数为 Vuex.mapState

// ...
// 为辅助函数 `mapState` 传递对象（键值对有多种方式）
computed: mapState({
  // 直接将 state 的属性名作为值，键可以是任意名，这样可以重命名 state 的属性
  countAlias: 'count',
  // 使用箭头函数，以 state 作为入参，返回所需的 state 中的一个属性
  count: state => state.count,
  // 使用常规函数，以 state 作为入参，这样能够同时通过 this 获取当前组件的实例，并访问局部状态（即 data 属性），返回一个新的混合状态
  countPlusLocalState(state) {
    return state.count + this.localCount
  }
})
```

```js
// 组件
import { mapState } from 'vuex' // 在单独构建的版本中辅助函数为 Vuex.mapState

// ...
// 为辅助函数 `mapState` 传递数组（映射的计算属性的名称与 state 的属性名相同）
// 计算属性只包含从 state 映射得到的属性
computed: mapState([
  'count'
])

// 计算属性包含从 state 映射得到的属性，还包含（组件本地的）局部计算属性。
// mapState 函数返回的是一个对象，可以利用对象展开运算符，解构 mapState 返回的对象，将它们与组件中的局部计算属性混合
computed: {
  localComputed() {...},
  ...mapState({...})
}
```

:bulb: 存储在 Vuex 中的数据状态 `state`，和 Vue 实例中的 `data` 遵循相同的规则，对象必须是[纯粹 plain](https://vuejs.org/v2/api/#:~:text=The%20object%20must%20be%20plain%3A%20native%20objects%20such%20as%20browser%20API%20objects%20and%20prototype%20properties%20are%20ignored.) 的



## Getter

Getter 是通过 `state` **派生**出一些状态，它们定义在 store 的选项 `getters` 中，类似于组件的 `computed` 选项的作用。

Getter 函数接受的第一个参数是 `state` 对象，（可选）接受 `getters` 作为第二个参数，它是一个包含其他 Getter 的对象，**最后返回一个值或一个函数**。

```js
const store = createStore({
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

根据 Getter 的形式的不同，在组件中有两种方式使用 Getter：

* 可以通过 `this.$store.getters.getterName` 以属性的形式访问具体的 Getter

* 也可以通过 `this.$store.getters.getterName(params)` 以调用方法的形式访问具体的 Getter（对应地，在定义该 Getter 时，**其返回值应该是一个函数**）

  ```js
  // getter 返回一个函数
  getters: {
    // ...
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  }
  ```

  ```js
  // 在组件中调用
  this.$store.getters.getTodoById(2)
  ```

:bulb: 当 Getter 通过属性的形式访问时，可以认为是 store 的 computed，**有依赖缓存**的功能，即只有当它的依赖值发生了改变才会被重新计算；而 Getter 通过函数的形式调用时，可以认为是 store 的 methods，每次都会去进行调用，而**不会缓存**结果。

Vuex 提供的**辅助函数 `mapGetters`** 更方便地将 store 中的 getter 映射到组件的计算属性，该函数可以传递**对象**或字符串**数组**作为参数：

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



## Mutation

为了可以追踪 state 的变化，所以需要遵循一个原则：**更改 Vuex 中的状态 state 的*唯一方法*只允许是通过提交 `commit` mutation 来实现**。

在 store 的选项 `mutations` 中，以函数的形式定义一个 mutation type（类似于事件类型） 及其 mutation handler（回调函数），在其中修改状态 state。

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

:bulb: 推荐 mutationType 使用**常量（大写）**，并赋值给变量，而在定义 mutation handler 时采用**计算型属性名**，这样既可以使在输入变量时 linter 之类的工具发挥作用，也可以避免重复代码

```js
// mutation-types.js
// 将所有 mutation 的名称放在单独的文件中
// 让可使用的 mutationType 一目了然，方便管理和维护
export const SOME_MUTATION = 'SOME_MUTATION'
```

```js
// store.js
import { createStore } from 'vuex'
import { SOME_MUTATION } from './mutation-types' // 引入 mutaiton 名称列表

const store = createStore({
  state: { ... },
  mutations: {
    // 使用 ES2015 风格的计算属性命名功能，使用一个变量的值（其值是一个常量）作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

:warning: 在 mutation handler 中的操作**必须是同步的**，这样 devtools 才会准确地捕抓到每一条 mutation 前一状态和后一状态的快照。

在组件中类似于触发事件一样，去提交 `commit` 一个特定 Mutation 事件类型，这样就会执行相应的 mutation handler 修改 state 的对应属性，在提交 muation 时（可选）传入的第二个参数 `payload`，会作为数据传递给 mutation handler

```js
this.$store.commit('SET_COUNT', { count: 10 })
```

:bulb: 也可以使用**对象风格**来提交 Mutation，传递一个包含 `type` 属性的对象，它指定了 muationType，其他的属性作为 payload 传递给 handler

```js
store.commit({
  type: 'SET_COUNT',
  count: 10
})
```

Vuex 提供的**辅助函数 `mapMutations`** 更方便地将 store 中的 mutation 映射到组件的方法中，这样方便后续直接在组件中通过调用相应的方法就实现提交 mutation，该函数可以传递**对象**或字符串**数组**作为参数

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



## Action

Action 类似于 mutation，也是函数，不同在于：**Action 一般用于提交 mutation，而不是直接变更状态**，而且 Action 可以包含**异步操作**；而 Mutation 中只能有同步操作。

在 store 的选项 `actions` 中以函数的形式定义一个 action type（类似于事件类型）及其 action handler（回调函数），在其中执行异步操作和提交 mutation

回调函数接受 `context` 作为第一个参数，**它是一个与 store 实例具有相同方法和属性的对象**，因此可以通过调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters，为了方便可以对 `context` 进行解构。回调函数还可以接受（可选）第二个参数，被称为载荷 `payload`，接收传递过来的数据。

```js
const store = createStore({
  // ...
  actions: {
    increment (context, payload) {
      context.commit('INCREMENT', payload)
    },
    decrement ({ commit }, payload) {
      commit('DECREMENT', payload)
    }
  }
});
```

:bulb: Action 中通常存在异步操作，因此**在组件中分发 action 时 Vuex 默认返回一个 Promise**，如果在 action handler 回调函数**也返回 Promise `return new Promiser((resolve, reject) => {})`**，这样便可以**在组件中*监听* action 的回调函数的 Promise 执行情况**，进行后续继续执行相应操作：

```js
const store = createStore({
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

在组件中类似于分发事件一样，去分发 `dispatch` 一个特定 Action 事件类型，这样就会执行相应的 action handler，传入（可选）第二个参数作为 `payload`（一般是对象），以传递数据到 action handler

```js
this.$store.dispatch('actionType')
```

:bulb: 也支持以对象的形式分发 Action 事件

```js
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

Vuex 提供的**辅助函数 `mapActions`** 更方便地将 store 中的 action 映射到组件的方法中，这样方便后续直接在组件中通过调用相应的方法就实现分发 action，该函数可以传递**对象**或字符串**数组**作为参数

```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    // 数组形式
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷
      // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
      'incrementBy'
    ]),
    // 对象形式，可重命名 method
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```



## 组合式 API

官方有组合式 API 的几个[案例](https://github.com/vuejs/vuex/tree/4.0/examples/composition)可以参考。

### 访问仓库实例

如果使用组合式 API 在选项 `setup` 函数中，由于无法通过 `this` 访问组件实例去调用 `this.$store`，所有 Vuex 提供了==函数 `useStore()` 访问仓库实例==，这与在选项式 API 中通过 `this.$store` 访问仓库是等效的。

```js
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
  }
}
```

### 访问 State 和 Getter

由于仓库的数据是响应式的，所有==需要创建 `computed` 对仓库的状态和 Getter 进行「包裹」引用，以保留响应性==，这与在选项式 API 中创建计算属性等效

```js
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()

    return {
      // 在 computed 函数中访问 state
      count: computed(() => store.state.count),

      // 在 computed 函数中访问 getter
      double: computed(() => store.getters.double)
    }
  }
}
```

### 提交 Mutation 和分发 Action

要使用 mutation 和 action 时，只需要在 `setup` 钩子函数中调用仓库实例的 `commit()` 和 `dispatch()` 函数即可。

```js
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()

    return {
      // 使用 mutation
      increment: () => store.commit('increment'),

      // 使用 action
      asyncIncrement: () => store.dispatch('asyncIncrement')
    }
  }
}
```



## Module

Vuex 允许我们将 store 分割成模块 module，每个模块拥有自己的 `state`、`mutations`、`actions`、`getters`，也支持嵌套子模块。

在 store 的选项 `modules` 中注册模块

```js
const moduleA = {
  state: () => ({ ... }), // 对于模块中的 state，需要使用函数形式，并返回一个对象
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const store = createStore({
    modules: {
      a: moduleA,
    }
})
```

然后在组件中可以结合模块名 `this.$store.state.a` 访问相应的模块 `a` 的**局部状态**

:warning: 模块中的状态 `state` 应该**使用函数形式，并返回一个对象**，包含局部状态的属性。因为有时我们可能需要创建一个模块的多个实例，通过函数返回对象的方式才可以使各个模块实例相互独立。

### 局部状态

在模块中，Mutation 和 Getter 接收的第一个参数是模块里**局部状态**的对象；对于 Action 局部状态通过 `context.state` 暴露出来。

```js
const moduleA = {
  // local module state
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount (state) {
      // `state` is the local module state
      return state.count * 2
    }
  },
  mutations: {
    INCREMENT (state) {
      // `state` is the local module state
      state.count++
    }
  },
  actions: {
   incrementIfOddOnRootSum ({ state, commit, rootState }) {
      // `state` is the local module state
      if (state.count<0) {
        commit('INCREMENT')
      }
    }
  }
}
```

#### 访问全局状态

在模块的 Getter、Action 中也可以访问全局的状态（根节点的状态）：

* 对于模块中的 Getter，**根节点的状态**在第三个参数暴露出来

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

* 对于模块中的 Action，**根节点状态**通过 `context.rootState` 暴露出来

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

:bulb: 根状态 `rootState` 其实**包含了所有加载的模组的局部状态**（因此模组中可以 **「借助」`rootState` 作为中间者**，来访问其他各个注册的模组的局部状态）

### 命名空间

模块的状态本来就是局部的，但**模块内部的 `actions`、`mutations `和 `getters `是注册在*全局命名空间***，这是为了使得多个模块能够同时对一个 commit 或 dispatch 作出响应。

如果希望模块具有**更高的封装度和复用性**（它的 Getter、Action、Mutation 不会与全局注册的冲突），可以通过在模块中**添加选项 `namespaced: true`** 的方式，使其成为带命名空间的模块。

```js
const store = createStore({
  modules: {
    // 模块 account
    account: {
      namespaced: true, // 开启命名空间
      state: () => ({ ... }), // 模块内的状态已经是局部的
      getters: {
        isAdmin () { ... } // 如果在组件中访问 getters['account/isAdmin']
      },
      actions: {
        login () { ... } // 如果在组件中分发 dispatch('account/login')
      },
      mutations: {
        login () { ... } // 如果在组件中提交 commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: () => ({ ... }),
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: () => ({ ... }),
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```

开启命名空间后，**模块的 `getters`、`actions `及 `mutations` 都变成局部的**，它们会自动根据模块注册的路径调整命名。此时**在组件中**如果要针对该模块访问 Getter、提交 Mutation、分发 Action，则需要根据该**模块的注册路径**进行相应调用：

* `getters['moduleName/stateName']`
* `dispatch('moduleName/actionType')`
* `commit('moduleName/mutationType')`

:bulb: 但在各自模块内部访问 Getter、提交 Mutation、分发 Action 则**不**需要添加路径「前缀」，这样的设计也更便于模块的迁移和复用。

#### 访问全局内容

如果要在带命名空间的模块内访问**全局内容**

* 对于模块的 Getter，全局状态 `rootState` 和全局 Getters `rootGetters` 会作为第三和第四参数
* 对于模块的 Action，`context` 对象中的 `context.rootState` 和 `context.rootGetters` 暴露全局状态和全局 Getters

* 如果要在模块内分发或提交全局空间的 Action 或 Mutation，则需要将 `{ root: true }` 作为第三参数传给 `dispatch` 或 `commit`

```js
modules: {
  foo: {
    namespaced: true, // 开启了命名空间
    getters: {
      // 可以使用 getter 的第三个参数 `rootState` 访问全局状态
      // 第四个参数 `rootGetters` 访问全局 Getters
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherLocalGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGlobalGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },
    actions: {
      // 解构 context，其中 rootState 和 rootGetters 分别是全局空间的状态和 Getters
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        // 分发时第三个参数可以接受 `root` 属性，以访问根的 dispatch
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'
        commit('someMutation') // -> 'foo/someMutation'
        // 提交时第三个参数可以接受 `root` 属性，以访问根的 commit
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```

#### 注册全局 Action 和 Mutation

如果希望在开启了命名空间的模块内**注册全局**的 Action 或 Mutation，可以为它们添加**选项 `root: true`**，并在选项 `handler` 中定义回调函数

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

#### 辅助函数映射

在组件中，使用 `mapState` 或 `mapActions` 等辅助函数进行映射时，对于开启了命名空间的模块，可以**将模块的路径作为第一个参数**传递给这些辅助函数，这样所有绑定都会自动将该模块作为上下文，以简化代码

```js
// 组件
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  })
},
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
  ])
}
```

简化方式

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
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```

:bulb: Vuex 还提供一个 `createNamespacedHelpers` 方法，它接收模块的路径，返回一个对象，从中可以解构出相对于模块的绑定辅助函数，具体的示例代码可以参考[官方文档](https://next.vuex.vuejs.org/guide/modules.html#binding-helpers-with-namespace)。

### 动态增删模块

在 store 创建之后，仍可以使用 `store.registerModule` 方法注册模块；可以使用 `store.unregisterModule(moduleName)` 来动态卸载模块。模块动态注册功能使得其他 Vue 插件可以通过在 store 中附加新模块的方式来使用 Vuex 管理状态。

:warning: 但**不**能使用此方法卸载静态模块，即创建仓库实例时，在配置对象中就声明的模块

```js
const store = createStore({ /* 选项 */ })

// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
// 注册嵌套模块 `nested/myModule`
// 以数组的形式传递路径
store.registerModule(['nested', 'myModule'], {
  // ...
})
```

:bulb: 可以通过 `store.hasModule(moduleName)` 方法检查该模块是否已经被注册到 store。对于嵌套模块，传递 `moduleName` 需要以数组的形式，而不是以路径字符串的形式

#### 保留模块状态

在卸载一个 module 时，有可能想保留过去的 state，以便重新注册时再使用原有的局部状态，例如从一个服务端渲染的应用保留 state。可以在注册模组是设置**选项 `preserveState`** 将局部状态归档，即模块被注册时，它的 `actions`、`mutations `和 `getters` 会被添加到 store 中，**但是 `state` 不会**。这里假设仓库实例里原来的 `state` 已经包含了这个 module 的 `state` 并且你不希望将其覆写

```js
store.registerModule('a', module, {
    preserveState: true
});
```

