<template>
  <div class="footer"> 
    <div class="footer-row">
      <span class="footer-col">主办单位：宁波市招标投标协会</span>
      <span class="footer-col">网站备案号：浙ICP备18003359号-1</span>
      <span class="footer-col">技术支持：宁波市峰承科技有限公司</span>
    </div>
    <div class="footer-row">
     <span class="footer-col">地址：宁波市宁穿路1901号312办公室</span>
     <span class="footer-col">邮编：315040</span>
     <span class="footer-col">传真：87187123</span>
     <span class="footer-col">办公室：0574-87187928</span>
     <span class="footer-col">会员部：0574-87187122</span>
     <span class="footer-col">信息部：0574-87187759</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {


    return {}
  }
})
</script>

<style lang="less" scoped>
  .footer{
    width: 100%;
    height: 100px;
    background: #19478b;
    margin: 20px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .footer-row{
      text-align: center;
      .footer-col{
        color: #fffefe;
        line-height: 20px;
        padding-right: 12px;
      }
    }
  }
</style>