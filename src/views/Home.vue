<template>
    <div class="home">
        <section class="main">
      <!-- <div class="articles">
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
      </div> -->
            <div class="articles">
                <div class="article" v-for="article in articles" :key="article.id" @click="linkTo(article.id)">
                    <div class="title"><h4>{{article.title}}</h4></div>
                    <div class="description">x86架构下，函数执行借助于 hardware stack。为了不同模块函数能在runtime时可以互相调用，程序必须遵守共同的的Calling Convention，这也是ABI的一部分。推荐两本参考资料：x86架构下，函数执行借助于 hardware stack。为了不同模块函数能在runtime时可以互相调用，程序必须遵守共同的的Calling Convention，这也是ABI的一部分。推荐两本参考资料：</div>
                </div>
            </div>
            <button class="fit special" @click="loadMore" v-bind:disabled="!hasMore" v-if="hasMore">加载更多</button>
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
            return this.$store.getters.hasArticles
        }
    },
    created() {
        this.fecthDate()
    },
    mounted () {
        if (this.$store.getters.hasArticleUpdate) {
            this.fecthDate()
            this.$store.dispatch('has_update_reset')
        }
    },
    methods: {
        fecthDate() {
            this.$store.dispatch('get_articles')
        },
        loadMore() {
            this.$store.dispatch('get_articles_more')
        },
        linkTo(id) {
            this.$router.push({name: 'view', params: { id: id}})
        }
    },
    watch: {
    
    },
}
</script>
<style lang="stylus" scoped>
.home {
    position: relative;
    overflow: hidden;
}

.main {
    margin: 10px auto;
    max-width: 980px;

    .articles {
        
    }

  // .articles {
  //   display: flex;
  //   flex-flow: row wrap;
  //   align-content: flex-start;
    
  //   .article {
  //     flex: 1;
  //     flex: 0 0 25%;
  //     padding-left: 0.5rem;
  //     padding-right: 0.5rem;
      
  //     .box {
  //       margin-bottom: 1rem;
  //       padding: 3px;
  //       box-shadow: inset 0 0 0 1px #F5F5F5;
  //       cursor: pointer;
  //       border-radius: 1px;
        
  //       img {
  //         display: block;
  //         max-width: 100%;
  //         height: auto;
  //       }
        
  //       .caption {
  //         margin-top: 0.5rem;
  //         padding: 0.5rem;

  //         h4 {
  //           font-size: 1.4rem;
  //           line-height: 1.6rem;
  //         }
          
  //         p {
  //           font-size: 1.3rem;
  //           line-height: 1.6rem;
  //           margin-bottom: 0;
  //         }
  //       }
  //     }
  //   }
    
  //   @media (max-width: 900px) {
  //     .article {
  //       flex: 0 0 33.3333333%;
  //     }
  //   }
    
  //   @media (max-width: 600px) {
  //     .article {
  //       flex: 0 0 50%;
  //     }
  //   }
    
  //   @media (max-width: 400px) {
  //     .article {
  //       flex: 0 0 100%;
  //     }
  //   }
  // }
}

</style>
