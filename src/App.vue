<template>
  <router-view></router-view>
</template>

<script>
import LocalStore from 'store'

export default {
  created() {
    this.getToken()
  },
  methods: {
    getToken() {
      if (LocalStore.get('token')) {
        this.$store.dispatch('set_token', LocalStore.get('token'))
      }
    }
  },
  watch: {
    $route(val, oldval) {
      console.log("route watch")
    }
  }
}
</script>

<style scope>

</style>
