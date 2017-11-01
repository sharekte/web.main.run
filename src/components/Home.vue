<template>
  <div class="home">
    <section class="main">
      <div class="article" v-for="article in articles">
        <h3>{{article.title}}</h3>
        <router-link :to="{ name: 'view', params: { id: article.id}}">查看</router-link>
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
  },
  watch: {
    $route(val, oldval) {
     this.fecthDate()
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

.main {
  margin: 10px auto;
  max-width: 1200px;
  
  .article {
    padding: 1rem;
    margin-bottom: 0.5rem;
    box-shadow: inset 0 0 0 1px #dddddd;
  }
}

</style>
