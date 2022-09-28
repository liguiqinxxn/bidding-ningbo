<template>
  <div class="header">
    <div class="container">
      <div class="logo">
        <img class="logoImg" :src="logo" alt="logo" />
        <img class="logoTitle" :src="logoTitle" alt="logo" />
      </div>
      <div class="search">
        <el-input
          v-model="keywords"
          placeholder="请输入你要搜索的内容"
          :prefix-icon="Search"
        >
          <template #append>搜索</template>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import logo from "assets/images/logo.png";
import logoTitle from "assets/images/logo_title.png";
import { Search } from "@element-plus/icons-vue";

export default defineComponent({
  setup() {
    let state = reactive({ keywords: "" });
    return { ...toRefs(state), logo, logoTitle, Search };
  },
});
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 200px;
  background: #fff;
  box-sizing: border-box;

  .container {
    width: 100%;
    max-width: 1440px;
    height: 100%;
    margin: 0 auto;
    padding: 70px 10px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .logo {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: row;

      .logoImg {
        height: 100%;
      }

      .logoTitle {
        height: 78%;
        margin: auto 20px;
      }
    }

    .search {
      width: 50%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;

      .el-input {
        width: 368px;
        height: 42px;
        border: 1px solid #5e7eae;
        background: #19478b;

        .el-input__wrapper {
          border: none;
          border-radius: 0;
        }

        .el-input__wrapper:hover {
          box-shadow: none;
        }

        .el-input__icon {
          color: #16151e;
        }

        .el-input__inner {
          color: #16151e;
        }

        .el-input__inner::-webkit-input-placeholder {
          color: #404057;
        }

        .el-input-group__append {
          height: 100%;
          color: #fff;
          background: #19478b;
          border-radius: 0;
          box-shadow: none;
        }
      }
    }
  }
}
</style>
