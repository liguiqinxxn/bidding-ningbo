<template>
  <div class="carousel">
    <el-carousel height="490px" :interval="5000">
      <el-carousel-item v-for="item in imgs" :key="item">
        <img class="carousel-img" :src="item.logo" alt="image" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { getBannerList } from "@/api/index.js";

export default defineComponent({
  setup() {
    interface props {
      imgs?: Array<any>;
    }
    let state: props = reactive({ imgs: [] });
    const bannerList = (type: any) => {
      getBannerList({ type }).then((res: any) => {
        if (res.code == "0") {
          state.imgs = res.data;
        }
      });
    };
    bannerList(1); // 轮播图

    return { ...toRefs(state) };
  },
});
</script>

<style lang="less" scoped>
.carousel {
  .carousel-img {
    width: 100%;
    height: 100%;
  }
}
</style>
