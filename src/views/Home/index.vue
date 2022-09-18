<template>
  <div class="home">
    <div class="container">
      <div class="left"> </div>
      <div class="right"></div>
      <div class="links">
        <div class="sub-title">友情链接</div>
        <img :src="linkImg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { getLogin } from "@/api/index.js"
import linkImg from "assets/images/links.png"
export default defineComponent({
  setup() {
    let state = reactive({})
    const login = () => {
      const params = {
        username: '1',
        password: '1'
      }
      getLogin().then((res: any) => {
        debugger
      })
    }
    return { ...toRefs(state), linkImg, login, }
  }
})
</script>
<style lang="less" scoped>
  .home{
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    .container{
      width: 100%;
      max-width: 1440px;
      height: 100%;
      margin: 0 auto;
      padding: 30px 16px;
      box-sizing: border-box;
      .sub-title{
        color: #19478B;
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 600;
        line-height: 66px;
        border-bottom: 2px solid #c6c6c6;
        margin-bottom: 20px;
      }
      .left{}
      .right{}
      .links{
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
