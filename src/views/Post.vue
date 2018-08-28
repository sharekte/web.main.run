<template>
    <section class="section">
        <div class="title"><h2>{{article.title}}</h2></div>
        <div class="content" v-html="article.content"></div>
    </section>
</template>
<script>
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import { detailArticle } from "@/api/article";

export default {
    data() {
        return {
            article: {}
        };
    },
    created() {
        const article_id = this.$route.params.id;

        detailArticle(article_id).then(response => {
            console.log(response)

            this.article = response.data;
            this.article.content = this.randerMD(this.article.content);
        });
    },
    methods: {
        randerMD(md_text) {
            const md = new MarkdownIt({
                html: true,
                typographer:  true,
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

                    // return (
                    //   '<pre class="hljs"><code>' +
                    //   md.utils.escapeHtml(str) +
                    //   "</code></pre>"
                    // );
                    //return hljs.highlightAuto(str).value;
                    return (
                        '<pre class="hljs"><code>' +
                        hljs.highlightAuto(str).value +
                        "</code></pre>"
                    );
                }
            });

            return md.render(md_text);
        }
    }
};
</script>
<style lang="stylus">
.section {
    padding: 20px;

    .title {
        text-align: center;
    }

    .content {
        margin: 40px auto;
        max-width: 980px;
        
        img {
            max-width: 100%;
        }
    }
}
</style>
