// prettier 配置文件
module.exports = {
  // semi: 是否在语句末尾添加分号
  // 类型: boolean
  // 默认值: true
  // 可选值: 
  //   true  - 在语句末尾添加分号
  //   false - 不在语句末尾添加分号
  "semi": true, // 分号

  // singleQuote: 是否使用单引号而非双引号
  // 类型: boolean
  // 默认值: false
  // 可选值: 
  //   true  - 使用单引号 'string'
  //   false - 使用双引号 "string"
  "singleQuote": false, // 单引号

  // trailingComma: 尽可能使用尾随逗号
  // 类型: string
  // 默认值: "es5"
  // 可选值: 
  //   "es5"   - 在 ES5 中有效的尾随逗号（对象、数组等）
  //   "none"  - 不添加尾随逗号
  //   "all"   - 尽可能添加尾随逗号（包括函数参数等）
  "trailingComma": "all", // 末尾逗号

  // printWidth: 每行最大字符数
  // 类型: integer
  // 默认值: 80
  // 可选值: 任意正整数
  //   数字 - 超过该字符数的行将被换行
  "printWidth": 120, // 最大行宽

  // tabWidth: 每个tab相当于多少个空格
  // 类型: integer
  // 默认值: 2
  // 可选值: 任意正整数
  //   数字 - 指定每个tab或缩进级别对应的空格数
  "tabWidth": 2, // 缩进空格数

  // useTabs: 是否使用tab进行缩进
  // 类型: boolean
  // 默认值: false
  // 可选值: 
  //   true  - 使用tab字符进行缩进
  //   false - 使用空格进行缩进
  "useTabs": false, // 是否使用Tab缩进

  // bracketSpacing: 对象字面量中的括号间添加空格
  // 类型: boolean
  // 默认值: true
  // 可选值: 
  //   true  - { foo: bar } 在大括号内添加空格
  //   false - {foo: bar } 在大括号内不添加空格
  "bracketSpacing": true, // 对象大括号内是否加空格

  // jsxBracketSameLine: 将>多行JSX元素放在最后一行的末尾
  // 类型: boolean
  // 默认值: false
  // 可选值: 
  //   true  - 将JSX元素的闭合>放在最后一行的末尾
  //   false - 将JSX元素的闭合>放在新行的开头
  "jsxBracketSameLine": false, // JSX大括号内是否加空格

  // arrowParens: 箭头函数参数始终使用括号
  // 类型: string
  // 默认值: "always"
  // 可选值: 
  //   "always" - 始终为箭头函数参数添加括号 (x) => x
  //   "avoid"  - 尽可能省略括号 x => x
  "arrowParens": "always", // 箭头函数参数是否加括号

  // quoteProps: 仅在需要时为对象属性名加引号
  // 类型: string
  // 默认值: "as-needed"
  // 可选值: 
  //   "as-needed"  - 仅在需要时为属性名加引号 { "a-b": 1 }
  //   "consistent" - 如果一个属性需要引号，则所有属性都加引号
  //   "preserve"   - 保持原始引号
  "quoteProps": "as-needed", // 对象属性引号是否加引号

  // proseWrap: 不对markdown文本进行重新换行
  // 类型: string
  // 默认值: "preserve"
  // 可选值: 
  //   "always"   - 如果超出printWidth，强制换行
  //   "never"    - 移除markdown文本中的换行
  //   "preserve" - 保持markdown文本中的原始换行
  "proseWrap": "preserve", // 段落缩进是否换行

  // htmlWhitespaceSensitivity: HTML空格敏感度设置
  // 类型: string
  // 默认值: "css"
  // 可选值: 
  //   "css"    - 遵循CSS display属性的默认值
  //   "strict" - 所有标签周围的空格都会被视为空白
  //   "ignore" - 所有标签周围的空格都不会被视为空白
  "htmlWhitespaceSensitivity": "css", // HTML空格敏感度

  // singleAttributePerLine: HTML标签每个属性占一行
  // 类型: boolean
  // 默认值: false
  // 可选值: 
  //   true  - 每个属性都独占一行
  //   false - 尽可能将多个属性放在同一行
  "singleAttributePerLine": true, // 是否单行属性

  // endOfLine: 换行符使用lf
  // 类型: string
  // 默认值: "lf"
  // 可选值: 
  //   "lf"   - 换行符 \n (Linux, macOS)
  //   "crlf" - 换行符 \r\n (Windows)
  //   "cr"   - 换行符 \r (旧版macOS)
  //   "auto" - 保持现有换行符
  "endOfLine": "crlf", // 换行符

  // rangeStart: 格式化开始位置
  // 类型: integer
  // 默认值: 0
  // 可选值: 任意非负整数
  //   数字 - 从指定字符位置开始格式化
  "rangeStart": 0, // 范围开始

  // requirePragma: 是否需要在文件顶部添加特殊注释来启用格式化
  // 类型: boolean
  // 默认值: false
  // 可选值: 
  //   true  - 仅格式化包含@prettier注释的文件
  //   false - 格式化所有文件
  "requirePragma": false, // 是否要求 pragma

  // insertPragma: 是否在格式化后的文件顶部插入Pragma标记
  // 类型: boolean
  // 默认值: false
  // 可选值: 
  //   true  - 在文件顶部插入@prettier注释
  //   false - 不插入@prettier注释
  "insertPragma": false // 是否插入 pragma
};
