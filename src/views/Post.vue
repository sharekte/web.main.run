<template>
    <section class="section">
        <article class="article">
            <div class="title"><h1>{{article.title}}</h1></div>
            <div class="top-image image" v-if="article.image && article.image.length > 1">
                <img :src="article.image[1] + '?imageView2/1/w/3840/h/1790/q/75'">
            </div>
            <div class="content" v-html="article.content"></div>
        </article>
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
            this.article = response.data;
            this.article.content = this.randerMD(this.article.content);
        }).catch(() => {
            this.$router.replace({ name: "page404" });
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
            }).use(require("markdown-it-footnote"))
                .use(require("markdown-it-container"), "name")
                .use(require("markdown-it-ins"))
                .use(require("markdown-it-mark"))
                .use(require("markdown-it-checkbox"))
                .use(require("markdown-it-attrs"))
                .use(require("markdown-it-multimd-table"), {enableMultilineRows: true});

            return md.render(md_text);
        }
    }
};
</script>
<style lang="stylus" scoped>
.section {
    padding: 10px;
    
    // .top-image {
    //     img {
    //         width: 100%;
    //     }
    // }

    .article {
        margin: 0px auto;
        padding: 20px 0 10px 0;
        max-width: 860px;
        box-shadow: 0 1px 1px rgba(0,0,0,.05);
        transition: box-shadow 0.3s ease-in-out;
        
        &:hover {
            box-shadow: 0 3px 3px rgba(170,170,170,.2);
        }

        .title {
            text-align: center;
            padding: 0 10px;
        }
        
        .top-image {
            margin-top: 20px;
        }

        .content {
            margin-top: 40px;
            padding: 0 10px;

            img {
                max-width: 100%;
            }
        }
    }
}
</style>
