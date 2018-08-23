// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import vueResource from "vue-resource";
import LocalStore from "store";
//import Toasted from 'vue-toasted'

import store from "./store";

Vue.config.productionTip = false;

//import "@/assets/css/font-awesome.min.css";
import "@/assets/stylus/style.styl";

import UI from "@/ui";
import "@/ui/style/style.styl";

Vue.use(vueResource);
Vue.use(UI);
/*
Vue.use(Toasted, {
    position: 'top-center',
    duration: 5000
})
*/

//Vue.toasted.show('hola billo');
//Vue.toasted.show('hola billo');

//console.log(Vue.resource('http://127.0.0.1:8000/user'))

Vue.http.interceptors.push(function(request, next) {
  if (LocalStore.get("token")) {
    request.headers.set("Token", LocalStore.get("token"));
  }

  next(function(response) {
    if (response.status == 401) {
      router.push({ name: "login" });
    }
  });
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
