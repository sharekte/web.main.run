<template>
    <div class="home">
        <section class="main">
            <div class="articles">
                <div class="article" v-for="article in articles" :key="article.id">
                    <div class="box" @click="linkTo(article.id)">
                        <img v-bind:src="article.img" alt>
                        <div class="caption">
                            <h4>{{article.title}}</h4>
                            <p>
                        
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="articles">
                <div class="article" v-for="article in articles" :key="article.id">
                    <div class="title" @click="linkTo(article.id)"><h4>{{article.title}}</h4></div>
                    <div class="description" v-html="mdToHtml(article.summary)"></div>
                </div>
            </div> -->
            <m-button design="moema" class="fit" icon="fa-hourglass-half" @click="loadMore" v-bind:disabled="!hasMore" v-if="hasMore">加载更多</m-button>
            <m-button design="moema" class="fit" icon="fa-hourglass-o" disabled v-else>没有更多了</m-button>
        </section>
    </div>
</template>

<script>
import { Article } from "../resource";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

export default {
  data() {
    return {};
  },
  computed: {
    articles() {
      return this.$store.getters.getArticles;
    },
    hasMore() {
      return this.$store.getters.hasArticles;
    }
  },
  created() {
    //this.fecthDate()
    if (this.articles.length == 0) {
      this.fecthDate();
    } else if (this.$store.state.article.has_update) {
      this.$store.dispatch("refrash_articles");
      this.$store.commit("HAS_UPDATE_RESET");
    }

    let md = new MarkdownIt({
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

    this.md = md;
  },
  mounted() {
    // if (this.$store.getters.hasArticleUpdate) {
    //   this.fecthDate()
    //   this.$store.dispatch('has_update_reset')
    // }
  },
  methods: {
    fecthDate() {
      this.$store.dispatch("get_articles");
    },
    loadMore() {
      this.$store.dispatch("get_articles_more");
    },
    linkTo(id) {
      this.$router.push({ name: "view", params: { id: id } });
    },
    mdToHtml(m) {
      return this.md.render(m);
    }
  },
  watch: {}
};
</script>
<style lang="stylus" scoped>
@import "../../src/ui/style/variables.styl"

.home {
    position: relative
    overflow: hidden
}

.main {
    margin: 10px auto
    max-width: 980px

    // .articles {
    //     padding-top: 40px
    //     .article {
    //         margin-bottom: 40px
    //         .title h4 {
    //             color: font-a-color
    //             cursor: pointer
    //             display: inline-block
    //             font-size: 2rem
                
    //             &:hover {
    //                 color: font-a-hover-color
    //             }
    //         }
    //     }
    // }

    .articles {
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
        flex-flow: row wrap;
        align-content: flex-start;
        
        .article {
            flex: 1;
            flex: 0 0 25%;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          
            .box {
                margin-bottom: 1rem;
                padding: 3px;
                box-shadow: inset 0 0 0 1px #F5F5F5;
                cursor: pointer;
                border-radius: 1px;
                
                &:hover {
                    box-shadow: inset 0 0 0 1px #f29e0d;
                }
                
                img {
                    display: block;
                    max-width: 100%;
                    height: auto;
                }
                
                .caption {
                    margin-top: 0.5rem;
                    padding: 0.5rem;

                    h4 {
                        font-size: 1.4rem;
                        line-height: 1.6rem;
                    }
                      
                    p {
                        font-size: 1.3rem;
                        line-height: 1.6rem;
                        margin-bottom: 0;
                    }
                }
            }
        }
        
        @media (max-width: 900px) {
          .article {
            flex: 0 0 33.3333333%;
          }
        }
        
        @media (max-width: 600px) {
          .article {
            flex: 0 0 50%;
          }
        }
        
        @media (max-width: 400px) {
          .article {
            flex: 0 0 100%;
          }
        }
      }
}

</style>
