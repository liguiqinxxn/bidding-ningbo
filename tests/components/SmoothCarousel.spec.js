import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import SmoothCarousel from "@/components/SmoothCarousel.vue";

describe("SmoothCarousel", () => {
  // 模拟数据
  const mockItems = [
    { logo: "image1.jpg", title: "Title 1" },
    { logo: "image2.jpg", title: "Title 2" },
    { logo: "image3.jpg", title: "Title 3" },
  ];

  it("renders correctly with items", () => {
    const wrapper = mount(SmoothCarousel, {
      props: {
        items: mockItems,
      },
    });

    // 检查是否渲染了正确的项目数量（包括克隆项）
    const items = wrapper.findAll(".carousel-item");
    expect(items.length).toBe(5); // 3个原始项 + 2个克隆项

    // 检查是否渲染了指示器
    const indicators = wrapper.findAll(".carousel-indicators span");
    expect(indicators.length).toBe(3);
  });

  it("shows correct number of indicators", () => {
    const wrapper = mount(SmoothCarousel, {
      props: {
        items: mockItems,
        showIndicators: true,
      },
    });

    const indicators = wrapper.findAll(".carousel-indicators span");
    expect(indicators.length).toBe(3);
  });

  it("hides indicators when showIndicators is false", () => {
    const wrapper = mount(SmoothCarousel, {
      props: {
        items: mockItems,
        showIndicators: false,
      },
    });

    const indicators = wrapper.find(".carousel-indicators");
    expect(indicators.exists()).toBe(false);
  });

  it("hides indicators when there is only one item", () => {
    const wrapper = mount(SmoothCarousel, {
      props: {
        items: [mockItems[0]],
        showIndicators: true,
      },
    });

    const indicators = wrapper.find(".carousel-indicators");
    expect(indicators.exists()).toBe(false);
  });

  it("computes clonedItems correctly", async () => {
    const wrapper = mount(SmoothCarousel, {
      props: {
        items: mockItems,
      },
    });

    // 等待组件更新
    await wrapper.vm.$nextTick();

    // 获取计算属性
    const clonedItems = wrapper.vm.clonedItems;
    expect(clonedItems.length).toBe(5);
    expect(clonedItems[0]).toEqual(mockItems[2]); // 第一个克隆项应该是最后一项
    expect(clonedItems[4]).toEqual(mockItems[0]); // 最后一个克隆项应该是第一项
  });
});
