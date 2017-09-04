<template>
  <div class="view">
    <div class="function">
      <ul class="actions">
        <li><button class="special big">编辑</button></li>
        <li><button class="special">编辑</button></li>
        <li><button class="special small">编辑</button></li>
      </ul>
    </div>
    <article>
      <h3>{{article.Title}}</h3>
      <div class="content">{{article.Release.Content}}</div>
    </article>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  computed: {
    article() {
      return this.$store.getters.getArticleRelease
    }
  },
  created() {
    this.fecthDate()
  },
  mounted () {

  },
  methods: {
    fecthDate() {
      this.$store.dispatch('get_article_release', this.$route.params)
    }
  }
}
</script>

<style lang="stylus" scoped>
.view {
  margin: 20px auto;
  width: 700px;
}
</style>
