<template>
  <div v-loading="loading">
    <div v-if="dataSource?.length" class="model-list">
      <div class="model-item" v-for="item in dataSource">
        <span class="title">{{ item.title }}</span>
        <span class="time">{{ item.time.split(" ")[0] }}</span>
      </div>
    </div>
    <el-empty v-else :image-size="150" description="暂无数据" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, watch } from "vue";
import { getModelList, getStudyList } from "@/api/index.js";
import { toRefs } from "@vueuse/shared";
import store from "@/store";

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

    const init = () => {
      let params: any = {
        type: props.type,
        keyword: store.state.keyword,
        page: 1,
        limit: 10,
      };
      if (props.type == "14") {
        // 知识问答
        params.type = "2";
        params.role = "0";
        getStudyList(params).then((res: any) => {
          state.loading = false;
          if (res.code == "0") {
            state.dataSource = res.data || [];
          }
        });
      } else {
        getModelList(params).then((res: any) => {
          state.loading = false;
          if (res.code == "0") {
            state.dataSource = res.data || [];
          }
        });
      }
    };

    watch(
      () => store.state.keyword,
      (newKeyword, oldKeyword) => {
        if (newKeyword !== oldKeyword) {
          init();
        }
      },
      { immediate: true }
    );

    return { ...toRefs(state) };
  },
});
</script>
<style lang="less" scoped>
.model-list {
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
  .model-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 4px 10px;
    box-sizing: border-box;
    .title {
      width: calc(100% - 80px);
      font-size: 14px;
      line-height: 30px;
      color: #0c0c0c;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .time {
      width: 60px;
      font-size: 12px;
      line-height: 28px;
      color: #bdbdbd;
    }
  }
}
</style>
