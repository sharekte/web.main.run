<template>
  <header>
    <div class="header-main">
      <div class="logo">
        <router-link :to="{ name: 'home' }">MAIN.RUN</router-link>
      </div>
      <!-- <div class="menu">
        <ul class="actions align-center">
          <li><button class="" @click="toLogin">文章</button></li>
          <li><button class="" @click="toNew">专题</button></li>
        </ul>
      </div> -->
      <div class="menu">
        <ul class="actions align-center">
          <li v-if="!isLogin"><button class="special" @click="toLogin">登录</button></li>
          <li v-if="isLogin"><button class="special" @click="toNew">新增</button></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.getters.getToken
    }
  },
  methods: {
    toLogin() {
      this.$router.push({name: 'login'})
    },
    toNew() {
      this.$router.push({name: 'new'})
    }
  }
}
</script>

<style lang="stylus" scoped>
header {
  border-bottom: 1px solid #F5F5F5;
}     
  .header-main {
    margin: 0 auto;
    height: 100px;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    
    .logo {
      height: 100px;
      line-height: 100px;
      font-size: 4rem;
    }
    
    .menu {
      height: 100px;
      line-height: 100px;
    }
  }
</style>
