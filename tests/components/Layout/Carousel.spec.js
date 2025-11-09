import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Carousel from "@/components/Layout/components/Carousel.vue";

// Mock the API call to prevent network requests
vi.mock("@/api/index.js", () => ({
  getBannerList: vi.fn().mockResolvedValue({
    code: "0",
    data: [
      { id: "1", logo: "test1.jpg" },
      { id: "2", logo: "test2.jpg" },
    ],
  }),
}));

describe("Carousel", () => {
  it("renders correctly", () => {
    const wrapper = mount(Carousel);
    expect(wrapper.find(".carousel").exists()).toBe(true);
  });

  it("contains el-carousel component", () => {
    const wrapper = mount(Carousel);
    expect(wrapper.find("el-carousel").exists()).toBe(true);
  });

  it("renders carousel items", async () => {
    const wrapper = mount(Carousel);
    // Wait for any async operations
    await wrapper.vm.$nextTick();
    expect(wrapper.find("el-carousel-item").exists()).toBe(true);
  });
});
