<template>
  <div class="edit">
      <div class="sidebar" v-on:scroll="onscroll" ref="sidebar">
          <ul class="alt">
              <li v-for="article in articles" :key="article.id">
                  <div class="title" @click="setArticleId(article.id)">
                      {{article.title}}
                  </div>
                  <!-- <div class="collect">
                      <span>rust学习笔记</span>
                      <span>随便</span>
                  </div> -->
                  <div class="time">
                      {{article.create_at}}
                  </div>
              </li>
          </ul>
      </div>
      <div class="main">
          <div class="header">
              <button class="small special" @click="newArticle">新建</button>
              <button class="small special" @click="saveArticle">保存</button>
              <button class="small special" style="float: right" @click="close">关闭</button>
          </div>
          <div class="content">
              <content-inner></content-inner>
          </div>
      </div>
  </div>
</template>

<script>
import ContentInner from '@/components/edit/ContentInner'
export default {
    data () {
        return {
            can_loadding: true 
        }
    },
    components: {
        ContentInner
    },
    computed: {
        articles() {
            return this.$store.state.edit.articles
        },
        hasMore() {
            return this.$store.state.edit.hasMore
        }
    },
    methods: {
        onscroll(el) {
            let is_scroll_bottom = false

            if ((this.$refs.sidebar.scrollHeight - this.$refs.sidebar.clientHeight - this.$refs.sidebar.scrollTop) < 10 ) {
                is_scroll_bottom = true
            }

            if (is_scroll_bottom === true && this.can_loadding === true && this.hasMore === true) {
                this.can_loadding = false
                this.loadMore()
            }
        },
        close() {
            this.$router.push({name: 'home'})
        },
        fetchData() {
            this.$store.dispatch('edit_get_articles')
        },
        loadMore() {
            this.$store.dispatch('edit_get_articles_more')
        },
        setArticleId(id) {
            this.$store.commit('EDIT_SET_CURRENT_ARTICLE_ID', id)
        },
        newArticle() {
            this.$store.commit('EDIT_EDSTORY')
        },
        saveArticle() {
            this.$store.dispatch('edit_save_article')
        }
    },
    mounted: function() {
        this.fetchData()
    },
    watch: {
        articles(val, oldval) {
            this.can_loadding = true
        }
    }
}
</script>

<style lang="stylus" scoped>
.edit {
    //background-color #ff6600
    height 100%
    width 100%
    display flex
    //justify-content center
    align-items stretch

    .sidebar {
        height 100%
        width 260px
        //background-color #ff6699
        padding-top 10px
        border-right 1px solid #dddddd
        position relative
        overflow-y auto

        &::-webkit-scrollbar {
            display:none
        }

        li {
            padding-left 10px

            .title {
                font-size 1.5rem
                cursor pointer
                color #8cd1a8
            }

            .collect {
                font-size 1.2rem
            }

            .time {
                font-size 1.2rem
                color #888
            }
        }
    }

    .main {
        //height 100%
        flex-grow 1
        width calc(100% - 260px)
        //background-color #eee

        .header {
            height 42px
            //background-color #666666
            padding 5px
            border-bottom 1px solid #dddddd
        }

        .content {
            height calc(100% - 42px)
            overflow-y auto

            &::-webkit-scrollbar {
                display:none
            }
        }
    }
}
</style>
