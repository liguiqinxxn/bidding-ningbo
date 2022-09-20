<template>
  <div class="carousel">
    <el-carousel height="490px" :interval="5000">
      <el-carousel-item
        v-for="item in imgs"
        :key="item"
      >
        <img class="carousel-img" :src="item" alt="image"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import img01 from "@/assets/images/img01.png"
import img02 from "@/assets/images/img02.png"

export default defineComponent({
  setup() {
    let state = reactive({imgs:[ img01, img02 ]})

    return { ...toRefs(state)}
  }
})
</script>
  
<style lang="less" scoped>
.carousel{
  .carousel-img{
    width: 100%;
    height: 100%;
  }
}
</style>