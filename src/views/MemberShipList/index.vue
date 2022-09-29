<template>
  <div class="member-ship-list">
    <div class="container">
      <div class="content">
        <div class="left">
          <Sidebar
            :dataSource="memberShipList"
            title="会员风采"
            subTitle="Member style"
            :activeIndex="activeIndex"
            @sidebarclick="sidebarclick"
          ></Sidebar>
        </div>
        <div class="right">
          <div class="content-header">
            <div class="title">{{ memberShipList[activeIndex].name }}</div>
            <div class="breadcrumb">
              <span>您的当前位置：</span>
              <el-breadcrumb separator=">>">
                <el-breadcrumb-item :to="{ path: '/home' }"
                  >首页</el-breadcrumb-item
                >
                <el-breadcrumb-item>会员风采</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </div>
          <div class="content">
            <div class="member-list">
              <div
                v-if="memberList?.length"
                class="member-item"
                v-for="item in memberList"
              >
                <img class="triangle" :src="triangleIcon" />

                <img class="logo" :src="item.logo" />
                <span class="name">{{ item.name }}</span>
              </div>
              <el-empty v-else :image-size="150" description="暂无数据" />
            </div>
            <div v-if="total" class="pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                @current-change="currentChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch,
  computed,
} from "vue";
import { getMemberList } from "@/api/index.js";
import Sidebar from "@/components/Sidebar/index.vue";
import triangleIcon from "assets/images/triangle_icon.png";
import { useRoute } from "vue-router";
export default defineComponent({
  setup() {
    interface props {
      level?: any;
      memberList?: Array<any>;
      total?: any;
      page?: any;
      limit?: any;
    }
    let state: props = reactive({
      level: "3",
      memberList: [],
      total: 0,
      page: 1,
      limit: 10,
    });
    const memberShipList = [
      { name: "常务理事", level: "3" },
      { name: "理事单位", level: "2" },
      { name: "会员单位", level: "1" },
    ];

    const activeIndex = computed(() => {
      let index = 0;
      memberShipList.map((r, i) => {
        if (r.level == state.level) {
          index = i;
        }
      });
      return index;
    });

    const $route = useRoute();
    onMounted(() => {
      if ($route.query.level) {
        state.level = $route.query.level;
      }
    });

    const sidebarclick = (item: any) => {
      state.level = item.level;
    };

    const memberListFn = async (level: any) => {
      const params = {
        level,
        keyword: "",
        page: state.page,
        limit: state.limit,
      };
      return await getMemberList(params).then((res: any) => {
        if (res.code == "0") {
          return res;
        }
      });
    };

    const init = () => {
      memberListFn(state.level).then((res) => {
        state.memberList = res.data || [];
        state.total = Number(res.count);
      });
    };

    const currentChange = (page: any) => {
      state.page = page;
      init();
    };

    init(); // 获取数据

    watch(
      () => state.level,
      (level, prevLevel) => {
        if (level != prevLevel) {
          init();
        }
      }
    );

    return {
      ...toRefs(state),
      activeIndex,
      sidebarclick,
      memberShipList,
      currentChange,
      triangleIcon,
    };
  },
  components: { Sidebar },
});
</script>
<style lang="less" scoped>
.member-ship-list {
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
      & > .left {
        width: 320px;
        height: auto;
      }
      & > .right {
        width: calc(100% - 320px);
        height: 500px;
        padding: 0 20px;
        box-sizing: border-box;
        .content-header {
          width: 100%;
          height: 52px;
          border-bottom: 1px solid #e5e5e5;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          position: relative;
          .title {
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #000000;
            line-height: 50px;
            padding: 0 6px;
          }
          .breadcrumb {
            font-size: 16px;
            font-family: SimSun;
            font-weight: 400;
            color: #010101;
            line-height: 50px;
            .el-breadcrumb {
              display: inline-block;
            }
          }
        }
        .content-header::after {
          content: "";
          width: 254px;
          height: 5px;
          background: url(../../assets/images/title_line.png) no-repeat;
          background-size: auto;
          position: absolute;
          left: 6px;
          bottom: -3px;
        }

        & > .content {
          display: flex;
          flex-direction: column;
          padding: 30px 0;
          .member-list {
            width: 100%;
            min-height: 300px;
            .member-item {
              width: 100%;
              height: 48px;
              display: flex;
              flex-direction: row;
              align-items: center;
              border-bottom: 1px solid #f4f4f4;
              cursor: pointer;
              .triangle {
                width: 14px;
                height: 14px;
                padding: 0 20px;
              }
              .logo {
                width: 60px;
                height: 30px;
                border: 1px solid #b6b5b5;
                margin-right: 20px;
              }
              .name {
                font-size: 14px;
                line-height: 40px;
                color: #000000;
              }
            }
            .el-empty {
              margin-top: 60px;
            }
          }
          .pagination {
            display: flex;
            flex-direction: row;
            justify-content: center;
          }
        }
      }
    }
  }
}
</style>
