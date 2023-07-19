<template>
  <div class="home">
    <Floating></Floating>
    <div class="container">
      <div class="content">
        <div class="left">
          <el-row :gutter="20">
            <!-- 荣誉证书 -->
            <el-col :span="12">
              <div class="box">
                <el-carousel height="400px" arrow="never">
                  <el-carousel-item v-for="item in imgs" :key="item">
                    <img class="carousel-img" :src="item.logo" />
                    <p class="title">{{ item.title }}</p>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </el-col>

            <!-- 其他资讯|工作动态 -->
            <!-- <el-col :span="12">
              <div class="box">
                <div class="box-header">
                  <div class="tabs">
                    <span
                      class="tab"
                      :class="{ active: activeKey == 1 }"
                      @click="tabClick(1)"
                      >其他资讯</span
                    >|<span
                      class="tab"
                      :class="{ active: activeKey == 2 }"
                      @click="tabClick(2)"
                      >工作动态</span
                    >
                  </div>
                  <span class="more" @click="toDynamic(activeKey)"
                    >更多&gt;&gt;</span
                  >
                </div>

                其他资讯
                <ModelList
                  v-if="activeKey == 1"
                  type="8"
                  path="activityDynamics"
                  @toDetails="toDetails"
                ></ModelList>
                工作动态
                <ModelList
                  v-else
                  type="9"
                  path="workDynamics"
                  @toDetails="toDetails"
                ></ModelList>
              </div>
            </el-col> -->

            <!-- 工作动态 -->
            <el-col :span="12">
              <div class="box">
                <div class="box-header">
                  <div class="sub-title">工作动态</div>
                  <span class="more" @click="toDynamic(2)">更多&gt;&gt;</span>
                </div>
                <ModelList
                  type="9"
                  path="workDynamics"
                  @toDetails="toDetails"
                ></ModelList>
              </div>
            </el-col>

            <!-- 会员动态 -->
            <el-col :span="12">
              <div class="box">
                <div class="box-header">
                  <div class="sub-title">会员动态</div>
                  <span class="more" @click="toMemberdynamics"
                    >更多&gt;&gt;</span
                  >
                </div>
                <!-- <div class="model-title">&nbsp;</div> -->
                <ModelList
                  type="1"
                  path="memberdynamics"
                  @toDetails="toDetails"
                ></ModelList>
              </div>
            </el-col>

            <!-- 其他资讯 -->
            <el-col :span="12">
              <div class="box">
                <div class="box-header">
                  <div class="sub-title">其他资讯</div>
                  <span class="more" @click="toDynamic(1)">更多&gt;&gt;</span>
                </div>
                <ModelList
                  type="8"
                  path="activityDynamics"
                  @toDetails="toDetails"
                ></ModelList>
              </div>
            </el-col>

            <!-- 会员名录 -->
            <el-col :span="24">
              <div class="box">
                <div class="box-header">
                  <div class="sub-title">会员名录</div>
                </div>
                <div class="members">
                  <div
                    class="member"
                    v-for="(item, i) in memberList"
                    @click="toMembers(levels[i])"
                  >
                    <span class="title">{{ levels[i].name }}</span>
                    <div class="imgs">
                      <img class="img" v-for="r in item" :src="r.logo" />
                      <!-- @click.stop="toMembers(levels[i], r)" -->
                    </div>
                    <span class="more">更多&gt;&gt;</span>
                  </div>
                </div>
              </div>
            </el-col>

            <!-- 电子会刊 -->
            <!-- <el-col :span="16">
              <div class="box">
                <div class="box-header">
                  <div class="sub-title">电子会刊</div>
                  <span class="more">更多&gt;&gt;</span>
                </div>
                <el-row>
                  <el-col :span="12">
                    <div class="model-title">中国招标投标</div>
                    <ModelList type="17" path="" @toDetails="toDetails"></ModelList>
                  </el-col>
                  <el-col :span="12">
                    <div class="model-title">宁波招标投标</div>
                    <ModelList type="16" path="" @toDetails="toDetails"></ModelList>
                  </el-col>
                </el-row>
              </div>
            </el-col> -->

            <!-- 知识问答 -->
            <!-- <el-col :span="12">
              <div class="box">
                <div class="box-header">
                  <div class="sub-title">知识问答</div>
                  <span class="more" @click="toKnowledgeQA">更多&gt;&gt;</span>
                </div>
                <ModelList
                  type="14"
                  path="knowledgeQA"
                  @toDetails="toDetails"
                ></ModelList>
              </div>
            </el-col> -->

            <!-- 政策法规 -->
            <el-col :span="12">
              <div class="box">
                <div class="box-header">
                  <div class="sub-title">政策法规</div>
                  <span class="more" @click="toRegulations">更多&gt;&gt;</span>
                </div>
                <ModelList
                  type="11"
                  path="provincialRegulations"
                  @toDetails="toDetails"
                ></ModelList>
              </div>
            </el-col>

            <!-- 法律解读 -->
            <el-col :span="12">
              <div class="box">
                <div class="box-header">
                  <div class="sub-title">法律解读</div>
                  <span class="more" @click="toLegalInterpretation"
                    >更多&gt;&gt;</span
                  >
                </div>
                <ModelList
                  type="13"
                  path="legalInterpretation"
                  @toDetails="toDetails"
                ></ModelList>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="right">
          <div class="box">
            <div class="box-header">
              <div class="sub-title">会员登录</div>
            </div>
            <div v-if="store.state.userInfo.uid" class="user-info">
              <span class="level">{{
                levels?.filter((r) => r.level == store.state.userInfo.level)[0]
                  .name
              }}</span>
              <img class="logo" :src="store.state.userInfo.logo" />
              <p class="name">{{ store.state.userInfo.name }}</p>
              <p class="info_link">
                <span @click="toPersonalCenter">【个人中心】</span>/<span
                  @click="logout"
                  >【退出】</span
                >
              </p>
            </div>
            <el-form :model="form" label-width="0px" v-else>
              <el-form-item label="">
                <el-input
                  v-model="form.username"
                  placeholder="请输入账号"
                  :prefix-icon="Iphone"
                />
              </el-form-item>
              <el-form-item label="">
                <el-input
                  v-model="form.password"
                  type="password"
                  autocomplete="off"
                  placeholder="请输入密码"
                  :prefix-icon="Lock"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 通知公告 -->
          <div class="box">
            <div class="box-header">
              <div class="sub-title">通知公告</div>
              <span class="more" @click="toAnnouncements">更多&gt;&gt;</span>
            </div>
            <ModelList
              type="24"
              path="announcements"
              heavy="0"
              @toDetails="toDetails"
            ></ModelList>
          </div>
          <div class="info">
            <div class="info-item consultant-expert" @click="toConsultant">
              <span class="title">咨询专家</span>
              <span>Consultant Expert</span>
            </div>
            <div class="info-item training-videos" @click="toTrainingVideos">
              <span class="title">培训视频列表</span>
              <span>List of Training Videos</span>
            </div>

            <!-- <div class="info-item membership-application">
              <span class="title">入会申请</span>
              <span>Membership Application</span>
            </div>
            <div class="info-item tenderee-column">
              <span class="title">招标师专栏</span> <span>Tenderee column</span>
            </div>
            <div class="info-item laws-regulations">
              <span class="title">招标采购常用法规速查</span>
              <span
                >Quick check of common laws and <br />
                regulations for bidding procurement</span
              >
            </div>
            <div class="info-item recruitment-info">
              <span class="title">招聘信息</span>
              <span>Recruitment information</span>
            </div>
            <div class="info-item complaint-supervision">
              <span class="title">投诉监督</span>
              <span>Complaint supervision</span>
            </div> -->

            <div class="info-item contact-us">
              <span class="title">联系我们</span> <span>Contact us</span>
              <div class="contact">
                <span>办公室： 0574-87187928</span>
                <span>会员部： 0574-87187122</span>
                <span>信息部： 0574-87187759</span>
                <span>邮&nbsp;&nbsp;&nbsp;编： 315040</span>
                <span>传&nbsp;&nbsp;&nbsp;真： 0574-87187123</span>
                <span>邮&nbsp;&nbsp;&nbsp;箱： nbztbxh@sina.com</span>
              </div>
            </div>
          </div>
          <!-- 诚信自律 -->
          <div class="box">
            <div class="box-header">
              <div class="sub-title">诚信自律</div>
              <span class="more" @click="toDisciplineConvention"
                >更多&gt;&gt;</span
              >
            </div>
            <ModelList
              type="18"
              path="disciplineConvention"
              @toDetails="toDetails"
            ></ModelList>
          </div>
        </div>
      </div>
      <!-- 友情链接 -->
      <div class="links">
        <div class="box">
          <div class="box-header">
            <div class="sub-title">友情链接</div>
          </div>
          <div class="link-box">
            <div class="linklist" @mouseover="mouseover" @mouseout="mouseout">
              <img
                v-for="item in linkList"
                :src="item.logo"
                @click="toLink(item.url)"
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
  reactive,
  toRefs,
  onMounted,
  ref,
  onBeforeUnmount,
} from "vue";
import linkImg from "assets/images/links.png";
import { Iphone, Lock } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import ModelList from "./components/ModelList.vue";
import _store from "@/store";
import store from "@/store";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import $ from "jquery";
import {
  getBannerList,
  getLogin,
  getLogout,
  getUserInfoAll,
  getMemberList,
  getLinksList,
} from "@/api/index.js";
import {
  setToken,
  getToken,
  removeToken,
  setUid,
  getUid,
  removeUid,
} from "@/utils/cookies.js";
import Floating from "./components/Floating.vue";

