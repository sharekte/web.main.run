<template>
    <header>
        <!-- <div class="home-bg">
      <div class="info">

      </div>
    </div> -->
        <div class="header-main">
            <div class="menu">
                <ul>
                    <li><m-button design="ujarak" size="small" special @click="linkTo('home')">HOME</m-button></li>
                    <li><m-button design="ujarak" size="small" special @click="linkTo('collect')">COLLECTIONS</m-button></li>
                    <li v-if="isLogin"><m-button design="ujarak" size="small" special @click="linkTo('edit')">WRITE</m-button></li>
                    <li v-if="!isLogin"><m-button design="ujarak" size="small" special @click="linkTo('login')">LOGIN</m-button></li>
                    <li v-if="isLogin"><m-button design="ujarak" size="small" special @click="toLogout">LOGOUT</m-button></li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.getters.getToken;
    }
  },
  methods: {
    toLogout() {
      this.$store.dispatch("logout");
    },
    linkTo(name) {
      this.$router.push({ name: name });
    }
  },
  mounted() {
    //console.log(this.$route.name == 'home')
  }
};
</script>

<style lang="stylus" scoped>
header {
    border-bottom: 1px solid #F5F5F5;
    flex: 0 0 auto;

    .header-main {
        margin: 0 auto;
        height: 6rem;
        max-width: 120rem;

        .menu {
            height: 10rem;
            line-height: 6rem;

            ul {
                display: flex;
                justify-content: center;
                list-style: none;
                
                li {
                    padding-left: 1rem;
                    padding-right: 1rem;
                }
            }
        }
    }
}
</style>
