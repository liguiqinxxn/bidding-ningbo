# ESLint 配置说明

## 已安装的依赖

我们已经成功安装并配置了 ESLint，包括以下依赖包：

1. `eslint` - ESLint 核心包
2. `eslint-plugin-vue` - Vue 3 相关的 ESLint 规则
3. `@typescript-eslint/parser` - TypeScript 解析器 (v4.33.0 兼容项目中的 TypeScript 4.1.6)
4. `@typescript-eslint/eslint-plugin` - TypeScript 相关的 ESLint 规则 (v4.33.0)
5. `@vue/eslint-config-typescript` - Vue + TypeScript 的推荐配置 (v9.1.0)
6. `vue-eslint-parser` - Vue 文件解析器
7. `eslint-config-prettier` - 禁用与 Prettier 冲突的 ESLint 规则
8. `eslint-plugin-prettier` - 将 Prettier 作为 ESLint 规则运行

## 配置文件

我们创建了 `eslint.config.js` 文件，包含以下配置：

1. **Vue 3 配置**：
   - 使用 `eslint-plugin-vue` 的推荐规则
   - 关闭组件名必须为多单词的限制
   - 配置 HTML 属性换行规则
   - 允许使用 v-html 指令
   - 要求 v-for 指令使用 key 属性
   - 禁止在模板中使用箭头函数
   - 禁止在计算属性中进行副作用操作

2. **JavaScript 配置**：
   - 警告使用 console
   - 警告使用 debugger
   - 检查未使用的变量
   - 推荐使用 const 而不是 let
   - 集成 Prettier 格式化规则
   - 禁止使用 var
   - 要求使用 === 和 !==
   - 禁止使用 eval()
   - 禁止使用 alert, confirm, prompt
   - 禁止重复声明变量
   - 要求构造函数首字母大写

3. **Prettier 配置**：
   - 使用 `eslint-config-prettier` 禁用与 Prettier 冲突的 ESLint 规则

4. **忽略文件**：
   - node_modules
   - dist/build 目录
   - .git 目录
   - .history 目录
   - .prettierrc.cjs
   - TypeScript 声明文件 (*.d.ts)
   - 特定的路由文件

5. **注释说明**：
   - 配置文件中添加了详细的注释说明
   - 解释了每个配置项的作用和目的
   - 便于团队成员理解和维护

## 使用方法

### 检查代码质量问题
```bash
npm run lint
```

### 自动修复可修复的问题
```bash
npm run lint:fix
```

## 规则说明

### Vue 3 规则
- `vue/multi-word-component-names`: 关闭（允许单单词组件名）
- `vue/no-unused-vars`: 错误（检查未使用的变量）
- `vue/max-attributes-per-line`: 错误（每行最多一个属性）
- `vue/no-v-html`: 关闭（允许使用 v-html）
- `vue/require-v-for-key`: 错误（要求 v-for 指令使用 key 属性）
- `vue/no-arrow-functions-in-watch`: 错误（禁止在模板中使用箭头函数）
- `vue/no-side-effects-in-computed-properties`: 错误（禁止在计算属性中进行副作用操作）

### JavaScript 规则
- `no-console`: 警告（不建议使用 console）
- `no-debugger`: 警告（不建议使用 debugger）
- `no-unused-vars`: 错误（检查未使用的变量）
- `prefer-const`: 错误（推荐使用 const）
- `prettier/prettier`: 错误（Prettier 格式化规则）
- `no-var`: 错误（禁止使用 var）
- `eqeqeq`: 错误（要求使用 === 和 !==）
- `no-eval`: 错误（禁止使用 eval()）
- `no-alert`: 警告（禁止使用 alert, confirm, prompt）
- `no-redeclare`: 错误（禁止重复声明变量）
- `new-cap`: 错误（要求构造函数首字母大写）

## 注意事项

1. 由于项目使用的是较旧版本的 TypeScript (4.1.6)，我们安装了兼容的 ESLint 插件版本
2. 某些文件被明确忽略，因为它们不是实际的源代码文件
3. 配置使用了 ESLint 9 的新扁平配置格式
4. Prettier 配置文件已重命名为 .prettierrc.cjs 以避免与 ESLint 冲突
5. 配置文件中添加了详细的注释说明，便于理解和维护