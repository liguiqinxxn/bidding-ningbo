import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Demo from "@/components/demo.vue";

describe("Demo", () => {
  it("renders correctly", () => {
    const wrapper = mount(Demo);
    expect(wrapper.find(".sidebar").exists()).toBe(true);
  });

  it("has empty setup function", () => {
    const wrapper = mount(Demo);
    // This component has an empty setup function, so we're just testing it renders
    expect(wrapper.exists()).toBe(true);
  });
});
