<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <buttom @click="login">登录</buttom>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { getLogin } from "@/api/index.js"
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
    return { ...toRefs(state), login }
  }
})
</script>
