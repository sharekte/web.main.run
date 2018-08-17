<template>
    <div class="view">
        <div class="title"><h2>{{title}}</h2></div>
        <div class="content" v-html="html"></div>
    </div>
</template>
<script>
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import { Article } from "@/resource";
export default {
  data() {
    return {
      title: "",
      html: ""
    };
  },
  created() {
    Article.get({ id: this.$route.params.id }).then(response => {
      if (response.body.success) {
        const article = response.body.data;

        const md = new MarkdownIt({
          highlight: function(str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return (
                  '<pre class="hljs"><code>' +
                  hljs.highlight(lang, str, true).value +
                  "</code></pre>"
                );
              } catch (__) {}
            }

            return (
              '<pre class="hljs"><code>' +
              md.utils.escapeHtml(str) +
              "</code></pre>"
            );
          }
        });

        this.title = article.title;
        this.html = md.render(article.content);
      }
    });
  }
};
</script>
<style lang="stylus" scoped>
.view {
    padding 20px

    .title {
        text-align center
    }

    .content {
        margin 40px auto
        max-width 980px
    }
}
</style>
