---
show: true
collection: Vue 3
collectionOrder: 7
---

# Vue3 的 TypeScript 支持
TypeScript 是 JavaScript 的超集，它在完整保留 JavaScript 运行时行为的基础上，通过提供了**类型系统**，引入静态类型系统来提高代码的可维护性，在很大程度上弥补了 JavaScript 的缺点，减少可能出现的 bug。

Vue 3 就是采用 TypeScript 开发的，所以使用该框架进行开发可以得到很好的 TypeScript 支持，只需要进行一些配置。

## 项目搭建
使用 Vue CLI 创建项目时，在终端输入以下命令，记得选择「使用 TypeScript 进行开发」

```bash
# 1. Install Vue CLI, 如果尚未安装
npm install --global @vue/cli@next

# 2. 创建一个新项目, 选择 "Manually select features" 选项
vue create my-project-name
```

:bulb: 如果已经使用 Vue CLI 搭建了未使用 TypeScript 的项目，可以通过添加 Vue CLI 插件来让项目支持 TypeScript

```bash
vue add typescript
```

在 TypeScript 编译器配置文档 `tsconfig.json` 中必须包含 `strict: true` (或至少包含 `noImplicitThis: true`，它是 `strict` 标志的一部分) 才能在组件方法中利用 `this` 的类型检查，否则它总是被视为 `any` 类型。

```json
/* tsconfig.json */
{
  "compilerOptions": {
    /* ... */
    /* 这样就可以对 `this` 上的数据属性进行更严格的推断 */
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "node"
  }
}
```

如果项目使用了打包工具 Webpack 并采用了自定义的配置，记得添加 ts-loader 来解析 vue 文件中的 `<script lang="ts">` 代码块

```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
      // ...
    ]
  }
}
```

## 组件
为了让 TypeScript 正确推断 Vue 组件选项中的类型，需要使用 Vue helper 函数 `defineComponent` 来设置组件的配置参数（原来只需要是一个普通的对象即可）

```vue
<script lang="ts">
import { createApp, defineComponent } from 'vue'

const app = Vue.createApp();

// 组件的配置参数
const ComponentA = defineComponent({
  // 已启用类型推断
  template: `<h1>Global Component</h1>`
})

// 全局组件
app.component('component-a', ComponentA);
</script>
```

```vue
<script lang="ts">
import { createApp, defineComponent } from 'vue'

const ComponentB = defineComponent({
  // 已启用类型推断
  template: `<h1>Local Component</h1>`
})

// 局部组件
const app = Vue.createApp({
  components: {
    'component-b': ComponentB
  }
})
</script>
```

对于单文件组件（以 `.vue` 为后缀的文件）通常会被写成如下，除了使用 `defineComponent` 定义组件参数，还需要为 `<script>` 代码块声明使用 `ts` 语言

```vue
<template>
  <div>
    <h1>hello</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  // 已启用类型推断
})
</script>

<style scoped>
h1 {
  font-weight: bold;
}
</style>
```

:bulb: 如果想将 TypeScript 与 JSX render 函数结合起来，需要为 `<script>` 代码块声明使用 `tsx` 语言

```tsx
<script lang="tsx">
  // ...
</script>
```

## 选项 API
TypeScript 一般能够在不显式定义类型的情况下正确推断出大多数变量所属的数据类型，但是也可以**使用类型断言 `as`** 等方法手动显式地声明变量或属性的数据类型。

例如对于组件的 `data` 属性，可以使用类型断言 `as` 显式声明其属性值的数据类型

```ts
interface Book {
  title: string
  author: string
  year: number
}

const Component = defineComponent({
  data() {
    return {
      book: {
        title: 'Vue 3 Guide',
        author: 'Vue Team',
        year: 2020
      } as Book,
      age: 666 as string | number
    }
  }
})
```

但是由于 Vue 声明文件的循环特性，TypeScript 可能难以推断 computed 的类型，因此可能需要**声明计算属性的返回类型**。

```ts
import { defineComponent } from 'vue'

const Component = defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    // 需要计算属性声明返回的数据类型
    greeting(): string {
      return this.message + '!'
    },
    // 计算属性中，如果设置了 setter 时，需要对 getter 函数的返回值进行声明
    greetingUppercased: {
      get(): string {
        return this.greeting.toUpperCase()
      },
      set(newValue: string) {
        this.message = newValue.toUpperCase()
      }
    }
  }
})
```

