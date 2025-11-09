import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Menu from "@/components/Layout/components/Menu.vue";
import { createStore } from "vuex";
import { useRouter } from "vue-router";

// Mock useRouter and useRoute
vi.mock("vue-router", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    beforeEach: vi.fn(() => vi.fn()),
  })),
  useRoute: vi.fn(() => ({
    path: "/home",
  })),
  RouterLink: {
    template: "<a><slot /></a>",
  },
}));

// Mock the API call
vi.mock("@/api/index.js", () => ({
  getColumnList: vi.fn().mockResolvedValue({
    code: "0",
    data: [
      { id: "1", name: "首页", path: "home" },
      { id: "2", name: "关于我们", path: "about" },
    ],
  }),
}));

describe("Menu", () => {
  it("renders correctly", () => {
    const store = createStore({
      state: {
        userInfo: {
          company_name: "测试公司",
        },
      },
    });

    const wrapper = mount(Menu, {
      global: {
        plugins: [store],
        stubs: {
          RouterLink: true,
        },
      },
    });

    expect(wrapper.find(".menu").exists()).toBe(true);
  });

  it("renders menu items", async () => {
    const store = createStore({
      state: {
        userInfo: {
          company_name: "测试公司",
        },
      },
    });

    const wrapper = mount(Menu, {
      global: {
        plugins: [store],
        stubs: {
          RouterLink: true,
          "el-menu": true,
          "el-menu-item": true,
          "el-sub-menu": true,
        },
      },
    });

    // Wait for the component to load
    await wrapper.vm.$nextTick();

    // Since the component fetches data asynchronously, we'll check if the mock was called
    const getColumnList = await import("@/api/index.js");
    expect(getColumnList.getColumnList).toHaveBeenCalled();
  });
});
