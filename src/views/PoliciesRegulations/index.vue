<template>
  <div class="policies-regulations">
    <div class="container">
      <div class="content">
        <div class="left">
          <Sidebar
            :dataSource="menuList"
            title="政策法规"
            subTitle="Policies Regulations"
            :activeIndex="activeIndex"
            @sidebarclick="sidebarclick"
          ></Sidebar>
        </div>
        <div class="right">
          <div class="content-header">
            <div class="title">
              {{ menuList && menuList[activeIndex]?.name }}
            </div>
            <div class="breadcrumb">
              <span>您的当前位置：</span>
              <el-breadcrumb separator=">>">
                <el-breadcrumb-item :to="{ path: '/home' }"
                  >首页</el-breadcrumb-item
                >
                <el-breadcrumb-item>政策法规</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </div>
          <div class="content">
            <div v-if="!isShow">
              <div class="tools">
                <div class="right">
                  <span class="label">关键字：</span>
                  <el-input
                    class="input"
                    v-model="keyword"
                    placeholder="请输入关键字"
                  />
                  <el-button type="primary" @click="init">搜索</el-button>
                </div>
              </div>
              <div class="list">
                <div
                  v-if="list?.length"
                  class="item"
                  v-for="item in list"
                  @click="openDetails(item)"
                >
                  <img class="triangle" :src="triangleIcon" />

                  <span class="title">{{ item.title }}</span>
                  <span class="time">{{ item?.time?.split(" ")[0] }}</span>
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
            <Details
              v-else
              :current-item="currentItem"
              :loading="loading"
            ></Details>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed, watch } from "vue";
import { getColumnOneList, getModelList, getModelInfo } from "@/api/index.js";
import { ElMessage } from "element-plus";
import Sidebar from "@/components/Sidebar/index.vue";
import Details from "@/components/Details/index.vue";
import triangleIcon from "assets/images/triangle_icon.png";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  setup() {
    interface props {
      type?: any;
      articleId?: any;
      menuList?: Array<any>;
      list?: Array<any>;
      keyword?: string;
      total?: any;
      page?: any;
      limit?: any;
      isShow?: boolean;
      currentItem: { title: any; content: any };
      loading?: boolean;
    }
    let state: props = reactive({
      type: "0",
      articleId: "",
      menuList: [],
      list: [],
      keyword: "",
      total: 0,
      page: 1,
      limit: 10,
      isShow: false,
      currentItem: { title: "", content: "" },
      loading: true,
    });

    // 获取政策法规栏目
    getColumnOneList({ pid: 14 }).then((res: any) => {
      if (res.code == "0") {
        state.menuList = [...res.data];
      } else {
        ElMessage.error(res.msg);
      }
    });

    const activeIndex = computed(() => {
      let index = 0;
      state.menuList?.map((r, i) => {
        if (r.type == state.type) {
          index = i;
        }
      });
      return index;
    });

    const $route = useRoute();
    const $router = useRouter();

    const sidebarclick = (item: any) => {
      state.type = item.type;
      $router.push({ query: ($route.query, { type: item.type }) });
      state.isShow = false;
      state.keyword = "";
    };

    const modelListFn = async (type: any) => {
      const params = {
        type,
        keyword: state.keyword,
        page: state.page,
        limit: state.limit,
      };
      return await getModelList(params).then((res: any) => {
        if (res.code == "0") {
          return res;
        }
      });
    };

    const init = () => {
      modelListFn(state.type).then((res) => {
        state.list = res.data || [];
        state.total = Number(res.count);
      });
    };

    const currentChange = (page: any) => {
      state.page = page;
      init();
    };

    init(); // 获取数据

    watch(
      () => state.type,
      (type, prevType) => {
        if (type != prevType) {
          init();
        }
      }
    );

    const ModelInfo = (id: any) => {
      getModelInfo({ id }).then((res: any) => {
        state.currentItem = res.data;
        state.loading = false;
      });
    };

    const openDetails = (item: any) => {
      // state.isShow = true;
      // ModelInfo(item.id);
      // state.loading = true;
      // state.currentItem = { title: "", content: "" };
      // $router.push({
      //   query: ($route.query, { type: state.type, articleId: item.id }),
      // });
      const to = $router.resolve({
        path: $route.path,
        query: ($route.query, { type: state.type, articleId: item.id }),
      });
      window.open(to.href, "_blank");
    };

    watch(
      () => $route.query,
      (newQuery, oldQuery) => {
        if (newQuery?.type !== oldQuery?.type) {
          if ($route.query.type) {
            state.type = $route.query.type;
          }
          if ($route.query.articleId) {
            state.articleId = $route.query.articleId;
            state.isShow = true;
            ModelInfo(state.articleId);
            state.loading = true;
            // openDetails({ id: state.articleId });
          }
        }
      },
      { immediate: true }
    );

    return {
      ...toRefs(state),
      triangleIcon,
      activeIndex,
      sidebarclick,
      init,
      currentChange,
      openDetails,
    };
  },
  components: { Sidebar, Details },
});
</script>
<style lang="less" scoped>
.policies-regulations {
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

          .tools {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 0 14px 20px;
            .el-button.el-button--primary {
              background-color: #19478b;
            }
            .right {
              display: flex;
              flex-direction: row;
              align-items: center;
              .label {
                width: 110px;
                font-size: 16px;
                font-weight: 600;
              }
              .input {
                margin-right: 14px;
              }
            }
          }

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
              .title {
                width: calc(100% - 164px);
                font-size: 14px;
                line-height: 40px;
                color: #000000;
                overflow: hidden; //超出的文本隐藏
                text-overflow: ellipsis; //溢出用省略号显示
                white-space: nowrap; // 默认不换行；
              }
              .time {
                width: 100px;
                font-size: 14px;
                line-height: 40px;
                color: #000000;
                text-align: right;
              }
            }
            .el-empty {
              margin-top: 60px;
            }
          }
          .pagination { 
            margin-top:6px;
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
