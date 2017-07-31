<template>
  <header>
    <div class="header-main">
      
      <!-- <div class="logo">
        afdsa
      </div>
      <div class="menu">
        <ul>
          <li>adf</li>
          <li>asfd</li>
          <li>fadfs</li>
        </ul>
      </div> -->
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
