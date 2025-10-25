<template>
  <div
    class="details"
    v-loading="loading"
    background="#fff"
  >
    <h2 class="title">{{ currentItem?.title }}</h2>
    <div
      class="info"
      v-if="!loading"
    >
      <span class="info-item"
        >发布时间：<span>{{ currentItem?.time }} </span>
      </span>
      <span class="info-item"
        >阅读量：<span> {{ currentItem?.hits }}次 </span></span
      >
    </div>
    <p v-html="currentItem?.content"></p>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  props: {
    currentItem: Object,
    loading: Boolean,
  },
  setup() {
    let state = reactive({});
    return { ...toRefs(state) };
  },
});
</script>
<style lang="less" scoped>
.details {
  padding: 20px;
  min-height: 300px;
  .title {
    font-size: 24px;
    font-family: SimSun;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
  }
  & > .info {
    display: block;
    text-align: center;
    margin-bottom: 20px;
    .info-item {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: normal;
      color: #000000;
      padding: 10px;
      font-weight: 500;
      span {
        font-weight: normal;
      }
    }
  }
}
</style>
