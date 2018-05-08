<template>
  <div class="main">
    <headers></headers>
    <!-- <keep-alive> -->
    <router-view></router-view>
    <!-- </keep-alive> -->
    <footers></footers>
  </div>
</template>

<script>
import Headers from '@/components/layouts/Header'
import Footers from '@/components/layouts/Footer'

export default {
  components: {
    Headers,
    Footers
  }
}
</script>

<style scoped>
.main {
  position: relative
}
</style>
