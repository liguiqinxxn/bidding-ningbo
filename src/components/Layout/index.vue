<template>
  <div class="layout">
    <Header></Header>
    <Menu></Menu>
    <Carousel></Carousel>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Menu from './components/Menu.vue';
import Carousel from './components/Carousel.vue';

export default defineComponent({
  setup() {
  },
  components: { Header, Footer, Menu, Carousel }
})
</script>
<style lang="less" scoped>
.layout {
  width: 100%;
  box-sizing: border-box;
}
</style>
