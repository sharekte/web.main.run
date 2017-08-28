<template>
  <div class="home">
    <div class="home-bg">
      <div class="slant-left"></div>
      <div class="slant-right"></div>
      <div class="info">
      哈哈
      </div>
    </div>

    <div id="editor">
      <mavon-editor style="height: 100%"></mavon-editor>
    </div>
  </div>
</template>

<script>

import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  components: {
    mavonEditor
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style>
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


  #editor {
    margin: auto;
    width: 80%;
    height: 580px;
  }

  #editor textarea {
    background: #FFF;
    box-shadow: none;
  }
</style>
