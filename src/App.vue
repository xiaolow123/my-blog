<template>
  <div id="app">
    <side></side>
    <router-view></router-view>
  </div>
</template>

<script>
import side from '@/components/side/side'
export default {
  name: 'app',
  components: {
    side
  }
}
</script>

<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'
</style>
