<template>
  <div class="home">
    <div class="home-bg">
      <div class="slant-left"></div>
      <div class="slant-right"></div>
    </div>
  </div>
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
.home {
  height: 800px;
  -background: #ff6600;
  position: relative;
  overflow: hidden;
}
  .home-bg {  
    width: 100%;
    height: 550px;
    background-image: url(../assets/images/home-bg.jpg);
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    z-index: -1;
  }
    .slant-left {
      width: 101%;
      height: 200px;
      position: absolute;
      bottom: 22%;
      right: 48%;
      transform: rotate(6deg);
      background: #FFF;
    }
    .slant-right {
      width: 101%;
      height: 200px;
      position: absolute;
      bottom: 22%;
      left: 48%;
      transform: rotate(-6deg);
      background: #FFF;
    }
</style>
