<template>
  <div class="home">
    <section class="main">
      <div class="articles">
        <div class="article" v-for="article in articles">
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
    },
    linkTo(id) {
      this.$router.push({name: 'view', params: { id: id}})
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
  position: relative;
  overflow: hidden;
}

.main {
  margin: 10px auto;
  max-width: 1200px;
  
  .articles {
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
