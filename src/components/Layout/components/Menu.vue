<template>
  <div class="menu"> </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    let state = reactive({ aa: 0 })

    return toRefs(state)

  }
})
</script>

<style scoped>
</style>