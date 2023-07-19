<template>
  <el-scrollbar height="100vh">
    <div class="layout">
      <Header></Header>
      <Menu></Menu>
      <Carousel></Carousel>
      <router-view></router-view>
      <Footer></Footer>
    </div>
  </el-scrollbar>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Menu from "./components/Menu.vue";
import Carousel from "./components/Carousel.vue";
import { getUserInfoAll } from "@/api/index.js";
import {
  setToken,
  getToken,
  removeToken,
  setUid,
  getUid,
  removeUid,
} from "@/utils/cookies.js";
import _store from "@/store";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    onMounted(() => {
      if (getToken() && getUid()) {
        const params = {
          uid: parseInt(getUid()),
          tokenid: getToken(),
        };
        userInfoAll(params);
      }
    });
    // 获取企业信息
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
    return {};
  },
  components: { Header, Footer, Menu, Carousel },
});
</script>
<style lang="less" scoped>
.layout {
  width: 100%;
  box-sizing: border-box;
}
</style>
