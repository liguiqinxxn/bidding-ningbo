<template>
  <div v-loading="loading">
    <div v-if="dataSource?.length" class="model-list">
      <div class="model-item" v-for="item in dataSource">
        <span class="title">{{ item.title }}</span>
        <span class="time">{{ item.time }}</span>
      </div>
    </div>
    <el-empty v-else :image-size="150" description="暂无数据" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { getModelList } from "@/api/index.js";
import { toRefs } from "@vueuse/shared";

export default defineComponent({
  props: {
    type: String,
  },
  setup(props) {
    interface props {
      dataSource: Array<any>;
    }

    const state = reactive({
      dataSource: [],
      loading: true,
    });

    const params = {
      type: props.type,
      page: 1,
      limit: 10,
    };

    getModelList(params).then((res: any) => {
      state.loading = false;
      if (res.code == "0") {
        state.dataSource = res.data || [];
      }
    });

    return { ...toRefs(state) };
  },
});
</script>
<style lang="less" scoped>
.model-list {
  .model-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 4px 10px;
    box-sizing: border-box;
    .title {
      width: calc(100% - 130px);
      font-size: 14px;
      line-height: 30px;
      color: #0c0c0c;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .time {
      width: 120px;
      font-size: 12px;
      line-height: 28px;
      color: #bdbdbd;
    }
  }
}
</style>
