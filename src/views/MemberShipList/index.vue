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
            <div v-if="!isShow">
              <div class="list">
                <div
                  v-if="memberList?.length"
                  class="item"
                  v-for="item in memberList"
                  @click="openDetails(item)"
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
            <div v-else class="details">
              <div class="details-title">
                <img :src="currentItem?.logo" alt="logo" />
                <span>{{ currentItem?.name }}</span>
              </div>

              <!-- <div class="info">
                <span class="info-item"
                  >发布时间：<span>{{ currentItem?.time }} </span>
                </span>
                <span class="info-item"
                  >阅读量：<span> {{ currentItem?.hits }}次 </span></span
                >
              </div> -->

              <div class="details-info">
                <div class="sub-title">
                  <span>企业简介</span>
                </div>
                <p class="info">{{ currentItem?.info }}</p>
              </div>
              <div class="business-scope">
                <div class="sub-title">
                  <span>业务范围</span>
                </div>
                <p class="business">{{ currentItem?.business }}</p>
              </div>
              <div class="team">
                <div class="sub-title">
                  <span>团队风采</span>
                </div>
                <div class="imgs">
                  <img
                    :src="item"
                    v-for="item in currentItem?.team_style
                      ?.split(';')
                      .filter((r) => r)"
                    alt="team"
                  />
                </div>
              </div>
              <div class="team">
                <div class="sub-title">
                  <span>荣誉资质</span>
                </div>
                <div class="imgs">
                  <img
                    v-for="item in currentItem?.honors_qualifications
                      ?.split(';')
                      .filter((r) => r)"
                    :src="item ? item : ''"
                    alt="honors"
                  />
                </div>
              </div>
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
      isShow?: boolean;
      currentItem?: {
        logo: string;
        name: string;
        time: string;
        hits: any;
        info: string;
        business: string;
        team_style: string;
        honors_qualifications: string;
      };
    }
    let state: props = reactive({
      level: "3",
      memberList: [],
      total: 0,
      page: 1,
      limit: 10,
      isShow: false,
      currentItem: {
        logo: "",
        name: "",
        time: "",
        hits: 0,
        info: "",
        business: "",
        team_style: "",
        honors_qualifications: "",
      },
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
      state.isShow = false;
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

    const openDetails = (item: any) => {
      state.isShow = true;
      state.currentItem = item;
    };

    return {
      ...toRefs(state),
      triangleIcon,
      activeIndex,
      sidebarclick,
      memberShipList,
      currentChange,
      openDetails,
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
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: column;
          padding: 30px 0;
          .list {
            width: 100%;
            min-height: 300px;
            .item {
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
                width: auto;
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

          .details {
            width: 100%;
            position: relative;
            padding: 0 20px;
            box-sizing: border-box;
            .details-title {
              text-align: center;
              img {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                margin: 0 20px;
              }
              span {
                font-size: 20px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #000000;
                line-height: 60px;
              }
            }
            .sub-title {
              width: 100%;
              line-height: 52px;
              display: block;
              position: relative;
              span {
                font-size: 14px;
                font-family: SimSun;
                font-weight: 600;
                color: #000000;
                line-height: 24px;
                background: #e7e7e7;
                display: inline-block;
                padding: 0 10px;
                position: relative;
              }
            }
            .sub-title::before {
              content: "";
              width: 100%;
              height: 1px;
              background: #e6e6e6;
              display: block;
              position: absolute;
              top: 26px;
              z-index: 0;
            }
            .info,
            .business {
              font-size: 12px;
              line-height: 40px;
              color: #000000;
              font-weight: 400;
              padding: 20px;
            }
            .imgs {
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              padding: 20px;
              box-sizing: border-box;
              flex-wrap: wrap;
              img {
                width: 30%;
                margin: 2% 1.5%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
