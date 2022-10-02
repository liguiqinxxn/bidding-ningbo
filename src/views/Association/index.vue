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
import { defineComponent, reactive, toRefs, computed, onMounted } from "vue";
import Sidebar from "@/components/Sidebar/index.vue";
import { useRoute } from "vue-router";
export default defineComponent({
  setup() {
    interface props {
      id?: Number;
      associationList?: Array<any>;
      isShow?: boolean;
    }
    let state = reactive({ id: 0, associationList: [], isShow: false });
    const associationMenu = [
      { name: "协会简介", id: 1, type: "2" },
      { name: "协会章程", id: 2, type: "3" },
      { name: "协会领导", id: 3, type: "4" },
      { name: "组织机构", id: 4, type: "5" },
      { name: "业务范围", id: 5, type: "6" },
      { name: "协会制度", id: 6, type: "23" },
      { name: "会员名单", id: 0, tyep: "26" },
      { name: "联系我们", id: 7, type: "7" },
    ];
    const activeIndex = computed(() => {
      let index = 0;
      associationMenu.map((r, i) => {
        if (r.id == state.id) {
          index = i;
        }
      });
      return index;
    });

    const $route = useRoute();
    onMounted(() => {
      if ($route.query.id) {
        state.id = Number($route.query.id);
      }
    });

    const sidebarclick = (item: any) => {
      state.id = item.id;
      state.isShow = false;
    };
    return { ...toRefs(state), activeIndex, associationMenu, sidebarclick };
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
