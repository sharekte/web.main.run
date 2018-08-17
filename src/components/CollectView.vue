<template>
    <div class="home">
        <section class="main">
            <div class="top">
                <div class="button" @click="update_show">修改</div>
                <!-- <div class="button">删除</div> -->

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
            <div class="detail">
                <div class="name">{{collect.name}}</div>
                <div class="description">{{collect.description}}</div>
            </div>
            <div class="lable">文章</div>
            <div class="articles">
                <div class="item" v-for="article in articles">
                    <div class="title" @click="option_article(article.id)">{{article.title}}</div>
                    <div class="summary">{{article.summary}}</div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { Collect } from "../resource";

export default {
  data() {
    return {
      edit_show: false
      // name: '',
      // description: ''
    };
  },
  computed: {
    collect() {
      return this.$store.getters.getCollect;
    },
    name: {
      //return this.collect.name
      get() {
        return this.collect.name;
      },
      set(value) {
        this.$store.commit("SET_COLLECT_NAME", value);
      }
    },
    description: {
      //return this.collect.description
      get() {
        return this.collect.description;
      },
      set(value) {
        this.$store.commit("SET_COLLECT_DESCRIPTION", value);
      }
    },
    editSubmitShow() {
      if (this.name != "" && this.description != "") {
        return true;
      }
    },
    currentArticleId() {
      return this.$store.getters.getCurrentCollectId;
    },
    articles() {
      return this.$store.state.collect.articles;
    }
  },
  created() {
    this.fecthDate();
  },
  mounted() {
    //console.log(this.articles)
  },
  methods: {
    fecthDate() {
      this.$store.dispatch("get_collect", this.$route.params);
      this.$store.dispatch("get_articles_by_collect", this.$route.params);
    },
    editSubmit() {
      if (this.name != "" && this.description != "") {
        this.$store.dispatch("update_collect", {
          name: this.name,
          description: this.description,
          image: []
        });
        this.edit_show = false;
      }
    },
    update_show() {
      this.edit_show = true;
    },
    option_article(id) {
      this.$router.push({ name: "view", params: { id: id } });
    }
  },
  watch: {
    currentArticleId(val, oldVal) {
      //this.fecthDate()
      //this.edit_show = false
    }
  }
};
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

  .detail {
    padding: 10px;
    
    .name {
      font-size: 3rem;
    }
  }
  
  .lable {
    margin-top: 10px;
    font-size: 2rem;
    padding-left: 20px;
  }

  .articles {
    margin-top: 10px;
    padding: 10px;
    
    .item {
      margin-bottom: 1rem;
      padding: 3px 10px 3px 10px;
      box-shadow: inset 0 0 0 1px #F5F5F5;
      cursor: pointer;
      border-radius: 1px;
      
      .title {
        color: #8cd1a8;
      }
    }
  }
}

</style>
