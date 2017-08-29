<template>
  <div class="login">
    <form method="post" action="#">
      <div class="field">
        <input type="text" name="username" id="demo-name" value="" placeholder="Name" v-model="username"/>
      </div>
      <div class="field">
        <input type="password" name="password" id="demo-email" value="" placeholder="Password" v-model="password"/>
      </div>
      <!-- <div>{{token}}</div> -->
      <div class="field">
        <div class="button fit" @click="submit">登录</div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    token() {
      return this.$store.getters.getToken
    }
  },
  watch: {
    token (val, oldVal) {
      if (val.length > 100) {
        this.$router.push({name: 'home'})
      }
    }
  },
  mounted () {
    //console.log(this.$store)
    //console.log(this.$store.getters.getToken)
    //console.log(this.$route.push('home'))
    //console.log(this.$router)
  },
  methods: {
    submit () {
      //console.log(this.$store)
      //console.log(this.$store.commit('SAVE_USER', {Username: this.username, Password: this.password}))
      this.$store.dispatch('login', {Username: this.username, Password: this.password})
    }
  }
}
</script>

<style scoped>
.login {
  margin: 20rem auto;
  width: 30rem;
}
</style>
