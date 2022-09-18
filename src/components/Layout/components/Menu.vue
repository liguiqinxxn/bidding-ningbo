<template>
  <div class="menu">
    <el-menu
      :default-active="activeIndex"
      :ellipsis="false"
      class="el-menu"
      router
      mode="horizontal"
      background-color="#19478b"
      text-color="#fff"
      active-text-color="#fff"
      @select="handleSelect"
    > 
    <template
        v-for="items in columnList"
        :key="items.id"
      > 
      <template v-if="items.son && items.son.length">
          <el-sub-menu :index="items.path"> <template #title>{{ items.name }}</template>
            <el-menu-item
              :index="item.path"
              v-for="item in items.son"
              :key="item.id"
            >{{ item.name }}</el-menu-item>
          </el-sub-menu>
        </template> <template v-else>
          <el-menu-item :index="items.path">{{ items.name }}</el-menu-item>
        </template> 
      </template> 
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { ElMessage } from "element-plus"
import { getColumnList } from "@/api/index.js"

export default defineComponent({
  setup() {
    interface props {
      activeIndex: any
      columnList?: Array<any>
    }
    let state: props = reactive({ activeIndex: '0', columnList: [] })

    // 获取栏目
    getColumnList().then((res: any) => {
      if (res.code == '0') {
        state.columnList = res.data
      } else {
        ElMessage.error(res.msg)
      }
    })

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

    .el-menu-item,
    .el-sub-menu {
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