<template>
  <div class="home">
    <div class="home-bg">
      <div class="slant-left"></div>
      <div class="slant-right"></div>
      <div class="info">
        Hello
      </div>
    </div>
    <section class="main">
      <div class="article" v-for="article in articles">
        <h3>{{article.Title}}</h3>
        <router-link :to="{ name: 'view', params: { id: article.Id, id2: article.Release.Id }}">查看</router-link>
      </div>
      <button class="fit special" @click="fecthDate" v-bind:disabled="!hasMore" v-if="hasMore">加载更多</button>
      <button class="fit" v-else>没有更多了</button>
    </section>
  </div>
</template>

<script>
import { Article } from '../resource'

export default {
  data () {
    return {

    }
  },
  computed: {
    articles() {
      return this.$store.getters.getArticles
    },
    hasMore() {
      return this.$store.getters.hasMore
    }
  },
  created() {
    this.fecthDate()
  },
  mounted () {
    //console.log(this.articles)
  },
  methods: {
    fecthDate() {
      this.$store.dispatch('get_articles')
    }
  }
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
