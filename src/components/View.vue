<template>
  <div class="view">
    <div class="function">
      <ul class="actions align-right">
        <li><button class="special small" @click="getContent">编辑</button></li>
      </ul>
    </div>
    <article>
      <h3>{{article.Title}}</h3>
      <div class="content">
        <md-editor :content.sync="content"></md-editor>
      </div>
    </article>
  </div>
  
</template>

<script>
import MdEditor from '@/components/MdEditor'

export default {
  components: {
    MdEditor
  },
  data () {
    return {
      content: ''
    }
  },
  computed: {
    article() {
      return this.$store.getters.getArticleRelease
    }
  },
  watch: {
    article(val, oldval) {
      this.content = val.Release.Content
    },
    content(val, oldval) {
      console.log(val)
    }
  },
  created() {
    this.fecthDate()
  },
  methods: {
    fecthDate() {
      this.$store.dispatch('get_article_release', this.$route.params)
    },
    getContent() {
      console.log(this.content)
    },
    aa(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="stylus" scope>
.view {
  margin: 20px auto;
  width: 1200px;
}
</style>
