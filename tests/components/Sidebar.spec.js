import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Sidebar from "@/components/Sidebar/index.vue";

describe("Sidebar", () => {
  const mockDataSource = [{ name: "项目1" }, { name: "项目2" }, { name: "项目3" }];

  it("renders correctly with title and subtitle", () => {
    const wrapper = mount(Sidebar, {
      props: {
        title: "主标题",
        subTitle: "副标题",
        dataSource: mockDataSource,
        activeIndex: 0,
      },
    });

    expect(wrapper.text()).toContain("主标题");
    expect(wrapper.text()).toContain("副标题");
  });

  it("renders correct number of sidebar items", () => {
    const wrapper = mount(Sidebar, {
      props: {
        title: "主标题",
        subTitle: "副标题",
        dataSource: mockDataSource,
        activeIndex: 0,
      },
    });

    const items = wrapper.findAll(".sidebar-item");
    expect(items.length).toBe(3);
  });

  it("emits sidebarclick event when item is clicked", async () => {
    const wrapper = mount(Sidebar, {
      props: {
        title: "主标题",
        subTitle: "副标题",
        dataSource: mockDataSource,
        activeIndex: 0,
      },
    });

    const firstItem = wrapper.find(".sidebar-item");
    await firstItem.trigger("click");

    expect(wrapper.emitted("sidebarclick")).toBeTruthy();
    expect(wrapper.emitted("sidebarclick")[0]).toEqual([mockDataSource[0]]);
  });

  it("applies active class to the correct item", () => {
    const wrapper = mount(Sidebar, {
      props: {
        title: "主标题",
        subTitle: "副标题",
        dataSource: mockDataSource,
        activeIndex: 1,
      },
    });

    const items = wrapper.findAll(".sidebar-item");
    expect(items[1].classes()).toContain("active");
  });
});
