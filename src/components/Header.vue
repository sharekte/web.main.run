<template>
  <header>
    <div class="header-main">
      <div class="logo">
        曟
      </div>
      <div class="menu">
        <ul>
          <li>首页</li>
          <li>归档</li>
          <li>关于</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  border-bottom: 1px solid #F5F5F5;
}
  .header-main {
    margin: 0 auto;
    height: 100px;
    max-width: 900px;
  }
    .logo {
      float: left;
      height: 100px;
      line-height: 100px;
      font-size: 4rem;
    }
    .menu {
      float: right;
      height: 100px;
      line-height: 100px;
      padding-right: 100px;
    }
      .menu ul li {
        margin-right: 20px;
      }
</style>
