<template>
  <div class="home">
    <section class="main">
      <div class="top">
        <span class="count">共 {{collectCount}} 个</span>
        <span class="new button" @click="add">新增</span>
        
        <div class="edit" v-show="edit_show">
          <div class="name">
            <input type="text" name="name" id="name" placeholder="name" v-model="name"/>
          </div>
          <div class="description">
            <textarea name="message" id="description" placeholder="description" rows="2" v-model="description"></textarea>
          </div>
          <div class="submit" v-show="editSubmitShow">
              <input type="submit" value="submit" class="special fit" @click="editSubmit"/>
          </div>

        </div>
      </div>
      <div class="collects">
        <div class="collect" v-for="collect in collects">
          <div class="box" @click="linkTo(collect.id)">
            <div class="name">{{collect.name}}</div>
            <div class="description">{{collect.description}}</div>
          </div>
        </div>
      </div>
      <button class="fit special" @click="loadMore" v-bind:disabled="!hasMore" v-if="hasMore">加载更多</button>
      <button class="fit" v-else>没有更多了</button>
    </section>
  </div>
</template>

<script>
import { Collect } from '../resource'

export default {
  data () {
    return {
      edit_show: false,
      name: '',
      description: '',
    }
  },
  computed: {
    collects() {
      return this.$store.getters.getCollects
    },
    hasMore() {
      return this.$store.getters.hasCollects
    },
    collectCount() {
      return this.$store.getters.getCollectCount
    },
    editSubmitShow() {
      if (this.name.length > 0 && this.description.length > 0) {
        return true
      }
    },
    currentArticleId() {
      return this.$store.getters.getCurrentCollectId
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
      this.$store.dispatch('get_collects')
    },
    loadMore() {
      this.$store.dispatch('get_collects_more')
    },
    linkTo(id) {
      this.$router.push({name: 'collect_view', params: { id: id}})
    },
    add() {
      this.edit_show = true
    },
    editSubmit() {
      if (this.name.length > 0 && this.description.length > 0) {
        this.$store.dispatch('new_collect', {name: this.name, description: this.description, image: []})
      }
    }
  },
  watch: {
    currentArticleId(val, oldVal) {
      this.fecthDate()
      this.edit_show = false
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
  
  .top {
    padding: 10px;
    
    span {
      margin-right: 20px;
      
      .count {

      }
      
      &.new {
        color: #8cd1a8;
        cursor: pointer;
      }
    }
    
    .edit {
      margin-top: 10px;
      
      .name {
        margin-bottom: 10px;
      }
      
      .description {
        margin-bottom: 10px;
      }
      
      .submit {

      }
    }
  }
  
  .collects {
    .collect {
      .box {
        margin-bottom: 1rem;
        padding: 3px 10px 3px 10px;
        box-shadow: inset 0 0 0 1px #F5F5F5;
        cursor: pointer;
        border-radius: 1px;
        
        .name {
          color: #8cd1a8;
        }
      }
    }
  }
}

</style>
