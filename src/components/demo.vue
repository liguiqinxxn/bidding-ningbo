<template>
  <div class="sidebar"></div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  setup() {
    let state = reactive({});
    return { ...toRefs(state) };
  },
});
</script>
<style lang="less" scoped></style>
