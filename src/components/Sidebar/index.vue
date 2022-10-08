<template>
  <div class="sidebar">
    <div class="titles">
      <span class="title">{{ title }}</span>
      <span class="subTitle">{{ subTitle }}</span>
    </div>
    <div class="sidebar-list">
      <div
        class="sidebar-item"
        v-for="(item, index) in data"
        :class="{ active: activeIndex == index }"
        @click="sidebarclick(item, index)"
      >
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
export default defineComponent({
  props: {
    dataSource: Array,
    title: String,
    subTitle: String,
    activeIndex: Number,
  },
  setup(props, { emit }) {
    interface propsType {
      data?: Array<any>;
    }
    let state: propsType = reactive({
      data: props.dataSource,
    });

    watch(props, (props, prevProps) => {
      state.data = props?.dataSource;
    });

    const sidebarclick = (item: any, index: any) => {
      emit("sidebarclick", item);
    };

    return { ...toRefs(state), sidebarclick };
  },
});
</script>
<style lang="less" scoped>
.sidebar {
  min-height: 800px;
  border: 1px solid #e3e2e2;
  box-shadow: 0px 4px 10px 0px rgba(4, 0, 0, 0.05);
  border-radius: 12px 12px 0 0;
  .titles {
    width: 100%;
    height: 70px;
    border-radius: 12px 12px 0 0;
    background-color: #19478b;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    text-shadow: 0px 2px 2px rgba(4, 0, 0, 0.75);
    position: relative;
    .title {
      font-size: 30px;
      line-height: 40px;
      letter-spacing: 8px;
      position: relative;
      z-index: 10;
    }
    .subTitle {
      font-size: 18px;
      line-height: 26px;
      letter-spacing: 2px;
      position: relative;
      z-index: 10;
    }
  }
  .titles::after {
    content: "";
    width: 100%;
    height: 70px;
    background-image: url(../../assets/images/title_bg.png);
    background-size: 100% 100%;
    opacity: 0.5;
    position: absolute;
    z-index: 9;
  }

  .sidebar-list {
    .sidebar-item {
      font-size: 20px;
      font-family: SimSun;
      font-weight: 400;
      color: #000000;
      line-height: 52px;
      text-align: center;
      border-bottom: 1px solid #f0f0f0;
      cursor: pointer;
    }
    .sidebar-item.active,
    .sidebar-item:hover {
      background: #f6f6f6;
      background-image: url(../../assets/images/triangle_icon.png);
      background-repeat: no-repeat;
      background-size: 14px 14px;
      background-position: 80px center;
    }
  }
}
</style>
