module.exports = {
  // 扩展推荐的样式规范
  extends: [
    'stylelint-config-standard',           // Stylelint 标准规范
    'stylelint-config-recommended-vue'     // Vue 文件中的样式规范
  ],
  
  // 自定义规则
  rules: {
    // 禁止使用 !important
    'declaration-no-important': true,
    
    // 禁止低优先级的选择器出现在高优先级的选择器之后
    'no-descending-specificity': null,
    
    // 颜色值尽可能简写
    'color-hex-length': 'short',
    
    // 要求使用双引号而不是单引号
    'font-family-name-quotes': 'always-where-recommended',
    
    // 禁止未知的属性
    'property-no-unknown': true,
    
    // 禁止空的规则块
    'block-no-empty': true,
    
    // 禁止重复的字体名称
    'font-family-no-duplicate-names': true,
    
    // 禁止使用重复的选择器
    'no-duplicate-selectors': true,
    
    // 禁止使用无效的十六进制颜色
    'color-no-invalid-hex': true,
    
    // 禁止使用未知的单位
    'unit-no-unknown': true,
    
    // 允许 Element UI 的类名（包含大写字母）
    'selector-class-pattern': [
      '^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$|^(el-[a-zA-Z0-9]([-]?[a-zA-Z0-9]+)*)$',
      {
        message: 'Expected class selector to be kebab-case or Element UI class name'
      }
    ],
    
    // 暂时禁用位置声明检查，避免误报
    'no-invalid-position-declaration': null
  },
  
  // 忽略的文件和目录
  ignoreFiles: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/.git/**',
    '**/.history/**',
    '.prettierrc.cjs',
    'src/router/index.ts'
  ]
};