export default defineComponent({
  setup() {
    interface props {
      keyword?: string;
      form: { username: any; password: any };
      imgs?: Array<any>;
      activeKey?: any;
      memberList?: Array<any>;
      linkList?: Array<any>;
    }
    let state: props = reactive({
      keyword: "",
      form: {
        username: "",
        password: "",
      },
      imgs: [],
      activeKey: 1,
      memberList: [],
      linkList: [],
    });
    const levels = [
      { name: "常务理事", level: "3" },
      { name: "理事单位", level: "2" },
      { name: "会员单位", level: "1" },
    ];
    const $router = useRouter();

    onMounted(() => {
      if (getToken() && getUid()) {
        const params = {
          uid: parseInt(getUid()),
          tokenid: getToken(),
        };
        userInfoAll(params);
      }
    });

    const bannerList = (type: any) => {
      getBannerList({ type }).then((res: any) => {
        if (res.code == "0") {
          state.imgs = res.data;
        }
      });
    };
    bannerList(2); // 荣誉证书

    const login = () => {
      getLogin(state.form).then((res: any) => {
        if (res.code == "0") {
          ElMessage({
            message: "登录成功！",
            type: "success",
          });
          setToken(res.data.tokenid);
          setUid(res.data.uid);
          userInfoAll(res.data);
        }
      });
    };
    const toPersonalCenter = () => {
      $router.push({ path: "personalCenter" });
    };
    const logout = () => {
      ElMessageBox.confirm("请确认退出？", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = {
            uid: getUid(),
            tokenid: getToken(),
          };
          getLogout(params).then((res: any) => {
            if (res.code == "0") {
              ElMessage({
                message: "退出成功！",
                type: "success",
              });
              removeToken();
              removeUid();
              store.commit("setUserInfo", {});
            }
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消",
          });
        });
    };
    const userInfoAll = (data: any) => {
      getUserInfoAll(data).then((res: any) => {
        if (res.code == "0") {
          const store = useStore() || _store;
          const userInfo = {
            ...res.data.user,
            ...res.data.user_info,
            ...res.data.user_mailing_info,
          };
          store.commit("setUserInfo", userInfo);
        } else {
          removeToken();
          removeUid();
        }
      });
    };
    const tabClick = (key: any) => {
      state.activeKey = key;
    };

    const memberListFn = async (params: any) => {
      return await getMemberList(params).then((res: any) => {
        if (res.code == "0") {
          return res.data || [];
        }
      });
    };
    const lists = levels.map((item: any) => {
      const memberParams = {
        level: item.level,
        keyword: "",
        page: 1,
        limit: 10,
      };
      return memberListFn(memberParams).then();
    });
    Promise.all(lists).then((res: any) => {
      state.memberList = res;
    });

    // 跳转协会动态
    const toDynamic = (activeKey: any) => {
      if (activeKey == 1) {
        // 其他资讯
        $router.push({ path: "activityDynamics", query: { type: "8" } });
      } else {
        // 工作动态
        $router.push({ path: "workDynamics", query: { type: "9" } });
      }
    };

    // 跳转政策法规
    const toRegulations = (item: any) => {
      $router.push({ path: "provincialRegulations", query: { type: "11" } });
    };

    // 跳转诚信自律
    const toDisciplineConvention = (item: any) => {
      $router.push({
        path: "disciplineConvention",
        query: { type: "18" },
      });
    };

    // 跳转会员目录
    const toMembers = (item: any, r?: any) => {
      if (r) {
        $router.push({
          path: "membershiplist",
          query: { level: item.level, articleId: r.id },
        });
      } else {
        $router.push({ path: "membershiplist", query: { level: item.level } });
      }
    };

    // 跳转会员动态
    const toMemberdynamics = (item: any) => {
      $router.push({ path: "memberdynamics", query: { type: "1" } });
    };

    // 跳转知识问答
    const toKnowledgeQA = (item: any) => {
      $router.push({
        path: "knowledgeQA",
        query: { type: "14" },
      });
    };

    // 跳转法律解读
    const toLegalInterpretation = (item: any) => {
      $router.push({
        path: "legalInterpretation",
        query: { type: "13" },
      });
    };

    // 跳转通知公告
    const toAnnouncements = (item: any) => {
      $router.push({
        path: "announcements",
        query: { type: "24", heavy: "0" },
      });
    };

    // 跳转咨询专家
    const toConsultant = (item: any) => {
      $router.push({
        path: "managementMeasures",
        query: { type: "15" },
      });
    };

    // 跳转培训视频
    const toTrainingVideos = (item: any) => {
      $router.push({
        path: "trainingVideos",
        query: { type: "2" },
      });
    };

    // 跳转到文章详情
    const toDetails = (path: any, type: any, item: any) => {
      if (type == "24") {
        // $router.push({
        //   path: path,
        //   query: { type, heavy: "0", articleId: item.id },
        // });
        const to = $router.resolve({
          path: path,
          query: { type, heavy: "0", articleId: item.id },
        });
        window.open(to.href, "_blank");
      } else {
        // $router.push({
        //   path: path,
        //   query: { type, articleId: item.id },
        // });
        const to = $router.resolve({
          path: path,
          query: { type, articleId: item.id },
        });
        window.open(to.href, "_blank");
      }
    };

    // 跳转友情链接
    const toLink = (url: any) => {
      window.open(url);
    };

    const linkListFn = (params: any) => {
      getLinksList(params).then((res: any) => {
        if (res.code == "0") {
          state.linkList = res.data;
          run();
        }
      });
    };
    const linkParams = {
      keyword: state.keyword,
    };
    linkListFn(linkParams);

    const timer = ref<any>(null);
    const run = () => {
      let N = 0;
      const target = $(".linklist");
      timer.value = setInterval(() => {
        if (target && target.length) {
          const width = $(target[0]).width();
          if (N * 20 > width) {
            N = 0;
          }
          target[0].parentNode.scrollLeft = 20 * N++;
        }
      }, 1000);
    };

    onBeforeUnmount(() => {
      clearInterval(timer.value);
    });

    const mouseover = () => {
      clearInterval(timer.value);
    };
    const mouseout = () => {
      run();
    };

    return {
      ...toRefs(state),
      levels,
      linkImg,
      Iphone,
      Lock,
      store,
      login,
      toPersonalCenter,
      logout,
      tabClick,
      toDynamic,
      toRegulations,
      toDisciplineConvention,
      toMembers,
      toMemberdynamics,
      toKnowledgeQA,
      toLegalInterpretation,
      toAnnouncements,
      toConsultant,
      toTrainingVideos,
      toDetails,
      toLink,
      mouseover,
      mouseout,
    };
  },
  components: { ModelList, Floating },
});
</script>

