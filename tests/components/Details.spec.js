import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Details from "@/components/Details/index.vue";

// Mock the v-loading directive
const loadingDirective = {
  mounted: () => {},
  updated: () => {},
};

describe("Details", () => {
  const mockCurrentItem = {
    title: "测试标题",
    time: "2023-01-01",
    hits: 100,
    content: "<p>测试内容</p>",
  };

  it("renders correctly with item data", () => {
    const wrapper = mount(Details, {
      props: {
        currentItem: mockCurrentItem,
        loading: false,
      },
      global: {
        directives: {
          loading: loadingDirective,
        },
      },
    });

    expect(wrapper.text()).toContain("测试标题");
    expect(wrapper.text()).toContain("2023-01-01");
    expect(wrapper.text()).toContain("100次");
    expect(wrapper.find("p").html()).toContain("测试内容");
  });

  it("shows loading state when loading is true", () => {
    const wrapper = mount(Details, {
      props: {
        currentItem: mockCurrentItem,
        loading: true,
      },
      global: {
        directives: {
          loading: loadingDirective,
        },
      },
    });

    expect(wrapper.classes()).toContain("details");
    // When loading is true, the info section should not be rendered
    expect(wrapper.find(".info").exists()).toBe(false);
  });

  it("hides info section when loading is true", () => {
    const wrapper = mount(Details, {
      props: {
        currentItem: mockCurrentItem,
        loading: true,
      },
      global: {
        directives: {
          loading: loadingDirective,
        },
      },
    });

    const infoSection = wrapper.find(".info");
    expect(infoSection.exists()).toBe(false);
  });

  it("shows info section when loading is false", () => {
    const wrapper = mount(Details, {
      props: {
        currentItem: mockCurrentItem,
        loading: false,
      },
      global: {
        directives: {
          loading: loadingDirective,
        },
      },
    });

    const infoSection = wrapper.find(".info");
    expect(infoSection.exists()).toBe(true);
  });
});
