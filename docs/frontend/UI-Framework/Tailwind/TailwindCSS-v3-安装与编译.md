---
show: true
cover: tailwindcss.png
collection: TailwindCSS
collectionOrder: 3
summary: TailwindCSS v3 安装与编译
tags:
  - CSS
  - TailwindCSS
---

# 安装与编译
Tailwind v3 提供了多种方式在项目中引入该 UI 框架：

:bulb: 由于 Tailwind v3 有一些不兼容的更新，如果需要从 Tailwind v2 升级到 v3 可以参考[官方文档](https://tailwindcss.com/docs/upgrade-guide)。

## CDN
最简单的方式是[使用 CDN 引入 Tailwind](https://tailwindcss.com/docs/installation/play-cdn)，该方式不需要在项目中安装依赖包，也不需要进行编译（以生成样式表）。

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- 使用 CDN 引入 Tailwind -->
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- ... -->
</body>
</html>
```

而且在 v3 版本中，使用 CDN 引入 Tailwind 的同时也**支持对其定制**，使用 CDN 所引入的模块暴露了一个对象 `tailwind`，通过它的属性 `tailwind.config` 可以设置 Tailwind 的一些参数属性

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            clifford: '#da373d',
          }
        }
      }
    }
  </script>
</head>
<body>
  <!-- ... -->
</body>
</html>
```

也支持添加自定义的样式（同样可以指定插入到哪一个 bucket 容器中）

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>/* ... */</script>
  <style type="text/tailwindcss">
    @layer utilities {
      .content-auto {
        content-visibility: auto;
      }
    }
  </style>
</head>
<body>
  <div class="lg:content-auto">
    <!-- ... -->
  </div>
</body>
</html>
```

:warning: CDN 引入仅应该用于开发环境，而不应该用于生成环境，使用其他方法引入 Tailwind 并编译出（静态）样式表会更安全。

## Tailwind CLI
另一种方法是使用 Tailwind 官方提供了一个命令行 CLI 工具（一个编译器）。它会对项目的指定文件进行扫描，分析出使用了哪些基础类，然后编译出相应的样式文件。

1. 首先需要在终端输入以下命令，以在项目中添加 Tailwind 的配置文件 `tailwind.config.js`

  ```bash
  npx tailwindcss init
  ```

  然后在配置文件 :page_facing_up: `tailwind.config.js` 声明需要扫描/监听的文件

  ```js
  // 📄 tailwind.config.js
  module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  ```

2. 然后将 Tailwind 提供的三个模块导入项目的主样式表中

  ```CSS
  /* 📄 src/input.css */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

3. 最后在终端执行编译命令，然后 Tailwind CLI 工具就会扫描 `tailwind.config.js` 配置文件 `content` 属性中所声明的文件，查看使用了哪些基础类，并基于命令 `-i` 所提供的源样式表，提取合并项目里使用的样式，最后输出到命令 `-o` 所指定的样式表中

  ```bash
  # 其中 -i 命令指定了输入的源样式表（i stand for input）
  # 而 -o 命令指定了编译后输出的样式表位置（o stand for output）
  npx tailwindcss -i ./src/input.css -o ./dist/output.css
  ```

  :bulb: 如果希望一直监听项目的文件（`tailwind.config.js` 配置文件 `content` 属性中所声明的文件），可以在命令中添加 `--watch` 或 `-w` 指令

  ```bash
  npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
  ```

  :bulb: 在生产环境中可以进一步优化，使用指令 `--minify` 对编译生成的样式表进行压缩

  ```bash
  npx tailwindcss -o build.css --minify
  ```

  :bulb: 也可以先在项目（在终端输入命令 `npm install -D tailwindcss`）安装 Tailwind 依赖包，以调用本地的 Tailwind CLI 来执行编译操作。可以在 `package.json` 设置相应的 script 命令脚本，方便调用

  ```json
  /* 📄 package.json */
  {
    /* ... */
    "scripts": {
      "build": "tailwindcss -i ./src/style.css -o ./dist/output.css",
      "watch": "tailwindcss -i ./src/style.css -o ./dist/output.css --watch",
    },
    /* ... */
  }
  ```

:bulb: 如果希望在生产环境中进一步优化，可以在 PostCSS 配置文件的最后使用 `cssnano` 插件对样式表进一步压缩

  ```js
  // 📄 postcss.config.js
  module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      ...(NODE_ENV === 'production' ? { cssnano: {} } : {})
    }
  }
  ```

:warning: 记得项目的 HTML 文件需要引入的样式表应该是编译生成的文件，对于以上示例应该是 `/dist/output.css` 文件

## 作为 PostCSS 插件
如果项目使用了打包构建工具，例如 webpack、vite 等，可以将 Tailwind 作为它们的 PostCSS 插进引入到项目中。

以下假设项目使用 vite 打包工具（可以参考官方文档，以了解使用 vite 搭建项目的[步骤](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)），为项目添加 Tailwind 和 PostCSS 以及 autoprefixer 的步骤：

1. 在终端输入以下命令安装依赖包

  ```bash
  npm install -D tailwindcss postcss autoprefixer
  ```

2. 创建 Tailwind 和 PostCSS 配置文件

  ```bash
  # p stand for postcss
  # 也可以用 npx tailwindcss init --postcss
  npx tailwindcss init -p
  ```

  然后就可以得到配置好的 PostCSS 配置文件 `postcss.config.js` 一般不需要对其进行修改

  ```js
  // 📄 postcss.config.js
  // postcss 依次使用 tailwindcss 插件进行编译
  // 再使用 autoprefixer 插件为特定的样式添加前缀（以使样式表适用于更多的浏览器）
  module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
  ```

  以及一个「空」的 Tailwind 配置文件 `tailwind.config.js`（只有一些必要的属性）

  ```js
  // 📄 tailwind.config.js
  module.exports = {
    content: [],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  ```

  对 Tailwind 编译器的定制操作都在该文件里进行，首先需要设置的属性`content` 它指定了需要编译器扫描/监听的文件，根据所需设置监听文件的路径（一般监听项目的 `src` 文件夹里的文件，支持使用正则表达式匹配多个文件）

  ```js
  // 📄 tailwind.config.js
  module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  ```

3. 将 Tailwind 提供的三个模块添加到项目的主样式表中

  ```css
  /* 📄 main.css */
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

  :bulb: 记得将编译后的样式表引入到项目的入口文件中（如果项目使用打包工具构建的，该步骤一般都已经自动配置好了）

4. 根据 `package.json` 里的 `script` 脚本命令，在终端输入相应的命令，让打包工具对项目进行构建

  ```bash
  # 对于以 vite 作为打包工具的项目，可以使用以下命令
  npm run dev
  ```

## 结合前端框架使用
如果使用前端框架进行项目开发，例如 Vue、React 等，可以参考 Tailwind 的[官方文档](https://tailwindcss.com/docs/installation/framework-guides)，找到相应的引入 Tailwind 的步骤。