如果希望 TypeScript 对 prop 进行数据类型约束（类似于为 prop 设置 `type` 属性），可以使用类型断言和 **`PropType` （一个 vue 内置的方法）指明数据类型**，这样在开发时编辑器也就会有更准确的代码提示了。

```ts
import { defineComponent, PropType } from 'vue'

interface Book {
  title: string
  author: string
  year: number
}

const Component = defineComponent({
  props: {
    callback: {
      type: Function as PropType<() => void>
    },
    book: {
      type: Object as PropType<Book>,
      required: true
    },
    metadata: {
      type: null // metadata 的类型是 any
    }
  }
})
```

对于组件所分发的事件 emit，除了需要在 `emits` 属性中进行声明，如果有传递参数，还需要对它进行数据类型的约束，否则会抛出一个类型错误

```ts
const Component = defineComponent({
  emits: {
    addBook(payload: { bookName: string }) {
      // perform runtime 验证
      return payload.bookName.length > 0
    }
  },
  methods: {
    onSubmit() {
      this.$emit('addBook', {
        bookName: 123 // 类型错误！不符合数据类型的约束，只能是字符串
      })
      this.$emit('non-declared-event') // 类型错误！没有在 emits 中声明该事件类型
    }
  }
})
```

## 组合式 API
在 `setup()` 函数中**不需要**约束其入参 `props` 的数据类型，因为 TypeScript 编译器会从组件选项 `props` 中推断各个 prop 的数据类型。

```ts
import { defineComponent } from 'vue'

const Component = defineComponent({
  props: {
    message: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const result = props.message.split('') // 正确, 'message' 被声明为字符串
    const filtered = props.message.filter(p => p.value) // 将引发错误: Property 'filter' does not exist on type 'string'
  }
})
```

使用 `ref` 构建的响应式的变量，一般会根据所赋予的初始值进行类型推断

```ts
import { defineComponent, ref } from 'vue'

const Component = defineComponent({
  setup() {
    const year = ref(2020) // 变量 year 的数据类型被推断为 number

    const result = year.value.split('') // => Property 'split' does not exist on type 'number'
  }
})
```

:bulb: 如果响应式变量数据类型较复杂，可以通过**泛型**的方式来显式指定其类型，如果泛型的类型未知，建议将 `ref` 改为为 `Ref<T>`。

```ts
const year = ref<string | number>('2020') // year's type: Ref<string | number>

year.value = 2020 // ok!
```

使用 `reactive`构建的响应式的变量，可以在其初始值对象中为属性使用类型断言 `as` 来设置数据类型

```ts
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const state = reactive({
      name: 'Link',
      age: 25 as string | number
    })
  }
}
```

也可以使用**泛型**配合**接口**（因为使用 `reactive` 构建响应式变量时，其初始值一般是对象）来约束变量的数据类型

```ts
import { defineComponent, reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const book = reactive<Book>({ title: 'Vue 3 Guide' })
    // or
    const book: Book = reactive({ title: 'Vue 3 Guide' })
    // or
    const book = reactive({ title: 'Vue 3 Guide' }) as Book
  }
})
```

和选项式 API 不同，组合式 API 的计算值会根据返回值自动推断类型，一般不需要显式对变量进行约束

```ts
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CounterButton',
  setup() {
    let count = ref(0)

    // 只读
    const doubleCount = computed(() => count.value * 2) // 通过返回值，自动推断变量 doubleCount 的数据类型是 number

    const result = doubleCount.value.split('') // => Property 'split' does not exist on type 'number'
  }
}
```

在原生 DOM 事件的处理函数中，为其入参进行数据类型约束可以避免 TypeScript 抛出异常

```vue
<template>
  <input type="text" @change="handleChange" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    // `e` 将会是 `any` 类型
    const handleChange = e => {
      console.log(e.target.value) // 此处 TS 将抛出异常
    }
    return { handleChange }
  }
})
</script>
```

可以将将事件约束为正确的内置数据类型 `Event`

```ts
const handleChange = (e: Event) => {
  console.log((e.target as HTMLInputElement).value)
}
```