<style lang="less" scoped>
.box {
  margin: 10px 0;
}
.home {
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
        width: calc(100% - 332px);
        padding: 0 16px;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;

        .el-carousel {
          .carousel-img {
            width: 100%;
            height: 80%;
            padding-right: 20px;
          }

          .title {
            width: 100%;
            position: absolute;
            bottom: 0px;
            text-align: center;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            background-color: #19478b;
            line-height: 36px;
            padding-bottom: 30px;
          }

          .el-carousel__indicators {
            background: transparent;
          }

          :deep(.el-carousel__button) {
            width: 5px;
            height: 5px;
          }

          :deep(.is-active .el-carousel__button) {
            width: 10px;
            height: 10px;
          }
        }

        .model-title {
          font-size: 14px;
          line-height: 30px;
          font-family: Microsoft YaHei;
          color: #000;
          font-weight: 900;
          padding: 10px;
        }

        .members {
          background-image: url("../../assets/images/member_bg.png");
          background-size: 100% 100%;

          .member {
            border-bottom: 2px solid #c6c6c6;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;

            .title {
              font-size: 19px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #5c5c5c;
              line-height: 98px;
              display: flex;
              flex-direction: row;
              align-items: flex-end;
              margin-left: 40px;
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
          .imgs {
            width: calc(100% - 300px);
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            padding: 24px;
            .img {
              width: 52px;
              height: 52px;
              margin: 0 20px;
            }
          }

          // .member:nth-child(1) {
          //   .title::after {
          //     content: "";
          //     width: 800px;
          //     height: 98px;
          //     display: inline-block;
          //     background-image: url("../../assets/images/member_icons.png");
          //     background-position: 60px 10px;
          //     background-repeat: no-repeat;
          //   }
          // }

          // .member:nth-child(2) {
          //   .title::after {
          //     content: "";
          //     width: 800px;
          //     height: 98px;
          //     display: inline-block;
          //     background-image: url("../../assets/images/member_icons.png");
          //     background-position: 60px -76px;
          //     background-repeat: no-repeat;
          //   }
          // }

          // .member:nth-child(3) {
          //   .title::after {
          //     content: "";
          //     width: 800px;
          //     height: 98px;
          //     display: inline-block;
          //     background-image: url("../../assets/images/member_icons.png");
          //     background-position: 60px -162px;
          //     background-repeat: no-repeat;
          //   }
          // }
        }
      }

      & > .right {
        width: 332px;
        padding: 0 16px;
        box-sizing: border-box;

        .user-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .level {
            width: 100%;
            height: 54px;
            color: #fff;
            line-height: 44px;
            background: url(../../assets/images/level_bg.png) no-repeat;
            background-size: 100% 100%;
            padding: 0 20px;
            box-sizing: border-box;
            margin-bottom: 10px;
          }

          .logo {
            width: 90px;
            height: 90px;
          }

          .name {
            font-family: Microsoft YaHei;
            font-size: 16px;
            line-height: 30px;
            color: #000;
            font-weight: 900;
            padding: 20px;
          }

          .info_link {
            color: #0662b7;
            margin-bottom: 20px;
            cursor: pointer;
          }
        }

        :deep(.el-form) {
          padding: 10px 24px;
          margin-top: 20px;

          .el-form-item {
            margin-bottom: 30px;
          }

          .el-input {
            font-size: 16px;
            --el-input-height: 48px;
            --el-input-border-radius: 22px;
            --el-input-border-color: #004faa;
          }

          .el-form-item__content {
            line-height: 48px;
            justify-content: center;
          }
        }

        :deep(.el-button--primary) {
          --el-button-bg-color: #19478b;
          --el-button-border-color: #19478b;
        }

        :deep(.el-button) {
          width: 186px;
          height: 50px;
          border-radius: 22px;
        }

        .el-button:focus,
        .el-button:hover {
          color: #fff;
          border-color: #19478b;
          background-color: #19478b;
          outline: 0;
        }

        .el-button:active {
          color: #fff;
          border-color: #19478b;
          background-color: #19478b;
          outline: 0;
        }

        .info {
          display: flex;
          flex-direction: column;
          align-items: center;

          .info-item {
            width: 280px;
            height: 92px;
            border-radius: 6px;
            margin-bottom: 24px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-origin: content-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            span {
              font-size: 15px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #ffffff;
              line-height: 19px;
              text-shadow: 0px 1px 1px #031f52;
            }

            .title {
              font-size: 32px;
              line-height: 40px;
              text-shadow: 0px 2px 1px rgba(0, 0, 108, 0.75);
            }
          }

          .consultant-expert {
            background-image: url("../../assets/images/bg01.png");
          }

          .training-videos {
            background-image: url("../../assets/images/bg02.png");
          }

          .membership-application {
            background-image: url("../../assets/images/bg01.png");
          }

          .tenderee-column {
            background-image: url("../../assets/images/bg02.png");
          }

          .laws-regulations {
            background-image: url("../../assets/images/bg03.png");

            .title {
              font-size: 26px;
            }
          }

          .recruitment-info {
            background-image: url("../../assets/images/bg04.png");
            background-size: 100% 100%;
          }

          .complaint-supervision {
            background-image: url("../../assets/images/bg05.png");
          }

          .contact-us {
            height: 208px;
            background-image: url("../../assets/images/bg06.png");

            .contact {
              display: flex;
              flex-direction: column;
              margin-top: 10px;
            }
          }
        }
      }
    }

    .box-header {
      border-bottom: 2px solid #c6c6c6;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      .tabs {
        font-size: 20px;
        .tab {
          font-size: 20px;
          font-weight: 600;
          line-height: 48px;
          font-family: Microsoft YaHei;
          color: #757575;
          padding: 0 10px;
        }

        .tab.active {
          color: #19478b;
        }
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

    .links {
      position: relative;
      .link-box {
        overflow-x: auto;
        width: 100%;
        position: relative;
        .linklist {
          white-space: nowrap;
          padding-bottom: 20px;
          img {
            width: 33%;
            height: 80px;
            margin-top: 20px;
            padding: 10px;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
</style>
