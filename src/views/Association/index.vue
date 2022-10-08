<template>
  <div class="association-profile">
    <div class="container">
      <div class="content">
        <div class="left">
          <Sidebar
            :dataSource="associationMenu"
            title="关于协会"
            subTitle="About associations"
            :activeIndex="activeIndex"
            @sidebarclick="sidebarclick"
          ></Sidebar>
        </div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  onMounted,
  watch,
} from "vue";
import { getColumnOneList } from "@/api/index.js";
import { ElMessage } from "element-plus";
import Sidebar from "@/components/Sidebar/index.vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  setup() {
    interface props {
      id?: any;
      associationMenu?: Array<any>;
      associationList?: Array<any>;
      isShow?: boolean;
    }
    let state: props = reactive({
      id: "0",
      associationMenu: [],
      associationList: [],
      isShow: false,
    });

    // 获取关于协会栏目
    getColumnOneList({ pid: 4 }).then((res: any) => {
      if (res.code == "0") {
        state.associationMenu = [...res.data];
      } else {
        ElMessage.error(res.msg);
      }
    });

    const activeIndex = computed(() => {
      let index = 0;
      state.associationMenu?.map((r, i) => {
        if (r.id == state.id) {
          index = i;
        }
      });
      return index;
    });

    const $route = useRoute();
    const $router = useRouter();
    watch(
      () => $route.query,
      (newQuery, oldQuery) => {
        if (newQuery?.id !== oldQuery?.id) {
          if ($route.query.id) {
            state.id = $route.query.id;
          }
        }
      },
      { immediate: true }
    );

    const sidebarclick = (item: any) => {
      state.id = item.id;
      $router.push({ query: ($route.query, { id: item.id }) });
      state.isShow = false;
    };

    return { ...toRefs(state), activeIndex, sidebarclick };
  },
  components: { Sidebar },
});
</script>
<style lang="less" scoped>
.association-profile {
  width: 100%;
  height: auto;
  background: #fff;
  box-sizing: border-box;
  .container {
    width: 100%;
    max-width: 1440px;
    height: auto;
    margin: 0 auto;
    padding: 30px 16px;
    box-sizing: border-box;
    & > .content {
      display: flex;
      flex-direction: row;
      height: auto;
      & > .left {
        width: 320px;
        height: auto;
      }
      & > .right {
        width: calc(100% - 320px);
        padding: 0 20px;
        box-sizing: border-box;
        position: relative;
      }
    }
  }
}
</style>
