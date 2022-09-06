<template>
  <div class="menu">
    <el-menu :default-active="activeIndex" :ellipsis="false" class="el-menu" mode="horizontal" background-color="#19478b"
             text-color="#fff" active-text-color="#fff" @select="handleSelect">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">关于协会</el-menu-item>
      <el-menu-item index="3">协会动态</el-menu-item>
      <el-menu-item index="4">会员风采</el-menu-item>
      <el-menu-item index="5">政策法规</el-menu-item>
      <el-menu-item index="6">学习天地</el-menu-item>
      <el-sub-menu index="7"> <template #title>诚信自律</template>
        <el-menu-item index="7-1">诚信自律</el-menu-item>
        <el-menu-item index="7-2">自律公约</el-menu-item>
        <el-menu-item index="7-3">优秀表彰</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="8">电子会刊</el-menu-item>
      <el-menu-item index="9">法规速查</el-menu-item>
      <el-menu-item index="10">会员之家</el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    let state = reactive({ activeIndex: 0 })

    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }

    return { ...toRefs(state), handleSelect }

  }
})
</script>

<style lang="less" scoped>
.menu {
  width: 100%;
  background: #19478b;
  
  .el-menu {
    max-width: 1440px;
    height: 48px;
    margin: 0 auto;
    display: flex;

    .el-menu-item {
      // padding: 0 20px;
      flex: 1 1;
    }

    .el-menu-item.is-active {
      background: #3c70be;
      border-color: transparent;
    }

    /deep/ .el-sub-menu.is-active .el-sub-menu__title {
      background: #3c70be !important;
      border: none !important;
    }

  }


}
</style>