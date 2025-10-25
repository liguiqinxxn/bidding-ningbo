// @ts-nocheck
// ESLint 配置文件 (ESLint 9+ 扁平配置格式)

// 导入 Vue 相关的 ESLint 插件
import pluginVue from 'eslint-plugin-vue';
// 导入 Vue 文件解析器
import vueParser from 'vue-eslint-parser';
// 导入 Prettier 配置，用于禁用与 Prettier 冲突的 ESLint 规则
import prettierConfig from 'eslint-config-prettier';
// 导入 Prettier 插件，用于将 Prettier 作为 ESLint 规则运行
import pluginPrettier from 'eslint-plugin-prettier';

// 导出 ESLint 配置数组
export default [
  // 全局忽略配置 - 指定不需要 ESLint 检查的文件和目录
  {
    ignores: [
      '**/node_modules/**',           // node_modules 目录
      '**/dist/**',                   // 构建输出目录
      '**/build/**',                  // 构建输出目录
      '**/.git/**',                   // Git 版本控制目录
      '**/.history/**',               // 历史文件目录
      '.prettierrc.cjs',              // Prettier 配置文件
      '**/*.d.ts',                    // TypeScript 声明文件
      'src/router/index.ts'           // 路由配置文件
    ]
  },
  
  // Vue 3 文件配置 - 针对 .vue 文件的 ESLint 规则
  {
    files: ['src/**/*.vue'],
    plugins: {
      vue: pluginVue
    },
    languageOptions: {
      // 使用 vue-eslint-parser 解析 Vue 文件
      parser: vueParser,
      parserOptions: {
        // 使用 @typescript-eslint/parser 解析 TypeScript 代码
        parser: '@typescript-eslint/parser',
        // 使用最新的 ECMAScript 版本
        ecmaVersion: 'latest',
        // 使用模块化代码
        sourceType: 'module',
        ecmaFeatures: {
          // 启用 JSX 支持
          jsx: true
        }
      }
    },
    rules: {
      // 关闭组件名必须为多单词的限制
      'vue/multi-word-component-names': 'off',
      // 检查未使用的变量
      'vue/no-unused-vars': 'error',
      // 关闭 HTML 自闭合标签规则
      'vue/html-self-closing': 'off',
      // 限制每行属性数量
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 1
          },
          multiline: {
            max: 1
          }
        }
      ],
      // 关闭单行 HTML 元素内容换行规则
      'vue/singleline-html-element-content-newline': 'off',
      // 关闭多行 HTML 元素内容换行规则
      'vue/multiline-html-element-content-newline': 'off',
      // 关闭 HTML 闭合括号换行规则
      'vue/html-closing-bracket-newline': 'off',
      // 关闭禁止使用 v-html 的规则
      'vue/no-v-html': 'off',
      // 要求 v-for 指令使用 key 属性
      'vue/require-v-for-key': 'error',
      // 禁止在模板中使用箭头函数
      'vue/no-arrow-functions-in-watch': 'error',
      // 禁止在计算属性中进行副作用操作
      'vue/no-side-effects-in-computed-properties': 'error'
    }
  },
  
  // JavaScript 文件配置 - 针对 .js 文件的 ESLint 规则
  {
    files: ['src/**/*.js'],
    plugins: {
      // 启用 Prettier 插件
      prettier: pluginPrettier
    },
    rules: {
      // 警告使用 console
      'no-console': 'warn',
      // 警告使用 debugger
      'no-debugger': 'warn',
      // 检查未使用的变量
      'no-unused-vars': 'error',
      // 推荐使用 const 而不是 let
      'prefer-const': 'error',
      // 启用 Prettier 格式化规则
      'prettier/prettier': 'error',
      // 禁止使用 var
      'no-var': 'error',
      // 要求使用 === 和 !==
      'eqeqeq': 'error',
      // 禁止使用 eval()
      'no-eval': 'error',
      // 禁止使用 alert, confirm, prompt
      'no-alert': 'warn',
      // 禁止重复声明变量
      'no-redeclare': 'error',
      // 要求构造函数首字母大写
      'new-cap': 'error'
    }
  },
  
  // 应用 Prettier 配置 - 禁用与 Prettier 冲突的 ESLint 规则
  prettierConfig
];