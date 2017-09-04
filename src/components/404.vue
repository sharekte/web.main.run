<template>
  <div class="home">
    <div class="home-bg">
      <div class="slant-left"></div>
      <div class="slant-right"></div>
      <div class="info">
        404
      </div>
    </div>
  </div>
</template>

<script>

export default {
  
}
</script>
<style lang="stylus" scoped>
.home {
  -height: 1600px;
  -background: #ff6600;
  position: relative;
  overflow: hidden;
}
  .home-bg {  
    position: relative;
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
      bottom: -12%;
      right: 48%;
      transform: rotate(6deg);
      background: #FFF;
    }
    .slant-right {
      width: 101%;
      height: 200px;
      position: absolute;
      bottom: -12%;
      left: 48%;
      transform: rotate(-6deg);
      background: #FFF;
    }
    .info {
      position: relative;
      max-width: 800px;
      height: 200px;
      -background: #ff6600;
      top: 35%;
      left: 50%;
      transform: translate(-50%,-50%);
      text-align: center;
      font-size: 10rem;
      color: #ffffff;
    }

.main {
  margin: 0 auto;
  width: 700px;
  
  .article {
    padding: 1rem;
    margin-bottom: 0.5rem;
    box-shadow: inset 0 0 0 1px #dddddd;
  }
}

</style>
