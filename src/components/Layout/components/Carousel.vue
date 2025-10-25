<template>
  <div class="carousel">
    <el-carousel
      height="490px"
      :interval="5000"
    >
      <el-carousel-item
        v-for="item in imgs"
        :key="item.id"
      >
        <img
          class="carousel-img"
          :src="item.logo"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { getBannerList } from "@/api/index.js";
import Img1 from "assets/images/img01.png";
import Img2 from "assets/images/img01.png";

export default defineComponent({
  setup() {
    interface props {
      imgs?: Array<any>;
    }
    let state: props = reactive({
      imgs: [
        {
          id: "7",
          logo: "http://1259019747.vod2.myqcloud.com/c04205f6vodsh1259019747/ae23b0a2387702308023354240/EJpg9YFh8OYA.jpg",
        },
        {
          id: "8",
          logo: "http://1259019747.vod2.myqcloud.com/c04205f6vodsh1259019747/addcfccd387702308023317486/PSAMXMExp3AA.jpg",
        },
      ],
    });
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
