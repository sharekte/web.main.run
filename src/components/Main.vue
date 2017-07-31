<template>
  <div class="main">
    <headers></headers>
    <router-view></router-view>
    <footers></footers>
  </div>
</template>

<script>
import Headers from 'components/Header'
import Footers from 'components/Footer'

export default {
  components: {
    Headers,
    Footers,
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
.main {

}
</style>
