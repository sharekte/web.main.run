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
      if (LocalStore.get('Token')) {
        this.$store.dispatch('set_token', LocalStore.get('Token'))
      }
    }
  }
}
</script>

<style scope>

</style>
