<template>
  <div class="training-videos">
    <div class="container">
      <div class="content">
        <div class="left">
          <Sidebar
            :dataSource="menuList"
            title="培训视频"
            subTitle="Consultant Expert"
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
                <el-breadcrumb-item>培训视频</el-breadcrumb-item>
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
              <div class="video-list">
                <div
                  v-if="list?.length"
                  class="item"
                  v-for="item in list"
                  @click="openDetails(item)"
                >
                  <img class="img" :src="item.img" />
                  <el-tooltip
                    class="box-item"
                    effect="light"
                    :content="item.title"
                    placement="bottom"
                  >
                    <p class="title">{{ item.title }}</p>
                  </el-tooltip>
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
            <div v-else class="video-details">
              <h3 class="title">{{ currentItem?.title }}</h3>
              <div class="info">
                <span class="info-item"
                  >播放量：<span> {{ currentItem?.hits }}次 </span></span
                >
              </div>
              <video
                id="video"
                class="video"
                :poster="currentItem?.img"
                controls
                controlsList="nodownload"
                :onplay="videoPlay"
              >
                <source :src="currentItem?.url" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed, watch } from "vue";
import { getVideoList, video_play, getModelInfo } from "@/api/index.js";
import Sidebar from "@/components/Sidebar/index.vue";
import triangleIcon from "assets/images/triangle_icon.png";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  setup() {
    interface props {
      type?: any;
      menuList?: Array<any>;
      list?: Array<any>;
      keyword?: string;
      total?: any;
      page?: any;
      limit?: any;
      isShow?: boolean;
      currentItem?: { title: any; url: any; img: any; hits: any; id: any };
    }
    let state: props = reactive({
      type: "1",
      menuList: [
        // {
        //   name: "操作视频",
        //   type: "1",
        // },
        {
          name: "培训视频",
          type: "2",
        },
      ],
      list: [],
      keyword: "",
      total: 0,
      page: 1,
      limit: 10,
      isShow: false,
      currentItem: { title: "", url: "", img: "", hits: "0", id: "" },
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
    watch(
      () => $route.query,
      (newQuery, oldQuery) => {
        if (newQuery?.type !== oldQuery?.type) {
          if ($route.query.type) {
            state.type = $route.query.type;
          }
        }
      },
      { immediate: true }
    );

    const sidebarclick = (item: any) => {
      state.type = item.type;
      $router.push({ query: ($route.query, { type: item.type }) });
      state.isShow = false;
      state.keyword = "";
    };

    const videoListFn = async (type: any) => {
      const params = {
        type,
        keyword: state.keyword,
        page: state.page,
        limit: state.limit,
      };
      return await getVideoList(params).then((res: any) => {
        if (res.code == "0") {
          return res;
        }
      });
    };

    const init = () => {
      videoListFn(state.type).then((res) => {
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

    const openDetails = (item: any) => {
      state.isShow = true;
      state.currentItem = item;
    };

    const videoPlay = (e: any) => {
      const params = {
        id: state.currentItem?.id,
      };
      video_play(params);
    };

    return {
      ...toRefs(state),
      triangleIcon,
      activeIndex,
      sidebarclick,
      init,
      currentChange,
      openDetails,
      videoPlay,
    };
  },
  components: { Sidebar },
});
</script>
<style lang="less" scoped>
.training-videos {
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
        }
        .video-list {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .item {
            width: 25%;
            padding: 15px;
            box-sizing: border-box;
            cursor: pointer;
            .img {
              width: 100%;
            }
            .title {
              height: 52px;
              font-size: 15px;
              font-family: SimSun;
              font-weight: 400;
              color: #656565;
              line-height: 26px;
              margin: 15px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }

        .pagination { 
          margin-top:6px;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
        .video-details {
          padding: 0 30px;
          .title {
            width: 100%;
            font-size: 25px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #000000;
            line-height: 40px;
            padding-bottom: 20px;
            text-align: center;
          }
          .info {
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
          .video {
            width: auto;
            max-width: 100%;
            height: auto;
            max-height: 500px;
          }
        }
      }
    }
  }
}
</style>
