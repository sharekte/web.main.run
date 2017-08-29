<template>
  <div class="home">
    <div class="home-bg">
      <div class="slant-left"></div>
      <div class="slant-right"></div>
      <div class="info">
      
      </div>
    </div>
  </div>
</template>

<script>
import { Article } from '../resource'

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {

  },
  methods: {
    haha () {
      console.log("haha")
      console.log(this.$store)
      console.log(this.$route)

      //console.log(User)

      //User.get({}).then(response => {
      //     console.log(response)
      //});
      //User.save({action: 'login'}, {Username: 'danc', Password: 'dangcheng'}).then(response => {
        //console.log(response)
      //})
      
    }
  }
}
</script>
<style scoped>
.home {
  height: 1600px;
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
</style>
