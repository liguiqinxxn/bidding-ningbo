<template>
  <div class="personal-center">
    <div class="container">
      <div class="content">
        <div class="left">
          <div class="personal-info">
            <div class="titles">
              <span class="title">个人中心</span>
              <span class="subTitle">Personal Center</span>
            </div>
            <div class="info">
              <div class="logo">
                <img :src="userInfo?.logo" />
              </div>
              <div class="name">{{ userInfo.name }}</div>
              <div class="level">{{ levelName }}</div>
              <div class="logout" @click="logout">【退出】</div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="content-header">
            <div class="title">申请资料填写</div>
            <div class="breadcrumb">
              <span>您的当前位置：</span>
              <el-breadcrumb separator=">>">
                <el-breadcrumb-item :to="{ path: '/home' }"
                  >首页</el-breadcrumb-item
                >
                <el-breadcrumb-item>个人中心</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </div>
          <div class="content">
            <el-form :inline="true" :model="userInfo" class="demo-form-inline">
              <el-form-item label="法定代表人">
                <el-input
                  v-model="userInfo.legal_person_name"
                  placeholder="法定代表人"
                />
              </el-form-item>
              <el-form-item label="电话">
                <el-input
                  v-model="userInfo.legal_person_tel"
                  placeholder="电话"
                />
              </el-form-item>
              <el-form-item label="主管负责人">
                <el-input
                  v-model="userInfo.person_charge_name"
                  placeholder="主管负责人"
                />
              </el-form-item>
              <el-form-item label="电话">
                <el-input
                  v-model="userInfo.person_charge_tel"
                  placeholder="电话"
                />
              </el-form-item>
              <el-form-item label="联系人">
                <el-input
                  v-model="userInfo.contacts_name"
                  placeholder="联系人"
                />
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="userInfo.contacts_tel" placeholder="电话" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import store from "@/store";
import { getLogout, getUserInfoAll } from "@/api/index.js";
import { getToken, removeToken, getUid, removeUid } from "@/utils/cookies.js";
import router from "@/router";
export default defineComponent({
  setup() {
    interface props {
      userInfo: {
        name: string;
        logo: string;
        level: string;
        legal_person_name: string;
        legal_person_tel: string;
        person_charge_name: string;
        person_charge_tel: string;
        contacts_name: string;
        contacts_tel: string;
      };
    }
    let state: props = reactive({
      userInfo: {
        name: "",
        logo: "",
        level: "",
        legal_person_name: "",
        legal_person_tel: "",
        person_charge_name: "",
        person_charge_tel: "",
        contacts_name: "",
        contacts_tel: "",
      },
    });
    const levels = [
      { name: "常务理事", level: "3" },
      { name: "理事单位", level: "2" },
      { name: "会员单位", level: "1" },
    ];

    const levelName = computed(() => {
      let name = "";
      levels.map((r) => {
        if (r.level == state.userInfo.level) {
          name = r.name;
        }
      });
      return name;
    });

    onMounted(() => {
      if (getToken() && getUid()) {
        const params = {
          uid: parseInt(getUid()),
          tokenid: getToken(),
        };
        userInfoAll(params);
      }
    });

    const userInfoAll = (params: any) => {
      getUserInfoAll(params).then((res: any) => {
        if (res.code == "0") {
          const userInfo = {
            ...res.data.user,
            ...res.data.user_info,
            ...res.data.user_mailing_info,
          };
          store.commit("setUserInfo", userInfo);
          state.userInfo = userInfo;
        } else {
          removeToken();
          removeUid();
        }
      });
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
              store.commit("setUserInfoAll", {});
              router.push({ path: "home" });
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

    const save = () => {
      debugger;
    };

    return { ...toRefs(state), levelName, logout, save };
  },
});
</script>
<style lang="less" scoped>
.personal-center {
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
        .personal-info {
          min-height: 800px;
          border: 1px solid #e3e2e2;
          box-shadow: 0px 4px 10px 0px rgba(4, 0, 0, 0.05);
          border-radius: 12px 12px 0 0;
          .titles {
            width: 100%;
            height: 70px;
            border-radius: 12px 12px 0 0;
            background-color: #19478b;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;

            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            text-shadow: 0px 2px 2px rgba(4, 0, 0, 0.75);
            position: relative;
            .title {
              font-size: 30px;
              line-height: 40px;
              letter-spacing: 8px;
              position: relative;
              z-index: 10;
            }
            .subTitle {
              font-size: 18px;
              line-height: 26px;
              letter-spacing: 2px;
              position: relative;
              z-index: 10;
            }
          }
          .titles::after {
            content: "";
            width: 100%;
            height: 70px;
            background-image: url(../../assets/images/title_bg.png);
            background-size: 100% 100%;
            opacity: 0.5;
            position: absolute;
            z-index: 9;
          }
          .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 20px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e7e7e7;
            .logo {
              padding: 30px 0;
              img {
                width: 68px;
                height: 68px;
                border-radius: 50%;
              }
            }
            .name,
            .level,
            .logout {
              font-size: 16px;
              font-family: SimSun;
              font-weight: 400;
              color: #000000;
              line-height: 52px;
            }
          }
        }
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
      }
    }
  }
}
</style>
