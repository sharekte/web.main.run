<template>
  <div class="view">
  <!-- <h1 class="align-center">{{title}}</h1> -->
    <div class="title">
      <input type="text" name="" placeholder="标题">
    </div>

    <div class="function">
      <ul class="actions align-center">
        <li><button class="special small" @click="edit">edit</button></li>
        <li><button class="special small" @click="commit">commit</button></li>
        <li><button class="special small" @click="onMarkdown">Markdown</button></li>
        <li><button class="special small" @click="onPreview">Preview</button></li>
      </ul>
    </div>
    <article>
      <div class="content">
        <md-editor :content.sync="content" :markdown="markdown" :preview="preview" :isEdit="false"></md-editor>
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
      title: '',
      content: '',
      markdown: true,
      preview: true
    }
  },
  computed: {
    currentArticleId() {
      return this.$store.getters.getCurrentArticleId
    },
    currentReleaseId() {
      return this.$store.getters.getCurrentReleaseId
    }
  },
  watch: {
    currentReleaseId(val, oldval) {
      this.$router.push({name: 'view', params:{ id: this.currentArticleId, id2: this.currentReleaseId } })
    },
    $route(val, oldval) {
      this.fecthDate()
      this.refresh()
    }
  },
  created() {

  },
  methods: {
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
  
  .title {
    margin: 0 auto;
    padding-bottom: 20px;
    width: 700px;
  }
}
</style>
