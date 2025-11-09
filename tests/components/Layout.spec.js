import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Layout from "@/components/Layout/index.vue";

// Mock child components
vi.mock("@/components/Layout/components/Header.vue", () => ({
  default: {
    template: "<div>Header</div>",
  },
}));

vi.mock("@/components/Layout/components/Footer.vue", () => ({
  default: {
    template: "<div>Footer</div>",
  },
}));

vi.mock("@/components/Layout/components/Menu.vue", () => ({
  default: {
    template: "<div>Menu</div>",
  },
}));

vi.mock("@/components/Layout/components/Carousel.vue", () => ({
  default: {
    template: "<div>Carousel</div>",
  },
}));

// Mock router-view
vi.mock("vue-router", () => ({
  RouterView: {
    template: "<div>Router View</div>",
  },
}));

describe("Layout", () => {
  it("renders all child components", () => {
    const wrapper = mount(Layout);

    expect(wrapper.text()).toContain("Header");
    expect(wrapper.text()).toContain("Menu");
    expect(wrapper.text()).toContain("Carousel");
    // router-view is a functional component, so we check for its presence differently
    expect(wrapper.find("router-view").exists()).toBe(true);
    expect(wrapper.text()).toContain("Footer");
  });

  it("renders el-scrollbar wrapper", () => {
    const wrapper = mount(Layout);
    expect(wrapper.find("el-scrollbar").exists()).toBe(true);
  });

  it("renders layout div", () => {
    const wrapper = mount(Layout);
    expect(wrapper.find(".layout").exists()).toBe(true);
  });
});
