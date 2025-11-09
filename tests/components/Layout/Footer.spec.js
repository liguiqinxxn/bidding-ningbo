import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Footer from "@/components/Layout/components/Footer.vue";

describe("Footer", () => {
  it("renders correctly", () => {
    const wrapper = mount(Footer);
    expect(wrapper.find(".footer").exists()).toBe(true);
  });

  it("displays organization information", () => {
    const wrapper = mount(Footer);
    expect(wrapper.text()).toContain("主办单位：宁波市招标投标协会");
  });

  it("displays record number", () => {
    const wrapper = mount(Footer);
    expect(wrapper.text()).toContain("浙ICP备");
  });
});
