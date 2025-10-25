# ESLint 配置说明

## 安装 ESLint 依赖

为了使用提供的 ESLint 配置，您需要安装以下依赖包：

```bash
npm install --save-dev eslint eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin @vue/eslint-config-typescript
```

或者使用 yarn：

```bash
yarn add -D eslint eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin @vue/eslint-config-typescript
```

## 配置文件说明

当前项目中的 `.eslintrc` 文件已配置为支持：

1. **Vue 3 最佳实践**：
   - 使用 `plugin:vue/vue3-essential` 基础规则
   - 允许单文件组件名称不强制使用多单词
   - 关闭 HTML 自闭合标签强制要求

2. **TypeScript 支持**：
   - 集成 `@vue/eslint-config-typescript` 推荐规则
   - 配置了 `@typescript-eslint/parser` 解析器

3. **常用规则定制**：
   - 关闭组件名必须为多单词的限制
   - 开启未使用变量检测
   - 控制 HTML 属性换行规则
   - 允许使用 v-html 指令
   - TypeScript 相关规则优化

## 使用 ESLint

安装依赖后，您可以在 `package.json` 中添加以下脚本：

```json
{
  "scripts": {
    "lint": "eslint src/**/*.{ts,vue}",
    "lint:fix": "eslint src/**/*.{ts,vue} --fix"
  }
}
```

然后运行以下命令进行代码检查：

```bash
npm run lint
```

或自动修复可修复的问题：

```bash
npm run lint:fix
```

## 与 VS Code 集成

推荐在 VS Code 中安装以下扩展以获得最佳体验：

1. ESLint
2. Vetur 或 Volar

并在 VS Code 设置中添加以下配置：

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```