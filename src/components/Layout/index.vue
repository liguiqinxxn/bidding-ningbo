<template>
  <div class="layout">
    <Header></Header>
    <Menu></Menu>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Menu from './components/Menu.vue';

export default defineComponent({
  setup() {
  },
  components: { Header, Footer, Menu }
})
</script>
