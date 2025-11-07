import { config } from "@vue/test-utils";
import { vi } from "vitest";

// 全局模拟
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Vue Test Utils 配置
config.global.stubs = {
  transition: false,
  "transition-group": false,
};

// 清理 DOM
beforeEach(() => {
  document.body.innerHTML = "";
  document.head.innerHTML = "";
});
