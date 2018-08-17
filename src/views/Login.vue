<template>
    <div class="login">
        <form method="post" action="#">
            <div class="field">
                <input type="text" name="username" id="username" value="" placeholder="Name" v-model="username"/>
            </div>
            <div class="field">
                <input type="password" name="password" id="password" value="" placeholder="Password" v-model="password"/>
            </div>
            <div class="field">
                <div class="button fit" @click="submit">登录</div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    }
  },
  watch: {
    token(val, oldVal) {
      if (val.length > 100) {
        this.$router.push({ name: "home" });
        //this.$router.router.go(-1)
      }
    }
  },
  methods: {
    submit() {
      this.$store.dispatch("login", {
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

<style scoped>
.login {
  margin: 20rem auto;
  width: 30rem;
}
</style>
