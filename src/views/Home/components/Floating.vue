<template>
  <div
    class="floating"
    v-show="store.state.isFloating"
  >
    <div class="box">
      <div class="box-header">
        <div class="sub-title">重要通知</div>
        <span
          class="more"
          @click="toAnnouncements"
          >更多&gt;&gt;</span
        >
      </div>
      <ModelList
        type="24"
        heavy="1"
        path="announcements"
        :limit="3"
        @toDetails="toDetails"
      ></ModelList>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import ModelList from "./ModelList.vue";
import store from "@/store";
export default defineComponent({
  setup() {
    interface props {
      memberList?: Array<any>;
    }
    let state: props = reactive({ memberList: [] });

    const $router = useRouter();

    // 跳转到文章详情
    const toDetails = (path: any, type: any, item: any) => {
      if (type == "24") {
        $router.push({
          path: path,
          query: { type, heavy: "1", articleId: item.id },
        });
      } else {
        $router.push({
          path: path,
          query: { type, articleId: item.id },
        });
      }
    };

    // 跳转通知公告
    const toAnnouncements = (item: any) => {
      $router.push({
        path: "announcements",
        query: { type: "24", heavy: "1" },
      });
    };

    return {
      ...toRefs(state),
      toDetails,
      toAnnouncements,
      store,
    };
  },
  components: { ModelList },
});
</script>
<style lang="less" scoped>
.floating {
  width: 20vw;
  height: auto;
  background-color: #fff;
  position: fixed;
  left: 12px;
  top: 10vh;
  z-index: 999;
  border-radius: 6px;
  padding: 0 16px;
  box-shadow: 4px 4px 2px rgba(0, 0, 0, 0.1), 4px -4px 2px rgba(0, 0, 0, 0.1), -4px 4px 2px rgba(0, 0, 0, 0.1),
    -4px -4px 2px rgba(0, 0, 0, 0.1);
  .box {
    margin: 10px 0;
    .box-header {
      border-bottom: 2px solid #c6c6c6;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    }

    .sub-title {
      color: #19478b;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 600;
      line-height: 48px;
    }

    .more {
      font-size: 16px;
      font-family: SimSun;
      font-weight: 400;
      color: #5c5c5c;
      line-height: 42px;
      cursor: pointer;
    }
  }
}
</style>
