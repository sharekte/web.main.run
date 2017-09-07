<template>
  <div class="view">
  <h1 class="align-center">{{article.Title}}</h1>
    <div class="function">
      <ul class="actions align-center">
        <li><button class="special small" @click="edit">edit</button></li>
        <li v-if="canCommit"><button class="special small" @click="commit">commit</button></li>
        <li><button class="special small" @click="onMarkdown">Markdown</button></li>
        <li><button class="special small" @click="onPreview">Preview</button></li>
      </ul>
    </div>
    <article>
      <div class="content">
        <md-editor :content.sync="content" :markdown="markdown" :preview="preview"></md-editor>
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
      preContent: '',
      content: '',
      markdown: false,
      preview: true
    }
  },
  computed: {
    article() {
      return this.$store.getters.getArticleRelease
    },
    canCommit() {
      return this.content !== this.preContent
    },
    currentArticleId() {
      return this.$store.getters.getCurrentArticleId
    },
    currentReleaseId() {
      return this.$store.getters.getCurrentReleaseId
    }
  },
  watch: {
    article(val, oldval) {
      this.preContent = val.Release.Content
      this.content = val.Release.Content
    },
    currentReleaseId(val, oldval) {
      this.$router.push({name: 'view', params:{ id: this.currentArticleId, id2: this.currentReleaseId } })
      console.log({name: 'view', id: this.currentArticleId, id2: this.currentReleaseId})
    },
    $route(val, oldval) {
      this.fecthDate()
      this.refresh()
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
    edit() {
      this.markdown = true
      this.preview = true
    },
    onMarkdown() {
      this.markdown = true
      this.preview = false
    },
    onPreview() {
      this.markdown = false
      this.preview = true
    },
    commit() {
      this.$store.dispatch('commit_article', this.content)
    },
    refresh() {
      this.markdown = false
      this.preview = true
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
