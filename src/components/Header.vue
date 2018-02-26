<template>
  <header>
    <div class="home-bg">
      <div class="info">

      </div>
    </div>
    <div class="header-main">
      <div class="menu">
        <ul>
          <!-- <li><router-link :to="{ name: 'home' }">首页</router-link></li> -->
          <li><router-link :to="{ name: 'home' }">文章</router-link></li>
          <li><router-link :to="{ name: 'home' }">专题</router-link></li>
          <!-- <li><router-link :to="{ name: 'home' }">关于</router-link></li> -->
          <li v-show="isLogin"><router-link :to="{ name: 'new' }">写作</router-link></li>
          <li v-if="!isLogin"><router-link :to="{ name: 'login' }">登录</router-link></li>
          <li v-if="isLogin"><a @click="toLogout">注销</a></li>
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
    toLogout() {
      this.$store.dispatch('logout')
    },
    toNew() {
      this.$router.push({name: 'new'})
    }
  },
  mounted () {
    //console.log(this.$route.name == 'home')
  }
}
</script>

<style lang="stylus" scoped>
header {
  border-bottom: 1px solid #F5F5F5;
}
  .home-bg {  
    position: relative;
    width: 100%;
    height: 36rem;
    background-image: url(../assets/images/home-bg.jpg);
    background-position: bottom center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    z-index: -1;

    .info {
      position: relative;
      max-width: 80rem;
      height: 20rem;
      -background: #ff6600;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      text-align: center;
      font-size: 10rem;
      color: #ffffff;
    }
  }
     
  .header-main {
    margin: 0 auto;
    height: 6rem;
    max-width: 120rem;
    
    .menu {
      height: 10rem;
      line-height: 6rem;
      
      ul {
        display: flex;
        justify-content: center;
        list-style: none;
        
        li {
          padding-left: 1rem;
          padding-right: 1rem;
          font-size: 1.8rem;
        }
      }
    }
  }
</style>
