# 测试指南

## 运行测试

```bash
# 运行所有测试（监听模式）
npm run test

# 运行所有测试（一次性运行）
npm run test:run

# 运行测试并生成覆盖率报告
npm run test:coverage

# 在浏览器中查看测试UI
npm run test:ui
```

## 测试目录结构

```
tests/
├── components/     # 组件测试
├── store/          # Vuex store 测试
├── setup.js        # 测试环境设置
└── README.md       # 测试指南
```

## 技术栈

- [Vitest](https://vitest.dev/) - Vue.js 的极速单元测试框架
- [Vue Test Utils](https://test-utils.vuejs.org/) - Vue.js 官方测试工具库
- [JSDOM](https://github.com/jsdom/jsdom) - 浏览器环境模拟

## 编写测试

### 组件测试示例

```javascript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '@/components/MyComponent.vue'

describe('MyComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(MyComponent, { props: { msg: 'Hello World' } })
    expect(wrapper.text()).toContain('Hello World')
  })
})
```

### Store 测试示例

```javascript
import { describe, it, expect } from 'vitest'
import store from '@/store'

describe('Store', () => {
  it('should have initial state', () => {
    expect(store.state.someProperty).toBe('initialValue')
  })
})
```

## 配置文件

- `vitest.config.js` - Vitest 配置文件
- `setup.js` - 测试环境初始化设置